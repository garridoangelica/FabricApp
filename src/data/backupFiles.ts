export interface BackupFile {
  id: string;
  name: string;
  size: string;
  sizeBytes: number;
  lastModified: string;
  owner: string;
  status: 'Active' | 'Archived' | 'Pending';
  tags: string[];
  category: string;
}

export const backupFiles: BackupFile[] = [
  { id: '1', name: 'Q4-2025-Financial-Report.pdf', size: '2.4 MB', sizeBytes: 2516582, lastModified: '2025-12-15', owner: 'Sarah Chen', status: 'Active', tags: ['finance', 'quarterly'], category: 'Financial' },
  { id: '2', name: 'Employee-Handbook-v3.pdf', size: '5.1 MB', sizeBytes: 5347737, lastModified: '2025-11-20', owner: 'HR Department', status: 'Active', tags: ['hr', 'policy'], category: 'Human Resources' },
  { id: '3', name: 'Product-Roadmap-2026.pdf', size: '1.8 MB', sizeBytes: 1887436, lastModified: '2025-12-28', owner: 'Mike Johnson', status: 'Active', tags: ['product', 'planning'], category: 'Product' },
  { id: '4', name: 'Security-Audit-Nov2025.pdf', size: '3.2 MB', sizeBytes: 3355443, lastModified: '2025-11-30', owner: 'InfoSec Team', status: 'Archived', tags: ['security', 'audit'], category: 'Security' },
  { id: '5', name: 'Customer-Survey-Results.pdf', size: '890 KB', sizeBytes: 911360, lastModified: '2025-12-10', owner: 'Marketing', status: 'Active', tags: ['marketing', 'survey'], category: 'Marketing' },
  { id: '6', name: 'Architecture-Design-Doc.pdf', size: '4.7 MB', sizeBytes: 4928307, lastModified: '2025-10-05', owner: 'Dev Team', status: 'Active', tags: ['engineering', 'architecture'], category: 'Engineering' },
  { id: '7', name: 'Compliance-Report-2025.pdf', size: '6.3 MB', sizeBytes: 6606028, lastModified: '2025-12-20', owner: 'Legal', status: 'Active', tags: ['legal', 'compliance'], category: 'Legal' },
  { id: '8', name: 'Sales-Pipeline-Q4.pdf', size: '1.5 MB', sizeBytes: 1572864, lastModified: '2025-12-18', owner: 'Sales Ops', status: 'Active', tags: ['sales', 'pipeline'], category: 'Sales' },
  { id: '9', name: 'Onboarding-Checklist.pdf', size: '420 KB', sizeBytes: 430080, lastModified: '2025-09-14', owner: 'HR Department', status: 'Archived', tags: ['hr', 'onboarding'], category: 'Human Resources' },
  { id: '10', name: 'API-Documentation-v2.pdf', size: '3.8 MB', sizeBytes: 3984588, lastModified: '2025-12-01', owner: 'Dev Team', status: 'Active', tags: ['engineering', 'api'], category: 'Engineering' },
  { id: '11', name: 'Brand-Guidelines-2026.pdf', size: '8.2 MB', sizeBytes: 8598323, lastModified: '2025-12-22', owner: 'Marketing', status: 'Active', tags: ['marketing', 'brand'], category: 'Marketing' },
  { id: '12', name: 'Incident-Response-Plan.pdf', size: '2.1 MB', sizeBytes: 2202009, lastModified: '2025-11-10', owner: 'InfoSec Team', status: 'Active', tags: ['security', 'incident'], category: 'Security' },
  { id: '13', name: 'Board-Meeting-Minutes-Dec.pdf', size: '750 KB', sizeBytes: 768000, lastModified: '2025-12-26', owner: 'Executive Office', status: 'Pending', tags: ['executive', 'minutes'], category: 'Executive' },
  { id: '14', name: 'Training-Materials-React.pdf', size: '12.4 MB', sizeBytes: 13002342, lastModified: '2025-10-30', owner: 'Dev Team', status: 'Active', tags: ['engineering', 'training'], category: 'Engineering' },
  { id: '15', name: 'Vendor-Contract-Renewal.pdf', size: '1.1 MB', sizeBytes: 1153433, lastModified: '2025-12-05', owner: 'Procurement', status: 'Pending', tags: ['procurement', 'contract'], category: 'Procurement' },
  { id: '16', name: 'Data-Privacy-Policy.pdf', size: '980 KB', sizeBytes: 1003520, lastModified: '2025-11-25', owner: 'Legal', status: 'Active', tags: ['legal', 'privacy'], category: 'Legal' },
  { id: '17', name: 'Performance-Review-Template.pdf', size: '340 KB', sizeBytes: 348160, lastModified: '2025-08-15', owner: 'HR Department', status: 'Archived', tags: ['hr', 'performance'], category: 'Human Resources' },
  { id: '18', name: 'Infrastructure-Cost-Analysis.pdf', size: '2.9 MB', sizeBytes: 3040870, lastModified: '2025-12-12', owner: 'Cloud Ops', status: 'Active', tags: ['engineering', 'cost'], category: 'Engineering' },
  { id: '19', name: 'Marketing-Campaign-Results-Q3.pdf', size: '4.1 MB', sizeBytes: 4298137, lastModified: '2025-10-15', owner: 'Marketing', status: 'Archived', tags: ['marketing', 'campaign'], category: 'Marketing' },
  { id: '20', name: 'Disaster-Recovery-Plan.pdf', size: '5.5 MB', sizeBytes: 5767168, lastModified: '2025-12-30', owner: 'IT Operations', status: 'Active', tags: ['it', 'disaster-recovery'], category: 'IT Operations' },
];

export const categoryColors: Record<string, string> = {
  Financial: '#0078D4',
  'Human Resources': '#E74856',
  Product: '#00B7C3',
  Security: '#FF8C00',
  Marketing: '#8764B8',
  Engineering: '#00CC6A',
  Legal: '#6B6B6B',
  Sales: '#F7630C',
  Executive: '#C239B3',
  Procurement: '#009B77',
  'IT Operations': '#4A90D9',
};
