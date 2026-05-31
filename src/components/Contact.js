'use client';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! This is a demo form — your message has not been sent.');
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
              <a className="contact-item" href="mailto:hello@example.com">
                <span className="contact-icon">&#9993;</span>
                <span>hello@example.com</span>
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
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <input type="text" name="event" placeholder="Event Type" />
            <input type="date" name="date" placeholder="Event Date" />
            <textarea
              name="message"
              placeholder="Tell me about your event..."
              rows={5}
            ></textarea>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
