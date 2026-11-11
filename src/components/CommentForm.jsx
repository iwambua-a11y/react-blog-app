import React, { useState } from 'react';

export default function CommentForm({ postId, onAddComment }) {
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: name.trim(),
      body: commentText.trim(),
      postId: Number(postId)
    };

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to post comment.');
        }
        return response.json();
      })
      .then((data) => {
        onAddComment({
          id: data.id || Date.now(),
          name: payload.name,
          body: payload.body
        });
        setName('');
        setCommentText('');
        setSubmitting(false);
      })
      .catch((err) => {
        console.error('Error posting comment:', err);
        setSubmitError('Failed to submit comment. Please try again.');
        setSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h4>Leave a Comment</h4>
      {submitError && (
        <p style={{ color: '#e53e3e', marginBottom: '0.75rem' }}>{submitError}</p>
      )}
      <input
        type="text"
        className="form-input"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={submitting}
        required
      />
      <textarea
        rows="3"
        className="form-textarea"
        placeholder="Your Comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        disabled={submitting}
        required
      />
      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? 'Posting...' : 'Submit Comment'}
      </button>
    </form>
  );
}