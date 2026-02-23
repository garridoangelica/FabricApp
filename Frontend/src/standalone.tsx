/**
 * Standalone preview entry point — bypasses the Fabric SDK bootstrap so the
 * UI can be previewed in a regular browser without a Fabric host.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from 'history';
import { FluentProvider } from '@fluentui/react-components';
import { catalogIQLightTheme } from './theme';
import { CatalogEditor } from './components/CatalogEditor/CatalogEditor';

const history = createBrowserHistory();

// Minimal stub so components that receive workloadClient don't crash
const mockWorkloadClient = {} as any;

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(
    <FluentProvider theme={catalogIQLightTheme}>
        <CatalogEditor workloadClient={mockWorkloadClient} />
    </FluentProvider>
);
