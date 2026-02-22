import { bootstrap } from '@ms-fabric/workload-client';

const redirectUriPath = '/close';
const url = new URL(window.location.href);
if (url.pathname?.startsWith(redirectUriPath)) {
    window.close();
}

console.log('CatalogIQ – WORKLOAD_NAME:', process.env.WORKLOAD_NAME);

bootstrap({
    initializeWorker: (params) =>
        import('./index.worker').then(({ initialize }) => initialize(params)),
    initializeUI: (params) =>
        import('./index.ui').then(({ initialize }) => initialize(params)),
});
