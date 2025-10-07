import React from 'react';
import './About.css';

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-page">
      <section className="mission-section">
        <h1>Our Mission: Your Potential, Realized.</h1>
        <p>At Veritas, we believe that your future is not something to be predicted, but something to be built. Our mission is to empower you to take control of your life by making your data work for you, not against you.</p>
      </section>

      <section className="story-section">
        <h2>The Founder's Story</h2>
        <p>I started Veritas because I was tired of feeling fragmented. I had dozens of apps for productivity, health, and finances, but none of them talked to each other. My life was a collection of siloed data points. I knew there had to be a better way—a way to connect everything and gain a unified, predictive view of my life. That's why I built Veritas.</p>
      </section>

      <section className="team-section">
        <h2>The Team</h2>
        <div className="team-member">
          <img src="/path/to/founder-photo.jpg" alt="Founder" className="founder-photo" />
          <h3>Jane Doe</h3>
          <p>Founder & CEO</p>
          <p>Jane is a data scientist with a passion for personal growth. She has over a decade of experience in machine learning and a deep-seated belief in the power of data to transform lives.</p>
        </div>
      </section>

      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>We're always excited to hear from you. Feel free to reach out with any questions or feedback.</p>
        <a href="mailto:contact@veritas.com" className="contact-link">contact@veritas.com</a>
      </section>
    </div>
  );
};

export default AboutUs;