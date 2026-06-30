import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './AiChartBot.css';

const API_URL = import.meta.env.VITE_API_URL || '';

const CHART_COLORS = [
  '#16a34a', '#4ade80', '#15803d', '#86efac',
  '#22c55e', '#bbf7d0', '#166534', '#dcfce7',
];

const SUGGESTIONS = [
  { text: 'Show monthly revenue for 2024', icon: '📈' },
  { text: 'Compare product sales by category', icon: '📊' },
  { text: 'Show quarterly profit trend', icon: '💎' },
  { text: 'Employee count by department', icon: '👥' },
  { text: 'Website traffic by month', icon: '🌐' },
];

// ── AG Logo Image Component ──────────────────────────────
function AgLogo({ size = 40, className = '' }) {
  return (
    <div
      className={`ag-chart-logo-wrap ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0fdf4',
        border: '2px solid #bbf7d0',
        flexShrink: 0,
      }}
    >
      <img
        src="/logos/AG-logo.png"
        alt="AG Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}

// ── Interactive Chart Renderer ───────────────────────────
function ChartRenderer({ data, overrideType }) {
  if (!data) return null;

  if (data.error) {
    return (
      <div className="chart-error">
        <span>⚠️</span> {data.error}
      </div>
    );
  }

  const { chartType: originalType, title, data: chartData } = data;
  const activeType = overrideType || originalType;

  const normalised = (chartData || []).map((d) => ({
    ...d,
    name: d.label || d.name || d.month || d.category || 'Item',
    value: Number(d.value) || 0
  }));

  return (
    <div className="chart-wrapper">
      {title && <h3 className="chart-title">{title}</h3>}

      <div className="chart-container-inner">
        {activeType === 'bar' && (
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={normalised} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#bbf7d0" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,163,74,0.12)" />
              <XAxis dataKey="name" tick={{ fill: '#166534', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#166534', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, color: '#14532d' }}
                cursor={{ fill: 'rgba(22,163,74,0.06)' }}
              />
              <Legend wrapperStyle={{ color: '#166534', fontSize: 11, paddingTop: 10 }} />
              <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} name="Value">
                {normalised.map((_, i) => (
                  <Cell key={i} stroke="#16a34a" strokeWidth={1} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeType === 'line' && (
          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={normalised} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,163,74,0.12)" />
              <XAxis dataKey="name" tick={{ fill: '#166534', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#166534', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, color: '#14532d' }}
              />
              <Legend wrapperStyle={{ color: '#166534', fontSize: 11, paddingTop: 10 }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ fill: '#4ade80', r: 5, stroke: '#16a34a', strokeWidth: 1.5 }}
                activeDot={{ r: 8, fill: '#15803d', stroke: '#ffffff', strokeWidth: 2 }}
                name="Value"
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {activeType === 'area' && (
          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={normalised} margin={{ top: 15, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#bbf7d0" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,163,74,0.12)" />
              <XAxis dataKey="name" tick={{ fill: '#166534', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#166534', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, color: '#14532d' }}
              />
              <Legend wrapperStyle={{ color: '#166534', fontSize: 11, paddingTop: 10 }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
                fill="url(#areaGradient)"
                name="Value"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeType === 'pie' && (
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie
                data={normalised}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#16a34a', strokeWidth: 1 }}
              >
                {normalised.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, color: '#14532d' }}
              />
              <Legend wrapperStyle={{ color: '#166534', fontSize: 11, paddingTop: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

// ── Main Page Component ──────────────────────────────────
export default function AiChartBot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "👋 Welcome to Arshith Groups Intelligence Chart Workspace! I can generate bar charts, line charts, area maps, or pie ratios based on your business query. What analysis would you like to build today?",
      chart: null,
      id: 1
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeChart, setActiveChart] = useState(null);
  const [chartTypeOverride, setChartTypeOverride] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    // Reset override when new query is submitted
    setChartTypeOverride(null);

    const userMsgId = Date.now();
    setMessages((prev) => [...prev, { role: 'user', text: userText, chart: null, id: userMsgId }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: 'error', text: data.error, retryText: userText, chart: null, id: Date.now() + 1 },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Constructed your **${data.chartType}** chart: *${data.title || userText}*`,
            chart: data,
            id: Date.now() + 1
          },
        ]);
        setActiveChart(data);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          text: '❌ Connection error. Please verify that the local backend server is running on port 5000.',
          retryText: userText,
          chart: null,
          id: Date.now() + 1
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="aicb-page">
      {/* ── Sidebar ── */}
      <aside className="aicb-sidebar">
        <div className="aicb-sidebar-header">
          <Link to="/" className="aicb-back-link" aria-label="Go back to Homepage">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>
          <div className="aicb-sidebar-logo-group">
            <AgLogo size={40} />
            <div className="aicb-sidebar-title-wrap">
              <h2>AGI Chart</h2>
              <span>Intelligence Platform</span>
            </div>
          </div>
        </div>

        <div className="aicb-sidebar-content">
          <p className="aicb-sidebar-desc">
            Type an analytical question or choose a preset below to build responsive interactive charts.
          </p>

          <div className="aicb-presets-section">
            <h3>📈 Preset Analyses</h3>
            <div className="aicb-presets-grid">
              {SUGGESTIONS.map((preset) => (
                <button
                  key={preset.text}
                  className="aicb-preset-card"
                  onClick={() => sendMessage(preset.text)}
                  disabled={loading}
                >
                  <span className="aicb-preset-icon">{preset.icon}</span>
                  <span className="aicb-preset-text">{preset.text}</span>
                </button>
              ))}
            </div>
          </div>

          {activeChart && (
            <div className="aicb-controls-section">
              <h3>⚙️ Chart Visualizer</h3>
              <div className="aicb-controls-grid">
                {['bar', 'line', 'area', 'pie'].map((type) => (
                  <button
                    key={type}
                    className={`aicb-control-btn ${
                      (chartTypeOverride || activeChart.chartType) === type ? 'active' : ''
                    }`}
                    onClick={() => setChartTypeOverride(type)}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main Chat Workspace ── */}
      <main className="aicb-workspace">
        <header className="aicb-workspace-header">
          <div className="aicb-workspace-header-inner">
            <div className="aicb-header-status-indicator">
              <span className="aicb-glow-dot" />
              AGI System Active
            </div>
            <div className="aicb-powered-badge">
              Gemini 2.0 Flash
            </div>
          </div>
        </header>

        {/* Chat message flow */}
        <div className="aicb-chat-flow">
          {messages.map((msg) => (
            <div key={msg.id} className={`aicb-chat-row aicb-chat-row--${msg.role === 'error' ? 'error' : msg.role}`}>
              <div className="aicb-chat-avatar">
                {msg.role === 'user' ? (
                  <div className="aicb-user-avatar-circle">👤</div>
                ) : (
                  <AgLogo size={34} />
                )}
              </div>
              <div className="aicb-chat-bubble-container">
                <div className="aicb-chat-bubble">
                  {msg.role === 'error' ? (
                    <div className="aicb-chat-error-block">
                      <p className="aicb-chat-error-text">{msg.text}</p>
                      {msg.retryText && (
                        <button
                          className="aicb-chat-retry-btn"
                          onClick={() => {
                            setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                            sendMessage(msg.retryText);
                          }}
                        >
                          🔄 Resend Request
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <p
                        className="aicb-chat-text"
                        dangerouslySetInnerHTML={{
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>'),
                        }}
                      />
                      {msg.chart && (
                        <ChartRenderer 
                          data={msg.chart} 
                          overrideType={msg.chart === activeChart ? chartTypeOverride : null} 
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="aicb-chat-row aicb-chat-row--assistant">
              <div className="aicb-chat-avatar">
                <AgLogo size={34} />
              </div>
              <div className="aicb-chat-bubble-container">
                <div className="aicb-chat-bubble aicb-chat-bubble-loading">
                  <span className="aicb-loading-dot" />
                  <span className="aicb-loading-dot" />
                  <span className="aicb-loading-dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="aicb-workspace-input-area">
          <div className="aicb-input-container">
            <textarea
              className="aicb-input-textarea"
              rows={1}
              placeholder="Query analytics data... (e.g. 'Show monthly sales of Arshith Fresh')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="aicb-input-send-btn"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="Submit query"
            >
              {loading ? (
                <div className="aicb-input-spinner" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
