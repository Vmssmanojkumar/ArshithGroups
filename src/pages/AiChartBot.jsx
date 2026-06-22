import { useState, useRef, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './AiChartBot.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CHART_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
  '#f97316', '#eab308', '#22c55e', '#06b6d4',
];

const SUGGESTIONS = [
  'Show monthly revenue for 2024',
  'Compare product sales by category',
  'Show quarterly profit trend',
  'Employee count by department',
  'Website traffic by month',
];

function ChartRenderer({ data }) {
  if (!data) return null;

  if (data.error) {
    return (
      <div className="chart-error">
        <span>⚠️</span> {data.error}
      </div>
    );
  }

  const { chartType, title, data: chartData } = data;

  const normalised = (chartData || []).map((d) => ({
    ...d,
    name: d.label || d.name || d.month || d.category || 'Item',
  }));

  return (
    <div className="chart-wrapper">
      {title && <h3 className="chart-title">{title}</h3>}

      {chartType === 'bar' && (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={normalised} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" tick={{ fill: '#a5b4fc', fontSize: 12 }} />
            <YAxis tick={{ fill: '#a5b4fc', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: '#1e1b4b', border: '1px solid #4f46e5', borderRadius: 8, color: '#e0e7ff' }}
              cursor={{ fill: 'rgba(99,102,241,0.15)' }}
            />
            <Legend wrapperStyle={{ color: '#c7d2fe', fontSize: 12 }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {normalised.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {chartType === 'line' && (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={normalised} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" tick={{ fill: '#a5b4fc', fontSize: 12 }} />
            <YAxis tick={{ fill: '#a5b4fc', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: '#1e1b4b', border: '1px solid #4f46e5', borderRadius: 8, color: '#e0e7ff' }}
            />
            <Legend wrapperStyle={{ color: '#c7d2fe', fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: '#818cf8', r: 5 }}
              activeDot={{ r: 8, fill: '#a5b4fc' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {chartType === 'pie' && (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={normalised}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: '#6366f1' }}
            >
              {normalised.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#1e1b4b', border: '1px solid #4f46e5', borderRadius: 8, color: '#e0e7ff' }}
            />
            <Legend wrapperStyle={{ color: '#c7d2fe', fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default function AiChartBot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "👋 Hi! I'm your AI Chart Bot. Ask me to generate charts — like *monthly sales*, *revenue trends*, or *product comparisons*.",
      chart: null,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: userText, chart: null }]);
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
        // Show a styled error bubble
        setMessages((prev) => [
          ...prev,
          { role: 'error', text: data.error, retryText: userText, chart: null },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Here's your **${data.chartType}** chart for: *${data.title || userText}*`,
            chart: data,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          text: '❌ Could not reach the server. Make sure the backend is running on port 5000.',
          retryText: userText,
          chart: null,
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
      {/* Header */}
      <header className="aicb-header">
        <div className="aicb-header-inner">
          <div className="aicb-logo">
            <span className="aicb-logo-icon">📊</span>
            <div>
              <h1>AI Chart Bot</h1>
              <p>Powered by Google Gemini · Arshith Groups</p>
            </div>
          </div>
          <div className="aicb-status">
            <span className="aicb-dot" />
            Live
          </div>
        </div>
      </header>

      <main className="aicb-main">
        {/* Suggestions */}
        <div className="aicb-suggestions">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="aicb-chip" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="aicb-chat">
          {messages.map((msg, i) => (
            <div key={i} className={`aicb-bubble aicb-bubble--${msg.role === 'error' ? 'error' : msg.role}`}>
              <div className="aicb-avatar">
                {msg.role === 'user' ? '👤' : msg.role === 'error' ? '⚠️' : '🤖'}
              </div>
              <div className="aicb-bubble-content">
                {msg.role === 'error' ? (
                  <div className="aicb-error-block">
                    <p className="aicb-error-msg">{msg.text}</p>
                    {msg.retryText && (
                      <button
                        className="aicb-retry-btn"
                        onClick={() => {
                          // Remove the error bubble and resend
                          setMessages((prev) => prev.filter((_, idx) => idx !== i));
                          sendMessage(msg.retryText);
                        }}
                      >
                        🔄 Try Again
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: msg.text
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>'),
                      }}
                    />
                    {msg.chart && <ChartRenderer data={msg.chart} />}
                  </>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="aicb-bubble aicb-bubble--assistant">
              <div className="aicb-avatar">🤖</div>
              <div className="aicb-bubble-content aicb-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="aicb-input-bar">
          <textarea
            className="aicb-textarea"
            rows={1}
            placeholder="Ask for a chart… e.g. 'Show monthly sales for 2024'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="aicb-send"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            {loading ? (
              <span className="aicb-spinner" />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
