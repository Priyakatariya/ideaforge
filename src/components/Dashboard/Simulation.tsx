import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Sidebar from './Sidebar';
import API from '../../api';
import './Simulation.css';
import { Sparkles, TrendingUp, AlertCircle } from 'lucide-react';

interface DataPoint {
  day: number;
  productivity: number;
  health: number;
  optimizedProductivity: number;
  optimizedHealth: number;
}

const Simulation: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        const res = await API.get('/simulation');
        setData(res.data.dataPoints);
        setInsights(res.data.insights);
      } catch (err) {
        console.error('Failed to fetch simulation data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSimulation();
  }, []);

  if (loading) return <div className="loading">Simulating Future Outcomes...</div>;

  return (
    <div className="simulation-layout">
      <Sidebar />
      <div className="simulation-content">
        <header className="simulation-header">
          <h1><Sparkles className="icon-sparkle" /> Future Mirror Simulation</h1>
          <p>Predicting your growth trajectory for the next 30 days based on current behaviors.</p>
        </header>

        <div className="simulation-grid">
          <section className="chart-container main-projection">
            <div className="chart-header">
              <h2>Productivity Projection</h2>
              <div className="chart-legend">
                <span className="dot current"></span> Current Path
                <span className="dot optimized"></span> Optimized Path
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="productivity" stroke="#8884d8" fillOpacity={1} fill="url(#colorCurrent)" name="Current Productivity" />
                <Area type="monotone" dataKey="optimizedProductivity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorOptimized)" name="AI Optimized" />
              </AreaChart>
            </ResponsiveContainer>
          </section>

          <section className="chart-container health-projection">
             <h2>Health & Vitality</h2>
             <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="health" stroke="#ff4d4d" strokeWidth={2} dot={false} name="Current Health" />
                <Line type="monotone" dataKey="optimizedHealth" stroke="#00f2fe" strokeWidth={2} dot={false} name="AI Optimized" />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <section className="insights-panel">
            <h3><TrendingUp size={20} /> Simulation Insights</h3>
            <div className="insights-list">
              {insights.map((insight, idx) => (
                <div key={idx} className="insight-item">
                  <AlertCircle size={16} className="insight-icon" />
                  <p>{insight}</p>
                </div>
              ))}
              <div className="insight-item highlight">
                <Sparkles size={16} className="insight-icon" />
                <p>By following the optimized path, you will reach peak productivity in 18 days.</p>
              </div>
            </div>
            
            <div className="simulation-summary">
              <div className="summary-card">
                <h4>Predicted Efficiency</h4>
                <div className="summary-value">+24%</div>
              </div>
              <div className="summary-card">
                <h4>Energy Levels</h4>
                <div className="summary-value high">Optimal</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
