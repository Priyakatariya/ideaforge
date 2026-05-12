import React, { useState, useCallback, type FC, type ReactNode } from 'react';
import { Settings, CheckCircle, Clock, Heart, BookOpen, Activity, ArrowRight, CornerDownLeft, Brain, Dumbbell, GraduationCap, Moon, Coffee, Flame, Target } from 'lucide-react';
import API from '../../api';
import './OnboardingForm.css';

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
    { id: 1, title: 'Goals', icon: Target },
    { id: 2, title: 'Health & Fitness', icon: Dumbbell },
    { id: 3, title: 'Study & Work', icon: GraduationCap },
    { id: 4, title: 'Mindset', icon: Brain }
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
    // Step 1 - Goals
    goals: [] as string[],
    // Step 2 - Health & Fitness
    wakeUpTime: '07:00',
    sleepHours: 7,
    exerciseFrequency: '2-3',
    waterIntake: 6,
    // Step 3 - Study & Work
    workDuration: 4,
    preferredStudyTime: 'morning',
    breakFrequency: 'every-hour',
    primarySkill: 'coding',
    // Step 4 - Mindset
    currentMood: 'focused',
    stressLevel: 5,
    energyLevel: 6,
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
    if (step < 4) setStep(step + 1);
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
      setMessage('✅ Your AI Digital Twin is ready! Redirecting...');
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
          Welcome, {user.name || 'User'}! Let's <GradientText>Build</GradientText> Your Twin
        </h1>
        <p className="header-subtitle">
          Four quick steps to calibrate your personalized AI companion.
        </p>
      </div>

      <ProgressIndicator currentStep={step} />

      <form onSubmit={handleSubmit} className="onboarding-form">
        <div className="form-step-container">
          {/* STEP 1 — GOALS */}
          <div className={`form-step ${getStepClassName(1)}`}>
            <h2 className="step-title"><Target size={28} className="step-icon" /> What's Your Mission?</h2>
            <p className="step-subtitle">Select the areas you want Veritas to focus on. Pick one or more.</p>
            <div className="goal-cards-grid">
              {[
                { goal: 'fitness', icon: Dumbbell, title: 'Fitness & Health', desc: 'Build strength, track workouts, and optimize nutrition.' },
                { goal: 'learning', icon: GraduationCap, title: 'Study & Academics', desc: 'Ace exams, build study habits, and reduce burnout.' },
                { goal: 'career', icon: Flame, title: 'Career Growth', desc: 'Boost productivity, learn new skills, and get promoted.' },
                { goal: 'wellbeing', icon: Heart, title: 'Mental Wellbeing', desc: 'Manage stress, improve sleep, and build mindfulness.' },
                { goal: 'creativity', icon: Brain, title: 'Creativity & Side Projects', desc: 'Build side hustles, learn art, or start writing.' },
                { goal: 'consistency', icon: Activity, title: 'Consistency & Discipline', desc: 'Never break the chain. Build rock-solid daily habits.' }
              ].map(({ goal, icon: Icon, title, desc }) => (
                <div key={goal} onClick={() => handleGoalSelect(goal)} className={`goal-card ${formData.goals.includes(goal) ? 'is-selected' : ''}`}>
                  <Icon size={36} className="icon" />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
            {formError && <p className="form-error">{formError}</p>}
          </div>

          {/* STEP 2 — HEALTH & FITNESS */}
          <div className={`form-step ${getStepClassName(2)}`}>
            <h2 className="step-title"><Dumbbell size={28} className="step-icon" /> Your Body & Energy</h2>
            <p className="step-subtitle">Help us understand your physical routines so we can optimize your energy.</p>
            <div className="form-fields-container">
              <div className="form-group">
                <label htmlFor="wakeUpTime"><Moon size={16} className="label-icon" /> What time do you usually wake up?</label>
                <input type="time" id="wakeUpTime" name="wakeUpTime" value={formData.wakeUpTime} onChange={handleChange} required className="form-input"/>
              </div>

              <div className="form-group">
                <label htmlFor="sleepHours"><Moon size={16} className="label-icon" /> Average hours of sleep: <span className="form-label-highlight">{formData.sleepHours} hrs</span></label>
                <input type="range" id="sleepHours" name="sleepHours" min="3" max="12" value={formData.sleepHours} onChange={handleChange} className="custom-slider"/>
                <div className="slider-labels"><span>3h</span><span>12h</span></div>
              </div>

              <div className="form-group">
                <label htmlFor="exerciseFrequency"><Activity size={16} className="label-icon" /> How often do you exercise?</label>
                <select id="exerciseFrequency" name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} className="form-select">
                  <option value="rarely">Rarely / Never</option>
                  <option value="once">Once a week</option>
                  <option value="2-3">2-3 times/week</option>
                  <option value="4-5">4-5 times/week</option>
                  <option value="daily">Every day 💪</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="waterIntake"><Coffee size={16} className="label-icon" /> Glasses of water per day: <span className="form-label-highlight">{formData.waterIntake}</span></label>
                <input type="range" id="waterIntake" name="waterIntake" min="1" max="15" value={formData.waterIntake} onChange={handleChange} className="custom-slider"/>
                <div className="slider-labels"><span>1</span><span>15</span></div>
              </div>
            </div>
          </div>

          {/* STEP 3 — STUDY & WORK */}
          <div className={`form-step ${getStepClassName(3)}`}>
            <h2 className="step-title"><GraduationCap size={28} className="step-icon" /> Study & Productivity</h2>
            <p className="step-subtitle">Tell us about your work habits so we can predict your peak performance.</p>
            <div className="form-fields-container">
              <div className="form-group">
                <label htmlFor="workDuration"><Clock size={16} className="label-icon" /> Daily focused work/study hours: <span className="form-label-highlight">{formData.workDuration} hrs</span></label>
                <input type="range" id="workDuration" name="workDuration" min="1" max="12" value={formData.workDuration} onChange={handleChange} className="custom-slider"/>
                <div className="slider-labels"><span>1h</span><span>12h</span></div>
              </div>

              <div className="form-group">
                <label htmlFor="preferredStudyTime"><Coffee size={16} className="label-icon" /> When are you most productive?</label>
                <select id="preferredStudyTime" name="preferredStudyTime" value={formData.preferredStudyTime} onChange={handleChange} className="form-select">
                  <option value="early-morning">Early Morning (5-8 AM) 🌅</option>
                  <option value="morning">Morning (8-12 PM) ☀️</option>
                  <option value="afternoon">Afternoon (12-5 PM) 🌤️</option>
                  <option value="evening">Evening (5-9 PM) 🌆</option>
                  <option value="night">Night Owl (9 PM+) 🌙</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="breakFrequency"><Clock size={16} className="label-icon" /> How often do you take breaks?</label>
                <select id="breakFrequency" name="breakFrequency" value={formData.breakFrequency} onChange={handleChange} className="form-select">
                  <option value="pomodoro">Every 25 min (Pomodoro)</option>
                  <option value="every-hour">Every hour</option>
                  <option value="every-2-hours">Every 2 hours</option>
                  <option value="rarely">Rarely — I power through</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="primarySkill"><BookOpen size={16} className="label-icon" /> Primary area of study/work?</label>
                <select id="primarySkill" name="primarySkill" value={formData.primarySkill} onChange={handleChange} className="form-select">
                  <option value="coding">Coding / Software Dev</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical / Sciences</option>
                  <option value="arts">Arts / Humanities</option>
                  <option value="business">Business / Management</option>
                  <option value="design">Design / Creative</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* STEP 4 — MINDSET & MOOD */}
          <div className={`form-step ${getStepClassName(4)}`}>
            <h2 className="step-title"><Brain size={28} className="step-icon" /> Your Mindset Today</h2>
            <p className="step-subtitle">Help Veritas understand where your head is at right now.</p>
            <div className="form-fields-container">
              <div className="form-group">
                <label htmlFor="currentMood"><Heart size={16} className="label-icon" /> How are you feeling right now?</label>
                <div className="mood-selector">
                  {[
                    { value: 'energetic', emoji: '⚡', label: 'Energetic' },
                    { value: 'focused', emoji: '🎯', label: 'Focused' },
                    { value: 'balanced', emoji: '😌', label: 'Balanced' },
                    { value: 'stressed', emoji: '😩', label: 'Stressed' },
                    { value: 'tired', emoji: '😴', label: 'Tired' }
                  ].map(mood => (
                    <div
                      key={mood.value}
                      className={`mood-chip ${formData.currentMood === mood.value ? 'is-selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, currentMood: mood.value }))}
                    >
                      <span className="mood-emoji">{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="stressLevel">Stress Level: <span className="form-label-highlight">{formData.stressLevel}/10</span></label>
                <input type="range" id="stressLevel" name="stressLevel" min="1" max="10" value={formData.stressLevel} onChange={handleChange} className="custom-slider stress-slider"/>
                <div className="slider-labels"><span>😌 Calm</span><span>😰 Very Stressed</span></div>
              </div>

              <div className="form-group">
                <label htmlFor="energyLevel">Energy Level: <span className="form-label-highlight">{formData.energyLevel}/10</span></label>
                <input type="range" id="energyLevel" name="energyLevel" min="1" max="10" value={formData.energyLevel} onChange={handleChange} className="custom-slider energy-slider"/>
                <div className="slider-labels"><span>🔋 Low</span><span>⚡ Supercharged</span></div>
              </div>

              <div className="form-group">
                <label htmlFor="journalEntry"><BookOpen size={16} className="label-icon" /> Quick thought or intention for today (optional)</label>
                <textarea id="journalEntry" name="journalEntry" value={formData.journalEntry} onChange={handleChange} className="form-textarea" placeholder="e.g., I want to stay consistent with my coding practice this week..."/>
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
          {step < 4 ? (
            <button type="button" onClick={nextStep} className="btn btn-primary">
              Continue <ArrowRight size={18} />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Building Your Twin...' : 'Launch My Digital Twin'} {!loading && <Settings size={18} />}
            </button>
          )}
        </div>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default OnboardingForm;
