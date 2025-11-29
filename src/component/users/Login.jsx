import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import video1 from "../../assets/coffee-dummy-data/video1.mp4";
import './style.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error('Please enter both email and password.');
      return;
    }
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="page-wrapper">
      {/* Background Video */}
      <video
        src={video1}
        autoPlay
        loop
        muted
        playsInline
        className="bg-video"
      />

      {/* Overlay */}
      <div className="bg-overlay"></div>

      {/* Back link */}
      <a href="/" className="back-link">
        <ChevronLeft size={16} strokeWidth={2.5} />
        <span>Back To Home</span>
      </a>

      {/* Heading */}
      <h1 className="main-title">Log In</h1>
      <p className="main-tagline">Welcome back to The Caffeina.</p>

      {/* Form Container */}
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <div className="input-grid grid-col-2">
            <div className="input-field">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="actions-section">
            <a href="#" className="forgot-password">
              Forgot your password?
            </a>
            <button type="submit" className="btn btn-primary">
              Log In →
            </button>
          </div>
        </form>

        <div className="footer-section">
          <p className="footer-text">Don't have an account?</p>
          <a className="btn btn-secondary" href="/register">
            Register →
          </a>
        </div>

        <p className="brand-tagline">Crafted Coffee. Crafted Experience.</p>
      </div>

    </div>
  );
};

export default Login;