import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

// The component now accepts a function prop
interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for login
    console.log('Logging in with:', email, password);
    
    // On successful login...
    onLogin(); // Call the prop function to update the app's state
    navigate('/dashboard'); // Redirect to the dashboard
  };

  return (
    <div className="auth-container">
      <h1>Log In to Your Account</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="auth-button">Log In</button>
      </form>
      <div className="social-login">
        <p>or</p>
        <button className="social-button">Log In with Google</button>
        <button className="social-button">Log In with Apple</button>
      </div>
      <p className="auth-link-text">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginForm;