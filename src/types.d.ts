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