import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield, FaLock, FaSignInAlt, FaArrowLeft, FaCoffee } from 'react-icons/fa';
// ✅ Import background image globally
import bgImage from "../../assets/coffee-dummy-data/bg-image.jpg";

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error('Please enter both email and password.');
      return;
    }
    console.log('Admin logging in with:', { email, password, rememberMe });
    // Add your admin login API call here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }} // ✅ Now works without require()
    >
      {/* Add overlay for better glass effect */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="max-w-md w-full space-y-8 p-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 relative z-10">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex justify-center">
            <h1 className='mt-6 text-4xl font-extrabold text-[#A5887A] drop-shadow-lg'>CAFFIENA</h1>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-white drop-shadow-lg">Admin Login</h2>
        </div>
        
        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserShield className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#885E38] focus:border-transparent backdrop-blur-sm"
                  placeholder="Admin email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#885E38] focus:border-transparent backdrop-blur-sm"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-amber-600 focus:ring-[#885E38] border-white/30 rounded bg-white/10"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-white hover:text-gray-200">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <div>
            <button
              onClick={() => navigation('/admin/dashboard')}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#735F55]/80 hover:bg-[#735F55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#885E38] backdrop-blur-sm"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaSignInAlt className="h-5 w-5 text-white group-hover:text-gray-100" />
              </span>
              Sign in
            </button>
          </div>
        </form>
        
        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium font-semibold text-white hover:text-gray-200"
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default AdminLogin;