import {
  makeStyles,
  tokens,
  Text,
  Badge,
  Caption1,
  Divider,
} from '@fluentui/react-components';
import {
  DocumentRegular,
  ArrowUpRegular,
  DatabaseRegular,
  ClockRegular,
  CheckmarkCircleRegular,
  ArchiveRegular,
  ArrowTrendingRegular,
} from '@fluentui/react-icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { backupFiles, categoryColors } from '../data/backupFiles';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    marginBottom: '20px',
  },
  statCard: {
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    lineHeight: '1',
  },
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '12px',
    marginBottom: '20px',
  },
  chartCard: {
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)',
  },
  recentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  recentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 10px',
    borderRadius: '6px',
    backgroundColor: tokens.colorNeutralBackground3,
  },
  fileIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
  },
});

const totalFiles = backupFiles.length;
const totalSizeMB = Math.round(backupFiles.reduce((sum, f) => sum + f.sizeBytes, 0) / 1048576);
const activeFiles = backupFiles.filter((f) => f.status === 'Active').length;
const recentFiles = [...backupFiles].sort((a, b) => b.lastModified.localeCompare(a.lastModified)).slice(0, 5);

// Chart data
const categoryData = Object.entries(
  backupFiles.reduce<Record<string, number>>((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const statusData = Object.entries(
  backupFiles.reduce<Record<string, number>>((acc, f) => {
    acc[f.status] = (acc[f.status] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

const statusColors: Record<string, string> = {
  Active: '#00CC6A',
  Archived: '#6B6B6B',
  Pending: '#F7630C',
};

const monthlyData = [
  { month: 'Jul', files: 3 },
  { month: 'Aug', files: 5 },
  { month: 'Sep', files: 4 },
  { month: 'Oct', files: 7 },
  { month: 'Nov', files: 8 },
  { month: 'Dec', files: 12 },
];

export function Dashboard() {
  const styles = useStyles();

  const stats = [
    { label: 'Total Files', value: totalFiles, icon: <DocumentRegular fontSize={18} />, color: '#117865' },
    { label: 'Storage Used', value: `${totalSizeMB} MB`, icon: <DatabaseRegular fontSize={18} />, color: '#0C695A' },
    { label: 'Active Backups', value: activeFiles, icon: <CheckmarkCircleRegular fontSize={18} />, color: '#2AAC94' },
    { label: 'Archived', value: backupFiles.filter((f) => f.status === 'Archived').length, icon: <ArchiveRegular fontSize={18} />, color: '#6B6B6B' },
  ];

  return (
    <div>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
              <Caption1>{stat.label}</Caption1>
            </div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text weight="semibold" size={300}>Files by Category</Text>
            <Badge appearance="outline" size="small" icon={<ArrowTrendingRegular />}>Distribution</Badge>
          </div>
          <Divider />
          <div style={{ width: '100%', height: 240, marginTop: 8 }}>
            <ResponsiveContainer>
              <BarChart data={categoryData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={categoryColors[entry.name] || '#117865'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <Text weight="semibold" size={300}>Status Overview</Text>
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ width: '100%', height: 240, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={statusColors[entry.name] || '#117865'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text weight="semibold" size={300}>Backup Trend</Text>
            <Badge appearance="outline" size="small" icon={<ArrowUpRegular />}>+50% this month</Badge>
          </div>
          <Divider />
          <div style={{ width: '100%', height: 240, marginTop: 8 }}>
            <ResponsiveContainer>
              <AreaChart data={monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                <Tooltip />
                <defs>
                  <linearGradient id="colorFiles" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#117865" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#117865" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="files" stroke="#117865" fill="url(#colorFiles)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.chartCard}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text weight="semibold" size={300}>Recent Backups</Text>
          <Badge appearance="outline" size="small" icon={<ClockRegular />}>Last 5</Badge>
        </div>
        <Divider />
        <div className={styles.recentList} style={{ marginTop: 8 }}>
          {recentFiles.map((file) => (
            <div key={file.id} className={styles.recentItem}>
              <div className={styles.fileIcon}>
                <DocumentRegular fontSize={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text weight="medium" size={200} truncate wrap={false} block>{file.name}</Text>
                <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
                  {file.owner} · {file.size} · {file.lastModified}
                </Caption1>
              </div>
              <Badge
                appearance="filled"
                size="small"
                color={file.status === 'Active' ? 'success' : file.status === 'Pending' ? 'warning' : 'informative'}
              >
                {file.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
