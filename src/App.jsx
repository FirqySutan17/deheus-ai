import { useMemo, useState } from 'react'
import { Activity, AlertCircle, ArrowUpRight, BarChart3, BookOpen, Copy, HelpCircle, Menu, MessageCircle, MessageSquare, MoreHorizontal, Plus, Search, Send, Settings, ShieldCheck, Sparkles, ThumbsDown, ThumbsUp, TrendingUp, X } from './components/Icons.jsx'
import { demoReply, initialHistory, suggestions } from './data/demo'

const IconMap = { TrendingUp, AlertCircle, Target: Activity, MapPin: ArrowUpRight }

function BrandMark() {
  return <div className="brand"><div className="brand-symbol"><span /><span /><span /></div><div className="brand-copy"><strong>DE HEUS</strong><small>INDONESIA</small></div></div>
}

function Sidebar({ active, setActive, history, onNewChat, mobileOpen, setMobileOpen }) {
  return <>
    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><BrandMark /><button className="icon-button mobile-close" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <button className="new-chat" onClick={() => { onNewChat(); setMobileOpen(false) }}><Plus size={17}/> New chat</button>
      <div className="nav-section-label">WORKSPACE</div>
      <nav className="side-nav">
        <button className={active === 'chat' ? 'nav-item active' : 'nav-item'} onClick={() => { setActive('chat'); setMobileOpen(false) }}><MessageSquare size={18}/> AI Assistant</button>
        <button className={active === 'insights' ? 'nav-item active' : 'nav-item'} onClick={() => { setActive('insights'); setMobileOpen(false) }}><BarChart3 size={18}/> Business insights <span className="nav-soon">Soon</span></button>
      </nav>
      <div className="history-heading"><span>RECENT CHATS</span><button className="icon-button tiny"><Search size={15}/></button></div>
      <div className="history-list">{history.map(item => <button className="history-item" key={item.id} onClick={() => setActive('chat')}><MessageCircle size={15}/><span>{item.title}</span><MoreHorizontal size={15} className="history-more"/></button>)}</div>
      <div className="sidebar-bottom">
        <button className="nav-item"><HelpCircle size={18}/> Help & support</button>
        <button className="nav-item"><Settings size={18}/> Settings</button>
        <div className="profile-card"><div className="avatar">SU</div><div className="profile-meta"><strong>Sutan</strong><span>Management</span></div><button className="icon-button"><MoreHorizontal size={18}/></button></div>
      </div>
    </aside>
  </>
}

function Header({ onMenu }) {
  return <header className="topbar"><div className="topbar-left"><button className="icon-button mobile-menu" onClick={onMenu}><Menu size={20}/></button><div className="breadcrumb">De Heus ONE <span>/</span> <strong>Sales Agent</strong></div></div><div className="topbar-right"><div className="environment"><span className="status-dot"/> POC Environment</div><button className="icon-button notification" aria-label="Notifications"><span className="notification-dot"/> <Activity size={19}/></button><div className="top-avatar">SU</div></div></header>
}

function Welcome({ onPrompt }) {
  return <div className="welcome-wrap"><div className="welcome-icon"><Sparkles size={25}/></div><div className="eyebrow">DE HEUS SALES INTELLIGENCE</div><h1>Good morning, Sutan</h1><p className="welcome-subtitle">Your business data, one conversation away.<br/>What would you like to explore today?</p><div className="suggestion-grid">{suggestions.map((item, index) => { const Icon = IconMap[item.icon] || Sparkles; return <button className="suggestion-card" key={item.title} onClick={() => onPrompt(item.prompt)}><span className={`suggestion-icon suggestion-${index}`}><Icon size={18}/></span><span className="suggestion-text"><strong>{item.title}</strong><small>{item.prompt}</small></span><ArrowUpRight size={16} className="suggestion-arrow"/></button> })}</div><div className="welcome-foot"><ShieldCheck size={15}/> Answers are based on approved De Heus business data and your access permissions.</div></div>
}

function AssistantResponse() {
  return <div className="assistant-message"><div className="assistant-avatar"><Sparkles size={16}/></div><div className="assistant-content"><div className="message-author">Sales Agent <span>Just now</span></div><p>{demoReply.intro}</p><div className="metric-grid">{demoReply.metrics.map(metric => <div className="metric-card" key={metric.label}><span>{metric.label}</span><strong className={metric.tone}>{metric.value}</strong></div>)}</div><div className="table-wrap"><table><thead><tr><th>Customer</th><th>Business unit</th><th>Overdue amount</th><th>Aging</th><th>Status</th></tr></thead><tbody>{demoReply.rows.map(row => <tr key={row.customer}><td className="customer-name">{row.customer}</td><td>{row.business}</td><td>{row.overdue}</td><td>{row.aging}</td><td><span className={`risk-badge ${row.status.toLowerCase()}`}>{row.status}</span></td></tr>)}</tbody></table></div><div className="source-note"><BookOpen size={14}/><span>Source reference: Demo invoice dataset · Illustrative data only</span><button className="text-button">View details <ArrowUpRight size={13}/></button></div><div className="response-actions"><button title="Copy response"><Copy size={15}/> Copy</button><button title="Helpful"><ThumbsUp size={15}/></button><button title="Not helpful"><ThumbsDown size={15}/></button></div></div></div>
}

function ChatComposer({ value, setValue, onSend, disabled }) {
  return <div className="composer-area"><form className="composer" onSubmit={e => { e.preventDefault(); onSend() }}><textarea value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend() } }} placeholder="Ask anything about your customers, sales, or invoices..." rows={1}/><div className="composer-bottom"><div className="composer-hint"><span>↵</span> to send <span className="hint-divider">·</span> Shift + ↵ for new line</div><button className="send-button" type="submit" disabled={!value.trim() || disabled}><Send size={16}/></button></div></form><div className="disclaimer">AI-generated responses may contain errors. Please verify important business information against the source data.</div></div>
}

function ChatPage({ messages, onPrompt, input, setInput, onSend, loading }) {
  return <main className={`chat-main ${messages.length ? 'has-messages' : ''}`}>
    {messages.length === 0 ? <Welcome onPrompt={onPrompt}/> : <div className="conversation"><div className="conversation-date"><span>Today</span></div>{messages.map((message, index) => <div key={index}><div className="user-message"><div className="user-bubble">{message}</div><div className="avatar small-avatar">SU</div></div><AssistantResponse/></div>)}{loading && <div className="typing"><span/><span/><span/> Sales Agent is thinking...</div>}</div>}
    <ChatComposer value={input} setValue={setInput} onSend={onSend} disabled={loading}/>
  </main>
}

function InsightsPage() { return <main className="secondary-page"><div className="page-icon"><BarChart3 size={22}/></div><div className="eyebrow">COMING SOON</div><h1>Business insights</h1><p>Explore curated business insights and performance summaries here. This area will be enabled in a future release.</p></main> }

export default function App() {
  const [active, setActive] = useState('chat')
  const [history, setHistory] = useState(initialHistory)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading])
  const newChat = () => { setMessages([]); setInput(''); setActive('chat') }
  const send = (text = input) => { const question = text.trim(); if (!question || loading) return; setMessages(old => [...old, question]); setInput(''); setLoading(true); setTimeout(() => setLoading(false), 850); if (!history.some(item => item.title.toLowerCase() === question.toLowerCase())) setHistory(old => [{ id: Date.now(), title: question.length > 30 ? `${question.slice(0, 30)}…` : question, time: 'Today' }, ...old].slice(0, 8)) }
  return <div className="app-shell"><Sidebar active={active} setActive={setActive} history={history} onNewChat={newChat} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/><div className="main-column"><Header onMenu={() => setMobileOpen(true)}/>{active === 'chat' ? <ChatPage messages={messages} onPrompt={send} input={input} setInput={setInput} onSend={() => send()} loading={loading}/> : <InsightsPage/>}</div></div>
}
