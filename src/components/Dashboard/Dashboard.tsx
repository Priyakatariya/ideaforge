import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';

interface User {
  name: string;
}

const UserDashboard: React.FC = () => {
  // Simulating user data and key metrics
  const [user, setUser] = useState<User>({ name: 'Jane' });
  const metrics = {
    focusTime: '4h 15m',
    goalsCompleted: 3,
    healthScore: 8.5,
  };
  const dailyTasks = [
    'Take a 10-minute break in the afternoon',
    'Review tomorrow\'s calendar at 5 PM',
    'Meditate for 5 minutes after dinner',
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {user.name}!</h1>
          <p>Here are your personalized insights for the day.</p>
        </header>

        <section className="metrics-section">
          <div className="metric-card">
            <h3>Today's Focus Time</h3>
            <p>{metrics.focusTime}</p>
          </div>
          <div className="metric-card">
            <h3>Weekly Goals Completed</h3>
            <p>{metrics.goalsCompleted}</p>
          </div>
          <div className="metric-card">
            <h3>Health Score</h3>
            <p>{metrics.healthScore}</p>
          </div>
        </section>

        <section className="predictive-insights-section">
          <h2>Predictive Insights</h2>
          <div className="insight-card">
            <p>Your recent sleep pattern suggests a **15% drop in productivity** tomorrow. Try taking a **10-minute break** in the afternoon to recharge.</p>
          </div>
        </section>

        <section className="daily-tasks-section">
          <h2>Daily Tasks</h2>
          <ul className="tasks-list">
            {dailyTasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;