import React, { useState } from 'react';
import {
    Button,
    Input,
    Text,
    Spinner,
    Field,
} from '@fluentui/react-components';
import { WorkloadClientAPI } from '@ms-fabric/workload-client';

interface CreateDialogProps {
    workloadClient: WorkloadClientAPI;
    workspaceObjectId: string;
}

export function CreateDialog({ workloadClient, workspaceObjectId }: CreateDialogProps) {
    const [displayName, setDisplayName] = useState('My CatalogIQ');
    const [creating, setCreating] = useState(false);

    async function handleCreate() {
        setCreating(true);
        try {
            // TODO: call workloadClient to create item in workspace
            console.log('Creating CatalogIQ item:', { displayName, workspaceObjectId });
            await new Promise((r) => setTimeout(r, 800)); // simulate
        } finally {
            setCreating(false);
        }
    }

    function handleCancel() {
        workloadClient.dialog.close();
    }

    return (
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Text as="h2" size={500} weight="semibold">
                Create CatalogIQ Item
            </Text>

            <Field label="Name" required>
                <Input
                    value={displayName}
                    onChange={(_, d) => setDisplayName(d.value)}
                    placeholder="Enter a name for this catalog"
                />
            </Field>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button appearance="secondary" onClick={handleCancel} disabled={creating}>
                    Cancel
                </Button>
                <Button
                    appearance="primary"
                    onClick={handleCreate}
                    disabled={!displayName.trim() || creating}
                    icon={creating ? <Spinner size="tiny" /> : undefined}
                >
                    {creating ? 'Creating…' : 'Create'}
                </Button>
            </div>
        </div>
    );
}
