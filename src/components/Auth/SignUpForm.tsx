import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Common styles for both auth forms

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Signing up with:', email, password);
    // After successful sign-up, redirect to onboarding
    navigate('/onboarding');
  };

  return (
    <div className="auth-container">
      <h1>Create Your Account</h1>
      <form onSubmit={handleSignUp} className="auth-form">
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
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <div className="social-login">
        <p>or</p>
        <button className="social-button">Sign Up with Google</button>
        <button className="social-button">Sign Up with Apple</button>
      </div>
      <p className="auth-link-text">
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

export default SignUpForm;