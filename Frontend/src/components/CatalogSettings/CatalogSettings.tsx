import React, { useState } from 'react';
import {
    Text,
    Input,
    Select,
    Switch,
    Button,
    Divider,
    Label,
} from '@fluentui/react-components';
import {
    Database24Regular,
    Notebook24Regular,
    ArrowSync24Regular,
    Save24Regular,
} from '@fluentui/react-icons';
import { CatalogSettings as CatalogSettingsModel } from '../../models/CatalogModel';

const DEFAULT_SETTINGS: CatalogSettingsModel = {
    dataSource: {
        type: 'delta',
        connectionString: '',
        databaseName: 'catalogiq_metadata',
        containerOrTable: 'file_catalog',
    },
    notebook: {
        defaultClusterSize: 'medium',
        autoAttachLakehouse: true,
        lakehouseId: '',
    },
    ingestionPipeline: {
        enabled: true,
        scheduleInterval: 'daily',
        sourceFolder: 'abfss://bronze@<storage>.dfs.core.windows.net/raw/',
        targetLakehouse: '',
    },
};

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="settings-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                {icon}
                <Text className="settings-section__title" as="h3" weight="semibold" size={400}>
                    {title}
                </Text>
            </div>
            <Divider style={{ marginBottom: 16 }} />
            {children}
        </div>
    );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="settings-section__row">
            <Label style={{ fontWeight: 500, fontSize: 13 }}>{label}</Label>
            {children}
        </div>
    );
}

export function CatalogSettingsPage() {
    const [settings, setSettings] = useState<CatalogSettingsModel>(DEFAULT_SETTINGS);
    const [saved, setSaved] = useState(false);

    function setDs<K extends keyof CatalogSettingsModel['dataSource']>(
        key: K,
        value: CatalogSettingsModel['dataSource'][K]
    ) {
        setSettings((s) => ({ ...s, dataSource: { ...s.dataSource, [key]: value } }));
        setSaved(false);
    }

    function setNb<K extends keyof CatalogSettingsModel['notebook']>(
        key: K,
        value: CatalogSettingsModel['notebook'][K]
    ) {
        setSettings((s) => ({ ...s, notebook: { ...s.notebook, [key]: value } }));
        setSaved(false);
    }

    function setPl<K extends keyof CatalogSettingsModel['ingestionPipeline']>(
        key: K,
        value: CatalogSettingsModel['ingestionPipeline'][K]
    ) {
        setSettings((s) => ({ ...s, ingestionPipeline: { ...s.ingestionPipeline, [key]: value } }));
        setSaved(false);
    }

    function handleSave() {
        // TODO: persist to backend
        console.log('CatalogIQ settings saved:', settings);
        setSaved(true);
    }

    return (
        <div className="catalog-settings">
            {/* Data Source */}
            <SectionCard icon={<Database24Regular style={{ color: '#1A78D4' }} />} title="Data Source">
                <FormRow label="Storage type">
                    <Select
                        value={settings.dataSource.type}
                        onChange={(_, d) => setDs('type', d.value as CatalogSettingsModel['dataSource']['type'])}
                    >
                        <option value="delta">Delta Table (OneLake / Lakehouse)</option>
                        <option value="cosmosdb">Azure Cosmos DB</option>
                        <option value="sqldb">Azure SQL Database</option>
                    </Select>
                </FormRow>
                <FormRow label="Connection string">
                    <Input
                        type="password"
                        value={settings.dataSource.connectionString}
                        onChange={(_, d) => setDs('connectionString', d.value)}
                        placeholder={
                            settings.dataSource.type === 'delta'
                                ? 'abfss://…'
                                : settings.dataSource.type === 'cosmosdb'
                                ? 'AccountEndpoint=https://…'
                                : 'Server=tcp:…;Database=…'
                        }
                    />
                </FormRow>
                <FormRow label="Database / Lakehouse name">
                    <Input
                        value={settings.dataSource.databaseName}
                        onChange={(_, d) => setDs('databaseName', d.value)}
                    />
                </FormRow>
                <FormRow label="Container / Table">
                    <Input
                        value={settings.dataSource.containerOrTable}
                        onChange={(_, d) => setDs('containerOrTable', d.value)}
                    />
                </FormRow>
            </SectionCard>

            {/* Notebook */}
            <SectionCard icon={<Notebook24Regular style={{ color: '#d67b00' }} />} title="Notebook Settings">
                <FormRow label="Default cluster size">
                    <Select
                        value={settings.notebook.defaultClusterSize}
                        onChange={(_, d) => setNb('defaultClusterSize', d.value as CatalogSettingsModel['notebook']['defaultClusterSize'])}
                    >
                        <option value="small">Small (4 cores)</option>
                        <option value="medium">Medium (8 cores)</option>
                        <option value="large">Large (16 cores)</option>
                    </Select>
                </FormRow>
                <FormRow label="Auto-attach Lakehouse">
                    <Switch
                        checked={settings.notebook.autoAttachLakehouse}
                        onChange={(_, d) => setNb('autoAttachLakehouse', d.checked)}
                        label={settings.notebook.autoAttachLakehouse ? 'Enabled' : 'Disabled'}
                    />
                </FormRow>
                {settings.notebook.autoAttachLakehouse && (
                    <FormRow label="Lakehouse ID (GUID)">
                        <Input
                            value={settings.notebook.lakehouseId}
                            onChange={(_, d) => setNb('lakehouseId', d.value)}
                            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                        />
                    </FormRow>
                )}
            </SectionCard>

            {/* Ingestion Pipeline */}
            <SectionCard icon={<ArrowSync24Regular style={{ color: '#107c41' }} />} title="Ingestion Pipeline">
                <FormRow label="Enable scheduled ingestion">
                    <Switch
                        checked={settings.ingestionPipeline.enabled}
                        onChange={(_, d) => setPl('enabled', d.checked)}
                        label={settings.ingestionPipeline.enabled ? 'Enabled' : 'Disabled'}
                    />
                </FormRow>
                {settings.ingestionPipeline.enabled && (
                    <>
                        <FormRow label="Schedule interval">
                            <Select
                                value={settings.ingestionPipeline.scheduleInterval}
                                onChange={(_, d) => setPl('scheduleInterval', d.value as CatalogSettingsModel['ingestionPipeline']['scheduleInterval'])}
                            >
                                <option value="manual">Manual</option>
                                <option value="hourly">Hourly</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                            </Select>
                        </FormRow>
                        <FormRow label="Source folder (ADLS path)">
                            <Input
                                value={settings.ingestionPipeline.sourceFolder}
                                onChange={(_, d) => setPl('sourceFolder', d.value)}
                                placeholder="abfss://bronze@<storage>.dfs.core.windows.net/raw/"
                            />
                        </FormRow>
                        <FormRow label="Target Lakehouse ID">
                            <Input
                                value={settings.ingestionPipeline.targetLakehouse}
                                onChange={(_, d) => setPl('targetLakehouse', d.value)}
                                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                            />
                        </FormRow>
                    </>
                )}
            </SectionCard>

            {/* Save button */}
            <div style={{ display: 'flex', gap: 8 }}>
                <Button
                    appearance="primary"
                    icon={<Save24Regular />}
                    onClick={handleSave}
                >
                    Save Settings
                </Button>
                {saved && (
                    <Text style={{ alignSelf: 'center', color: '#107c41', fontSize: 13 }}>
                        ✓ Settings saved
                    </Text>
                )}
            </div>
        </div>
    );
}
