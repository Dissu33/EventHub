import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { authAPI } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
        // Get existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if user already exists
        const existingUser = users.find(u => u.email === formData.email);
        if (existingUser) {
          setErrors({ general: 'User with this email already exists. Please login.' });
          setIsLoading(false);
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.countryCode + formData.phone,
          password: formData.password,
          createdAt: new Date().toISOString()
        };

        // Add to users array and save
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Create mock token and store user data
        const token = 'mock-token-' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone
        }));

        setShowSuccess(true);

        setTimeout(() => {
          navigate('/');
          window.location.reload(); // Refresh to update navbar
        }, 1500);

      } catch (error) {
        setErrors({ general: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Join EventHub</h1>
          <p>Create your account to book local events</p>
        </div>


        {showSuccess && (
          <div className="success-prompt">
            <div className="success-icon">✓</div>
            <div className="success-content">
              <h3>Registration Successful!</h3>
              <p>Your account has been created. Redirecting to homepage...</p>
            </div>
          </div>
        )}

        {!showSuccess && (
          <>
            <form className="login-form" onSubmit={handleSubmit}>
              {errors.general && (
                <div className="error-message-general">{errors.general}</div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                    placeholder="First name"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                    placeholder="Last name"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

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
                <label htmlFor="phone">Phone Number</label>
                <div className="phone-input-group">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="country-code-select"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter phone number"
                  />
                </div>
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Create password"
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  I agree to the{' '}
                  <Link to="/terms" className="inline-link">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="inline-link">
                    Privacy Policy
                  </Link>
                </label>
                {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
              </div>

              <button
                type="submit"
                className="login-btn primary"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="login-divider">
              <span>or sign up with</span>
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

export default Register;