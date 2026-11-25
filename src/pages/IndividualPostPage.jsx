import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import { useAuth } from '../context/AuthContext';

export default function IndividualPostPage() {
  const { postId } = useParams();
  const { isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      }),
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then((res) => {
        if (!res.ok) throw new Error('Failed to load comments');
        return res.json();
      })
    ])
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
        return fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
      })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load author');
        return res.json();
      })
      .then((userData) => {
        setAuthor(userData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading post details:', err);
        setError('Unable to load this blog post. Please try again later.');
        setLoading(false);
      });
  }, [postId]);

  const handleAddComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  if (loading) {
    return (
      <div className="page-container">
        <p className="status-message">Loading post details...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="page-container">
        <h2>Post Not Found</h2>
        <p>{error || 'The post you are looking for does not exist.'}</p>
        <Link to="/posts" className="back-link">&larr; Back to all posts</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/posts" className="back-link">&larr; Back to all posts</Link>
      <article className="post-card detail-card">
        <h2 className="post-title">{post.title}</h2>
        {author && (
          <div className="post-meta">
            <p><strong>Author:</strong> {author.name}</p>
            <p><strong>Email:</strong> {author.email}</p>
          </div>
        )}
        <div className="post-body full-content">
          <p>{post.body}</p>
        </div>

        <section className="comments-section">
          <h3 className="section-heading">Comments</h3>

          {isAuthenticated ? (
            <CommentForm postId={postId} onAddComment={handleAddComment} />
          ) : (
            <div
              className="comment-form"
              style={{ textAlign: 'center', padding: '1.25rem', marginBottom: '1.5rem' }}
            >
              <p style={{ marginBottom: '0.75rem' }}>
                Please log in to leave a comment on this post.
              </p>
              <Link to="/login" className="submit-btn" style={{ textDecoration: 'none' }}>
                Log In to Comment
              </Link>
            </div>
          )}

          <div className="existing-comments">
            <h4 className="comments-label">Discussion</h4>
            {comments.length === 0 ? (
              <p className="no-comments-msg">No comments yet. Be the first to comment!</p>
            ) : (
              <ul className="comments-list">
                {comments.map((c) => (
                  <li key={c.id} className="comment-bubble">
                    <p className="comment-author"><strong>{c.name}</strong></p>
                    <p className="comment-body">{c.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </article>
    </div>
  );
}