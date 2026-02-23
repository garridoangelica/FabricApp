import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { History } from 'history';
import { WorkloadClientAPI } from '@ms-fabric/workload-client';

import { CatalogEditor } from './components/CatalogEditor/CatalogEditor';
import { CreateDialog } from './components/CreateDialog/CreateDialog';

interface AppProps {
    history: History;
    workloadClient: WorkloadClientAPI;
}

export function App({ history, workloadClient }: AppProps) {
    return (
        <Router history={history}>
            <Switch>
                {/* Main editor – opened when a saved CatalogIQ item is clicked */}
                <Route path="/catalog-editor/:itemObjectId">
                    <CatalogEditor workloadClient={workloadClient} />
                </Route>

                {/* Frontend-only experience – no backend required */}
                <Route path="/catalog-frontend-only">
                    <CatalogEditor workloadClient={workloadClient} />
                </Route>

                {/* Item creation dialog */}
                <Route
                    path="/catalog-create-dialog/:workspaceObjectId"
                    render={({ match }) => (
                        <CreateDialog
                            workloadClient={workloadClient}
                            workspaceObjectId={match.params.workspaceObjectId}
                        />
                    )}
                />

                {/* Fallback – default to frontend-only editor */}
                <Route>
                    <CatalogEditor workloadClient={workloadClient} />
                </Route>
            </Switch>
        </Router>
    );
}
