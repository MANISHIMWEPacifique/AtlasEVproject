import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import WhatsAppFAB from './WhatsAppFAB';

const WHATSAPP_NUMBER = '250782351635';
const EMAIL = 'atlasevmotors@gmail.com';
const INSTAGRAM_URL = 'https://instagram.com/atlasevmotors';
const MAPS_URL = 'https://maps.google.com/?q=Gikondo+Magerwa+Kigali+Rwanda';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">

            <p className="footer-tagline">Reliable. Affordable. Electric.</p>
            <p className="footer-desc">
              Importing, selling, and servicing EVs in Rwanda since 2024. Your partner in the electric transition.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              {/* Instagram icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Follow on Instagram
            </a>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="footer-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.6 4.56 2 2 0 0 1 3.54 2.36h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.91 6.91l.8-.8a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  +250 782 351 635
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="footer-link footer-link-green">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Expert
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="footer-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Hours</h4>
            <ul className="footer-hours">
              <li><span>Everyday</span><span>24/7</span></li>
              <li className="footer-response-note">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                Online inquiries: we try to do all days and answers on line as soon as possible
              </li>
            </ul>
          </div>

          {/* Location Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Location</h4>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-card"
            >
              <div style={{ height: '110px', background: '#eceeef', overflow: 'hidden' }}>
                <img 
                  src="/footer-map-v2.png" 
                  alt="Atlas EV Motors Magerwa Location" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <p className="footer-map-label">Gikondo, Magerwa · Kigali, Rwanda</p>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {year} Atlas EV Motors. All rights reserved.</p>
          <nav className="footer-bottom-links">
            <Link to="/cars" className="footer-bottom-link">Inventory</Link>
            <Link to="/preorder" className="footer-bottom-link">Pre-Order</Link>
            <Link to="/services" className="footer-bottom-link">Services</Link>
            <Link to="/contact" className="footer-bottom-link">Contact</Link>
          </nav>
        </div>
      </div>
      <WhatsAppFAB />
    </footer>
  );
}
