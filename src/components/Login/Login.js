import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import { getErrorMessage } from '../../utils/errorManager';
import { saveUserCredentials, verifyLocalCredentials } from '../../utils/localAuth';
import './Login.css';
import logo from '../../assets/logo.png';

const Login = ({ setIsAuthenticated }) => {
  const [showForm, setShowForm] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const letters = "PEAKPOINT".split("");

  // Remove unused isOnline state and use navigator.onLine directly
  useEffect(() => {
    const handleOnlineStatus = () => {
      // Force re-render on online status change
      setError('');
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 4000); // Adjusted timing to match faster animation

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Try offline login first if we're offline
      if (!navigator.onLine) {
        const isValid = await verifyLocalCredentials(email, password);
        if (isValid) {
          setIsAuthenticated(true);
          return;
        }
        setError('Invalid offline credentials');
        return;
      }

      // Online authentication with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      await saveUserCredentials(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      
      // If errorMessage is null, try offline login
      if (errorMessage === null) {
        const isValid = await verifyLocalCredentials(email, password);
        if (isValid) {
          setIsAuthenticated(true);
          return;
        }
        setError('Invalid offline credentials');
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!showForgotPassword) {
      setShowForgotPassword(true);
      return;
    }
    
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
      setShowForgotPassword(false);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    setShowForgotPassword(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!navigator.onLine) {
      setError('Internet connection required for signup');
      return;
    }

    if (password !== confirmPassword) {
      setError(getErrorMessage('password-mismatch'));
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      // Save credentials for offline use
      await saveUserCredentials(email, password);
      
      setIsAuthenticated(true);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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

          {error && <p className="error-message">{error}</p>}

          {!showForgotPassword ? (
            <>
              <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
              <form className="login-form" onSubmit={isSignup ? handleSignup : handleLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {isSignup && (
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
                <button type="submit" className="login-button">
                  {isSignup ? 'Sign Up' : 'Login'}
                </button>
              </form>
              <p className="forgot-password">
                <button className="link-button" onClick={handleForgotPassword}>Forgot Password?</button>
              </p>
              <p className="toggle-signup">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button className="link-button" onClick={toggleSignup}>
                  {isSignup ? 'Login' : 'Sign Up'}
                </button>
              </p>
            </>
          ) : (
            <>
              <h2>Reset Password</h2>
              <p className="reset-text">Enter your email address to receive password reset instructions.</p>
              
              {/* Forgot password form */}
              <form className="login-form" onSubmit={handleForgotPassword}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="login-button">
                  Send Reset Link
                </button>
              </form>
              <p className="forgot-password">
                <button className="link-button" onClick={handleBackToLogin}>Back to Login</button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;