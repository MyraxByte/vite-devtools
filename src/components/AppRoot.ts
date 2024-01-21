import { getAppRootStyles } from "../styles";

export const DEVTOOLS_APP_ROOT_ELEMENT_ID = "vite-devtools-app-root";

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
