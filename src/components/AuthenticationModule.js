import React, { useState } from 'react';
import './AuthenticationModule.css';

const AuthenticationModule = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    userType: 'Manager',
    email: ''
  });
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Mock authentication
    onLoginSuccess({
      username: credentials.username,
      userType: credentials.userType,
      email: credentials.email || `${credentials.username}@neurofleet.com`
      });
  };

  const handleSignup = () => {
    if (!credentials.username || !credentials.email || !credentials.password) {
      setError('Please fill all fields');
      return;
    }

    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // After signup, automatically login
    setError('');
    alert('Registration successful! Logging you in...');
    onLoginSuccess({
      username: credentials.username,
      userType: credentials.userType,
      email: credentials.email
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">🔒</div>
        <h1 className="auth-title">NeuroFleet</h1>
        <p className="auth-subtitle">Authentication Management</p>

        <form onSubmit={handleSubmit}>
          {/* User Type Selection */}
          <div className="form-group">
            <label>User Type</label>
            <select
              value={credentials.userType}
              onChange={(e) => setCredentials({ ...credentials, userType: e.target.value })}
              className="form-input"
            >
              <option value="Manager">Manager</option>
              <option value="Driver">Driver</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          {/* Email field - Only for signup */}
          {!isLogin && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="form-input"
                required={!isLogin}
              />
            </div>
          )}

          {/* Username */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="form-input"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="form-input"
              required
            />
          </div>

          {/* Confirm Password - Only for signup */}
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={credentials.confirmPassword}
                onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                className="form-input"
                required={!isLogin}
              />
            </div>
          )}

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Login/Signup Toggle - Moved to bottom */}
        <div className="auth-mode-text">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <span 
                className="auth-link" 
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setCredentials({...credentials, confirmPassword: '', email: ''});
                }}
              >
                Register
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span 
                className="auth-link" 
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setCredentials({...credentials, confirmPassword: '', email: ''});
                }}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModule;