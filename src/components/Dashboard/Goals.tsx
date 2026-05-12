import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Chatbot from './Chatbot';
import API from '../../api';
import { Target, Plus, CheckCircle, Circle, Flame, Trophy, TrendingUp, Clock, Sparkles, Edit3, Save, X, Trash2 } from 'lucide-react';
import './Goals.css';

interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  target: number;
  unit: string;
  streak: number;
  isCompleted: boolean;
}

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Goal>>({});
  const [newGoal, setNewGoal] = useState({ title: '', category: 'Fitness', target: 7, unit: 'days' });

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const res = await API.get('/onboarding');
        const data = res.data;
        const generatedGoals: Goal[] = [];

        if (data.goals?.includes('fitness')) {
          generatedGoals.push(
            { id: '1', title: 'Complete 30-min workout', category: 'Fitness', progress: 4, target: 7, unit: 'days/week', streak: 4, isCompleted: false },
            { id: '2', title: 'Walk 8,000 steps daily', category: 'Fitness', progress: 5200, target: 8000, unit: 'steps', streak: 2, isCompleted: false }
          );
        }
        if (data.goals?.includes('learning') || data.goals?.includes('career')) {
          generatedGoals.push(
            { id: '3', title: `Study ${data.workDuration || 4}h focused daily`, category: 'Study', progress: Math.floor((data.workDuration || 4) * 0.7), target: data.workDuration || 4, unit: 'hours', streak: 5, isCompleted: false },
            { id: '4', title: 'Complete 1 practice set', category: 'Study', progress: 1, target: 1, unit: 'set', streak: 3, isCompleted: true }
          );
        }
        if (data.goals?.includes('wellbeing')) {
          generatedGoals.push(
            { id: '5', title: 'Meditate for 10 minutes', category: 'Wellbeing', progress: 0, target: 10, unit: 'minutes', streak: 0, isCompleted: false },
            { id: '6', title: 'Sleep before 11 PM', category: 'Wellbeing', progress: 3, target: 5, unit: 'nights', streak: 3, isCompleted: false }
          );
        }
        if (data.goals?.includes('consistency')) {
          generatedGoals.push(
            { id: '7', title: 'Maintain daily journal entry', category: 'Consistency', progress: 6, target: 7, unit: 'days', streak: 6, isCompleted: false }
          );
        }
        if (generatedGoals.length === 0) {
          generatedGoals.push(
            { id: '1', title: 'Complete 30-min workout', category: 'Fitness', progress: 4, target: 7, unit: 'days/week', streak: 4, isCompleted: false },
            { id: '3', title: 'Study 4h focused daily', category: 'Study', progress: 3, target: 4, unit: 'hours', streak: 5, isCompleted: false },
            { id: '5', title: 'Meditate for 10 minutes', category: 'Wellbeing', progress: 0, target: 10, unit: 'minutes', streak: 0, isCompleted: false },
          );
        }
        setGoals(generatedGoals);
      } catch {
        setGoals([
          { id: '1', title: 'Complete 30-min workout', category: 'Fitness', progress: 4, target: 7, unit: 'days/week', streak: 4, isCompleted: false },
          { id: '3', title: 'Study 4h focused daily', category: 'Study', progress: 3, target: 4, unit: 'hours', streak: 5, isCompleted: false },
          { id: '5', title: 'Meditate for 10 minutes', category: 'Wellbeing', progress: 0, target: 10, unit: 'minutes', streak: 0, isCompleted: false },
        ]);
      }
    };
    loadGoals();
  }, []);

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g =>
      g.id === id ? { ...g, isCompleted: !g.isCompleted, progress: !g.isCompleted ? g.target : Math.floor(g.target * 0.5) } : g
    ));
  };

  const startEdit = (goal: Goal) => {
    setEditingId(goal.id);
    setEditData({ title: goal.title, category: goal.category, progress: goal.progress, target: goal.target, unit: goal.unit, streak: goal.streak });
  };

  const saveEdit = (id: string) => {
    setGoals(prev => prev.map(g =>
      g.id === id ? { ...g, ...editData, isCompleted: (editData.progress || 0) >= (editData.target || g.target) } : g
    ));
    setEditingId(null);
    setEditData({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    setEditingId(null);
  };

  const incrementProgress = (id: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id !== id) return g;
      const newProgress = Math.min(g.progress + 1, g.target);
      return { ...g, progress: newProgress, isCompleted: newProgress >= g.target, streak: g.streak + (newProgress > g.progress ? 1 : 0) };
    }));
  };

  const addGoal = () => {
    if (!newGoal.title.trim()) return;
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      category: newGoal.category,
      progress: 0,
      target: newGoal.target,
      unit: newGoal.unit,
      streak: 0,
      isCompleted: false,
    };
    setGoals(prev => [...prev, goal]);
    setNewGoal({ title: '', category: 'Fitness', target: 7, unit: 'days' });
    setShowAddForm(false);
  };

  const completedCount = goals.filter(g => g.isCompleted).length;
  const totalStreak = goals.reduce((max, g) => Math.max(max, g.streak), 0);

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      Fitness: '#22d3ee', Study: '#a855f7', Wellbeing: '#f59e0b',
      Consistency: '#10b981', Career: '#6366f1', General: '#64748b'
    };
    return colors[cat] || '#6366f1';
  };

  return (
    <div className="goals-layout">
      <Sidebar />
      <div className="goals-content">
        <header className="goals-header">
          <div className="goals-header-text">
            <h1><Target size={32} /> My Goals</h1>
            <p>Track your progress, build streaks, and crush your targets.</p>
          </div>
          <button className="add-goal-btn" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus size={20} /> New Goal
          </button>
        </header>

        {/* Stats Row */}
        <div className="goals-stats-row">
          <div className="goal-stat-card">
            <Trophy size={24} className="stat-icon gold" />
            <div>
              <div className="stat-value">{completedCount}/{goals.length}</div>
              <div className="stat-label">Goals Completed</div>
            </div>
          </div>
          <div className="goal-stat-card">
            <Flame size={24} className="stat-icon fire" />
            <div>
              <div className="stat-value">{totalStreak} Days</div>
              <div className="stat-label">Longest Streak</div>
            </div>
          </div>
          <div className="goal-stat-card">
            <TrendingUp size={24} className="stat-icon green" />
            <div>
              <div className="stat-value">{goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0}%</div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Add Goal Form */}
        {showAddForm && (
          <div className="add-goal-form">
            <h3><Sparkles size={20} /> Create New Goal</h3>
            <div className="form-row">
              <input
                type="text"
                placeholder="What do you want to achieve?"
                value={newGoal.title}
                onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
              />
              <select value={newGoal.category} onChange={e => setNewGoal({ ...newGoal, category: e.target.value })}>
                <option value="Fitness">Fitness</option>
                <option value="Study">Study</option>
                <option value="Wellbeing">Wellbeing</option>
                <option value="Career">Career</option>
                <option value="Consistency">Consistency</option>
              </select>
              <input
                type="number"
                placeholder="Target"
                value={newGoal.target}
                onChange={e => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 1 })}
                min={1}
                className="target-input"
              />
              <input
                type="text"
                placeholder="Unit (e.g., days, hours)"
                value={newGoal.unit}
                onChange={e => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="unit-input"
              />
              <button onClick={addGoal} className="btn-create">Create</button>
            </div>
          </div>
        )}

        {/* Goals Grid */}
        <div className="goals-grid">
          {goals.map(goal => (
            <div key={goal.id} className={`goal-item-card ${goal.isCompleted ? 'completed' : ''} ${editingId === goal.id ? 'editing' : ''}`}>
              {editingId === goal.id ? (
                /* === EDIT MODE === */
                <div className="goal-edit-mode">
                  <div className="edit-header">
                    <span className="edit-badge">Editing</span>
                    <div className="edit-actions">
                      <button className="edit-action-btn save" onClick={() => saveEdit(goal.id)} title="Save"><Save size={16} /></button>
                      <button className="edit-action-btn cancel" onClick={cancelEdit} title="Cancel"><X size={16} /></button>
                      <button className="edit-action-btn delete" onClick={() => deleteGoal(goal.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <div className="edit-fields">
                    <label>Title</label>
                    <input type="text" value={editData.title || ''} onChange={e => setEditData({ ...editData, title: e.target.value })} />
                    <label>Category</label>
                    <select value={editData.category || ''} onChange={e => setEditData({ ...editData, category: e.target.value })}>
                      <option value="Fitness">Fitness</option>
                      <option value="Study">Study</option>
                      <option value="Wellbeing">Wellbeing</option>
                      <option value="Career">Career</option>
                      <option value="Consistency">Consistency</option>
                    </select>
                    <div className="edit-row">
                      <div>
                        <label>Progress</label>
                        <input type="number" value={editData.progress || 0} onChange={e => setEditData({ ...editData, progress: parseInt(e.target.value) || 0 })} min={0} />
                      </div>
                      <div>
                        <label>Target</label>
                        <input type="number" value={editData.target || 1} onChange={e => setEditData({ ...editData, target: parseInt(e.target.value) || 1 })} min={1} />
                      </div>
                    </div>
                    <div className="edit-row">
                      <div>
                        <label>Unit</label>
                        <input type="text" value={editData.unit || ''} onChange={e => setEditData({ ...editData, unit: e.target.value })} />
                      </div>
                      <div>
                        <label>Streak (days)</label>
                        <input type="number" value={editData.streak || 0} onChange={e => setEditData({ ...editData, streak: parseInt(e.target.value) || 0 })} min={0} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* === VIEW MODE === */
                <>
                  <div className="goal-item-header">
                    <span className="goal-category-badge" style={{ backgroundColor: getCategoryColor(goal.category) + '22', color: getCategoryColor(goal.category), borderColor: getCategoryColor(goal.category) + '44' }}>
                      {goal.category}
                    </span>
                    <div className="goal-header-actions">
                      <button className="goal-edit-btn" onClick={() => startEdit(goal)} title="Edit goal">
                        <Edit3 size={16} />
                      </button>
                      <button className="goal-check-btn" onClick={() => toggleGoal(goal.id)}>
                        {goal.isCompleted ? <CheckCircle size={24} className="check-done" /> : <Circle size={24} className="check-pending" />}
                      </button>
                    </div>
                  </div>
                  <h3 className="goal-item-title">{goal.title}</h3>
                  <div className="goal-progress-section">
                    <div className="goal-progress-bar">
                      <div
                        className="goal-progress-fill"
                        style={{
                          width: `${Math.min(100, (goal.progress / goal.target) * 100)}%`,
                          backgroundColor: getCategoryColor(goal.category)
                        }}
                      />
                    </div>
                    <div className="goal-progress-info">
                      <span className="goal-progress-text">{goal.progress}/{goal.target} {goal.unit}</span>
                      {!goal.isCompleted && (
                        <button className="increment-btn" onClick={() => incrementProgress(goal.id)} title="Log +1 progress">
                          +1
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="goal-item-footer">
                    {goal.streak > 0 && (
                      <span className="goal-streak"><Flame size={14} /> {goal.streak} day streak</span>
                    )}
                    <span className="goal-time"><Clock size={14} /> This week</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default GoalsPage;
