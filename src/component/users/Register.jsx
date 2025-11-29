import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import video1 from "../../assets/coffee-dummy-data/video1.mp4";
import './style.css'

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      console.error('Please fill out all fields.');
      return;
    }
    console.log('Creating account with:', {
      firstName,
      lastName,
      email,
      password,
    });
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
      <h1 className="main-title">Register</h1>
      <p className="main-tagline">Join The Caffeina family today.</p>

      {/* Form Container */}
      <div className="form-container">
        {/* Personal Details Section */}
        <div className="form-section">
          {/* <h2 className="form-section-title">Your Personal Details</h2> */}
          <div className="input-grid grid-col-2">
            <div className="input-field">
              <label htmlFor="firstName">
                First name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">
                Last name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="input-field span-col-2">
              <label htmlFor="reg-email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="reg-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="form-section">
          {/* <h2 className="form-section-title">Your Password</h2> */}
          <div className="input-grid grid-col-1">
            <div className="input-field">
              <label htmlFor="reg-password">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                id="reg-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="actions-section">
          <a href="/login" className="login-link">
            Already have an account?
          </a>
          <button onClick={handleCreateAccount} className="btn btn-primary">
            Create Account →
          </button>
        </div>

        <p className="brand-tagline">Crafted Coffee. Crafted Experience.</p>
      </div>
    </div>
  );
};

export default Register;
