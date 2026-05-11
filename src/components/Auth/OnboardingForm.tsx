import React, { useState, useCallback, type FC, type ReactNode } from 'react';
import { Settings, CheckCircle, Clock, Heart, BookOpen, Activity, ArrowRight, CornerDownLeft } from 'lucide-react';
import API from '../../api';
import './OnboardingForm.css'; // Import your plain CSS

// --- Type Definitions ---
interface GradientTextProps {
  children: ReactNode;
}
interface ProgressIndicatorProps {
  currentStep: number;
}
interface OnboardingFormProps {
  onComplete: () => void;
}

// --- Sub-Components ---
const GradientText: FC<GradientTextProps> = ({ children }) => (
  <span className="gradient-text">{children}</span>
);

const ProgressIndicator: FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, title: 'Goals', icon: BookOpen },
    { id: 2, title: 'Routine', icon: Clock },
    { id: 3, title: 'Mood', icon: Heart }
  ];
  return (
    <div className="progress-indicator">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        return (
          <React.Fragment key={step.id}>
            <div className={`progress-step ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}>
              <div className="progress-icon">
                {isCompleted ? <CheckCircle size={20} color="white" /> : <Icon size={20} color="white" />}
              </div>
              <span className="progress-title">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`progress-line ${isCompleted ? 'is-completed' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// --- Main Component ---
const OnboardingForm: FC<OnboardingFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goals: [] as string[],
    wakeUpTime: '07:00',
    workDuration: 4,
    exerciseFrequency: '2-3',
    currentMood: 'focused',
    stressLevel: 5,
    journalEntry: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'range' ? parseInt(value) : value
      }));
    },
    []
  );

  const handleGoalSelect = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const nextStep = () => {
    if (step === 1 && formData.goals.length === 0) {
      setFormError('Please select at least one goal to continue.');
      return;
    }
    setFormError('');
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await API.post('/onboarding', formData);
      console.log('Server response:', response.data);
      setMessage('✅ Setup Complete! Redirecting...');
      setTimeout(onComplete, 1500);
    } catch (error: any) {
      console.error('Error saving data:', error);
      setMessage(`❌ Error: ${error.response?.data?.message || 'Could not save data.'}`);
    } finally {
      setLoading(false);
    }
  };

  const getStepClassName = (stepNumber: number) => {
    if (stepNumber === step) return 'visible';
    if (stepNumber < step) return 'hidden-left';
    return 'hidden-right';
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <h1 className="onboarding-title">
          Welcome, {user.name || 'User'}! Let's <GradientText>Personalize</GradientText> Your Twin
        </h1>
        <p className="header-subtitle">
          Just three quick steps to set up your preferences.
        </p>
      </div>

      <ProgressIndicator currentStep={step} />

      <form onSubmit={handleSubmit} className="onboarding-form">
        <div className="form-step-container">
          {/* STEP 1 */}
          <div className={`form-step ${getStepClassName(1)}`}>
            <h2 className="step-title">Step 1: Your Primary Goals</h2>
            <p className="step-subtitle">Select one or more areas you want to focus on.</p>
            <div className="goal-cards-grid">
              {[
                { goal: 'fitness', icon: Activity, title: 'Fitness & Health', desc: 'Build strength and improve endurance.' },
                { goal: 'learning', icon: BookOpen, title: 'Learning & Skills', desc: 'Master new topics or languages.' },
                { goal: 'wellbeing', icon: Heart, title: 'Mental Wellbeing', desc: 'Reduce stress and improve sleep.' }
              ].map(({ goal, icon: Icon, title, desc }) => (
                <div key={goal} onClick={() => handleGoalSelect(goal)} className={`goal-card ${formData.goals.includes(goal) ? 'is-selected' : ''}`}>
                  <Icon size={40} className="icon" />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
            {formError && <p className="form-error">{formError}</p>}
          </div>

          {/* STEP 2 */}
          <div className={`form-step ${getStepClassName(2)}`}>
            <h2 className="step-title">Step 2: Your Daily Routine</h2>
            <div className="form-fields-container">
              <div className="form-group">
                <label htmlFor="wakeUpTime">Typical Wake-Up Time</label>
                <input type="time" id="wakeUpTime" name="wakeUpTime" value={formData.wakeUpTime} onChange={handleChange} required className="form-input"/>
              </div>

              <div className="form-group">
                <label htmlFor="workDuration">Focused Work Duration: <span className="form-label-highlight">{formData.workDuration} hrs</span></label>
                <input type="range" id="workDuration" name="workDuration" min="1" max="10" value={formData.workDuration} onChange={handleChange} className="custom-slider"/>
              </div>

              <div className="form-group">
                <label htmlFor="exerciseFrequency">Exercise Frequency</label>
                <select id="exerciseFrequency" name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} className="form-select">
                  <option value="rarely">Rarely</option>
                  <option value="once">Once a week</option>
                  <option value="2-3">2-3 times/week</option>
                  <option value="4-5">4-5 times/week</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className={`form-step ${getStepClassName(3)}`}>
            <h2 className="step-title">Step 3: Your Current State</h2>
            <div className="form-fields-container">
              <div className="form-group">
                <label htmlFor="currentMood">How are you generally feeling?</label>
                <select id="currentMood" name="currentMood" value={formData.currentMood} onChange={handleChange} className="form-select">
                  <option value="energetic">Energetic ⚡</option>
                  <option value="focused">Focused 🧐</option>
                  <option value="balanced">Balanced 😌</option>
                  <option value="stressed">Stressed 😩</option>
                  <option value="tired">Tired 😴</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stressLevel">Stress Level: <span className="form-label-highlight">{formData.stressLevel}</span></label>
                <input type="range" id="stressLevel" name="stressLevel" min="1" max="10" value={formData.stressLevel} onChange={handleChange} className="custom-slider"/>
              </div>

              <div className="form-group">
                <label htmlFor="journalEntry">Optional Journal Entry</label>
                <textarea id="journalEntry" name="journalEntry" value={formData.journalEntry} onChange={handleChange} className="form-textarea" placeholder="e.g., I want to start meditating daily."/>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="form-navigation">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="btn btn-secondary">
              <CornerDownLeft size={18} />
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="btn btn-primary">
              Continue <ArrowRight size={18} />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Finish Setup'} {!loading && <Settings size={18} />}
            </button>
          )}
        </div>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default OnboardingForm;
