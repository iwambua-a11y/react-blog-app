import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

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
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <button type="button" onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>
      </div>
    </header>
  );
}