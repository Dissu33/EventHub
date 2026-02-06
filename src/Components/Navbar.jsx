import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    setIsAuthenticated(!!token);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Listen for storage changes (when user logs in/out in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      setIsAuthenticated(!!token);
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check on focus
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
    closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon">🎉</div>
          <h1>EventHub</h1>
        </Link>

        <button
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
          <span className="navbar-toggle-bar"></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/booking" className="nav-link" onClick={closeMenu}>Booking</Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link" onClick={closeMenu}>Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
            </li>
          </ul>

          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
                  Dashboard
                </Link>
                <div className="user-menu">
                  <span className="user-name">
                    {user?.firstName || 'User'}
                  </span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn" onClick={closeMenu}>Log In</Link>
                <Link to="/signup" className="signup-btn" onClick={closeMenu}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;