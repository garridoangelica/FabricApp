import { useState, useRef, useEffect } from 'react';
import {
  makeStyles,
  tokens,
  Input,
  Text,
  Caption1,
  Button,
  Badge,
} from '@fluentui/react-components';
import {
  SendRegular,
  BotRegular,
  PersonRegular,
  DocumentSearchRegular,
  SparkleRegular,
} from '@fluentui/react-icons';
import { backupFiles } from '../data/backupFiles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 100px)',
    maxWidth: '820px',
    margin: '0 auto',
  },
  messages: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingBottom: '16px',
    paddingTop: '8px',
  },
  messageRow: {
    display: 'flex',
    gap: '12px',
    maxWidth: '90%',
  },
  messageRowUser: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    padding: '10px 14px',
    borderRadius: '8px',
    lineHeight: '1.5',
  },
  bubbleBot: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderTopLeftRadius: '2px',
  },
  bubbleUser: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    borderTopRightRadius: '2px',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
    paddingTop: '12px',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  suggestions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '12px',
  },
  fileResult: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: tokens.colorNeutralBackground3,
    marginTop: '8px',
  },
});

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
  files?: typeof backupFiles;
}

const suggestions = [
  'Show me all financial documents',
  'Find security-related files',
  'What are the largest backups?',
  'List all archived files',
  'Find documents from December 2025',
];

function simulateSearch(query: string): { text: string; files: typeof backupFiles } {
  const q = query.toLowerCase();

  if (q.includes('financial') || q.includes('finance')) {
    const files = backupFiles.filter((f) => f.category === 'Financial' || f.tags.includes('finance'));
    return { text: `I found ${files.length} financial document(s) in your backup vault:`, files };
  }
  if (q.includes('security')) {
    const files = backupFiles.filter((f) => f.category === 'Security' || f.tags.includes('security'));
    return { text: `Here are ${files.length} security-related document(s):`, files };
  }
  if (q.includes('largest') || q.includes('biggest') || q.includes('size')) {
    const files = [...backupFiles].sort((a, b) => b.sizeBytes - a.sizeBytes).slice(0, 5);
    return { text: 'Here are the 5 largest backup files:', files };
  }
  if (q.includes('archived') || q.includes('archive')) {
    const files = backupFiles.filter((f) => f.status === 'Archived');
    return { text: `You have ${files.length} archived file(s):`, files };
  }
  if (q.includes('december') || q.includes('dec')) {
    const files = backupFiles.filter((f) => f.lastModified.startsWith('2025-12'));
    return { text: `Found ${files.length} file(s) from December 2025:`, files };
  }
  if (q.includes('engineering') || q.includes('dev') || q.includes('api')) {
    const files = backupFiles.filter((f) => f.category === 'Engineering');
    return { text: `Here are ${files.length} engineering document(s):`, files };
  }
  if (q.includes('hr') || q.includes('human resource') || q.includes('employee')) {
    const files = backupFiles.filter((f) => f.category === 'Human Resources');
    return { text: `Found ${files.length} HR document(s):`, files };
  }
  if (q.includes('marketing')) {
    const files = backupFiles.filter((f) => f.category === 'Marketing');
    return { text: `Here are ${files.length} marketing document(s):`, files };
  }
  if (q.includes('legal') || q.includes('compliance') || q.includes('privacy')) {
    const files = backupFiles.filter((f) => f.category === 'Legal');
    return { text: `Found ${files.length} legal document(s):`, files };
  }

  // Generic search
  const files = backupFiles.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.owner.toLowerCase().includes(q) ||
      f.tags.some((t) => t.includes(q)) ||
      f.category.toLowerCase().includes(q)
  );

  if (files.length > 0) {
    return { text: `I found ${files.length} matching file(s) for "${query}":`, files };
  }

  return {
    text: `I couldn't find any files matching "${query}". Try searching by category (e.g., "financial", "security"), status (e.g., "archived"), or file attributes (e.g., "largest files").`,
    files: [],
  };
}

export function ChatAgent() {
  const styles = useStyles();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: "👋 Hi! I'm your Backup Search Agent. I can help you find documents in your backup vault. Try asking me about specific categories, file types, or use the suggestions below!",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate thinking delay
    setTimeout(() => {
      const result = simulateSearch(text);
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: result.text,
        files: result.files.length > 0 ? result.files : undefined,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageRow} ${msg.role === 'user' ? styles.messageRowUser : ''}`}
          >
            <div
              className={styles.avatar}
              style={{
                backgroundColor: msg.role === 'bot' ? tokens.colorBrandBackground2 : tokens.colorNeutralBackground3,
                color: msg.role === 'bot' ? tokens.colorBrandForeground1 : tokens.colorNeutralForeground1,
              }}
            >
              {msg.role === 'bot' ? <BotRegular fontSize={18} /> : <PersonRegular fontSize={18} />}
            </div>
            <div>
              <div className={`${styles.bubble} ${msg.role === 'bot' ? styles.bubbleBot : styles.bubbleUser}`}>
                <Text size={300}>{msg.text}</Text>
              </div>
              {msg.files && msg.files.length > 0 && (
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {msg.files.map((file) => (
                    <div key={file.id} className={styles.fileResult}>
                      <DocumentSearchRegular fontSize={18} style={{ color: tokens.colorBrandForeground1 }} />
                      <div style={{ flex: 1 }}>
                        <Text size={200} weight="medium">{file.name}</Text>
                        <Caption1 style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>
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
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className={styles.suggestions}>
          <Caption1 style={{ width: '100%', marginBottom: 4, color: tokens.colorNeutralForeground3 }}>
            <SparkleRegular fontSize={14} /> Suggested queries:
          </Caption1>
          {suggestions.map((s) => (
            <Button
              key={s}
              appearance="outline"
              size="small"
              onClick={() => sendMessage(s)}
              style={{ borderRadius: 16 }}
            >
              {s}
            </Button>
          ))}
        </div>
      )}

      <div className={styles.inputRow}>
        <Input
          style={{ flex: 1 }}
          placeholder="Ask me about your backup data..."
          value={input}
          onChange={(_, d) => setInput(d.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          contentBefore={<DocumentSearchRegular />}
        />
        <Button
          appearance="primary"
          icon={<SendRegular />}
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
