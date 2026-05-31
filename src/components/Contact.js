'use client';

import { useState } from 'react';

const INITIAL_FORM = {
  name: '',
  email: '',
  eventType: '',
  eventDate: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Book Your Performance</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p>
              Ready to bring fire to your event? Reach out to discuss availability
              and what you have in mind.
            </p>
            <div className="contact-details">
              <a className="contact-item" href="mailto:flame@wrenegade.co.uk">
                <span className="contact-icon">&#9993;</span>
                <span>flame@wrenegade.co.uk</span>
              </a>
              <a className="contact-item" href="tel:+447522051049">
                <span className="contact-icon">&#9742;</span>
                <span>07522 051049</span>
              </a>
              <div className="contact-item">
                <span className="contact-icon">&#9788;</span>
                <span>Available for events &mdash; UK &amp; beyond</span>
              </div>
            </div>
            <a
              className="cta-button instagram-button"
              href="https://www.instagram.com/wrenegade_flame"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="instagram-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Follow on Instagram
            </a>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="eventType"
              placeholder="Event Type"
              value={form.eventType}
              onChange={handleChange}
            />
            <input
              type="date"
              name="eventDate"
              placeholder="Event Date"
              value={form.eventDate}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Tell me about your event..."
              rows={5}
              value={form.message}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="submit-button"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="form-message form-success">
                Thanks! Your enquiry has been sent &mdash; I&apos;ll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className="form-message form-error">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
