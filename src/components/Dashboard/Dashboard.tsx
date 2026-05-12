import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Chatbot from './Chatbot';
import API from '../../api';
import { Sparkles } from 'lucide-react';

interface User {
  name: string;
}

interface OnboardingData {
  goals: string[];
  wakeUpTime: string;
  workDuration: number;
  exerciseFrequency: string;
  currentMood: string;
  stressLevel: number;
  journalEntry: string;
}

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User>({ name: 'User' });
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.name) setUser(storedUser);

    const fetchData = async () => {
      try {
        const res = await API.get('/onboarding');
        setOnboardingData(res.data);
      } catch (err) {
        console.error('Failed to fetch onboarding data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Simulation Logic (Digital Twin)
  const calculateInsights = () => {
    if (!onboardingData) return { productivity: 0, health: 0, prediction: '' };

    let productivity = onboardingData.workDuration * 10;
    let health = 50;

    if (onboardingData.exerciseFrequency === 'daily') health += 40;
    else if (onboardingData.exerciseFrequency.includes('4-5')) health += 30;
    else if (onboardingData.exerciseFrequency.includes('2-3')) health += 20;

    health -= onboardingData.stressLevel * 2;

    let prediction = '';
    if (onboardingData.stressLevel > 7) {
      prediction = "Your high stress levels indicate a potential burnout risk within 2 weeks. Veritas suggests increasing 'Wellbeing' focus.";
    } else if (health > 80 && productivity > 60) {
      prediction = "Maintaining this rhythm will lead to a 20% increase in goal achievement by next month!";
    } else {
      prediction = "Your daily habits are stabilizing. Consider adding 30 mins of focused work to accelerate your progress.";
    }

    return { productivity, health, prediction };
  };

  const insights = calculateInsights();

  if (loading) return <div className="loading">Initializing Your Digital Twin...</div>;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {user.name}!</h1>
          <p>Your AI Digital Twin is analyzing your latest data.</p>
        </header>

        <section className="gamification-section">
          <div className="quest-card">
            <div className="quest-header">
              <Sparkles size={20} className="quest-icon" />
              <h3>Daily Quest</h3>
            </div>
            <p>Complete 2 hours of deep work before 2 PM to boost your focus streak!</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '45%' }}></div>
            </div>
            <span className="progress-text">45% Completed</span>
          </div>
          
          <div className="streak-card">
            <h3>Focus Streak</h3>
            <div className="streak-value">5 Days</div>
            <p className="streak-sub">You're in the top 10% this week!</p>
          </div>
        </section>

        <section className="metrics-section">
          <div className="metric-card">
            <h3>Focused Work</h3>
            <p className="metric-value">{onboardingData?.workDuration}h</p>
            <p className="metric-label">Daily Capacity</p>
          </div>
          <div className="metric-card">
            <h3>Health Score</h3>
            <p className="metric-value">{insights.health}/100</p>
            <p className="metric-label">Based on {onboardingData?.exerciseFrequency} exercise</p>
          </div>
          <div className="metric-card">
            <h3>Stress Level</h3>
            <p className="metric-value">{onboardingData?.stressLevel}/10</p>
            <p className="metric-label">Self-reported mood: {onboardingData?.currentMood}</p>
          </div>
        </section>

        <section className="predictive-insights-section">
          <h2>Predictive Simulation</h2>
          <div className="insight-card highlight">
            <h3>AI Future Projection</h3>
            <p>{insights.prediction}</p>
          </div>
        </section>

        <section className="goals-section">
          <h2>Your Focus Areas</h2>
          <div className="goals-grid">
            {onboardingData?.goals.map((goal) => (
              <div key={goal} className="goal-tag">
                {goal.charAt(0).toUpperCase() + goal.slice(1)}
              </div>
            ))}
          </div>
        </section>

        {onboardingData?.journalEntry && (
          <section className="journal-section">
            <h2>Latest Reflection</h2>
            <div className="journal-card">
              <p>"{onboardingData.journalEntry}"</p>
            </div>
          </section>
        )}
      </div>
      <Chatbot />
    </div>
  );
};

export default UserDashboard;