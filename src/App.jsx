import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BlogPostsPage from './pages/BlogPostsPage';
import IndividualPostPage from './pages/IndividualPostPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function MainContent() {
  const { theme } = useTheme();

  return (
    <div className={`app-shell ${theme}`}>
      <Navbar />
      <main className="content-area">
        <Routes>
          <Route path="/" element={<BlogPostsPage />} />
          <Route path="/post/:postId" element={<IndividualPostPage />} />
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
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </Router>
  );
}