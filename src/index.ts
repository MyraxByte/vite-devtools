import { ViteDevtools, DEVTOOLS_ELEMENT_ID, ViteDevtoolsApp } from "./devtools";
import { ViteDevtoolsToggle, DEVTOOLS_TOGGLE_ELEMENT_ID } from "./components/Toggle";
import { ViteDevtoolsPopup, DEVTOOLS_POPUP_ELEMENT_ID } from "./components/Popup";
import { ViteDevtoolsAppRoot, DEVTOOLS_APP_ROOT_ELEMENT_ID } from "./components/AppRoot";

// Custom Elements
customElements.define(DEVTOOLS_ELEMENT_ID, ViteDevtools);
customElements.define(DEVTOOLS_TOGGLE_ELEMENT_ID, ViteDevtoolsToggle);
customElements.define(DEVTOOLS_POPUP_ELEMENT_ID, ViteDevtoolsPopup);
customElements.define(DEVTOOLS_APP_ROOT_ELEMENT_ID, ViteDevtoolsAppRoot);

const devtools = document.querySelector(DEVTOOLS_ELEMENT_ID) as ViteDevtools ?? document.createElement(DEVTOOLS_ELEMENT_ID) as ViteDevtools;

function register(apps: ViteDevtoolsApp[]) {
    apps.forEach((app) => devtools.insertApp(app));

    if (!document.querySelector(DEVTOOLS_ELEMENT_ID)) {
        document.body.appendChild(devtools);
    } else {
        document.body.removeChild(devtools);
        document.body.appendChild(devtools);
    }
}

// Export
export default {
    DEVTOOLS_ELEMENT_ID,
    DEVTOOLS_TOGGLE_ELEMENT_ID,
    DEVTOOLS_POPUP_ELEMENT_ID,
    DEVTOOLS_APP_ROOT_ELEMENT_ID,    
    ViteDevtools,
    ViteDevtoolsToggle,
    ViteDevtoolsPopup,
    ViteDevtoolsAppRoot,
    register
}

export {
    DEVTOOLS_ELEMENT_ID,
    DEVTOOLS_TOGGLE_ELEMENT_ID,
    DEVTOOLS_POPUP_ELEMENT_ID,
    DEVTOOLS_APP_ROOT_ELEMENT_ID,    
    ViteDevtools,
    ViteDevtoolsToggle,
    ViteDevtoolsPopup,
    ViteDevtoolsAppRoot,
    register
}