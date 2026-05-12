import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { LayoutDashboard, Target, Zap, BarChart3, Settings, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar-container">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">Veritas</Link>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/dashboard"><LayoutDashboard size={18} /> Dashboard</Link>
        </li>
        <li>
          <Link to="/goals"><Target size={18} /> Goals</Link>
        </li>
        <li>
          <Link to="/simulation"><Zap size={18} /> Digital Twin</Link>
        </li>
        <li>
          <Link to="/analytics"><BarChart3 size={18} /> Analytics</Link>
        </li>
        <li>
          <Link to="/settings"><Settings size={18} /> Settings</Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/';
        }}>
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;