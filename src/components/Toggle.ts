import { getToggleStyles } from "../styles";

export const DEVTOOLS_TOGGLE_ELEMENT_ID = "vite-devtools-toggle";

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