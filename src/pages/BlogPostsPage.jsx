import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts.');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setError('Unable to load blog posts right now. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <p className="status-message">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <p className="error-message" style={{ color: '#e53e3e' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="page-heading">Latest Posts</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.id} className="post-card preview-card">
            <h3 className="post-title">
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h3>
            <p className="post-body">
              {post.body.length > 130
                ? `${post.body.substring(0, 130)}...`
                : post.body}
            </p>
            <Link to={`/post/${post.id}`} className="read-more-link">
              Read Full Post &rarr;
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}