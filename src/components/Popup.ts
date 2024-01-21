import { getWindowStyles } from "../styles";

export const DEVTOOLS_POPUP_ELEMENT_ID = "vite-devtools-popup";

export class ViteDevtoolsPopup extends HTMLElement {
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