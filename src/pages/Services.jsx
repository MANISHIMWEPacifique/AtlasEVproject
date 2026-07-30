import { Link } from 'react-router-dom';
import '../styles/Services.css';

const WA = '250782351635';
const WHATSAPP_SERVICE = `https://wa.me/${WA}?text=Hello!%20I%20have%20a%20question%20about%20your%20services.%20Can%20you%20help%3F`;

export default function Services() {
  return (
    <main className="services-page" style={{ paddingTop: '80px' }}>

      {/* ── Header ── */}
      <section className="services-header">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--color-secondary-container)' }}>
            Import & Delivery
          </span>
          <h1 className="services-headline">Our Services</h1>
          <p className="services-sub">
            From first import to final delivery — we are your trusted EV partner in Rwanda.
          </p>
        </div>
      </section>

      {/* ── Section 1: Import & Delivery ── */}
      <section className="section" id="import-delivery">
        <div className="container">
          <div className="services-block">
            <div className="services-block-header">
              <div className="services-block-icon import-icon"><span className="material-symbols-outlined">directions_boat</span></div>
              <div>
                <span className="section-label">Section 1</span>
                <h2 className="services-block-title">Import &amp; Delivery</h2>
                <p className="services-block-sub">
                  We handle the entire logistics chain — so you don't have to.
                </p>
              </div>
            </div>

            <div className="services-item-grid">
              {[
                {
                  icon: <span className="material-symbols-outlined">local_shipping</span>,
                  title: 'Direct Manufacturer Sourcing',
                  desc: 'We purchase directly from factories in China — no middlemen, no inflated prices.',
                },
                {
                  icon: <span className="material-symbols-outlined">policy</span>,
                  title: 'Full Customs Clearance',
                  desc: 'Our team handles all documentation, RRA compliance, and port formalities to bring your vehicle in without delays.',
                },
                {
                  icon: <span className="material-symbols-outlined">map</span>,
                  title: 'Port-to-Door Delivery',
                  desc: 'Once cleared, we arrange safe transport of your vehicle from the port directly to your location in Rwanda.',
                },
                {
                  icon: <span className="material-symbols-outlined">calendar_month</span>,
                  title: '60–90 Day Timeline',
                  desc: 'From confirmed order to delivery, we provide a clear and realistic timeline — typically 60–90 days end-to-end.',
                },
                {
                  icon: <span className="material-symbols-outlined">search</span>,
                  title: 'Pre-Shipment Inspection',
                  desc: 'Every vehicle undergoes a quality inspection before shipment to ensure it matches the agreed specification.',
                },
                {
                  icon: <span className="material-symbols-outlined">description</span>,
                  title: 'Full Documentation',
                  desc: 'We provide all required documents: bill of lading, customs declarations, roadworthiness certificate, and transfer papers.',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="service-item">
                  <div className="service-item-icon">{icon}</div>
                  <div>
                    <h3 className="service-item-title">{title}</h3>
                    <p className="service-item-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── CTA band ── */}
      <section className="services-cta-band">
        <div className="container services-cta-inner">
          <div>
            <h3>Have a service question?</h3>
            <p>Our team is available 24/7. We typically respond online as soon as possible.</p>
          </div>
          <div className="services-cta-btns">
            <a href={WHATSAPP_SERVICE} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" id="services-wa-btn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Our Team
            </a>
            <Link to="/contact" className="btn btn-secondary-white" id="services-contact-btn">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
