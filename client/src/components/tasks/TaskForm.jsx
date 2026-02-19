import { useEffect, memo, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { X, Type, AlignLeft, Tag, Flag, CheckCircle, Calendar, Bell, Image, Loader, Sparkles, Wand2, Brain, Zap } from 'lucide-react';
import api from '../../api/axios';
import AISuggester from '../ai/AISuggester';
import { generateDescription, predictTask, autoFillTask } from '../../services/puterAI';
import toast from 'react-hot-toast';

const CATEGORIES = ['General', 'Work', 'Personal', 'Health', 'Finance', 'Learning', 'Shopping', 'Other'];

const TaskForm = ({ task, onSubmit, onClose, loading }) => {
  const isEdit = !!task;
  const [showAI, setShowAI] = useState(!isEdit); // show AI panel by default on create
  const [descLoading, setDescLoading] = useState(false);
  const [predictLoading, setPredictLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);

  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState('');

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      category: task?.category || 'General',
      priority: task?.priority || 'medium',
      status: task?.status || 'pending',
      dueDate: task?.dueDate ? task.dueDate.slice(0, 16) : '',
      reminderTime: task?.reminderTime ? task.reminderTime.slice(0, 16) : '',
    },
  });

  const titleValue = watch('title');

  useEffect(() => {
    if (task) {
      reset({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'General',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        dueDate: task.dueDate ? task.dueDate.slice(0, 16) : '',
        reminderTime: task.reminderTime ? task.reminderTime.slice(0, 16) : '',
      });
      setSubtasks(task.subtasks || []);
    }
  }, [task, reset]);

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, { title: newSubtask.trim(), completed: false }]);
    setNewSubtask('');
  };

  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    if (values.description) formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('priority', values.priority);
    formData.append('status', values.status);
    formData.append('dueDate', values.dueDate || '');
    formData.append('reminderTime', values.reminderTime || '');
    formData.append('subtasks', JSON.stringify(subtasks));
    if (values.taskImage?.[0]) formData.append('taskImage', values.taskImage[0]);
    onSubmit(formData);
  };

  // AI: Magic Draft (Auto-fill all fields)
  const handleMagicDraft = async () => {
    if (!titleValue?.trim() || titleValue.trim().length < 3) {
      toast.error('Enter a topic first to draft.');
      return;
    }
    setDraftLoading(true);
    try {
      const draft = await autoFillTask(titleValue.trim());
      setValue('title', draft.title, { shouldDirty: true });
      setValue('description', draft.description, { shouldDirty: true });
      setValue('priority', draft.priority, { shouldDirty: true });
      setValue('category', draft.category, { shouldDirty: true });
      if (draft.subtasks) setSubtasks(draft.subtasks.map(t => ({ title: t, completed: false })));
      toast.success('✨ Task magically drafted!');
    } catch (err) {
      toast.error(`❌ ${err?.message || 'AI draft failed.'}`);
    } finally {
      setDraftLoading(false);
    }
  };

  // AI: auto-generate description from title via Puter.js
  const handleGenerateDesc = useCallback(async () => {
    if (!titleValue?.trim() || titleValue.trim().length < 3) {
      toast.error('Enter a task title first.');
      return;
    }
    setDescLoading(true);
    try {
      const description = await generateDescription(titleValue.trim());
      setValue('description', description, { shouldDirty: true });
      toast.success('Description generated!');
    } catch (err) {
      toast.error(`❌ ${err?.message || 'AI request failed. Try again.'}`);
    } finally {
      setDescLoading(false);
    }
  }, [titleValue, setValue]);

  // AI: predict priority + category from title via Puter.js
  const handlePredict = useCallback(async () => {
    if (!titleValue?.trim() || titleValue.trim().length < 3) {
      toast.error('Enter a task title first.');
      return;
    }
    setPredictLoading(true);
    try {
      const result = await predictTask(titleValue.trim());
      setValue('priority', result.priority, { shouldDirty: true });
      setValue('category', result.category, { shouldDirty: true });
      toast.success(`AI predicted: ${result.priority} priority · ${result.category}${result.reason ? ` — ${result.reason}` : ''}`);
    } catch (err) {
      toast.error(`❌ ${err?.message || 'AI request failed. Try again.'}`);
    } finally {
      setPredictLoading(false);
    }
  }, [titleValue, setValue]);

  // AI Suggester: fill form from suggestion
  const handleAISuggestion = (suggestion) => {
    setValue('title', suggestion.title, { shouldDirty: true });
    setValue('description', suggestion.description || '', { shouldDirty: true });
    setValue('priority', suggestion.priority || 'medium', { shouldDirty: true });
    setValue('category', suggestion.category || 'General', { shouldDirty: true });
    setShowAI(false);
    toast.success('Task filled from AI suggestion!');
  };

  const selectStyle = {
    width: '100%', padding: '11px 14px',
    background: 'var(--bg-input)', border: '1px solid var(--border)',
    borderRadius: '10px', color: 'var(--text-primary)',
    fontSize: '14px', fontFamily: 'var(--font-sans)', outline: 'none',
    cursor: 'pointer', transition: 'all 0.2s',
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '580px', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        {/* Header - Sticky */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {isEdit ? 'Edit Task' : 'New Task'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {isEdit ? 'Update task details below' : 'Fill in details or use AI to get started'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* AI toggle button */}
            <button
              type="button"
              onClick={() => setShowAI(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                background: showAI ? 'rgba(139,92,246,0.15)' : 'var(--bg-input)',
                border: `1px solid ${showAI ? 'rgba(139,92,246,0.4)' : 'var(--border)'}`,
                color: showAI ? 'var(--accent)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <Sparkles size={13} />
              AI
            </button>
            <button onClick={onClose} className="btn-icon" aria-label="Close"><X size={16} /></button>
          </div>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit(handleFormSubmit)} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', flex: 1 }}>

          {/* AI Suggester Panel */}
          {showAI && !isEdit && (
            <AISuggester onSelect={handleAISuggestion} />
          )}

          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Type size={13} /> Task title <span className="required">*</span>
              </span>
            </label>
            <input
              id="title"
              type="text"
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="What needs to be done?"
              {...register('title', { required: 'Title is required', maxLength: { value: 100, message: 'Max 100 characters' } })}
            />
            {!isEdit && (
              <button
                type="button"
                onClick={handleMagicDraft}
                disabled={draftLoading || !titleValue?.trim()}
                style={{
                  position: 'absolute', right: '8px', top: '36px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                  border: 'none', borderRadius: '6px',
                  padding: '4px 10px', color: 'white',
                  fontSize: '11px', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '4px',
                  cursor: 'pointer', boxShadow: '0 2px 5px rgba(139,92,246,0.3)',
                  opacity: (draftLoading || !titleValue?.trim()) ? 0.7 : 1,
                  transition: 'all 0.2s',
                }}
                title="Auto-fill all fields with AI"
              >
                {draftLoading ? <Loader size={12} className="animate-spin" /> : <Zap size={12} fill="white" />}
                Magic Draft
              </button>
            )}
            {errors.title && <span className="form-error">{errors.title.message}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="description">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlignLeft size={13} /> Description
                </span>
              </label>
              <button
                type="button"
                onClick={handleGenerateDesc}
                disabled={descLoading}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontSize: '11px', fontWeight: 600, color: 'var(--accent)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px',
                  opacity: descLoading ? 0.6 : 1,
                }}
                title="Generate description with AI"
              >
                {descLoading ? <Loader size={11} className="animate-spin" /> : <Wand2 size={11} />}
                AI Generate
              </button>
            </div>
            <textarea
              id="description"
              className="form-input"
              placeholder="Add more details (optional)"
              rows={3}
              style={{ resize: 'vertical', minHeight: '80px' }}
              {...register('description', { maxLength: { value: 500, message: 'Max 500 characters' } })}
            />
          </div>

          {/* Subtasks Section */}
          <div className="form-group">
             <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={13} /> Subtasks</span>
             </label>
             <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add a subtask..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => { if(e.key === 'Enter') handleAddSubtask(e); }}
                />
                <button type="button" onClick={handleAddSubtask} className="btn-secondary" style={{ padding: '8px 12px' }}>
                   <Zap size={14} />
                </button>
             </div>
             {subtasks.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   {subtasks.map((st, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-input)', padding: '6px 10px', borderRadius: '8px' }}>
                         <span style={{ flex: 1, fontSize: '13px' }}>{st.title}</span>
                         <button type="button" onClick={() => removeSubtask(i)} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={14} />
                         </button>
                      </div>
                   ))}
                </div>
             )}
          </div>

          {/* Rest of Form - Category, Priority, Etc */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="category">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Tag size={13} /> Category</span>
              </label>
              <select id="category" style={selectStyle} {...register('category')}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="priority">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Flag size={13} /> Priority</span>
                </label>
                <button
                  type="button"
                  onClick={handlePredict}
                  disabled={predictLoading}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '11px', fontWeight: 600, color: 'var(--accent)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px',
                    opacity: predictLoading ? 0.6 : 1,
                  }}
                  title="AI predict priority & category"
                >
                  {predictLoading ? <Loader size={11} className="animate-spin" /> : <Brain size={11} />}
                  AI Predict
                </button>
              </div>
              <select id="priority" style={selectStyle} {...register('priority')}>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="status">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={13} /> Status</span>
            </label>
            <select id="status" style={selectStyle} {...register('status')}>
              <option value="pending">⏳ Pending</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="dueDate">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={13} /> Due date</span>
              </label>
              <input id="dueDate" type="datetime-local" className="form-input" {...register('dueDate')} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reminderTime">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bell size={13} /> Reminder</span>
              </label>
              <input id="reminderTime" type="datetime-local" className="form-input" {...register('reminderTime')} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="taskImage">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Image size={13} /> Attach image</span>
            </label>
            <input
              id="taskImage" type="file" accept="image/*"
              className="form-input"
              style={{ padding: '8px 14px', cursor: 'pointer' }}
              {...register('taskImage')}
            />
            <span className="form-hint">JPG, PNG, GIF or WebP · Max 5MB</span>
          </div>

          {/* Actions - Sticky Footer */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '16px', marginTop: 'auto', borderTop: '1px solid var(--border)' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading
                ? <><Loader size={15} className="animate-spin" /> {isEdit ? 'Saving...' : 'Creating...'}</>
                : isEdit ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(TaskForm);
