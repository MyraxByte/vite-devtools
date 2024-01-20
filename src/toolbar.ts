import { getAppRootStyles, getGlobalStyles, getToggleStyles, getWindowStyles } from './styles';

interface ViteDevtoolsApp {
    id: string;
    active?: boolean;
    name: string;
    icon: string | HTMLElement;
    status?: string;
    eventTarget?: EventTarget;
    notification?: {
        state: boolean;
    };

    init?: (shadowRoot: ShadowRoot, eventTarget: EventTarget) => Promise<void>;
    beforeTogglingOff?: (shadowRoot: ShadowRoot) => Promise<boolean>;
}

export class ViteDevtools extends HTMLElement {
    private delayTimeout: number;
    private initialized: boolean;
    public shadowRoot: ShadowRoot;
    public toolbar!: HTMLElement;
    public apps: ViteDevtoolsApp[] = [];

    constructor() {
        super();

        this.initialized = false;
        this.delayTimeout = 0;
        this.shadowRoot = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (!this.initialized) {
            this.init();
            this.initialized = true;
        }
        this.apps.forEach(async (app) => {
            await this.setAppStatus(app, app.active ?? true);
        });
    }

    private init() {
        this.shadowRoot.innerHTML = `
            ${getGlobalStyles()}
            <div id="vite-devtools-root" data-hidden>
                <div id="vite-devtools-toolbar-hitbox-above"></div>
                <div id="vite-devtools-toolbar">
                    <div id="vite-devtools-toolbar-container">
                        ${this.apps.map(app => this.getAppTemplate(app)).join('')}
                    </div>
                </div>
                <div id="vite-devtools-toolbar-hitbox-below"></div>
            </div>
        `;

        this.toolbar = this.shadowRoot.querySelector('#vite-devtools-root') as HTMLElement;
        this.attachEvents();

        this.apps.forEach((app) => {
            const appCanvas = document.createElement("vite-devtools-toolbar-app");
            appCanvas.dataset.appId = app.id;
            this.shadowRoot?.append(appCanvas);
        });

        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(() => {
                this.apps.map((app) => this.initApp(app));
            }, { timeout: 300 });
        } else {
            setTimeout(() => {
                this.apps.map((app) => this.initApp(app));
            }, 300);
        }
    }

    async initApp(app: any) {
        const shadowRoot = this.getAppRootById(app.id).shadowRoot;
        app.status = "loading";
        try {
            await app.init?.(shadowRoot, app.eventTarget);
            app.status = "ready";
            if ((import.meta as any).hot) {
                (import.meta as any).hot.send(`vite-devtools:${app.id}:initialized`);
            }
        } catch (e) {
            console.error(`Failed to init app ${app.id}, error: ${e}`);
            app.status = "error";
        }
    }

    public insertApp(app: ViteDevtoolsApp) {
        const existingApp = this.getAppById(app.id);
        if (existingApp) {
            console.warn(`App with id ${app.id} already exists`);
            return;
        }

        const preparedApp = this.prepare(app);
        this.apps.push(preparedApp);
    }

    private prepare(appDefinition: ViteDevtoolsApp) {
        const eventTarget = new EventTarget();

        const app: ViteDevtoolsApp = {
            ...appDefinition,
            active: false,
            status: "loading",
            notification: { state: false },
            eventTarget
        };

        eventTarget.addEventListener("toggle-notification", (evt) => {
            const target = this.shadowRoot?.querySelector(`[data-app-id="${app.id}"]`);
            if (!target) return;

            let newState = true;
            if (evt instanceof CustomEvent) {
                newState = evt.detail.state ?? true;
            }

            if (app.notification) {
                app.notification.state = newState;
            }

            target.querySelector(".notification")?.toggleAttribute("data-active", newState);
        });

        const onToggleApp = async (evt) => {
            let newState = false;
            if (evt instanceof CustomEvent) {
                newState = evt.detail.state ?? true;
            }
            await this.setAppStatus(app, newState);
        };

        eventTarget.addEventListener("toggle-app", onToggleApp);
        eventTarget.addEventListener("toggle-plugin", onToggleApp);
        return app;
    };

    private attachEvents() {
        const items = this.shadowRoot.querySelectorAll(".item");

        items.forEach((item) => {
            item.addEventListener("click", async (event) => {
                const target = event.currentTarget;
                if (!target || !(target instanceof HTMLElement)) return;

                const id = target.dataset.appId;
                if (!id) return;
                const app = this.getAppById(id);

                if (!app) return;
                event.stopPropagation();
                await this.toggleAppStatus(app);
            });
        });

        ["mouseenter", "focusin"].forEach((event) => {
            this.toolbar.addEventListener(event, () => {
                this.clearDelayTimeout();
                if (!this.isHidden()) return;
                this.setToolbarVisible(true);
            });
        });

        ["mouseleave", "focusout"].forEach((event) => {
            this.toolbar.addEventListener(event, () => {
                this.clearDelayTimeout();
                if (this.getActiveApp() || this.isHidden()) return;
                this.triggerDelayedHide();
            });
        });

        document.addEventListener("keyup", (event) => {
            if (event.key !== "Escape") return;
            if (this.isHidden()) return;
            const activeApp = this.getActiveApp();
            if (activeApp) this.toggleAppStatus(activeApp);
            else this.setToolbarVisible(false);
        });
    }

    getAppById(id: string) {
        return this.apps.find((app) => app.id === id);
    }

    private getAppTemplate(app) {
        return `
            <button class="item" data-app-id="${app.id}">
                <div class="icon">${app.icon}</div>
                <span class="item-tooltip">${app.name}</span>
            </button>
        `;
    }

    getActiveApp() {
        return this.apps.find((app) => app.active);
    }

    private getAppRootById(id) {
        return this.shadowRoot.querySelector(`vite-devtools-toolbar-app[data-app-id="${id}"]`) as HTMLElement;
    }

    private async toggleAppStatus(app: any) {
        const activeApp = this.getActiveApp();
        if (activeApp) {
            const closeApp = await this.setAppStatus(activeApp, false);
            if (!closeApp) return;
        }
        if (app.status !== "ready") return;
        if (app !== activeApp) {
            await this.setAppStatus(app, true);
        }
    }

    private async setAppStatus(app: any, status: boolean) {
        const appRoot = this.getAppRootById(app.id);

        if (!appRoot) return false;
        if (app.active && !status && app.beforeTogglingOff) {
            const shouldToggleOff = await app.beforeTogglingOff(appRoot.shadowRoot);
            if (!shouldToggleOff) return false;
        }
        app.active = status ?? !app.active;
        const mainBarButton = this.shadowRoot.querySelector(`[data-app-id="${app.id}"]`);
        if (mainBarButton) {
            mainBarButton.classList.toggle("active", app.active);
        }
        if (app.active) {
            appRoot.style.display = "block";
            appRoot.setAttribute("data-active", "");
        } else {
            appRoot.style.display = "none";
            appRoot.removeAttribute("data-active");
        }
        ["app-toggled"].forEach((eventName) => {
            app.eventTarget.dispatchEvent(
                new CustomEvent(eventName, {
                    detail: {
                        state: app.active,
                        app
                    }
                })
            );
        });
        if (import.meta as any) {
            (import.meta as any).send(`vite-devtools:${app.id}:toggled`, { state: app.active });
        }

        return true;
    }

    private clearDelayTimeout() {
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = 0;
    }

    private triggerDelayedHide() {
        this.clearDelayTimeout();
        this.delayTimeout = window.setTimeout(() => {
            this.setToolbarVisible(false);
            this.delayTimeout = 0;
        }, 2 * 1e3);
    }

    public isHidden() {
        return this.toolbar?.hasAttribute("data-hidden") ?? true;
    }

    private setToolbarVisible(status: boolean) {
        const barContainer = this.shadowRoot.querySelector("#vite-devtools-toolbar-container");
        const toolbarContainer = this.shadowRoot.querySelector("#vite-devtools-toolbar");
        const hitboxAbove = this.shadowRoot.querySelector("#vite-devtools-toolbar-hitbox-above") as HTMLElement;

        if (status === true) {
            this.toolbar?.removeAttribute("data-hidden");
            barContainer?.removeAttribute("inert");
            toolbarContainer?.removeAttribute("tabindex");
            if (hitboxAbove) hitboxAbove.style.height = "0";
            return;
        }
        if (status === false) {
            this.toolbar?.setAttribute("data-hidden", "");
            barContainer?.setAttribute("inert", "");
            toolbarContainer?.setAttribute("tabindex", "0");
            if (hitboxAbove) hitboxAbove.style.height = `42px`;
            return;
        }
    }
}

export class ViteDevtoolsAppRoot extends HTMLElement {
    public shadowRoot: ShadowRoot;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = getAppRootStyles();
    }
}

export class ViteDevtoolsWindow extends HTMLElement {
    public shadowRoot: ShadowRoot;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            ${getWindowStyles()}
          <slot />
        `;
    }
}

export class ViteDevtoolsToggle extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public input: HTMLInputElement;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: "open" });
        this.input = document.createElement("input");
    }
    
    connectedCallback() {
        this.shadowRoot.innerHTML = getToggleStyles();
        this.input.type = "checkbox";
        this.shadowRoot.append(this.input);
    }

    get value() {
        return this.input.value;
    }
    set value(val) {
        this.input.value = val;
    }
}