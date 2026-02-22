import { createBrowserHistory } from 'history';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider } from '@fluentui/react-components';
import { createWorkloadClient, InitParams } from '@ms-fabric/workload-client';
import { catalogIQLightTheme } from './theme';
import { App } from './App';

export async function initialize(params: InitParams) {
    const workloadClient = createWorkloadClient();
    const history = createBrowserHistory();

    workloadClient.navigation.onNavigate((route) => history.replace(route.targetUrl));

    workloadClient.action.onAction(async function ({ action, data }) {
        switch (action) {
            case 'catalog.tab.onInit':
                return { title: 'CatalogIQ' };
            case 'catalog.tab.canDeactivate':
                return { canDeactivate: true };
            case 'catalog.tab.onDeactivate':
                return {};
            case 'catalog.tab.canDestroy':
                return { canDestroy: true };
            case 'catalog.tab.onDestroy':
                return {};
            case 'catalog.tab.onDelete':
                return {};
            default:
                throw new Error('Unknown UI action: ' + action);
        }
    });

    const container = document.getElementById('root');
    if (!container) throw new Error('Root element not found');
    const root = createRoot(container);
    root.render(
        <FluentProvider theme={catalogIQLightTheme}>
            <App history={history} workloadClient={workloadClient} />
        </FluentProvider>
    );
}
