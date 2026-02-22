import React, { useMemo } from 'react';
import {
    Badge,
    Button,
    Text,
    Tooltip,
} from '@fluentui/react-components';
import {
    Notebook24Regular,
    ArrowSync24Regular,
    AppGeneric24Regular,
    Clock24Regular,
    Settings24Regular,
} from '@fluentui/react-icons';
import { WorkloadRecommendation, RecommendationType, FileType } from '../../models/CatalogModel';
import { MOCK_RECOMMENDATIONS } from '../../mockData/mockRecommendations';
import { MOCK_FILES } from '../../mockData/mockFiles';

// ── Helpers ───────────────────────────────────────────────────────────────────

function typeIcon(type: RecommendationType) {
    switch (type) {
        case 'notebook': return <Notebook24Regular />;
        case 'pipeline': return <ArrowSync24Regular />;
        case 'workload': return <AppGeneric24Regular />;
    }
}

const TYPE_COLORS: Record<RecommendationType, { bg: string; text: string }> = {
    notebook: { bg: '#fff4e5', text: '#d67b00' },
    pipeline: { bg: '#e8f5e9', text: '#107c41' },
    workload: { bg: '#e8f0fe', text: '#1A78D4' },
};

// ── RecommendationCard ────────────────────────────────────────────────────────

function RecommendationCard({ rec }: { rec: WorkloadRecommendation }) {
    const colors = TYPE_COLORS[rec.type];

    return (
        <div className="recommendation-card">
            {/* Type badge */}
            <div
                className="recommendation-card__type-badge"
                style={{ background: colors.bg, color: colors.text }}
            >
                {typeIcon(rec.type)}
                {rec.type}
            </div>

            {/* Title */}
            <div className="recommendation-card__title">{rec.title}</div>

            {/* Description */}
            <p className="recommendation-card__description">{rec.description}</p>

            {/* Applicable file types */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {rec.applicableFileTypes.map((ft) => (
                    <Badge key={ft} appearance="tint" color="subtle" size="small">
                        {ft.toUpperCase()}
                    </Badge>
                ))}
            </div>

            {/* Runtime */}
            {rec.estimatedRuntime && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#8a8a8a', fontSize: 12 }}>
                    <Clock24Regular style={{ fontSize: 14 }} />
                    {rec.estimatedRuntime}
                </div>
            )}

            {/* Required settings */}
            {rec.requiredSettings.length > 0 && (
                <Tooltip
                    content={`Configure: ${rec.requiredSettings.join(', ')}`}
                    relationship="description"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#616161', fontSize: 12 }}>
                        <Settings24Regular style={{ fontSize: 14 }} />
                        {rec.requiredSettings.length} setting{rec.requiredSettings.length > 1 ? 's' : ''} required
                    </div>
                </Tooltip>
            )}

            {/* CTA */}
            <div className="recommendation-card__footer">
                <Button
                    appearance="primary"
                    size="small"
                    icon={typeIcon(rec.type)}
                    onClick={() => alert(`"${rec.title}" – wiring to backend coming soon!`)}
                >
                    Launch
                </Button>
                <Button appearance="subtle" size="small">
                    Configure
                </Button>
            </div>
        </div>
    );
}

// ── WorkloadRecommendations ───────────────────────────────────────────────────

export function WorkloadRecommendations() {
    // Detect which file types exist in the catalog
    const presentTypes = useMemo<Set<FileType>>(
        () => new Set(MOCK_FILES.map((f) => f.fileType)),
        []
    );

    // Filter recommendations that apply to at least one present file type
    const relevantRecs = useMemo(
        () =>
            MOCK_RECOMMENDATIONS.filter((r) =>
                r.applicableFileTypes.some((ft) => presentTypes.has(ft))
            ),
        [presentTypes]
    );

    const notebooks = relevantRecs.filter((r) => r.type === 'notebook');
    const pipelines = relevantRecs.filter((r) => r.type === 'pipeline');
    const workloads = relevantRecs.filter((r) => r.type === 'workload');

    function Section({ title, items }: { title: string; items: WorkloadRecommendation[] }) {
        if (items.length === 0) return null;
        return (
            <div>
                <Text className="recommendations__section-title" as="h3" weight="semibold" size={400}>
                    {title}
                </Text>
                <div className="recommendations__grid">
                    {items.map((rec) => <RecommendationCard key={rec.id} rec={rec} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="recommendations">
            <div>
                <Text as="p" size={300} style={{ color: '#616161', marginBottom: 8 }}>
                    Based on the <strong>{MOCK_FILES.length} files</strong> in your catalog, here are recommended notebooks, pipelines, and workloads to process your data.
                </Text>
            </div>
            <Section title="📓 Notebooks" items={notebooks} />
            <Section title="⚡ Ingestion Pipelines" items={pipelines} />
            <Section title="🔧 Workloads" items={workloads} />
        </div>
    );
}
