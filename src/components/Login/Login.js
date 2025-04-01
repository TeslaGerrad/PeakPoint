import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from '../../assets/logo.png'; // Make sure to add your logo file

const Login = ({ setIsAuthenticated }) => {
  const [showForm, setShowForm] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const letters = "PEAKPOINT".split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 4000); // Adjusted timing to match faster animation

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    setShowForgotPassword(false);
  };

  return (
    <div className="app-container">
      <div className={`logo-container ${showForm ? 'fade-out' : ''}`}>
        <h1 className="rotating-text">
          {letters.map((letter, index) => (
            <span 
              key={index} 
              style={{ 
                animationDelay: `${index * 0.2}s`
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {showForm && (
        <div className="login-container">
          <div className="form-logo">
            <img src={logo} alt="PeakPoint Logo" style={{ width: '420px', marginBottom: '50px' }} />
          </div>

          {!showForgotPassword ? (
            <>
              <h2>Welcome Back</h2>
              <form className="login-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                  />
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
              <p className="forgot-password">
                <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
              </p>
            </>
          ) : (
            <>
              <h2>Reset Password</h2>
              <p className="reset-text">Enter your email address to receive password reset instructions.</p>
              <form className="login-form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>
                <button type="submit" className="login-button">
                  Send Reset Link
                </button>
              </form>
              <p className="forgot-password">
                <a href="#" onClick={handleBackToLogin}>Back to Login</a>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Login; 