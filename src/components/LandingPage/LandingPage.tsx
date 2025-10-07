import React from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Potential, Amplified by AI.</h1>
          <p className="sub-headline">The first AI Twin that unifies your data and predicts your path to success.</p>
          <a href="#" className="cta-button">Get Started for Free</a>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="icon">🚀</div>
            <h3>Integrate</h3>
            <p>Connect all your scattered apps, from calendars to productivity tools.</p>
          </div>
          <div className="step-card">
            <div className="icon">🔮</div>
            <h3>Predict</h3>
            <p>Our AI analyzes your data to predict your future success and challenges.</p>
          </div>
          <div className="step-card">
            <div className="icon">🎯</div>
            <h3>Act</h3>
            <p>Receive clear, actionable insights and tasks to guide your daily decisions.</p>
          </div>
        </div>
      </section>

      <section className="problem-section">
        <h2>Stop Juggling Apps. Start Living.</h2>
        <p>Your life is scattered across dozens of apps. Veritas brings it all together to create a unified view of your world.</p>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <div className="icon">🧠</div>
            <h3>Predictive Simulation</h3>
            <p>See how small changes today can lead to massive outcomes tomorrow.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔗</div>
            <h3>Holistic Integration</h3>
            <p>Connect with Google, Slack, Spotify, and more to unify your digital life.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📈</div>
            <h3>Real-time Analytics</h3>
            <p>Understand your habits and patterns with clear, insightful dashboards.</p>
          </div>
        </div>
      </section>

      <section className="social-proof-section">
        <h2>Trusted by Students, Professionals, and Coaches.</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <p>"Veritas changed the way I work. The insights are eerily accurate and incredibly helpful."</p>
            <span>- Alex P., Beta Tester</span>
          </div>
          <div className="testimonial-card">
            <p>"I've tried everything. This is the only tool that actually makes my life less fragmented."</p>
            <span>- Jane S., Beta Tester</span>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <h2>Ready to Unlock Your Potential?</h2>
        <a href="#" className="cta-button">Get Started for Free</a>
      </section>
    </div>
  );
};

export default LandingPage;