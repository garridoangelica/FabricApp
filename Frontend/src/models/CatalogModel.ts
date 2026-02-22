// Core domain models for CatalogIQ

export type FileType = 'pdf' | 'audio' | 'json' | 'csv' | 'image' | 'video' | 'text' | 'other';

export interface FileRecord {
    id: string;
    name: string;
    fileType: FileType;
    /** Full path in the storage layer (e.g. abfss://…/raw/documents/report.pdf) */
    storagePath: string;
    /** Human-readable description of the file's contents */
    description: string;
    tags: string[];
    sizeBytes: number;
    lastModified: string; // ISO 8601
    source: string; // e.g. "Lakehouse/bronze" | "CosmosDB" | "SQL"
    owner?: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'agent';
    text: string;
    timestamp: string; // ISO 8601
    relatedFiles?: FileRecord[];
}

export type RecommendationType = 'notebook' | 'pipeline' | 'workload';

export interface WorkloadRecommendation {
    id: string;
    type: RecommendationType;
    title: string;
    description: string;
    applicableFileTypes: FileType[];
    /** Settings that need to be configured before launch */
    requiredSettings: string[];
    estimatedRuntime?: string;
}

export interface CatalogSettings {
    dataSource: {
        type: 'cosmosdb' | 'sqldb' | 'delta';
        connectionString: string;
        databaseName: string;
        containerOrTable: string;
    };
    notebook: {
        defaultClusterSize: 'small' | 'medium' | 'large';
        autoAttachLakehouse: boolean;
        lakehouseId: string;
    };
    ingestionPipeline: {
        enabled: boolean;
        scheduleInterval: 'manual' | 'hourly' | 'daily' | 'weekly';
        sourceFolder: string;
        targetLakehouse: string;
    };
}
