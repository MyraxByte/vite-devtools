export function getGlobalStyles() {
  return `<style>
    :host {
      all: initial;
      z-index: 999999;
      view-transition-name: vite-devtools;
      display: contents;
    }

    ::view-transition-old(vite-devtools),
    ::view-transition-new(vite-devtools) {
      animation: none;
    }

    #vite-devtools-root {
      position: fixed;
      bottom: 0px;
      left: 50%;
      transform: translate(-50%, 0%);
      z-index: 2000000010;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: bottom 0.35s cubic-bezier(0.485, -0.05, 0.285, 1.505);
      pointer-events: none;
    }

    #vite-devtools-root[data-hidden] {
      bottom: -40px;
    }

    #vite-devtools-toolbar-hitbox-above {
      height: 42px;
    }

    #vite-devtools-toolbar-hitbox-below {
      height: 16px;
    }

    #vite-devtools-toolbar-hitbox-above,
    #vite-devtools-toolbar-hitbox-below {
      width: 100%;
      pointer-events: auto;
    }

    #vite-devtools-toolbar {
      height: 40px;
      overflow: hidden;
      pointer-events: auto;
      background: linear-gradient(180deg, #13151a 0%, rgba(19, 21, 26, 0.88) 100%);
      border: 1px solid #343841;
      border-radius: 9999px;
      box-shadow: 0px 0px 0px 0px rgba(19, 21, 26, 0.3),
        0px 1px 2px 0px rgba(19, 21, 26, 0.29),
        0px 4px 4px 0px rgba(19, 21, 26, 0.26),
        0px 10px 6px 0px rgba(19, 21, 26, 0.15),
        0px 17px 7px 0px rgba(19, 21, 26, 0.04),
        0px 26px 7px 0px rgba(19, 21, 26, 0.01);
    }

    @media (forced-colors: active) {
      #vite-devtools-toolbar {
        background: white;
      }
    }

    #vite-devtools-toolbar .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      border: 0;
      background: transparent;
      color: white;
      font-family: system-ui, sans-serif;
      font-size: 1rem;
      line-height: 1.2;
      white-space: nowrap;
      text-decoration: none;
      padding: 0;
      margin: 0;
      overflow: hidden;
      transition: opacity 0.2s ease-out 0s;
    }

    #vite-devtools-toolbar #vite-devtools-toolbar-container .item:hover, #vite-devtools-toolbar #vite-devtools-toolbar-container .item:focus-visible {
      background: #FFFFFF20;
      cursor: pointer;
      outline-offset: -3px;
    }

    #vite-devtools-toolbar .item:first-of-type {
      border-top-left-radius: 9999px;
      border-bottom-left-radius: 9999px;
      width: 42px;
      padding-left: 4px;
    }

    #vite-devtools-toolbar .item:last-of-type {
      border-top-right-radius: 9999px;
      border-bottom-right-radius: 9999px;
      width: 42px;
      padding-right: 4px;
    }
    #vite-devtools-toolbar #vite-devtools-toolbar-container .item.active {
      background: rgba(71, 78, 94, 1);
    }

    #vite-devtools-toolbar .item-tooltip {
      background: linear-gradient(0deg, #13151A, #13151A), linear-gradient(0deg, #343841, #343841);
      border: 1px solid rgba(52, 56, 65, 1);
      border-radius: 4px;
      padding: 4px 8px;
      position: absolute;
      top: -38px;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.2s ease-in-out 0s;
      pointer-events: none;
    }

    #vite-devtools-toolbar .item-tooltip::after{
      content: '';
      position: absolute;
      left: calc(50% - 5px);
      bottom: -6px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #343841;
    }

    #vite-devtools-toolbar .item:hover .item-tooltip, #vite-devtools-toolbar .item:not(.active):focus-visible .item-tooltip {
      transition: opacity 0.2s ease-in-out 200ms;
      opacity: 1;
    }

    @media (forced-colors: active) {
      #vite-devtools-toolbar .item:hover .item-tooltip,
      #vite-devtools-toolbar .item:not(.active):focus-visible .item-tooltip {
        background: white;
      }
    }

    #vite-devtools-toolbar #vite-devtools-toolbar-container .item.active .notification {
      border-color: rgba(71, 78, 94, 1);
    }

    #vite-devtools-toolbar .item .icon {
      position: relative;
      max-width: 20px;
      max-height: 20px;
      user-select: none;
    }

    #vite-devtools-toolbar .item svg {
      width: 20px;
      height: 20px;
      display: block;
      margin: auto;
    }

    @media (forced-colors: active) {
      #vite-devtools-toolbar .item svg path[fill="#fff"] {
        fill: black;
      }
    }

    #vite-devtools-toolbar .item .notification {
      display: none;
      position: absolute;
      top: -4px;
      right: -6px;
      width: 8px;
      height: 8px;
      border-radius: 9999px;
      border: 1px solid rgba(19, 21, 26, 1);
      background: #B33E66;
    }

    #dev-toolbar-root:not([data-no-notification]) #vite-devtools-toolbar .item .notification[data-active] {
      display: block;
    }

    #vite-devtools-toolbar #vite-devtools-toolbar-container {
      height: 100%;
      display: flex;
    }

    #vite-devtools-toolbar .separator {
      background: rgba(52, 56, 65, 1);
      width: 1px;
    }
  </style>
`}

export function getAppRootStyles() {
  return `<style>
    :host {
        position: absolute;
        top: 0;
        left: 0;
    }

  </style>`
}

export function getWindowStyles() {
  return `<style>
    :host {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background: #161618;
      border: 1px solid #1b1b1f;
      width: min(640px, 100%);
      max-height: 480px;
      border-radius: 12px;
      padding: 24px;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      color: #bfc1c9ff;
      position: fixed;
      z-index: 999999999;
      bottom: 72px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0px 0px 0px 0px rgba(19, 21, 26, 0.30), 0px 1px 2px 0px rgba(19, 21, 26, 0.29), 0px 4px 4px 0px rgba(19, 21, 26, 0.26), 0px 10px 6px 0px rgba(19, 21, 26, 0.15), 0px 17px 7px 0px rgba(19, 21, 26, 0.04), 0px 26px 7px 0px rgba(19, 21, 26, 0.01);
    }

    @media (forced-colors: active) {
      :host {
        background: white;
      }
    }

    @media (max-width: 640px) {
      :host {
        border-radius: 0;
      }
    }

    ::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5) {
      font-weight: 600;
      color: #fff;
    }

    ::slotted(h1) {
      font-size: 22px;
    }

    ::slotted(h2) {
      font-size: 20px;
    }

    ::slotted(h3) {
      font-size: 18px;
    }

    ::slotted(h4) {
      font-size: 16px;
    }

    ::slotted(h5) {
      font-size: 14px;
    }

    hr, ::slotted(hr) {
      border: 1px solid rgba(27, 30, 36, 1);
      margin: 1em 0;
    }

    p, ::slotted(p) {
      line-height: 1.5em;
    }
  </style>`
}

export function getToggleStyles() {
  return `<style>
    input {
      appearance: none;
      width: 48px;
      height: 24px;
      border: 1px solid rgba(145, 152, 173, 1);
      transition: background-color 0.2s ease, border-color 0.2s ease;
      border-radius: 9999px;
      cursor: pointer;
    }

    input::after {
      content: '';
      width: 20px;
      display: inline-block;
      height: 20px;
      background-color: rgba(145, 152, 173, 1);
      border-radius: 9999px;
      transition: transform 0.2s ease, background-color 0.2s ease;
      top: 1px;
      left: 1px;
      position: relative;
    }

    @media (forced-colors: active) {
      input::after {
        border: 1px solid black;
        top: 0px;
        left: 0px;
      }
    }

    input:checked {
      border: 1px solid #747bff;
      background-color: #646cff56;
    }

    input:checked::after {
      transform: translateX(23px);
      background: #747bff;
    }
  </style>`
}