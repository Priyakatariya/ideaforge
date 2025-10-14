import React from 'react';
import { Link } from 'react-router-dom'; 
import './LandingPage.css'; // Make sure this CSS file contains the final styles

const LandingPage: React.FC = () => {
    // Scroll function for smooth UX
    const scrollToNext = () => {
        const nextSection = document.querySelector('.how-it-works-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing-page-wrapper">
            {/* 1. Fixed Background Image Layer */}
            <div className="fixed-space-background"></div>

            <div className="landing-page">
                
                {/* HERO SECTION */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="animated-text">Your Potential, <span className="highlight-text">Amplified by AI.</span></h1>
                        <p className="sub-headline animated-text">The first AI Twin that unifies your data and predicts your path to success.</p>
                        <Link to="/signup" className="cta-button animated-cta" onClick={scrollToNext}>Get Started for Free</Link> 
                    </div>
                </section>

                {/* HOW IT WORKS SECTION */}
                <section className="how-it-works-section">
                    <h2>The Path to <span className="highlight-text">Clarity</span></h2>
                    <div className="steps-container">
                        <div className="step-card">
                            <div className="icon">🚀</div>
                            <h3>Integrate</h3>
                            <p>Connect all your scattered apps, from calendars to productivity tools for a single source of truth.</p>
                        </div>
                        <div className="step-card">
                            <div className="icon">🔮</div>
                            <h3>Predict</h3>
                            <p>Our AI analyzes your data streams to predict future challenges and your path to optimal success.</p>
                        </div>
                        <div className="step-card">
                            <div className="icon">🎯</div>
                            <h3>Act</h3>
                            <p>Receive clear, actionable insights and tasks delivered exactly when you need them to guide your daily decisions.</p>
                        </div>
                    </div>
                </section>
                
                {/* PROBLEM/VALUE SECTION (Updated with Cards) */}
                <section className="problem-section">
                    <h2>Stop Juggling Apps. Start <span className="highlight-text">Living.</span></h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                        Your life is scattered across dozens of disconnected apps, creating digital friction. **Veritas** brings it all together to construct a unified, predictive view of your entire world.
                    </p>

                    {/* Problem Cards added here, using the same styling as .step-card */}
                    <div className="steps-container"> 
                        <div className="step-card">
                            <div className="icon">⛓️</div> {/* Updated the 'fragmented' text to an emoji */}
                            <h3>Data is Fragmented</h3>
                            <p>Important insights are buried across emails, to-do lists, and health trackers. You can't see the full picture.</p>
                        </div>
                        <div className="step-card">
                            <div className="icon">⏳</div>
                            <h3>Lost Time & Focus</h3>
                            <p>Switching between apps constantly drains your cognitive load, reducing your efficiency and focus throughout the day.</p>
                        </div>
                        <div className="step-card">
                            <div className="icon">📉</div>
                            <h3>No Predictive Power</h3>
                            <p>You only react to events. You lack the AI foresight to proactively adjust your schedule and maximize outcomes.</p>
                        </div>
                    </div>
                </section>
                
                {/* FEATURES SECTION */}
                <section className="features-section">
                    <h2>Core <span className="highlight-text">Intelligence</span></h2>
                    <div className="features-container">
                        <div className="feature-card">
                            <div className="icon">🧠</div>
                            <h3>Predictive Simulation</h3>
                            <p>See how small changes today can lead to massive outcomes tomorrow. Model your decisions before you make them.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon">🔗</div>
                            <h3>Holistic Integration</h3>
                            <p>Seamlessly connect with all major platforms: Google, Slack, Spotify, and more to unify your fragmented digital life.</p>
                        </div>
                        <div className="feature-card">
                            <div className="icon">📈</div>
                            <h3>Real-time Analytics</h3>
                            <p>Understand your deep habits and unconscious patterns with clear, insightful, and beautiful dashboards.</p></div>
                    </div>
                </section>

                {/* SOCIAL PROOF SECTION */}
                <section className="social-proof-section">
                    <h2>Trusted by The <span className="highlight-text">Visionaries</span></h2>
                    <div className="testimonials-container">
                        <div className="testimonial-card">
                            <p>"Veritas changed the way I work. The insights are eerily accurate and incredibly helpful, like having a mentor in my pocket."</p>
                            <span>- Alex P., <span className="highlight-text">Tech Founder</span></span>
                        </div>
                        <div className="testimonial-card">
                            <p>"I've tried every productivity tool. This is the only one that actually makes my life less fragmented by connecting the dots."</p>
                            <span>- Jane S., <span className="highlight-text">Marketing Director</span></span>
                        </div>
                        <div className="testimonial-card">
                             <p>"I use the predictive tool daily to manage my team's bandwidth. It's an unfair advantage in a competitive market."</p>
                            <span>- Mark T., <span className="highlight-text">Executive Coach</span></span>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA SECTION */}
                <section className="final-cta-section">
                    <h2>Ready to <span className="highlight-text">Unleash</span> Your Full Potential?</h2>
                    <Link to="/signup" className="cta-button animated-cta">Start Your Free AI Twin Trial Today</Link>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;