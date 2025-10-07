import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar-container">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">Veritas</Link>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/goals">Goals</Link>
        </li>
        <li>
          <Link to="/integrations">Integrations</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link to="/logout" className="logout-link">Log Out</Link>
      </div>
    </nav>
  );
};

export default Sidebar;