import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css';

const Features: React.FC = () => {
  return (
    <div className="features-page">
      <section className="features-hero">
        <h1>Your Potential, Amplified by AI.</h1>
        <p>Veritas is more than just an app—it's your personal AI Twin, built to unite your life and unlock your full potential. Our core features work together to transform your data into actionable guidance.</p>
      </section>

      <section className="feature-item">
        <div className="details">
          <h2>Holistic Data Integration</h2>
          <p className="subtitle">Stop the chaos of disconnected apps. Start with a unified view of your life.</p>
          <p>Your life is not lived in silos, so why should your data be? Veritas seamlessly integrates all your data from fitness trackers, productivity apps, and personal inputs into a single, intelligent dashboard. No more juggling different tools; just one clear, complete picture of your health, career, and personal growth.</p>
        </div>
        <div className="visual">
          {/* Image for Holistic Data Integration */}
          {/* Assuming your image is at 'src/assets/holistic_integration_chaos_unity.png' relative to your project root */}
          <img src="src/assets/holistic_integration_chaos_unity.png " alt="Illustration of data chaos versus a unified, integrated data view" />
        </div>
      </section>

      <section className="feature-item reverse-layout">
        <div className="details">
          <h2>Predictive Simulation</h2>
          <p className="subtitle">Stop wondering how your choices impact your future. Start seeing the path to your best self.</p>
          <p>Current apps only show you where you've been. Veritas shows you where you're going. Our proprietary AI algorithms analyze your habits and simulate future outcomes. You can see how an extra hour of sleep affects your productivity tomorrow, or how a new study habit could impact your career in three years. This isn’t a guess; it's a data-driven path to success.</p>
        </div>
        <div className="visual">
          {/* Image for Predictive Simulation */}
          {/* Assuming your image is at 'src/assets/predictive_simulation_future.png' relative to your project root */}
          <img src="src/assets/predictive_simulation_future.png" alt="Predictive Simulation showing future outcomes based on personal data" />
        </div>
      </section>

      <section className="feature-item">
        <div className="details">
          <h2>Gamified Progression</h2>
          <p className="subtitle">Stop feeling overwhelmed by goals. Start enjoying the journey.</p>
          <p>Motivation is the key to lasting change. We transform personal growth into an engaging and rewarding experience. Veritas keeps you motivated with personalized challenges, visible streaks, and rewards for reaching milestones. Turn your daily habits into a game you're excited to win.</p>
        </div>
        <div className="visual">
          {/* Image for Gamified Progression */}
          {/* Assuming your image is at 'src/assets/gamified_progression_ui.png' relative to your project root */}
          <img src="/src/assets/gamified_progression_ui.png" alt="Gamified progression interface with challenges, streaks, and rewards" />
        </div>
      </section>

      <section className="final-cta">
        <h2>Ready to Begin?</h2>
        <p>You've seen the power of a unified, predictive platform. Now it's time to take control of your future.</p>
        <Link to="/signup" className="cta-button">Sign Up Now</Link>
      </section>
    </div>
  );
};

export default Features;