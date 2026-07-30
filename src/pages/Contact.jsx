import { useState } from 'react';
import '../styles/Contact.css';

const WA = '250782351635';
const EMAIL = 'atlasevmotors@gmail.com';
const INSTAGRAM = 'https://instagram.com/atlasevmotors';
const WHATSAPP_GENERAL = `https://wa.me/${WA}?text=Hello%20Atlas%20EV%20Motors!%20I%20have%20a%20general%20inquiry.`;

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <main className="contact-page" style={{ paddingTop: '80px' }}>

      {/* ── Header ── */}
      <section className="contact-header">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--color-secondary-container)' }}>
            We're Here
          </span>
          <h1 className="contact-headline">Contact Us</h1>
          <p className="contact-sub">
            Available 24/7 · Online responses as soon as possible.
          </p>
        </div>
      </section>

      {/* ── Primary Contact Info (FIRST, prominent) ── */}
      <section className="contact-info-strip">
        <div className="container">
          <div className="contact-info-grid">

            {/* Phone */}
            <a href={`tel:+${WA}`} className="contact-info-card" id="contact-phone-card">
              <div className="contact-info-icon phone-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.6 4.56 2 2 0 0 1 3.54 2.36h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.91 6.91l.8-.8a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">Phone</span>
                <strong className="contact-info-value">+250 782 351 635</strong>
                <span className="contact-info-meta">Call anytime, 24/7</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a href={WHATSAPP_GENERAL} target="_blank" rel="noopener noreferrer"
              className="contact-info-card contact-info-card-wa" id="contact-wa-card">
              <div className="contact-info-icon wa-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">WhatsApp</span>
                <strong className="contact-info-value">Chat with an Expert</strong>
                <span className="contact-info-meta">Fastest way to reach us</span>
              </div>
              <div className="contact-info-arrow">→</div>
            </a>

            {/* Email */}
            <a href={`mailto:${EMAIL}`} className="contact-info-card" id="contact-email-card">
              <div className="contact-info-icon email-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">Email</span>
                <strong className="contact-info-value">{EMAIL}</strong>
                <span className="contact-info-meta">Responses as soon as possible</span>
              </div>
            </a>

            {/* Instagram */}
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
              className="contact-info-card" id="contact-instagram-card">
              <div className="contact-info-icon insta-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <div className="contact-info-text">
                <span className="contact-info-label">Instagram</span>
                <strong className="contact-info-value">@atlasevmotors</strong>
                <span className="contact-info-meta">See our latest listings</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="section">
        <div className="container contact-body-grid">

          {/* Left: Form */}
          <div className="contact-form-section">
            <h2 className="contact-section-title">Send a Message</h2>
            <p className="contact-section-sub">
              Use the form below for non-urgent enquiries. We read every message.
            </p>

            {sent && (
              <div className="contact-success-bar">
                ✓ Your message has been sent! We'll reply within 2 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} id="contact-form" className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name">Full Name *</label>
                <input id="contact-name" name="name" type="text" className="form-control"
                  placeholder="Your full name"
                  value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number *</label>
                <input id="contact-phone" name="phone" type="tel" className="form-control"
                  placeholder="+250 7XX XXX XXX"
                  value={form.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea id="contact-message" name="message" className="form-control"
                  placeholder="Tell us how we can help..."
                  value={form.message} onChange={handleChange}
                  required rows={5} style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn btn-primary contact-submit-btn"
                id="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Hours + Map */}
          <div className="contact-details-section">
            <h2 className="contact-section-title">Find Us</h2>

            {/* Hours */}
            <div className="contact-hours-card">
              <h4 className="contact-hours-title">Business Hours</h4>
              <div className="contact-hours-list">
                {[
                  { day: 'Everyday',           hrs: '24/7' },
                  { day: 'Online Response',    hrs: 'As soon as possible' },
                ].map(({ day, hrs }) => (
                  <div key={day} className="contact-hours-row">
                    <span className="contact-hours-day">{day}</span>
                    <span className={`contact-hours-val${hrs === 'Closed' ? ' closed' : ''}`}>{hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map embed */}
            <div className="contact-map-wrap">
              <div className="contact-address-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Gikondo, Magerwa · Kigali, Rwanda</span>
              </div>
              <iframe
                title="Atlas EV Motors – Gikondo Magerwa, Kigali, Rwanda"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4854609897626!2d30.063!3d-1.9783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7fdaa72d36d%3A0xd8c3b0c2e8b47b9!2sMagerwa%2C%20Kigali!5e0!3m2!1sen!2srw!4v1689000000000!5m2!1sen!2srw"
                width="100%"
                height="260"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
