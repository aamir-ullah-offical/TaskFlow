import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilters from '../components/tasks/TaskFilters';
import ConfirmModal from '../components/ui/ConfirmModal';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import toast from 'react-hot-toast';
import { Plus, ClipboardList } from 'lucide-react';

const DEFAULT_FILTERS = { search: '', status: '', priority: '', category: '', isArchived: '' };

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTasks = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 12, ...filters });
      // Remove empty params
      [...params.entries()].forEach(([k, v]) => { if (!v) params.delete(k); });
      const { data } = await api.get(`/tasks?${params}`);
      setTasks(data.tasks);
      setPagination(data.pagination);
    } catch (e) {
      toast.error('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => fetchTasks(1), 300);
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const handleCreate = async (formData) => {
    setFormLoading(true);
    try {
      await api.post('/tasks', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Task created!');
      setShowForm(false);
      fetchTasks(1);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to create task.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (formData) => {
    setFormLoading(true);
    try {
      await api.put(`/tasks/${editTask._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Task updated!');
      setEditTask(null);
      fetchTasks(pagination.page);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to update task.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks((prev) => prev.map((t) => t._id === task._id ? { ...t, status: newStatus } : t));
      toast.success(newStatus === 'completed' ? 'Task completed!' : 'Task reopened.');
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const handleQuickUpdate = async (taskId, updates) => {
    try {
      const { data } = await api.put(`/tasks/${taskId}`, updates);
      setTasks((prev) => prev.map((t) => t._id === taskId ? { ...t, ...data.task } : t));
      // toast.success('Task updated'); // Optional, might be too noisy for subtasks
    } catch {
      toast.error('Failed to update task.');
    }
  };

  const handleArchive = async (task) => {
    try {
      const { data } = await api.put(`/tasks/${task._id}/archive`);
      toast.success(data.message || (task.isArchived ? 'Task unarchived.' : 'Task archived.'));
      fetchTasks(pagination.page);
    } catch {
      toast.error('Failed to archive task.');
    }
  };

  const handleDelete = async () => {
    if (!deleteTask?._id) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/tasks/${deleteTask._id}`);
      toast.success('Task deleted.');
      setDeleteTask(null);
      fetchTasks(pagination.page);
    } catch {
      toast.error('Failed to delete task.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>My Tasks</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            {pagination.total} task{pagination.total !== 1 ? 's' : ''} total
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus size={16} /> New Task
        </button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <TaskFilters
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
      </div>

      {/* Task Grid */}
      {loading ? (
        <SkeletonLoader count={6} />
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <ClipboardList size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
          <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>No tasks found</p>
          <p style={{ fontSize: '14px' }}>Create your first task to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={setEditTask}
              onDelete={setDeleteTask}
              onToggleStatus={handleToggleStatus}
              onArchive={handleArchive}
              onUpdate={handleQuickUpdate}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
          <button
            onClick={() => fetchTasks(pagination.page - 1)}
            disabled={!pagination.hasPrev}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >← Prev</button>
          <span style={{ padding: '8px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => fetchTasks(pagination.page + 1)}
            disabled={!pagination.hasNext}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >Next →</button>
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <TaskForm onSubmit={handleCreate} onClose={() => setShowForm(false)} loading={formLoading} />
      )}
      {editTask && (
        <TaskForm task={editTask} onSubmit={handleUpdate} onClose={() => setEditTask(null)} loading={formLoading} />
      )}
      {deleteTask && (
        <ConfirmModal
          title="Delete Task"
          message={`Are you sure you want to delete "${deleteTask.title}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTask(null)}
          loading={deleteLoading}
          confirmText="Delete Task"
        />
      )}
    </div>
  );
};

export default Tasks;
