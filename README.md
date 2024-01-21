# Vite Devtools

This package offers a developer panel for managing Vitejs plugins directly from the client side. It is designed to optimize the development process in the Vitejs environment.

## Installation

To install Vite Devtools, run the following command with your preferred package manager:

```sh
npm install -D @vite-libs/devtools
```

## Usage

```ts
import { defineConfig } from "vite";

import devtools from "@vite-libs/devtools";

devtools.register([
    {
        id: "my-plugin",
        name: "My Plugin Name",
        icon: "mdi mdi-24px mdi-rocket",
        async init(shadowRoot, eventTarget) {
            shadowRoot.innerHTML = "<h1>Hello World</h1>";
        },
    }
])
```