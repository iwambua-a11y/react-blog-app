import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page-container">
      <section className="post-card" style={{ textAlign: 'center', padding: '3rem 2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>
          Welcome to My React Blog
        </h1>
        <p style={{ fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 2rem', opacity: 0.9, lineHeight: '1.6' }}>
          {isAuthenticated
            ? `Welcome back, ${user.username}! Dive into the latest articles, join the discussion, and share your insights with our community.`
            : 'Discover thoughtful articles, explore dynamic discussions, and connect with writers. Sign in to unlock commenting and join the conversation.'}
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/posts"
            className="submit-btn"
            style={{ textDecoration: 'none', padding: '0.75rem 1.75rem', fontSize: '1.05rem' }}
          >
            Explore Blog
          </Link>

          {!isAuthenticated && (
            <Link
              to="/login"
              className="theme-toggle-btn"
              style={{
                textDecoration: 'none',
                padding: '0.75rem 1.75rem',
                fontSize: '1.05rem',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              Login
            </Link>
          )}
        </div>
      </section>

      <div className="posts-grid">
        <div className="post-card">
          <h3>Curated Articles</h3>
          <p>Read engaging posts powered by live API data with clean, distraction-free layouts.</p>
        </div>
        <div className="post-card">
          <h3>Community Discussions</h3>
          <p>Authenticated members can post real-time comments and participate in threads.</p>
        </div>
        <div className="post-card">
          <h3>Adaptive Themes</h3>
          <p>Switch seamlessly between Light and Dark modes at any time from the navigation bar.</p>
        </div>
      </div>
    </div>
  );
}