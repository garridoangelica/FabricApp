import { useState, useMemo } from 'react';
import {
  makeStyles,
  tokens,
  Input,
  Badge,
  Text,
  Caption1,
  Button,
  Select,
  Tooltip,
} from '@fluentui/react-components';
import {
  SearchRegular,
  DocumentRegular,
  ArrowSortRegular,
  FilterRegular,
  ArrowDownloadRegular,
  EyeRegular,
} from '@fluentui/react-icons';
import { backupFiles, categoryColors, type BackupFile } from '../data/backupFiles';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  searchBox: {
    minWidth: '280px',
    flex: 1,
    maxWidth: '420px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    borderBottom: `2px solid ${tokens.colorNeutralStroke1}`,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: tokens.colorNeutralForeground3,
    ':hover': {
      color: tokens.colorNeutralForeground1,
    },
  },
  td: {
    padding: '12px 16px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    verticalAlign: 'middle',
  },
  tr: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  fileCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  fileIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  tagRow: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap',
  },
  actions: {
    display: 'flex',
    gap: '4px',
  },
  resultInfo: {
    color: tokens.colorNeutralForeground3,
    marginLeft: 'auto',
  },
});

type SortKey = keyof Pick<BackupFile, 'name' | 'sizeBytes' | 'lastModified' | 'owner' | 'status' | 'category'>;

export function DataTable() {
  const styles = useStyles();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('lastModified');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const categories = useMemo(() => [...new Set(backupFiles.map((f) => f.category))].sort(), []);

  const filtered = useMemo(() => {
    let files = backupFiles;
    if (search) {
      const q = search.toLowerCase();
      files = files.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.owner.toLowerCase().includes(q) ||
          f.tags.some((t) => t.includes(q)) ||
          f.category.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') files = files.filter((f) => f.status === statusFilter);
    if (categoryFilter !== 'all') files = files.filter((f) => f.category === categoryFilter);

    files = [...files].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'sizeBytes') cmp = a.sizeBytes - b.sizeBytes;
      else {
        const aVal = String(a[sortKey]);
        const bVal = String(b[sortKey]);
        cmp = aVal.localeCompare(bVal);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return files;
  }, [search, statusFilter, categoryFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortIndicator = (key: SortKey) => (sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '');

  return (
    <div>
      <div className={styles.toolbar}>
        <Input
          className={styles.searchBox}
          contentBefore={<SearchRegular />}
          placeholder="Search files, owners, tags..."
          value={search}
          onChange={(_, d) => setSearch(d.value)}
        />
        <Select value={statusFilter} onChange={(_, d) => setStatusFilter(d.value)} style={{ minWidth: 120 }}>
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Archived">Archived</option>
          <option value="Pending">Pending</option>
        </Select>
        <Select value={categoryFilter} onChange={(_, d) => setCategoryFilter(d.value)} style={{ minWidth: 140 }}>
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        <Badge appearance="outline" icon={<FilterRegular />}>
          {filtered.length} of {backupFiles.length}
        </Badge>
      </div>

      <div style={{ overflow: 'auto', borderRadius: '8px', backgroundColor: tokens.colorNeutralBackground1, boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th} onClick={() => toggleSort('name')}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  File Name{sortIndicator('name')} <ArrowSortRegular fontSize={12} />
                </span>
              </th>
              <th className={styles.th} onClick={() => toggleSort('category')}>Category{sortIndicator('category')}</th>
              <th className={styles.th} onClick={() => toggleSort('sizeBytes')}>Size{sortIndicator('sizeBytes')}</th>
              <th className={styles.th} onClick={() => toggleSort('lastModified')}>Modified{sortIndicator('lastModified')}</th>
              <th className={styles.th} onClick={() => toggleSort('owner')}>Owner{sortIndicator('owner')}</th>
              <th className={styles.th} onClick={() => toggleSort('status')}>Status{sortIndicator('status')}</th>
              <th className={styles.th}>Tags</th>
              <th className={styles.th} style={{ cursor: 'default' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((file) => (
              <tr key={file.id} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.fileCell}>
                    <div
                      className={styles.fileIcon}
                      style={{
                        backgroundColor: `${categoryColors[file.category] || '#0078D4'}18`,
                        color: categoryColors[file.category] || '#0078D4',
                      }}
                    >
                      <DocumentRegular fontSize={18} />
                    </div>
                    <div>
                      <Text weight="medium" size={300}>{file.name}</Text>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>
                  <Badge
                    appearance="tint"
                    style={{ backgroundColor: `${categoryColors[file.category] || '#0078D4'}18`, color: categoryColors[file.category] || '#0078D4' }}
                  >
                    {file.category}
                  </Badge>
                </td>
                <td className={styles.td}>
                  <Caption1>{file.size}</Caption1>
                </td>
                <td className={styles.td}>
                  <Caption1>{file.lastModified}</Caption1>
                </td>
                <td className={styles.td}>
                  <Caption1>{file.owner}</Caption1>
                </td>
                <td className={styles.td}>
                  <Badge
                    appearance="filled"
                    color={file.status === 'Active' ? 'success' : file.status === 'Pending' ? 'warning' : 'informative'}
                  >
                    {file.status}
                  </Badge>
                </td>
                <td className={styles.td}>
                  <div className={styles.tagRow}>
                    {file.tags.map((tag) => (
                      <Badge key={tag} appearance="outline" size="small">{tag}</Badge>
                    ))}
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <Tooltip content="Preview" relationship="label">
                      <Button appearance="subtle" icon={<EyeRegular fontSize={16} />} size="small" />
                    </Tooltip>
                    <Tooltip content="Download" relationship="label">
                      <Button appearance="subtle" icon={<ArrowDownloadRegular fontSize={16} />} size="small" />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className={styles.td} colSpan={8} style={{ textAlign: 'center', padding: '40px' }}>
                  <Text style={{ color: tokens.colorNeutralForeground3 }}>No files match your search criteria</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
