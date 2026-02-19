import { useState, memo } from 'react';
import { CheckCircle, Circle, Archive, Trash2, Edit3, Clock, Calendar, Image, Sparkles, Loader } from 'lucide-react';
import { format, isPast } from 'date-fns';
import { breakDownTask } from '../../services/puterAI';
import toast from 'react-hot-toast';

const priorityConfig = {
  high: { label: 'High', cls: 'badge-high', border: 'priority-high' },
  medium: { label: 'Medium', cls: 'badge-medium', border: 'priority-medium' },
  low: { label: 'Low', cls: 'badge-low', border: 'priority-low' },
};

const TaskCard = ({ task, onToggleStatus, onEdit, onArchive, onDelete, onUpdate }) => {
  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && task.status === 'pending';
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const [aiLoading, setAiLoading] = useState(false);

  const handleBreakDown = async () => {
    setAiLoading(true);
    try {
      const steps = await breakDownTask(task.title);
      if (steps.length > 0) {
        onUpdate(task._id, { subtasks: steps });
        toast.success('Task broken down!');
      } else {
        toast.error('Could not generate steps.');
      }
    } catch {
      toast.error('AI failed to break down task.');
    } finally {
      setAiLoading(false);
    }
  };

  const toggleSubtask = (index) => {
    const newSubtasks = [...(task.subtasks || [])];
    newSubtasks[index].completed = !newSubtasks[index].completed;
    onUpdate(task._id, { subtasks: newSubtasks });
  };

  return (
    <div
      className={`glass-card ${priority.border} ${task.isArchived ? 'card-archived' : ''}`}
      style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      {/* Top row: status toggle + title */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <button
          onClick={() => onToggleStatus(task)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', flexShrink: 0, marginTop: '1px', color: task.status === 'completed' ? 'var(--success)' : 'var(--text-muted)', transition: 'color 0.2s' }}
          title={task.status === 'completed' ? 'Mark pending' : 'Mark complete'}
        >
          {task.status === 'completed' ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)',
            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
            opacity: task.status === 'completed' ? 0.6 : 1,
            wordBreak: 'break-word',
          }}>
            {task.title}
          </p>
          {task.description && (
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Subtasks Section (Smart Breakdown) */}
      {task.status === 'pending' && (
        <div style={{ paddingLeft: '32px' }}>
          {task.subtasks?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {task.subtasks.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div
                    onClick={(e) => { e.stopPropagation(); toggleSubtask(idx); }}
                    style={{
                      width: '14px', height: '14px', borderRadius: '4px', border: '1px solid var(--border)',
                      background: step.completed ? 'var(--accent)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      borderColor: step.completed ? 'var(--accent)' : 'var(--text-muted)'
                    }}
                  >
                    {step.completed && <CheckCircle size={10} color="#fff" />}
                  </div>
                  <span style={{ textDecoration: step.completed ? 'line-through' : 'none', opacity: step.completed ? 0.5 : 1 }}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <button
              onClick={handleBreakDown}
              disabled={aiLoading}
              style={{
                background: 'none', border: 'none', padding: 0,
                color: 'var(--accent)', fontSize: '12px', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', opacity: 0.8
              }}
              title="Use AI to break this task down into steps"
            >
              {aiLoading ? <Loader size={12} className="animate-spin" /> : <Sparkles size={12} />}
              {aiLoading ? 'Analyzing...' : 'Smart Breakdown'}
            </button>
          )}
        </div>
      )}

      {/* Task image thumbnail */}
      {task.taskImage?.url && (
        <img
          src={task.taskImage.url}
          alt="Task"
          style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }}
        />
      )}

      {/* Badges row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
        <span className={`badge ${priority.cls}`}>{priority.label}</span>
        {task.category && (
          <span className="badge" style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
            {task.category}
          </span>
        )}
        {isOverdue && <span className="badge badge-overdue">Overdue</span>}
        {task.isArchived && <span className="badge" style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', fontWeight: 800 }}>Archived</span>}
      </div>

      {/* Date/time info */}
      {(task.dueDate || task.reminderTime) && (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {task.dueDate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: isOverdue ? 'var(--danger)' : 'var(--text-muted)' }}>
              <Calendar size={11} />
              {format(new Date(task.dueDate), 'MMM d, h:mm a')}
            </span>
          )}
          {task.reminderTime && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Clock size={11} />
              {format(new Date(task.reminderTime), 'MMM d, h:mm a')}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', paddingTop: '4px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={() => onEdit(task)}
          className="btn-icon"
          title="Edit task"
        >
          <Edit3 size={14} />
        </button>
        <button
          onClick={() => onArchive(task)}
          className="btn-icon"
          title={task.isArchived ? 'Unarchive' : 'Archive'}
          style={{ color: task.isArchived ? 'var(--accent)' : undefined }}
        >
          <Archive size={14} />
        </button>
        <button
          onClick={() => onDelete(task)}
          className="btn-icon"
          title="Delete task"
          style={{ color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.2)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default memo(TaskCard);
