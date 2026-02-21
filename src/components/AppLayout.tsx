import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Text,
  Tab,
  TabList,
  type SelectTabData,
} from '@fluentui/react-components';
import {
  HomeRegular,
  TableRegular,
  ChatRegular,
  LightbulbRegular,
  ShieldCheckmarkRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f3f2f1',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: '48px',
    paddingLeft: '16px',
    paddingRight: '16px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    gap: '12px',
    flexShrink: 0,
  },
  logoMark: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    flexShrink: 0,
  },
  toolbar: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    paddingRight: '16px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: '0',
    boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '8px',
  },
  main: {
    borderRadius: '8px',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)',
    padding: '16px',
    minHeight: 'calc(100vh - 110px)',
  },
});

const tabs = [
  { path: '/', label: 'Dashboard', icon: <HomeRegular /> },
  { path: '/data', label: 'Backup Data', icon: <TableRegular /> },
  { path: '/chat', label: 'Search Agent', icon: <ChatRegular /> },
  { path: '/examples', label: 'Examples', icon: <LightbulbRegular /> },
];

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const styles = useStyles();

  const onTabSelect = (_: unknown, data: SelectTabData) => {
    navigate(data.value as string);
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logoMark}>
          <ShieldCheckmarkRegular fontSize={16} />
        </div>
        <Text size={400} weight="semibold">
          Backup Vault Explorer
        </Text>
      </header>

      <div className={styles.toolbar}>
        <TabList
          selectedValue={location.pathname}
          onTabSelect={onTabSelect}
          size="small"
        >
          {tabs.map((tab) => (
            <Tab key={tab.path} value={tab.path} icon={tab.icon}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}
