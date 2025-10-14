import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const OnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User goal:', goal);
    // In a real app, this data would be saved
    // Then, prompt to connect a data source
    // For now, let's go straight to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <h1>Tell us your main goal.</h1>
      <form onSubmit={handleComplete} className="auth-form">
        <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
          <option value="">Select a goal</option>
          <option value="career-growth">Career Growth</option>
          <option value="health-fitness">Health & Fitness</option>
          <option value="education">Education</option>
        </select>
        <button type="submit" className="auth-button">Continue</button>
      </form>
    </div>
  );
};

export default OnboardingForm;



