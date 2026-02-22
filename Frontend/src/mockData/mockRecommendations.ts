import { WorkloadRecommendation } from '../models/CatalogModel';

export const MOCK_RECOMMENDATIONS: WorkloadRecommendation[] = [
    {
        id: 'rec-001',
        type: 'notebook',
        title: 'PDF Text Extraction Notebook',
        description:
            'Automatically extracts text from PDF files using Azure AI Document Intelligence and stores the output in a Delta table for downstream analytics.',
        applicableFileTypes: ['pdf'],
        requiredSettings: ['notebook.lakehouseId', 'ingestionPipeline.sourceFolder'],
        estimatedRuntime: '5–15 min per 100 files',
    },
    {
        id: 'rec-002',
        type: 'notebook',
        title: 'Audio Transcription Notebook',
        description:
            'Transcribes audio recordings using Azure AI Speech-to-Text. Produces structured transcripts stored as JSON in a Gold Lakehouse layer.',
        applicableFileTypes: ['audio'],
        requiredSettings: ['notebook.lakehouseId', 'notebook.defaultClusterSize'],
        estimatedRuntime: '~1× real-time per file',
    },
    {
        id: 'rec-003',
        type: 'notebook',
        title: 'JSON Schema Profiler',
        description:
            'Profiles all JSON files in the catalog to infer schema, detect anomalies, and generate a unified schema registry.',
        applicableFileTypes: ['json'],
        requiredSettings: ['notebook.lakehouseId'],
        estimatedRuntime: '2–5 min',
    },
    {
        id: 'rec-004',
        type: 'pipeline',
        title: 'Batch Ingestion Pipeline',
        description:
            'Scheduled pipeline that scans a source folder, detects new unstructured files, and ingests them into the Bronze Lakehouse layer with metadata tagging.',
        applicableFileTypes: ['pdf', 'audio', 'json', 'csv', 'image', 'video', 'text', 'other'],
        requiredSettings: [
            'ingestionPipeline.sourceFolder',
            'ingestionPipeline.targetLakehouse',
            'ingestionPipeline.scheduleInterval',
        ],
        estimatedRuntime: 'Runs on schedule',
    },
    {
        id: 'rec-005',
        type: 'pipeline',
        title: 'CSV to Delta Lake Converter',
        description:
            'Converts raw CSV files to Delta format with schema enforcement. Enables ACID transactions and time travel on tabular data.',
        applicableFileTypes: ['csv'],
        requiredSettings: ['ingestionPipeline.targetLakehouse'],
        estimatedRuntime: '1–3 min per GB',
    },
    {
        id: 'rec-006',
        type: 'workload',
        title: 'Semantic Search Index Builder',
        description:
            'Uses Azure AI Search to build a semantic index over all cataloged documents, enabling natural-language search across PDFs, JSON, and text files.',
        applicableFileTypes: ['pdf', 'json', 'text'],
        requiredSettings: ['dataSource.connectionString', 'notebook.lakehouseId'],
        estimatedRuntime: '10–30 min for initial index',
    },
    {
        id: 'rec-007',
        type: 'workload',
        title: 'Image Classification Workload',
        description:
            'Classifies images using a pre-trained Azure AI Vision model. Tags each image with detected objects and stores labels in the metadata catalog.',
        applicableFileTypes: ['image'],
        requiredSettings: ['notebook.lakehouseId'],
        estimatedRuntime: '~2 sec per image',
    },
];
