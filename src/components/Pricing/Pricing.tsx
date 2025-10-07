import React from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing: React.FC = () => {
  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <h1>Find the Perfect Plan for You</h1>
        <p>Choose a plan that fits your needs and start amplifying your potential today.</p>
      </section>

      <section className="pricing-plans">
        <div className="plan-card">
          <h2>Freemium</h2>
          <p className="price">Free</p>
          <ul className="features-list">
            <li><span className="icon">✓</span> Basic Analytics</li>
            <li><span className="icon">✓</span> Limited Integrations (up to 2)</li>
            <li><span className="icon">✓</span> Daily Insights</li>
            <li><span className="icon">✓</span> Community Support</li>
          </ul>
          <Link to="/signup" className="btn btn-secondary">Get Started</Link>
        </div>

        <div className="plan-card premium">
          <div className="ribbon">Most Popular</div>
          <h2>Premium</h2>
          <p className="price">$9.99<small>/mo</small></p>
          <ul className="features-list">
            <li><span className="icon">✓</span> **All Freemium Features**</li>
            <li><span className="icon">✓</span> **Advanced Predictive Simulation**</li>
            <li><span className="icon">✓</span> **Unlimited Integrations**</li>
            <li><span className="✓">✓</span> Personalized Task Generation</li>
            <li><span className="icon">✓</span> Priority Customer Support</li>
          </ul>
          <Link to="/signup" className="btn btn-primary">Go Premium</Link>
        </div>
      </section>

      <section className="feature-comparison">
        <h2>Detailed Feature Comparison</h2>
        <table>
          <thead>
            <tr>
              <th>Features</th>
              <th>Freemium</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Analytics</td>
              <td>Basic</td>
              <td>Advanced</td>
            </tr>
            <tr>
              <td>Integrations</td>
              <td>Limited (up to 2)</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Predictive Insights</td>
              <td>Daily</td>
              <td>Real-Time</td>
            </tr>
            <tr>
              <td>Task Generation</td>
              <td>-</td>
              <td>Personalized AI Tasks</td>
            </tr>
            <tr>
              <td>Support</td>
              <td>Community</td>
              <td>Priority</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="b2b-section">
        <div className="b2b-content">
          <h3>Looking for a solution for your team?</h3>
          <p>Contact us for a custom quote that fits your business needs.</p>
          <a href="mailto:contact@veritas.com" className="btn btn-contact">Contact Us</a>
        </div>
      </section>
    </div>
  );
};

export default Pricing;