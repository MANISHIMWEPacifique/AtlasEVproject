import { useState } from 'react';
import '../styles/SellMyCar.css';

const WA = '250782351635';
const EMAIL = 'atlasevmotors@gmail.com';
const WHATSAPP_SELL = `https://wa.me/${WA}?text=Hi!%20I%20have%20an%20EV%20I%20want%20to%20sell.%20Let%20me%20share%20the%20details...`;

export default function SellMyCar() {
  const [form, setForm] = useState({
    make: '', model: '', year: '', mileage: '', condition: 'Good',
    name: '', phone: '', notes: '', photos: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhotos = (e) => {
    const names = Array.from(e.target.files).map(f => f.name);
    setForm(prev => ({ ...prev, photos: names }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Sell My EV: ${form.year} ${form.make} ${form.model}`
    );
    const body = encodeURIComponent(
      `=== VEHICLE DETAILS ===\n` +
      `Make: ${form.make}\nModel: ${form.model}\nYear: ${form.year}\n` +
      `Mileage: ${form.mileage} km\nCondition: ${form.condition}\n` +
      `Photos attached: ${form.photos.join(', ') || 'None (will send separately)'}\n\n` +
      `=== CONTACT ===\nName: ${form.name}\nPhone: ${form.phone}\n\n` +
      `=== NOTES ===\n${form.notes || 'None'}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main className="sell-page" style={{ paddingTop: '80px' }}>

      {/* Page Header */}
      <section className="sell-page-header">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--color-secondary-container)' }}>
            Sell Your EV
          </span>
          <h1 className="sell-page-headline">Get a fair offer</h1>
          <p className="sell-page-sub">
            Fill in your vehicle details below and we'll come back with a fair market valuation.
            It takes less than 2 minutes.
          </p>
        </div>
      </section>

      <div className="container sell-page-layout">

        {/* ── Main Form ── */}
        <section className="sell-form-section">
          {submitted ? (
            <div className="sell-submitted">
              <div className="sell-submitted-icon">✓</div>
              <h2>Your enquiry has been submitted!</h2>
              <p>We'll review your details and send you a fair market offer as soon as possible. Check your email.</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                  Submit Another Vehicle
                </button>
                <a href={WHATSAPP_SELL} target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary">
                  Also Chat on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="sell-full-form">
              <h2 className="sell-form-title">Vehicle &amp; Contact Details</h2>

              <div className="sell-form-section-label">Vehicle Information</div>
              <div className="sell-form-row">
                <div className="form-group">
                  <label htmlFor="sell-make">Make *</label>
                  <input id="sell-make" name="make" type="text" className="form-control"
                    placeholder="e.g. Nissan" value={form.make} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="sell-model">Model *</label>
                  <input id="sell-model" name="model" type="text" className="form-control"
                    placeholder="e.g. Leaf" value={form.model} onChange={handleChange} required />
                </div>
              </div>

              <div className="sell-form-row">
                <div className="form-group">
                  <label htmlFor="sell-year">Year *</label>
                  <input id="sell-year" name="year" type="number" className="form-control"
                    placeholder="2021" min="2010" max="2026"
                    value={form.year} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="sell-mileage">Mileage (km) *</label>
                  <input id="sell-mileage" name="mileage" type="text" className="form-control"
                    placeholder="45,000" value={form.mileage} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sell-condition">Condition</label>
                <select id="sell-condition" name="condition" className="form-control"
                  value={form.condition} onChange={handleChange}>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Needs Work</option>
                </select>
              </div>

              {/* Photo Upload */}
              <div className="form-group">
                <label htmlFor="sell-photos">Photos (optional)</label>
                <div className="photo-upload-area">
                  <input id="sell-photos" name="photos" type="file"
                    accept="image/*" multiple onChange={handlePhotos}
                    className="photo-upload-input" />
                  <div className="photo-upload-label">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    {form.photos.length > 0
                      ? <span className="photo-upload-count">{form.photos.length} photo{form.photos.length !== 1 ? 's' : ''} selected</span>
                      : <><strong>Upload Photos</strong><span>Click to select (multiple allowed)</span></>
                    }
                  </div>
                </div>
                <p className="photo-upload-hint">
                  You can also send photos directly on WhatsApp after submitting.
                </p>
              </div>

              <div className="sell-form-section-label" style={{ marginTop: '4px' }}>
                Your Contact
              </div>
              <div className="sell-form-row">
                <div className="form-group">
                  <label htmlFor="sell-name">Full Name *</label>
                  <input id="sell-name" name="name" type="text" className="form-control"
                    placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="sell-phone">Phone / WhatsApp *</label>
                  <input id="sell-phone" name="phone" type="tel" className="form-control"
                    placeholder="+250 7XX XXX XXX" value={form.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sell-notes">Extra Notes</label>
                <textarea id="sell-notes" name="notes" className="form-control"
                  placeholder="Battery health, service history, accident record, etc."
                  value={form.notes} onChange={handleChange} rows={3} style={{ resize: 'vertical' }} />
              </div>

              <button type="submit" className="btn btn-primary sell-submit-btn" id="sell-submit-btn">
                Submit for Valuation
              </button>
            </form>
          )}
        </section>

        {/* ── Sidebar ── */}
        <aside className="sell-page-aside">
          {/* WhatsApp card */}
          <div className="sell-aside-wa">
            <div className="sell-aside-wa-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <h3>Prefer WhatsApp?</h3>
              <p>Send us photos and details directly. Our team responds quickly.</p>
              <a href={WHATSAPP_SELL} target="_blank" rel="noopener noreferrer"
                className="btn btn-primary sell-aside-wa-btn" id="sell-aside-wa-btn">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Process steps */}
          <div className="sell-aside-steps">
            <h4>How It Works</h4>
            {[
              { n: '1', title: 'Submit Details', desc: 'Fill out the form or WhatsApp us your vehicle info and photos.' },
              { n: '2', title: 'Get a Valuation', desc: 'We assess the market value and send you a fair offer as soon as possible.' },
              { n: '3', title: 'Complete the Sale', desc: 'Agree on price, handle paperwork, and receive payment.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="sell-step">
                <div className="sell-step-num">{n}</div>
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
