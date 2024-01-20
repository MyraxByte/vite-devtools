import "./toolbar";
import { ViteDevtools, ViteDevtoolsAppRoot, ViteDevtoolsToggle, ViteDevtoolsWindow } from "./toolbar";

const DEVTOOLS_ELEMENT_ID = "vite-devtools";
const DEVTOOLS_ELEMENT_TOGGLE_ID = `${DEVTOOLS_ELEMENT_ID}-toolbar-toggle`;
const DEVTOOLS_ELEMENT_WINDOW_ID = `${DEVTOOLS_ELEMENT_ID}-toolbar-window`


customElements.define(DEVTOOLS_ELEMENT_ID, ViteDevtools);
customElements.define(`${DEVTOOLS_ELEMENT_ID}-toolbar-app`, ViteDevtoolsAppRoot);
customElements.define(DEVTOOLS_ELEMENT_TOGGLE_ID, ViteDevtoolsToggle);
customElements.define(DEVTOOLS_ELEMENT_WINDOW_ID, ViteDevtoolsWindow);

export default {
    DEVTOOLS_ELEMENT_TOGGLE_ID,
    DEVTOOLS_ELEMENT_WINDOW_ID,
    DEVTOOLS_ELEMENT_ID,
    ViteDevtools,
    ViteDevtoolsToggle,
    ViteDevtoolsWindow,
    ViteDevtoolsAppRoot
}

export {
    DEVTOOLS_ELEMENT_TOGGLE_ID,
    DEVTOOLS_ELEMENT_WINDOW_ID,
    DEVTOOLS_ELEMENT_ID,
    ViteDevtools,
    ViteDevtoolsToggle,
    ViteDevtoolsWindow,
    ViteDevtoolsAppRoot
}