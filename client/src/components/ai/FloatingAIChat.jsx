import { useState, useRef, useEffect } from 'react';
import puter from '@heyputer/puter.js';
import { MessageSquare, X, Send, User, Bot, Loader, Minimize2 } from 'lucide-react';
import toast from 'react-hot-toast';

const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help you organize tasks or answer questions. What’s on your mind?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // 1. Construct message history for context
      // Limit context to last 10 messages to save tokens/complexity
      const history = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
      history.push(userMsg);

      // 2. Add system prompt
      const systemMsg = {
        role: 'system',
        content: `You are a friendly, concise productivity assistant for a ToDo app. 
Help the user organize their thoughts, break down tasks, or answer general questions.
Keep answers short (max 3 sentences usually).`
      };

      // 3. Call Puter.js
      const response = await puter.ai.chat([systemMsg, ...history]);
      
      // 4. Extract text safely
      let text = '';
      if (typeof response === 'string') text = response;
      else if (response?.message?.content) text = response.message.content;
      else text = "I'm not sure how to answer that.";

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (err) {
      toast.error('AI unavailable right now.');
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 12px rgba(139,92,246,0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: '350px',
          height: '500px',
          maxHeight: 'calc(100vh - 120px)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden',
          animation: 'slideUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#10b981', boxShadow: '0 0 8px #10b981'
              }} />
              <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>AI Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <Minimize2 size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: 'var(--bg-main)'
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '8px',
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end'
              }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {m.role === 'user' ? <User size={14} color="white" /> : <Bot size={14} color="var(--text-primary)" />}
                </div>
                <div style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-input)',
                  color: m.role === 'user' ? 'white' : 'var(--text-primary)',
                  borderTopRightRadius: m.role === 'user' ? '2px' : '12px',
                  borderTopLeftRadius: m.role === 'assistant' ? '2px' : '12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '32px' }}>
                <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0s' }} />
                <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0.2s' }} />
                <div className="typing-dot" style={{ width: '6px', height: '6px', background: 'var(--text-muted)', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: '0.4s' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-card)',
            display: 'flex',
            gap: '8px'
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                resize: 'none',
                height: '42px',
                minHeight: '42px',
                maxHeight: '80px',
                fontFamily: 'inherit',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: input.trim() ? 1 : 0.6,
                transition: 'all 0.2s'
              }}
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </>
  );
};

export default FloatingAIChat;
