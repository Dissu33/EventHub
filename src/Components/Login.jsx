import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { authAPI } from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      try {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === formData.email);

        if (!user) {
          setErrors({ general: 'User not found. Please sign up first.' });
          setIsLoading(false);
          return;
        }

        if (user.password !== formData.password) {
          setErrors({ general: 'Invalid password. Please try again.' });
          setIsLoading(false);
          return;
        }

        // Create mock token and store user data
        const token = 'mock-token-' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }));

        setShowSuccess(true);

        setTimeout(() => {
          navigate('/');
          window.location.reload(); // Refresh to update navbar
        }, 1500);

      } catch (error) {
        setErrors({ general: 'Login failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const handleDemoLogin = () => {
    // Create demo user if it doesn't exist
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const demoUser = users.find(u => u.email === 'demo@eventhub.com');

    if (!demoUser) {
      users.push({
        id: Date.now(),
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@eventhub.com',
        phone: '1234567890',
        password: 'demo123',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Set form data for auto-login
    setFormData({
      email: 'demo@eventhub.com',
      password: 'demo123'
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your EventHub account</p>
        </div>


        {showSuccess && (
          <div className="success-prompt">
            <div className="success-icon">✓</div>
            <div className="success-content">
              <h3>Login Successful!</h3>
              <p>Redirecting you to the homepage...</p>
            </div>
          </div>
        )}

        {!showSuccess && (
          <>
            <form className="login-form" onSubmit={handleSubmit}>
              {errors.general && (
                <div className="error-message-general">{errors.general}</div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Enter your password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="login-btn primary"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              <button
                type="button"
                className="login-btn demo"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                Use Demo Account
              </button>
            </form>

            <div className="login-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="auth-link">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="login-divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button className="social-btn google">
                <span className="social-icon">🔍</span>
                Google
              </button>
              <button className="social-btn facebook">
                <span className="social-icon">📘</span>
                Facebook
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;