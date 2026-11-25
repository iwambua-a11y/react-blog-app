import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import BlogPostsPage from './pages/BlogPostsPage';
import IndividualPostPage from './pages/IndividualPostPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function MainContent() {
  const { theme } = useTheme();

  return (
    <div className={`app-shell ${theme}`}>
      <Navbar />
      <main className="content-area">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/posts" element={<BlogPostsPage />} />
          <Route path="/post/:postId" element={<IndividualPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <MainContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}