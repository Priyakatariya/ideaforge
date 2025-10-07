import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/shared/Header/Header';
import Footer from './components/shared/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import UserDashboard from './components/Dashboard/Dashboard';
import Features from './components/Features/Features';
import Pricing from './components/Pricing/Pricing';
import AboutUs from './components/AboutUs/About';
import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import OnboardingForm from './components/Auth/OnboardingForm';
import './App.css';

const App: React.FC = () => {
  // Use a state to track the login status. Initial state is false.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This function sets the login state to true.
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // This function sets the login state to false.
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        {/* The Header now receives the login status and logout function */}
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about-us" element={<AboutUs />} />
            
            {/* The Login form now receives the onLogin function */}
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/onboarding" element={<OnboardingForm />} />

            {/* A protected route. Only accessible if the user is logged in. */}
            <Route path="/dashboard" element={
              isLoggedIn ? <UserDashboard /> : <LoginForm onLogin={handleLogin} />
            } />

            {/* Catch-all route for unknown paths */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;