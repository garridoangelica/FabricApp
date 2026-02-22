import React, { useState, useMemo } from 'react';
import {
    Input,
    Badge,
    Text,
    Tooltip,
} from '@fluentui/react-components';
import {
    Search24Regular,
    DocumentPdf24Regular,
    MusicNote224Regular,
    Code24Regular,
    Table24Regular,
    Image24Regular,
    Video24Regular,
    Document24Regular,
    Archive24Regular,
} from '@fluentui/react-icons';
import { FileRecord, FileType } from '../../models/CatalogModel';
import { MOCK_FILES } from '../../mockData/mockFiles';

// ── Icon helpers ──────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}

function FileTypeIcon({ fileType }: { fileType: FileType }) {
    const iconStyle = { fontSize: 24 };
    switch (fileType) {
        case 'pdf': return <DocumentPdf24Regular style={{ ...iconStyle, color: '#c42b1c' }} />;
        case 'audio': return <MusicNote224Regular style={{ ...iconStyle, color: '#8764b8' }} />;
        case 'json': return <Code24Regular style={{ ...iconStyle, color: '#f7630c' }} />;
        case 'csv': return <Table24Regular style={{ ...iconStyle, color: '#107c41' }} />;
        case 'image': return <Image24Regular style={{ ...iconStyle, color: '#0078d4' }} />;
        case 'video': return <Video24Regular style={{ ...iconStyle, color: '#e81123' }} />;
        case 'text': return <Document24Regular style={{ ...iconStyle, color: '#666666' }} />;
        case 'other': return <Archive24Regular style={{ ...iconStyle, color: '#767676' }} />;
        default: return <Document24Regular style={iconStyle} />;
    }
}

// ── FileCard ──────────────────────────────────────────────────────────────────

interface FileCardProps {
    file: FileRecord;
    onSelect: (file: FileRecord) => void;
    selected: boolean;
}

function FileCard({ file, onSelect, selected }: FileCardProps) {
    return (
        <div
            className="file-card"
            onClick={() => onSelect(file)}
            style={{
                borderColor: selected ? '#1A78D4' : undefined,
                boxShadow: selected ? '0 0 0 2px #1A78D4' : undefined,
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(file)}
            aria-pressed={selected}
        >
            <div className="file-card__header">
                <FileTypeIcon fileType={file.fileType} />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Tooltip content={file.name} relationship="label">
                        <div className="file-card__title"
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>
                            {file.name}
                        </div>
                    </Tooltip>
                    <div className="file-card__meta">
                        {file.source} · {formatBytes(file.sizeBytes)} · {new Date(file.lastModified).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <p className="file-card__description">{file.description}</p>

            <Tooltip content={file.storagePath} relationship="label">
                <div className="file-card__path">{file.storagePath}</div>
            </Tooltip>

            <div className="file-card__tags">
                {file.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} appearance="tint" color="informative" size="small">
                        {tag}
                    </Badge>
                ))}
                {file.tags.length > 4 && (
                    <Badge appearance="tint" color="subtle" size="small">
                        +{file.tags.length - 4}
                    </Badge>
                )}
            </div>
        </div>
    );
}

// ── File Type Filter Pill ─────────────────────────────────────────────────────

const ALL_TYPES: (FileType | 'all')[] = ['all', 'pdf', 'audio', 'json', 'csv', 'image', 'video', 'text', 'other'];

function TypeFilterPill({
    type,
    active,
    onClick,
}: {
    type: FileType | 'all';
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '4px 12px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: active ? '#1A78D4' : '#d1d1d1',
                background: active ? '#1A78D4' : '#ffffff',
                color: active ? '#ffffff' : '#242424',
                fontSize: 12,
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                textTransform: 'capitalize',
            }}
        >
            {type}
        </button>
    );
}

// ── FileCatalog ───────────────────────────────────────────────────────────────

interface FileCatalogProps {
    onFileSelect?: (file: FileRecord) => void;
}

export function FileCatalog({ onFileSelect }: FileCatalogProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeType, setActiveType] = useState<FileType | 'all'>('all');
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

    const filteredFiles = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return MOCK_FILES.filter((f) => {
            const matchesType = activeType === 'all' || f.fileType === activeType;
            const matchesSearch =
                !q ||
                f.name.toLowerCase().includes(q) ||
                f.description.toLowerCase().includes(q) ||
                f.tags.some((t) => t.toLowerCase().includes(q)) ||
                f.source.toLowerCase().includes(q);
            return matchesType && matchesSearch;
        });
    }, [searchQuery, activeType]);

    function handleSelect(file: FileRecord) {
        setSelectedFileId(file.id);
        onFileSelect?.(file);
    }

    return (
        <div className="file-catalog">
            {/* Search bar */}
            <div className="file-catalog__search-bar">
                <Input
                    contentBefore={<Search24Regular />}
                    placeholder="Search by name, description, tags, or source…"
                    value={searchQuery}
                    onChange={(_, d) => setSearchQuery(d.value)}
                    style={{ flex: 1, minWidth: 260 }}
                />
                <Text size={200} style={{ color: '#616161' }}>
                    {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''}
                </Text>
            </div>

            {/* Type filters */}
            <div className="file-catalog__filters">
                {ALL_TYPES.map((t) => (
                    <TypeFilterPill
                        key={t}
                        type={t}
                        active={activeType === t}
                        onClick={() => setActiveType(t)}
                    />
                ))}
            </div>

            {/* File grid */}
            {filteredFiles.length > 0 ? (
                <div className="file-catalog__list">
                    {filteredFiles.map((file) => (
                        <FileCard
                            key={file.id}
                            file={file}
                            selected={selectedFileId === file.id}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <Search24Regular style={{ fontSize: 40, color: '#c8c8c8' }} />
                    <Text>No files match your search. Try adjusting filters or the search query.</Text>
                </div>
            )}
        </div>
    );
}
