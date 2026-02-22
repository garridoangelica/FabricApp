import React, { useState, useRef, useEffect } from 'react';
import {
    Button,
    Textarea,
    Text,
    Badge,
    Spinner,
} from '@fluentui/react-components';
import {
    Send24Regular,
    Bot24Regular,
    Person24Regular,
    DocumentPdf24Regular,
    MusicNote224Regular,
    Code24Regular,
    Table24Regular,
    Document24Regular,
} from '@fluentui/react-icons';
import { ChatMessage, FileRecord, FileType } from '../../models/CatalogModel';
import { MOCK_FILES } from '../../mockData/mockFiles';

// ── Simple mock agent logic ───────────────────────────────────────────────────

function fileTypeIcon(ft: FileType) {
    switch (ft) {
        case 'pdf': return <DocumentPdf24Regular style={{ color: '#c42b1c' }} />;
        case 'audio': return <MusicNote224Regular style={{ color: '#8764b8' }} />;
        case 'json': return <Code24Regular style={{ color: '#f7630c' }} />;
        case 'csv': return <Table24Regular style={{ color: '#107c41' }} />;
        default: return <Document24Regular />;
    }
}

function agentRespond(query: string): { text: string; relatedFiles: FileRecord[] } {
    const q = query.toLowerCase();

    // Detect file type mentions
    const typeKeywords: Record<string, FileType> = {
        pdf: 'pdf',
        audio: 'audio',
        mp3: 'audio',
        json: 'json',
        csv: 'csv',
        image: 'image',
        video: 'video',
        mp4: 'video',
        text: 'text',
    };

    let matchedType: FileType | null = null;
    for (const [kw, ft] of Object.entries(typeKeywords)) {
        if (q.includes(kw)) { matchedType = ft; break; }
    }

    // Keyword search across files
    const matches = MOCK_FILES.filter((f) => {
        const inType = !matchedType || f.fileType === matchedType;
        const inText =
            f.name.toLowerCase().includes(q) ||
            f.description.toLowerCase().includes(q) ||
            f.tags.some((t) => t.toLowerCase().includes(q)) ||
            f.source.toLowerCase().includes(q);
        return inType || inText;
    }).slice(0, 5);

    if (matches.length === 0) {
        return {
            text: "I couldn't find any files matching your query. Try searching by file type (e.g., \"PDF files\"), by topic (e.g., \"finance\"), or by tag (e.g., \"2025\").",
            relatedFiles: [],
        };
    }

    const snippet = matches.slice(0, 3).map((f) => `• **${f.name}** – ${f.description.substring(0, 80)}…`).join('\n');
    return {
        text: `I found **${matches.length}** file${matches.length > 1 ? 's' : ''} that match your query:\n\n${snippet}\n\nYou can find the full storage paths in the cards below. Click any card in the File Catalog tab to copy the path.`,
        relatedFiles: matches,
    };
}

// ── Initial greeting ──────────────────────────────────────────────────────────

const INITIAL_MESSAGES: ChatMessage[] = [
    {
        id: 'init-1',
        role: 'agent',
        text: "👋 Hi! I'm the **CatalogIQ Agent**. I can help you find files in your catalog.\n\nTry asking me things like:\n• \"Show me all PDF files\"\n• \"Find finance reports from 2024\"\n• \"Where are the IoT sensor files?\"\n• \"Show audio recordings\"",
        timestamp: new Date().toISOString(),
        relatedFiles: [],
    },
];

// ── ChatMessageBubble ─────────────────────────────────────────────────────────

function ChatMessageBubble({ msg }: { msg: ChatMessage }) {
    const isUser = msg.role === 'user';
    return (
        <div className={`chat-message chat-message--${msg.role}`}>
            {/* Avatar */}
            <div
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isUser ? '#1A78D4' : '#f0f4ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                {isUser
                    ? <Person24Regular style={{ color: '#fff', fontSize: 18 }} />
                    : <Bot24Regular style={{ color: '#1A78D4', fontSize: 18 }} />
                }
            </div>

            {/* Bubble */}
            <div>
                <div className="chat-message__bubble">
                    {/* Render newlines and bold */}
                    {msg.text.split('\n').map((line, i) => (
                        <p key={i} style={{ marginBottom: 4 }}>
                            {line.split(/\*\*(.+?)\*\*/g).map((part, j) =>
                                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                            )}
                        </p>
                    ))}
                </div>

                {/* Related file mini-cards */}
                {msg.relatedFiles && msg.relatedFiles.length > 0 && (
                    <div className="chat-message__related-files" style={{ marginTop: 8 }}>
                        {msg.relatedFiles.map((f) => (
                            <div
                                key={f.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '6px 10px',
                                    background: '#fff',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 6,
                                    fontSize: 12,
                                    maxWidth: 480,
                                }}
                            >
                                {fileTypeIcon(f.fileType)}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {f.name}
                                    </div>
                                    <div style={{ color: '#8a8a8a', fontFamily: 'monospace', fontSize: 11 }}>
                                        {f.storagePath}
                                    </div>
                                </div>
                                <Badge appearance="tint" color="informative" size="small">
                                    {f.fileType.toUpperCase()}
                                </Badge>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
}

// ── AgentChat ─────────────────────────────────────────────────────────────────

export function AgentChat() {
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    function sendMessage() {
        const trimmed = input.trim();
        if (!trimmed || isThinking) return;

        const userMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            text: trimmed,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        // Simulate network latency
        setTimeout(() => {
            const { text, relatedFiles } = agentRespond(trimmed);
            const agentMsg: ChatMessage = {
                id: crypto.randomUUID(),
                role: 'agent',
                text,
                timestamp: new Date().toISOString(),
                relatedFiles,
            };
            setMessages((prev) => [...prev, agentMsg]);
            setIsThinking(false);
        }, 800 + Math.random() * 600);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="agent-chat">
            {/* Messages */}
            <div className="agent-chat__messages">
                {messages.map((msg) => (
                    <ChatMessageBubble key={msg.id} msg={msg} />
                ))}
                {isThinking && (
                    <div className="chat-message chat-message--agent">
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Bot24Regular style={{ color: '#1A78D4', fontSize: 18 }} />
                        </div>
                        <div className="chat-message__bubble">
                            <Spinner size="tiny" label="Thinking…" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="agent-chat__input-area">
                <Textarea
                    placeholder="Ask about your files… (Enter to send, Shift+Enter for newline)"
                    value={input}
                    onChange={(_, d) => setInput(d.value)}
                    onKeyDown={handleKeyDown}
                    resize="none"
                    rows={2}
                    style={{ flex: 1 }}
                />
                <Button
                    icon={<Send24Regular />}
                    appearance="primary"
                    onClick={sendMessage}
                    disabled={!input.trim() || isThinking}
                    aria-label="Send message"
                />
            </div>
        </div>
    );
}
