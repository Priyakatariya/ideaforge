import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Chatbot from './Chatbot';
import API from '../../api';
import { BarChart3, TrendingUp, Brain, Zap, Moon, Flame, Heart, Activity, Clock, Target } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import './Analytics.css';

const AnalyticsPage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/onboarding');
        setUserData(res.data);
      } catch {
        setUserData({
          goals: ['fitness', 'learning'],
          workDuration: 4,
          stressLevel: 5,
          exerciseFrequency: '2-3',
          currentMood: 'focused',
          sleepHours: 7,
          energyLevel: 6,
          wakeUpTime: '07:00'
        });
      }
    };
    fetchData();
  }, []);

  const workHours = userData?.workDuration || 4;
  const stress = userData?.stressLevel || 5;
  const energy = userData?.energyLevel || 6;
  const sleep = userData?.sleepHours || 7;

  // Generate weekly productivity data
  const weeklyProductivity = [
    { day: 'Mon', hours: Math.max(1, workHours - 1.5 + Math.random() * 2), target: workHours },
    { day: 'Tue', hours: Math.max(1, workHours - 0.5 + Math.random() * 1.5), target: workHours },
    { day: 'Wed', hours: Math.max(1, workHours + Math.random() * 1), target: workHours },
    { day: 'Thu', hours: Math.max(1, workHours - 1 + Math.random() * 2), target: workHours },
    { day: 'Fri', hours: Math.max(1, workHours + 0.5 + Math.random()), target: workHours },
    { day: 'Sat', hours: Math.max(0.5, workHours - 2 + Math.random() * 1.5), target: workHours },
    { day: 'Sun', hours: Math.max(0.5, workHours - 2.5 + Math.random()), target: workHours },
  ].map(d => ({ ...d, hours: Math.round(d.hours * 10) / 10 }));

  // Mood trend data
  const moodMap: Record<string, number> = { energetic: 9, focused: 8, balanced: 7, stressed: 4, tired: 3 };
  const baseMood = moodMap[userData?.currentMood || 'balanced'] || 7;
  const moodTrend = [
    { day: 'Mon', mood: Math.min(10, baseMood - 1), energy: Math.min(10, energy - 1) },
    { day: 'Tue', mood: Math.min(10, baseMood + 1), energy: Math.min(10, energy) },
    { day: 'Wed', mood: baseMood, energy: Math.min(10, energy + 1) },
    { day: 'Thu', mood: Math.min(10, baseMood - 2), energy: Math.max(1, energy - 2) },
    { day: 'Fri', mood: Math.min(10, baseMood + 1), energy: Math.min(10, energy + 1) },
    { day: 'Sat', mood: Math.min(10, baseMood + 2), energy: Math.min(10, energy + 2) },
    { day: 'Sun', mood: Math.min(10, baseMood + 1), energy: Math.min(10, energy) },
  ];

  // Sleep data
  const sleepData = [
    { day: 'Mon', hours: Math.max(4, sleep - 1.5), quality: 65 },
    { day: 'Tue', hours: Math.max(4, sleep - 0.5), quality: 72 },
    { day: 'Wed', hours: sleep, quality: 80 },
    { day: 'Thu', hours: Math.max(4, sleep + 0.5), quality: 85 },
    { day: 'Fri', hours: Math.max(4, sleep - 1), quality: 70 },
    { day: 'Sat', hours: Math.min(10, sleep + 1.5), quality: 90 },
    { day: 'Sun', hours: Math.min(10, sleep + 1), quality: 88 },
  ];

  // Radar chart - overall scores
  const overallScores = [
    { metric: 'Productivity', score: Math.min(100, workHours * 15), fullMark: 100 },
    { metric: 'Health', score: Math.min(100, (10 - stress) * 12), fullMark: 100 },
    { metric: 'Sleep', score: Math.min(100, sleep * 13), fullMark: 100 },
    { metric: 'Energy', score: Math.min(100, energy * 12), fullMark: 100 },
    { metric: 'Consistency', score: 72, fullMark: 100 },
    { metric: 'Focus', score: Math.min(100, baseMood * 11), fullMark: 100 },
  ];

  // Category breakdown for pie chart
  const categoryData = [
    { name: 'Study', value: 35, color: '#a855f7' },
    { name: 'Health', value: 25, color: '#22d3ee' },
    { name: 'Wellness', value: 20, color: '#f59e0b' },
    { name: 'Habits', value: 20, color: '#10b981' },
  ];

  // Insights derived from data
  const productivityScore = Math.round(workHours * 15);
  const healthScore = Math.round((10 - stress) * 12);
  const overallScore = Math.round((productivityScore + healthScore + sleep * 13 + energy * 12) / 4);

  const insights = [
    {
      icon: TrendingUp,
      title: 'Productivity Trend',
      value: `${workHours}h avg`,
      change: '+12%',
      positive: true,
      detail: 'Your focus time has been improving consistently'
    },
    {
      icon: Heart,
      title: 'Stress Level',
      value: `${stress}/10`,
      change: stress > 6 ? '+8%' : '-15%',
      positive: stress <= 6,
      detail: stress > 6 ? 'Consider adding breaks to reduce stress' : 'Great job managing your stress!'
    },
    {
      icon: Moon,
      title: 'Sleep Average',
      value: `${sleep}h`,
      change: sleep >= 7 ? 'Healthy' : 'Low',
      positive: sleep >= 7,
      detail: sleep >= 7 ? 'Your sleep is in the healthy range' : 'Try to get at least 7 hours of sleep'
    },
    {
      icon: Zap,
      title: 'Energy Score',
      value: `${energy}/10`,
      change: energy >= 6 ? 'Good' : 'Low',
      positive: energy >= 6,
      detail: 'Energy correlates with your exercise and sleep patterns'
    },
  ];

  return (
    <div className="analytics-layout">
      <Sidebar />
      <div className="analytics-content">
        <header className="analytics-header">
          <div>
            <h1><BarChart3 size={32} /> Analytics</h1>
            <p>Your personal growth metrics, visualized by your Digital Twin.</p>
          </div>
          <div className="time-toggle">
            <button className={timeRange === 'week' ? 'active' : ''} onClick={() => setTimeRange('week')}>This Week</button>
            <button className={timeRange === 'month' ? 'active' : ''} onClick={() => setTimeRange('month')}>This Month</button>
          </div>
        </header>

        {/* Overall Score */}
        <div className="overall-score-card">
          <div className="score-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                strokeDasharray={`${overallScore * 2.64} ${264 - overallScore * 2.64}`}
                strokeDashoffset="66" strokeLinecap="round" />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="score-number">{overallScore}</div>
          </div>
          <div className="score-info">
            <h2>Overall Wellness Score</h2>
            <p>Based on your productivity, health, sleep, and energy data.</p>
            <div className="score-breakdown">
              <span className="sb-item"><Activity size={14} /> Productivity: {productivityScore}%</span>
              <span className="sb-item"><Heart size={14} /> Health: {healthScore}%</span>
              <span className="sb-item"><Moon size={14} /> Sleep: {Math.round(sleep * 13)}%</span>
              <span className="sb-item"><Zap size={14} /> Energy: {Math.round(energy * 12)}%</span>
            </div>
          </div>
        </div>

        {/* Insights Cards */}
        <div className="insights-row">
          {insights.map((insight, i) => (
            <div key={i} className="insight-card">
              <div className="insight-top">
                <insight.icon size={20} className="insight-icon" />
                <span className={`insight-change ${insight.positive ? 'positive' : 'negative'}`}>{insight.change}</span>
              </div>
              <div className="insight-value">{insight.value}</div>
              <div className="insight-title">{insight.title}</div>
              <div className="insight-detail">{insight.detail}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Productivity Chart */}
          <div className="chart-card full-width">
            <h3><Clock size={18} /> Weekly Productivity</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyProductivity} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', color: '#f1f5f9' }} />
                <Bar dataKey="hours" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                <Line dataKey="target" stroke="#f59e0b" strokeDasharray="5 5" dot={false} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Mood & Energy Chart */}
          <div className="chart-card">
            <h3><Brain size={18} /> Mood & Energy</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={moodTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 10]} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', color: '#f1f5f9' }} />
                <Area type="monotone" dataKey="mood" stroke="#a855f7" fill="rgba(168,85,247,0.15)" strokeWidth={2} />
                <Area type="monotone" dataKey="energy" stroke="#22d3ee" fill="rgba(34,211,238,0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Sleep Chart */}
          <div className="chart-card">
            <h3><Moon size={18} /> Sleep Patterns</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', color: '#f1f5f9' }} />
                <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
                <Line type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="chart-card">
            <h3><Target size={18} /> Overall Performance</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={overallScores}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.05)" fontSize={10} />
                <Radar dataKey="score" stroke="#6366f1" fill="rgba(99,102,241,0.25)" fillOpacity={0.6} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="chart-card">
            <h3><Flame size={18} /> Focus Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categoryData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', color: '#f1f5f9' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="ai-recommendations">
          <h3><Brain size={20} /> AI Twin Recommendations</h3>
          <div className="rec-grid">
            <div className="rec-card">
              <span className="rec-emoji">🎯</span>
              <div>
                <strong>Optimize Focus Time</strong>
                <p>Your peak hours are in the morning. Schedule deep work before 12 PM for 23% better output.</p>
              </div>
            </div>
            <div className="rec-card">
              <span className="rec-emoji">😴</span>
              <div>
                <strong>Sleep Consistency</strong>
                <p>{sleep < 7 ? 'You need more sleep. Aim for 7-8 hours to boost cognitive performance.' : 'Your sleep is good! Maintain this pattern for sustained energy.'}</p>
              </div>
            </div>
            <div className="rec-card">
              <span className="rec-emoji">🧘</span>
              <div>
                <strong>Stress Management</strong>
                <p>{stress > 6 ? 'High stress detected. Try 5-min breathing exercises between study sessions.' : 'Stress levels are manageable. Keep up the good routine!'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default AnalyticsPage;
