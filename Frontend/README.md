# CatalogIQ Frontend

React + TypeScript workload app for Microsoft Fabric, built with Webpack.

## Prerequisites

Dependencies must be installed on the **Linux filesystem** (not the Windows-mounted workspace) to avoid extremely slow I/O. This is already set up if you see `Frontend/node_modules` as a symlink.

## Quick Start

```bash
cd Frontend
NODE_OPTIONS='--max-old-space-size=8192' npx webpack serve --config ./tools/webpack.config.js
```

The dev server starts on **http://localhost:60006**.

- **http://localhost:60006/** — Main entry (requires Fabric host iframe)
- **http://localhost:60006/preview.html** — Standalone preview (works in any browser)

> **Note:** The first page load takes 30–60 seconds. FluentUI produces a ~449 MB dev bundle. This is normal for dev mode — be patient.

## Setup From Scratch (after container rebuild)

If `node_modules` is missing or broken, run these steps:

```bash
# 1. Install dependencies on the native Linux filesystem
mkdir -p /home/node/frontend-install
cp Frontend/package.json /home/node/frontend-install/
cd /home/node/frontend-install && npm install

# 2. Symlink node_modules back to the project
cd /workspaces/FabricApp/Frontend
ln -s /home/node/frontend-install/node_modules node_modules

# 3. Start the dev server
NODE_OPTIONS='--max-old-space-size=8192' npx webpack serve --config ./tools/webpack.config.js
```

## Environment

Configure `Frontend/.env.dev` with your workload settings:

| Variable | Description |
|---|---|
| `WORKLOAD_NAME` | Name of the Fabric workload |
| `WORKLOAD_BE_URL` | Backend API URL |
| `DEV_AAD_CONFIG_AUDIENCE` | AAD audience for auth |
| `DEV_AAD_CONFIG_APPID` | AAD app ID |
| `DEV_AAD_CONFIG_REDIRECT_URI` | OAuth redirect URI |

## FAQ

### Why `NODE_OPTIONS='--max-old-space-size=8192'`?
Webpack runs out of memory during the build with the default heap limit. This flag increases the Node.js heap to 8 GB.

### Why install on the Linux filesystem?
The workspace is mounted from a Windows host via Docker. File operations are ~500× slower on the Windows mount than on the container's native Linux filesystem. Installing `node_modules` on the Linux FS and symlinking it back solves this.

### Why does the page take so long to load?
`@fluentui/react-components` re-exports 62 sub-packages and `@fluentui/react-icons` includes thousands of icons. In dev mode there's no tree-shaking, so the full ~449 MB bundle is served. The browser needs time to parse it.
