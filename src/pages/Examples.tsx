import {
  makeStyles,
  tokens,
  Text,
  Caption1,
  Button,
  Badge,
  Divider,
} from '@fluentui/react-components';
import {
  DocumentSearchRegular,
  DataTrendingRegular,
  PeopleTeamRegular,
  ShieldCheckmarkRegular,
  ArrowRightRegular,
  CloudArrowUpRegular,
  TagMultipleRegular,
  CalendarRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)',
    transition: 'box-shadow 0.2s, transform 0.2s',
    cursor: 'pointer',
    ':hover': {
      boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.18)',
      transform: 'translateY(-1px)',
    },
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  stepList: {
    listStyle: 'none',
    padding: 0,
    margin: '12px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  stepNum: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    flexShrink: 0,
  },
  header: {
    marginBottom: '24px',
  },
});

interface ExampleCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: string[];
  tags: string[];
}

const examples: ExampleCard[] = [
  {
    title: 'Full-Text Search Across PDFs',
    description: 'Use the search agent to find specific content within your PDF backups — search by keywords, phrases, or metadata.',
    icon: <DocumentSearchRegular fontSize={24} />,
    color: '#0078D4',
    difficulty: 'Beginner',
    steps: [
      'Navigate to the Search Agent page',
      'Type your query (e.g., "Q4 financial report")',
      'Review matched documents with highlighted context',
      'Click to preview or download the file',
    ],
    tags: ['search', 'discovery'],
  },
  {
    title: 'Trend Analysis & Reporting',
    description: 'Analyze backup trends over time — see how your data grows, which categories dominate, and identify patterns.',
    icon: <DataTrendingRegular fontSize={24} />,
    color: '#00B7C3',
    difficulty: 'Beginner',
    steps: [
      'Visit the Dashboard for an overview',
      'Review the backup trend chart',
      'Check category distribution',
      'Export reports for stakeholders',
    ],
    tags: ['analytics', 'reporting'],
  },
  {
    title: 'Access Control & Compliance',
    description: 'Track who owns which documents, verify compliance status, and ensure proper access controls are in place.',
    icon: <ShieldCheckmarkRegular fontSize={24} />,
    color: '#00CC6A',
    difficulty: 'Intermediate',
    steps: [
      'Go to the Data Table view',
      'Filter by owner or department',
      'Review document status (Active/Archived/Pending)',
      'Generate compliance reports from filtered data',
    ],
    tags: ['compliance', 'governance'],
  },
  {
    title: 'Team Collaboration',
    description: 'Share backup data with your team, tag documents for easy retrieval, and collaborate on document reviews.',
    icon: <PeopleTeamRegular fontSize={24} />,
    color: '#8764B8',
    difficulty: 'Intermediate',
    steps: [
      'Use tags to organize shared documents',
      'Filter the data table by team or owner',
      'Use the chat agent to find team-specific files',
      'Share filtered views with team members',
    ],
    tags: ['collaboration', 'sharing'],
  },
  {
    title: 'Automated Backup Monitoring',
    description: 'Set up monitoring for your backup data — get notified when backups are overdue, storage limits are reached, or files change status.',
    icon: <CloudArrowUpRegular fontSize={24} />,
    color: '#F7630C',
    difficulty: 'Advanced',
    steps: [
      'Review current backup status on the Dashboard',
      'Identify files with "Pending" status',
      'Configure alert thresholds for storage usage',
      'Set up automated status checks via the API',
    ],
    tags: ['monitoring', 'automation'],
  },
  {
    title: 'Document Lifecycle Management',
    description: 'Manage the full lifecycle of your backup documents — from creation through archival, with retention policies and cleanup.',
    icon: <CalendarRegular fontSize={24} />,
    color: '#E74856',
    difficulty: 'Advanced',
    steps: [
      'View document age in the Data Table',
      'Identify candidates for archival',
      'Apply retention policies by category',
      'Archive or delete outdated documents',
    ],
    tags: ['lifecycle', 'retention'],
  },
];

export function Examples() {
  const styles = useStyles();

  return (
    <div>
      <div className={styles.header}>
        <Text size={600} weight="semibold" block>
          What can you do with your backup data?
        </Text>
        <Caption1 style={{ color: tokens.colorNeutralForeground3, marginTop: 4 }}>
          Explore these examples to get the most out of your PDF backup vault. Click any card to learn more.
        </Caption1>
      </div>

      <div className={styles.grid}>
        {examples.map((ex) => (
          <div key={ex.title} className={styles.card}>
            <div
              className={styles.iconBox}
              style={{ backgroundColor: `${ex.color}18`, color: ex.color }}
            >
              {ex.icon}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text weight="semibold" size={300}>{ex.title}</Text>
              <Badge
                appearance="tint"
                size="small"
                color={
                  ex.difficulty === 'Beginner' ? 'success' : ex.difficulty === 'Intermediate' ? 'warning' : 'danger'
                }
              >
                {ex.difficulty}
              </Badge>
            </div>
            <Caption1 style={{ color: tokens.colorNeutralForeground3, display: 'block', margin: '4px 0 8px 0' }}>
              {ex.description}
            </Caption1>

            <Divider style={{ margin: '8px 0' }} />

            <ol className={styles.stepList}>
              {ex.steps.map((step, i) => (
                <li key={i} className={styles.step}>
                  <div
                    className={styles.stepNum}
                    style={{ backgroundColor: `${ex.color}20`, color: ex.color }}
                  >
                    {i + 1}
                  </div>
                  <Caption1>{step}</Caption1>
                </li>
              ))}
            </ol>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 4, flex: 1 }}>
                {ex.tags.map((tag) => (
                  <Badge key={tag} appearance="outline" size="small" icon={<TagMultipleRegular />}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button appearance="subtle" icon={<ArrowRightRegular />} size="small">
                Try it
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
