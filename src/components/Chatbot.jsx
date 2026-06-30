import { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/chatbot.css';

const API_URL = import.meta.env.VITE_API_URL || '';

const CHIPS = [
  { emoji: '🛒', label: 'Arshith Fresh' },
  { emoji: '💻', label: 'IT Services' },
  { emoji: '📋', label: 'Internship' },
  { emoji: '🏢', label: 'About Us' },
  { emoji: '📞', label: 'Contact' },
];

const CLIENT_FALLBACK_RESPONSES = [
  {
    keywords: ['fresh', 'ecommerce', 'e-commerce', 'farm', 'grocery', 'food', 'shop'],
    reply: "Arshith Fresh India Pvt Ltd is our flagship e-commerce platform, established in 2025. We bring fresh, quality products directly from farms to consumers across India — bridging the gap between producers and customers with technology. Visit arshithfresh.com to learn more!"
  },
  {
    keywords: ['infotech', 'it', 'software', 'tech', 'technology', 'development', 'cloud', 'web'],
    reply: "Arshith Infotech is our IT & software arm, delivering cutting-edge solutions across web development, cloud services, digital transformation, and software consulting. We help businesses leverage technology to scale efficiently."
  },
  {
    keywords: ['suntech', 'consulting', 'business', 'solution', 'strategy'],
    reply: "Suntech Solutions, established in 2019, is our business consulting division. We provide strategic guidance, operational improvements, and growth strategies to help organizations achieve their goals across diverse industries."
  },
  {
    keywords: ['intern', 'internship', 'job', 'career', 'work', 'apply', 'hire', 'opportunity', 'training'],
    reply: "We offer exciting internship programs across IT, e-commerce, and business consulting! Apply via our Google Form on the Internship page and complete the Quizzory assessment. It's a great opportunity to work with a growing multi-sector group. Visit our Internship page for details!"
  },
  {
    keywords: ['ceo', 'farook', 'founder', 'leader', 'director', 'head'],
    reply: "Arshith Group is led by our visionary CEO, Farook N, who founded the group and has driven its expansion across IT, e-commerce, and consulting. Under his leadership, Arshith Group has grown into a dynamic multi-sector enterprise since 2019."
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'message', 'touch'],
    reply: "You can reach Arshith Group through our Contact Us page on this website. Fill in the form and our team will get back to you promptly. We'd love to hear from you!"
  },
  {
    keywords: ['history', 'journey', 'founded', 'year', 'timeline', 'established', 'started', 'when'],
    reply: "Arshith Group's journey: 🏢 2019 — Suntech Solutions founded · 💻 2021 — Arshith Infotech launched · 📈 2023 — Major expansion in IT consulting · 🛒 2025 — Arshith Fresh India Pvt Ltd established · 🚀 2026 — Continuing to grow across all divisions!"
  },
  {
    keywords: ['arshith', 'group', 'company', 'about', 'who', 'what', 'business', 'overview'],
    reply: "Arshith Group is a dynamic multi-sector enterprise operating across three core divisions: Arshith Infotech (IT & software), Arshith Fresh India Pvt Ltd (e-commerce & farm-to-consumer), and Suntech Solutions (business consulting). Founded in 2019, we are committed to innovation and growth!"
  },
];

function getClientFallbackReply(message) {
  const lower = message.toLowerCase();
  for (const { keywords, reply } of CLIENT_FALLBACK_RESPONSES) {
    if (keywords.some(kw => {
      if (kw.length <= 3) {
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        return regex.test(lower);
      }
      return lower.includes(kw);
    })) {
      return reply;
    }
  }
  return "Welcome to Arshith Group! We operate across IT services (Arshith Infotech), e-commerce (Arshith Fresh), and business consulting (Suntech Solutions). Ask me about our services, internship programs, company history, or how to contact us — I'm happy to help! 😊";
}


// ── Custom AG Logo Component ──────────────────
function AgLogo({ size = 512, className = '' }) {
  return (
    <div 
      className={`ag-logo-container ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        padding: 0,
        margin: 0
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
          borderRadius: '50%'
        }}
      />
    </div>
  );
}

// ── Bot Avatar ───────────────────────────────────────────
function BotAvatar() {
  return (
    <div className="ag-msg-avatar ag-msg-avatar-bot" aria-label="AGI Avatar">
      <AgLogo size={32} />
    </div>
  );
}

// ── User Avatar ──────────────────────────────────────────
function UserAvatar() {
  return (
    <div className="ag-msg-avatar ag-msg-avatar-user" aria-label="User Avatar">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    </div>
  );
}

// ── Typing Indicator ─────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="ag-message-row">
      <BotAvatar />
      <div className="ag-bubble ag-typing-bubble">
        <span className="ag-typing-dot" />
        <span className="ag-typing-dot" />
        <span className="ag-typing-dot" />
      </div>
    </div>
  );
}

// ── Markdown Parser Helper ──────────────────────────────
function renderMarkdown(text) {
  if (!text) return '';
  
  // Basic security: escape dangerous characters
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Format bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Format italics *text*
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert links [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="ag-md-link" target="_blank" rel="noopener noreferrer">$1</a>');

  // Convert linebreaks
  html = html.replace(/\n/g, '<br />');

  // Parse bullet points
  const lines = html.split('<br />');
  let finalHtml = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) {
        finalHtml += '<ul class="ag-md-ul">';
        inList = true;
      }
      finalHtml += `<li class="ag-md-li">${trimmed.substring(2)}</li>`;
    } else {
      if (inList) {
        finalHtml += '</ul>';
        inList = false;
      }
      finalHtml += (i > 0 && finalHtml.length > 0 ? '<br />' : '') + line;
    }
  }
  if (inList) {
    finalHtml += '</ul>';
  }

  return <span dangerouslySetInnerHTML={{ __html: finalHtml }} />;
}

// ── Subsidiary Cards Parser ──────────────────────────────
function getSubsidiaryCards(text) {
  const cards = [];
  const lower = text.toLowerCase();
  
  if (lower.includes('arshith fresh') || lower.includes('arshithfresh')) {
    cards.push({
      title: 'Arshith Fresh',
      desc: 'Organic agricultural farm products & cold storage chains.',
      url: 'https://arshithfresh.com',
      icon: '🛒',
      domain: 'arshithfresh.com'
    });
  }
  if (lower.includes('arshith infotech') || lower.includes('arshithinfotech')) {
    cards.push({
      title: 'Arshith Infotech',
      desc: 'SaaS solutions, software engineering & technical staff augmentation.',
      url: 'https://arshithinfotech.com',
      icon: '💻',
      domain: 'arshithinfotech.com'
    });
  }
  if (lower.includes('suntech solutions') || lower.includes('suntech organization') || lower.includes('suntechorganization')) {
    cards.push({
      title: 'Suntech Solutions',
      desc: 'Next-generation networking infrastructure & network cybersecurity audits.',
      url: 'https://suntechorganization.com',
      icon: '🛡️',
      domain: 'suntechorganization.com'
    });
  }
  if (lower.includes('internship') || lower.includes('intern program')) {
    cards.push({
      title: 'Internship Program',
      desc: 'Apply for tech, design, marketing, or ops internship tracks.',
      url: '/internship',
      icon: '🎓',
      domain: 'arshithgroup.com/internship'
    });
  }
  return cards;
}

// ── Single Message Bubble with Feedback & Link Cards ──────────
function MessageBubble({ msg, onFeedback }) {
  const isUser = msg.role === 'user';
  const subCards = !isUser ? getSubsidiaryCards(msg.text) : [];

  return (
    <div className={`ag-message-row${isUser ? ' ag-row-user' : ''}`}>
      {isUser ? <UserAvatar /> : <BotAvatar />}
      <div className="ag-bubble-container">
        <div className={`ag-bubble ${isUser ? 'ag-bubble-user' : 'ag-bubble-bot'}`}>
          {isUser ? msg.text : renderMarkdown(msg.text)}
          
          {!isUser && msg.powered_by === 'gemini' && (
            <div className="ag-gemini-badge">✦ Gemini</div>
          )}
          {!isUser && msg.powered_by === 'fallback' && (
            <div className="ag-bubble-fallback-badge">⚡ Quick reply</div>
          )}

          {/* Feedback buttons (thumbs up/down) for bot responses */}
          {!isUser && (
            <div className="ag-feedback-buttons">
              <button
                className={`ag-feedback-btn${msg.feedback === 'up' ? ' ag-feedback-active' : ''}`}
                onClick={() => onFeedback(msg.id, 'up')}
                title="Helpful"
                aria-label="Thumbs up"
              >
                👍
              </button>
              <button
                className={`ag-feedback-btn${msg.feedback === 'down' ? ' ag-feedback-active' : ''}`}
                onClick={() => onFeedback(msg.id, 'down')}
                title="Not helpful"
                aria-label="Thumbs down"
              >
                👎
              </button>
            </div>
          )}
        </div>

        {/* Subsidiary Link Cards */}
        {subCards.length > 0 && (
          <div className="ag-sub-cards">
            {subCards.map(card => (
              <a
                href={card.url}
                key={card.title}
                target={card.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="ag-sub-card"
              >
                <span className="ag-sub-card-icon">{card.icon}</span>
                <div className="ag-sub-card-details">
                  <div className="ag-sub-card-title">{card.title}</div>
                  <div className="ag-sub-card-desc">{card.desc}</div>
                  <div className="ag-sub-card-domain">{card.domain} ↗</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Chatbot Component ────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen]             = useState(false);
  const [showUnread, setShowUnread]     = useState(() => {
    // Show unread pulse initially if user hasn't opened chatbot before
    return localStorage.getItem('agi_chat_opened') !== 'true';
  });
  
  // Initialize messages & chatHistory from localStorage
  const [messages, setMessages]         = useState(() => {
    try {
      const saved = localStorage.getItem('agi_chat_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput]               = useState('');
  const [isTyping, setIsTyping]         = useState(false);

  const [chatHistory, setChatHistory]   = useState(() => {
    try {
      const saved = localStorage.getItem('agi_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const panelRef       = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('agi_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat messages', e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('agi_chat_history', JSON.stringify(chatHistory));
    } catch (e) {
      console.error('Failed to save chat history', e);
    }
  }, [chatHistory]);

  // Focus textarea when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleFabClick = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setShowUnread(false);
      localStorage.setItem('agi_chat_opened', 'true');
    }
  };

  const handleFeedback = (msgId, type) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        // Toggle feedback rating
        return { ...m, feedback: m.feedback === type ? null : type };
      }
      return m;
    }));
  };

  const clearChat = () => {
    if (window.confirm('Clear conversation history? This cannot be undone.')) {
      setMessages([]);
      setChatHistory([]);
      localStorage.removeItem('agi_chat_messages');
      localStorage.removeItem('agi_chat_history');
    }
  };

  // Core send logic with Snappy Dynamic Latency
  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || isTyping) return;

    // 1. Add user bubble immediately
    const userMsg = { role: 'user', text: userText, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'; // Reset text area height
    }
    setIsTyping(true);

    // 2. Build history payload (last 12 messages = 6 exchanges)
    const newHistory = [...chatHistory, { role: 'user', text: userText }];
    const recentHistory = newHistory.slice(-12);

    const startTime = Date.now();

    try {
      const res = await fetch(`${API_URL}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: recentHistory,
        }),
      });

      if (!res.ok) {
        throw new Error('API server returned error status');
      }

      const data = await res.json();
      const replyText = data.reply || 'Sorry, I encountered an issue. Let me try again.';
      const poweredBy = data.powered_by || 'fallback';

      // 3. Dynamic Latency: show typing indicator for at least 1.2s to feel natural
      const endTime = Date.now();
      const elapsed = endTime - startTime;
      const delay = Math.max(0, 1200 - elapsed);
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const botMsg = {
        role: 'model',
        text: replyText,
        powered_by: poweredBy,
        id: Date.now() + 1,
        feedback: null
      };

      setMessages(prev => [...prev, botMsg]);
      setChatHistory(prev => [
        ...prev,
        { role: 'user',  text: userText  },
        { role: 'model', text: replyText },
      ]);

    } catch (err) {
      console.warn('⚠️ Fetch failed, using client-side fallback reply:', err);
      // Dynamic fallback delay on failure
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 1200 - elapsed);
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      const clientReply = getClientFallbackReply(userText);
      const fallbackMsg = {
        role: 'model',
        text: clientReply,
        powered_by: 'fallback',
        id: Date.now() + 1,
        feedback: null
      };
      setMessages(prev => [...prev, fallbackMsg]);
      setChatHistory(prev => [
        ...prev,
        { role: 'user',  text: userText  },
        { role: 'model', text: clientReply },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, chatHistory]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Auto-grow input textarea height dynamically
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(90, inputRef.current.scrollHeight)}px`;
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="ag-chatbot-root">
      {/* ── FAB ───────────────────────────────────────────── */}
      <div className="ag-chatbot-fab-wrap">
        <button
          id="agChatFab"
          className={`ag-chat-fab${isOpen ? ' ag-fab-open' : ''}`}
          onClick={handleFabClick}
          aria-label={isOpen ? 'Close chat' : 'Open Arshith Groups Intelligence'}
          aria-expanded={isOpen}
        >
          {/* Unread badge */}
          {showUnread && !isOpen && <span className="ag-unread-badge" aria-hidden="true" />}

          {/* Custom AG Logo inside the FAB */}
          <div className="ag-fab-icon-chat-container">
            <AgLogo size={46} />
          </div>

          {/* Close icon */}
          <svg className="ag-fab-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Chat Panel ────────────────────────────────────── */}
      <div
        ref={panelRef}
        className={`ag-chat-panel${isOpen ? ' ag-chat-open' : ''}`}
        role="dialog"
        aria-label="Arshith Groups Intelligence"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="ag-chat-header">
          <div className="ag-chat-header-logo-container">
            <AgLogo size={38} />
          </div>
          <div className="ag-chat-header-info">
            <div className="ag-chat-header-title">Arshith Groups Intelligence</div>
            <div className="ag-chat-header-status">
              <span className="ag-status-dot" />
              Online · Ready to help
            </div>
          </div>
          
          {/* Clear history button */}
          {!isEmpty && (
            <button
              className="ag-chat-clear-btn"
              onClick={clearChat}
              title="Clear chat history"
              aria-label="Clear chat"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          )}

          {/* Close button */}
          <button
            className="ag-chat-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="ag-chat-messages">
          {/* Welcome card — shown only when no messages yet */}
          {isEmpty && (
            <>
              <div className="ag-welcome-card">
                <div className="ag-welcome-icon-container">
                  <AgLogo size={70} />
                </div>
                <div className="ag-welcome-title">👋 Welcome to AGI!</div>
                <div className="ag-welcome-sub">
                  I am Arshith Groups Intelligence. Ask me anything about our subsidiaries, IT services, consulting, or internship openings.
                </div>
              </div>

              {/* Suggestion chips */}
              <div className="ag-chips-wrap">
                {CHIPS.map(({ emoji, label }) => (
                  <button
                    key={label}
                    className="ag-chip"
                    onClick={() => sendMessage(label)}
                    disabled={isTyping}
                  >
                    {emoji} {label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Rendered messages */}
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} onFeedback={handleFeedback} />
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="ag-chat-input-area">
          <textarea
            id="agChatInput"
            ref={inputRef}
            className="ag-chat-textarea"
            rows={1}
            placeholder="Ask Arshith Groups Intelligence…"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            aria-label="Chat message input"
          />
          <button
            id="agChatSend"
            className="ag-chat-send-btn"
            onClick={() => sendMessage()}
            disabled={isTyping || !input.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="ag-chat-footer">
          Powered by <span>AGI</span> · <span>Gemini</span>
        </div>
      </div>
    </div>
  );
}
