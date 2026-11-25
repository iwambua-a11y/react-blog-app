import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <h1 className="navbar-title">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            My Blog
          </Link>
        </h1>
        <nav className="navbar-nav">
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isAuthenticated ? (
              <>
                <li style={{ fontWeight: '600' }}>Hi, {user.username}</li>
                <li>
                  <button type="button" onClick={handleLogout} className="theme-toggle-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
          <button type="button" onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>
      </div>
    </header>
  );
}