import { useState, useRef } from 'react';
import { suggestTasks } from '../../services/puterAI';
import { Sparkles, Loader, Wand2, X } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * AI Task Suggester — given a topic, returns 5 task suggestions via Puter.js.
 * onSelect(task) — called when user picks a suggestion.
 */
const AISuggester = ({ onSelect }) => {
  const [topic, setTopic]             = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading]         = useState(false);
  const inFlightRef = useRef(false); // prevent double-clicks

  const handleSuggest = async () => {
    if (!topic.trim()) { toast.error('Enter a topic first.'); return; }
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoading(true);
    setSuggestions([]);
    try {
      const tasks = await suggestTasks(topic.trim());
      if (!tasks?.length) {
        toast.error('AI returned no suggestions. Try a different topic.');
        return;
      }
      setSuggestions(tasks);
    } catch (err) {
      const message = err?.message || 'AI suggestion failed. Try again.';
      toast.error(`❌ ${message}`);
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.05) 100%)',
      border: '1px solid rgba(139,92,246,0.25)',
      borderRadius: '12px',
      padding: '14px 16px',
      marginBottom: '4px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Sparkles size={15} style={{ color: 'var(--accent)' }} />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)' }}>AI Task Suggestions</span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: 'auto' }}>Powered by Puter.js</span>
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !loading && handleSuggest()}
          placeholder="e.g. Launch a startup, Learn Python, Get fit..."
          className="form-input"
          style={{ flex: 1, fontSize: '13px', padding: '9px 12px' }}
          maxLength={200}
          disabled={loading}
        />
        <button
          type="button"
          onClick={handleSuggest}
          disabled={loading || !topic.trim()}
          className="btn-primary"
          style={{ padding: '9px 14px', fontSize: '13px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {loading
            ? <><Loader size={14} className="animate-spin" /> Thinking...</>
            : <><Wand2 size={14} /> Suggest</>}
        </button>
      </div>

      {/* Suggestions list */}
      {suggestions.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
              Click a suggestion to use it:
            </span>
            <button
              type="button"
              onClick={() => setSuggestions([])}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px', display: 'flex', alignItems: 'center' }}
              title="Clear suggestions"
            >
              <X size={13} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { onSelect(s); setSuggestions([]); setTopic(''); }}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-input)'; }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0, marginTop: '1px',
                  fontSize: '10px', fontWeight: 700, color: 'var(--accent)',
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{s.title}</p>
                  {s.description && (
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.description}</p>
                  )}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '10px',
                      background: s.priority === 'high' ? 'rgba(239,68,68,0.15)' : s.priority === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                      color: s.priority === 'high' ? '#f87171' : s.priority === 'medium' ? '#fbbf24' : '#34d399',
                    }}>{s.priority}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', padding: '2px 7px', borderRadius: '10px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>{s.category}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggester;
