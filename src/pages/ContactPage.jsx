import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-container">
      <div className="post-card contact-card">
        <h2 className="page-heading">Contact Us</h2>
        <p className="contact-subtitle">Have a question or feedback? Send us a message below.</p>

        {submitted ? (
          <div className="success-banner">
            Thank you, {formData.name}! Your message has been recorded.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                className="form-input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows="4"
                className="form-textarea"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}