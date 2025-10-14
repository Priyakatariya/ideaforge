import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Define props interface
interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="header-container">
      <nav className="navbar">
        <Link to="/" className="veritas-logo">
          Veritas
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          {isLoggedIn && (
            <li><Link to="/dashboard">Dashboard</Link></li>
          )}
        </ul>

        <div className="auth-actions">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="login-link logout-button"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login" className="login-link">Log In</Link>
              <Link to="/signup" className="cta-button">Get Started</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
