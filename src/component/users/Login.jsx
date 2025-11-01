import React, { useState } from 'react';
import './style.css'
import { Link } from "react-router"



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // In a real app, you'd use a modal or a less intrusive notification.
      console.error('Please enter both email and password.');
      return;
    }
    console.log('Logging in with:', { email, password });
    // Add your login API call here
  };

  return (
    <div className="page-wrapper">
      <style>{`
       
      `}</style>
      <a className="back-link">
        <span className="back-arrow">←</span> Back To Home
      </a>
      <h1 className="main-title">Log In</h1>

      <div className="form-container">
        <div className="form-section">
          <h2 className="form-section-title">Log In</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-section">
            <div className="input-grid grid-col-2">
              <div className="input-field">
                <label htmlFor="email">Email <span className="required">*</span> :</label>
                <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password <span className="required">*</span> :</label>
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
          </div>

          <div className="form-section actions-section">
            <a href="#" className="forgot-password">Forgot your password?</a>
            <button type="submit" className="btn btn-primary">Log In →</button>
          </div>
        </form>

        <div className="form-section footer-section">
          <p className="footer-text">If you dont have account</p>
          <Link className="btn btn-primary" to='/register'>Register →</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;