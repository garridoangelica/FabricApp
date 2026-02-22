import React, { useState } from 'react';
import {
    Tab,
    TabList,
    Text,
    Divider,
} from '@fluentui/react-components';
import {
    FolderOpen24Regular,
    Bot24Regular,
    Sparkle24Regular,
    Settings24Regular,
} from '@fluentui/react-icons';
import { WorkloadClientAPI } from '@ms-fabric/workload-client';
import { FileCatalog } from '../FileCatalog/FileCatalog';
import { AgentChat } from '../AgentChat/AgentChat';
import { WorkloadRecommendations } from '../WorkloadRecommendations/WorkloadRecommendations';
import { CatalogSettingsPage } from '../CatalogSettings/CatalogSettings';
import { FileRecord } from '../../models/CatalogModel';
import '../../styles.scss';

type TabValue = 'catalog' | 'agent' | 'recommendations' | 'settings';

interface CatalogEditorProps {
    workloadClient: WorkloadClientAPI;
}

export function CatalogEditor({ workloadClient }: CatalogEditorProps) {
    const [activeTab, setActiveTab] = useState<TabValue>('catalog');
    const [selectedFile, setSelectedFile] = useState<FileRecord | null>(null);

    function handleFileSelect(file: FileRecord) {
        setSelectedFile(file);
    }

    return (
        <div className="catalog-layout">
            {/* Header */}
            <div
                style={{
                    padding: '12px 24px 0',
                    background: '#ffffff',
                    borderBottom: '1px solid #e8e8e8',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: 'linear-gradient(135deg, #1A78D4, #5BA6EB)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FolderOpen24Regular style={{ color: '#fff', fontSize: 18 }} />
                    </div>
                    <Text as="h1" size={500} weight="semibold">
                        CatalogIQ
                    </Text>
                    <Text size={200} style={{ color: '#8a8a8a', alignSelf: 'flex-end', marginBottom: 2 }}>
                        Unstructured File Metadata Catalog
                    </Text>
                </div>

                <TabList
                    selectedValue={activeTab}
                    onTabSelect={(_, d) => setActiveTab(d.value as TabValue)}
                >
                    <Tab value="catalog" icon={<FolderOpen24Regular />}>
                        File Catalog
                    </Tab>
                    <Tab value="agent" icon={<Bot24Regular />}>
                        AI Agent
                    </Tab>
                    <Tab value="recommendations" icon={<Sparkle24Regular />}>
                        Recommendations
                    </Tab>
                    <Tab value="settings" icon={<Settings24Regular />}>
                        Settings
                    </Tab>
                </TabList>
            </div>

            {/* Content */}
            <div className="catalog-content">
                {activeTab === 'catalog' && (
                    <FileCatalog onFileSelect={handleFileSelect} />
                )}
                {activeTab === 'agent' && (
                    <AgentChat />
                )}
                {activeTab === 'recommendations' && (
                    <WorkloadRecommendations />
                )}
                {activeTab === 'settings' && (
                    <CatalogSettingsPage />
                )}
            </div>
        </div>
    );
}
