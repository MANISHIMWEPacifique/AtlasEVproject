import { useState } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { useInventory } from '../context/AdminContext';
import '../styles/Home.css';

const WHATSAPP_NUMBER = '250782351635';
const EMAIL = 'atlasevmotors@gmail.com';
const WHATSAPP_SELL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I%20have%20an%20EV%20I'd%20like%20to%20sell.%20Can%20you%20help%20me%20with%20a%20valuation%3F`;

export default function Home() {
  const { getFeatured } = useInventory();
  const featuredCars = getFeatured().slice(0, 4);

  const [sellForm, setSellForm] = useState({ makeModel: '', mileage: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSellChange = (e) =>
    setSellForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSellSubmit = (e) => {
    e.preventDefault();
    const { makeModel, mileage, email } = sellForm;
    const subject = encodeURIComponent('Sell My EV – Atlas EV Motors Inquiry');
    const body = encodeURIComponent(
      `Hello Atlas EV Motors,\n\nI would like to sell my electric vehicle:\n\nMake & Model: ${makeModel}\nMileage: ${mileage} km\nContact Email: ${email}\n\nPlease evaluate and get back to me with an offer.\n\nThank you.`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setSellForm({ makeModel: '', mileage: '', email: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <main className="home">

      {/* ============================================================
          HERO — sits below the white navbar (paddingTop: 80px)
      ============================================================ */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src="/hero-landscape.png" alt="Atlas EV Motors showroom" className="hero-bg-image" />
          <div className="hero-overlay" />
        </div>

        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-eyebrow">Rwanda's Premier EV Dealership</span>
            <h1 className="hero-headline">
              Reliable.<br />Affordable.<br />Electric.
            </h1>
            <p className="hero-sub">
              Importing, selling, and servicing EVs in Rwanda. Experience the
              future of mobility with our local infrastructure.
            </p>
            <div className="hero-actions">
              <Link to="/cars" className="btn btn-primary hero-btn" id="hero-browse-btn">
                Browse Cars for Sale
              </Link>
              <Link to="/sell" className="btn btn-secondary-white hero-btn" id="hero-sell-btn">
                Sell My Car Instead ›
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ============================================================
          WHY ATLAS — Trust Strip
      ============================================================ */}
      <section className="why-atlas section" id="why-atlas">
        <div className="container">
          <div className="why-atlas-header">
            <h2 className="why-atlas-title">Why Atlas EV Motors</h2>
            <p className="why-atlas-sub">
              Three pillars that make us Rwanda's most trusted electric vehicle partner.
            </p>
          </div>
          <div className="why-atlas-grid">
            <div className="trust-card">
              <div className="trust-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div className="trust-content">
                <h3 className="trust-title">Direct Import</h3>
                <p className="trust-desc">
                  We source directly from manufacturers to ensure quality and competitive pricing with no middlemen.
                </p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="trust-content">
                <h3 className="trust-title">Transparent 50/50 Terms</h3>
                <p className="trust-desc">
                  Clear and fair pre-order structures with no hidden fees. Pay half now, half on delivery.
                </p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div className="trust-content">
                <h3 className="trust-title">Local After-Sales Support</h3>
                <p className="trust-desc">
                  Dedicated service centres in Rwanda with trained technicians to keep you moving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED INVENTORY
      ============================================================ */}
      <section className="featured-inventory section" id="featured-inventory">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">Our Fleet</span>
              <h2 className="section-title">Featured Inventory</h2>
            </div>
            <Link to="/cars" className="see-all-link" id="home-see-all-btn">
              See All Cars
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
          <div className="inventory-grid">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SELL MY CAR TEASER BAND
      ============================================================ */}
      <section className="sell-section" id="sell-cta">
        <div className="container">
          <div className="sell-inner">
            {/* Left – copy */}
            <div className="sell-copy">
              <span className="section-label" style={{ color: 'var(--color-secondary-action)' }}>
                Got an EV?
              </span>
              <h2 className="sell-headline">
                Have an EV to sell?<br />Get a fair offer as soon as possible.
              </h2>
              <p className="sell-desc">
                We offer fair market valuations for your used electric vehicle.
                Simple, fast, and transparent process.
              </p>
              <a
                href={WHATSAPP_SELL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary sell-whatsapp-btn"
                id="sell-whatsapp-cta"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
              <Link to="/sell" className="sell-form-link" id="sell-form-link">
                Or fill out the quick form →
              </Link>
            </div>

            {/* Right – quick form */}
            <div className="sell-form-wrap">
              {submitted ? (
                <div className="sell-success">
                  <div className="sell-success-check"><span className="material-symbols-outlined" style={{fontSize: '32px'}}>check_circle</span></div>
                  <p><strong>Enquiry sent!</strong> We'll review and get back to you within 2 business days.</p>
                </div>
              ) : (
                <form className="sell-form" onSubmit={handleSellSubmit} id="sell-quick-form">
                  <div className="form-group">
                    <label htmlFor="makeModel">Make &amp; Model</label>
                    <input id="makeModel" name="makeModel" type="text" className="form-control"
                      placeholder="e.g. Nissan Leaf 2020"
                      value={sellForm.makeModel} onChange={handleSellChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mileage">Mileage</label>
                    <input id="mileage" name="mileage" type="text" className="form-control"
                      placeholder="e.g. 45,000 km"
                      value={sellForm.mileage} onChange={handleSellChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactEmail">Contact Email</label>
                    <input id="contactEmail" name="email" type="email" className="form-control"
                      placeholder="you@email.com"
                      value={sellForm.email} onChange={handleSellChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary sell-submit-btn" id="sell-submit-btn">
                    Get Valuation Now
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA STRIP – Pre-Order & Services
      ============================================================ */}
      <section className="cta-strip section-tight" id="quick-links">
        <div className="container">
          <div className="cta-strip-grid">
            <div className="cta-strip-card">
              <div className="cta-strip-icon cta-preorder-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <div className="cta-strip-text">
                <h3>Pre-Order a Vehicle</h3>
                <p>Reserve your EV with a 50% deposit. Delivery timeline varies based on origin country and shipping conditions.</p>
              </div>
              <Link to="/preorder" className="btn btn-secondary cta-strip-btn" id="cta-preorder-btn">
                Learn More ›
              </Link>
            </div>

            <div className="cta-strip-card">
              <div className="cta-strip-icon cta-services-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div className="cta-strip-text">
                <h3>Import &amp; After-Sales</h3>
                <p>Full logistics support, warranties, and EV maintenance services in Rwanda.</p>
              </div>
              <Link to="/services" className="btn btn-secondary cta-strip-btn" id="cta-services-btn">
                Our Services ›
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
