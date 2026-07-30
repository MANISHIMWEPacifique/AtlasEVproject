import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/PreOrder.css';

const WA = '250782351635';
const EMAIL = 'atlasevmotors@gmail.com';
const WHATSAPP_PREORDER = `https://wa.me/${WA}?text=Hello!%20I'm%20interested%20in%20pre-ordering%20a%20vehicle.%20Can%20you%20share%20details%20and%20available%20models%3F`;

const FAQS = [
  {
    q: 'How long does the import take?',
    a: 'Delivery timelines vary depending on the port clearance and current shipping conditions from China. We provide an estimated timeframe at the time of order and keep you updated throughout the entire process.',
  },
  {
    q: 'Is the 50% deposit refundable?',
    a: 'Yes — if we are unable to fulfil your order for any reason, your deposit is fully refunded. In case of buyer cancellation, terms are discussed case by case.',
  },
  {
    q: 'How do I pay the deposit?',
    a: 'We issue a formal invoice via email or WhatsApp. Payment can be made via mobile money (MTN/Airtel) or bank transfer.',
  },
  {
    q: 'What happens when the car arrives?',
    a: 'We notify you when the vehicle clears customs. You inspect it, pay the remaining 50%, and drive away.',
  },
];

export default function PreOrder() {
  const [openFaq, setOpenFaq] = useState(null);

  const emailUrl = `mailto:${EMAIL}?subject=${encodeURIComponent('Pre-Order Inquiry – Atlas EV Motors')}&body=${encodeURIComponent('Hello,\n\nI am interested in pre-ordering an electric vehicle.\n\nPlease send me available models and payment details.\n\nThank you.')}`;

  return (
    <main className="preorder-page" style={{ paddingTop: '80px' }}>

      {/* Header */}
      <section className="preorder-header">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--color-secondary-container)' }}>
            Reserve Yours
          </span>
          <h1 className="preorder-headline">Pre-Order &amp; Financing</h1>
          <p className="preorder-sub">
            Secure your electric vehicle before it arrives in Rwanda. Clear terms, no surprises.
          </p>
        </div>
      </section>

      {/* How it works – 4 steps */}
      <section className="section">
        <div className="container">
          <div className="preorder-section-header">
            <span className="section-label">The Process</span>
            <h2 className="preorder-section-title">How Pre-Ordering Works</h2>
            <p className="preorder-section-sub">
              Four simple steps from reservation to collection.
            </p>
          </div>

          <div className="preorder-steps">
            {[
              {
                n: '1',
                icon: <span className="material-symbols-outlined" style={{fontSize: '32px'}}>credit_card</span>,
                title: 'Reserve with 50% Deposit',
                desc: 'Choose your vehicle, receive an invoice, and pay 50% to confirm your slot. We\'ll lock in your unit immediately.',
              },
              {
                n: '2',
                icon: <span className="material-symbols-outlined" style={{fontSize: '32px'}}>directions_boat</span>,
                title: 'We Import Your Vehicle',
                desc: 'We source directly from the manufacturer and handle all logistics: shipping, customs, and RRA clearance.',
              },
              {
                n: '3',
                icon: <span className="material-symbols-outlined" style={{fontSize: '32px'}}>check_circle</span>,
                title: 'Pay Remaining 50% on Arrival',
                desc: 'Once your vehicle lands and passes inspection, we notify you. You pay the balance — nothing extra.',
              },
              {
                n: '4',
                icon: <span className="material-symbols-outlined" style={{fontSize: '32px'}}>directions_car</span>,
                title: 'Collect Your Car',
                desc: 'Receive full documentation, a handover briefing, and drive your new EV home. After-sales support starts from day one.',
              },
            ].map(({ n, icon, title, desc }) => (
              <div key={n} className="preorder-step">
                <div className="preorder-step-icon">{icon}</div>
                <div className="preorder-step-num">{n}</div>
                <h3 className="preorder-step-title">{title}</h3>
                <p className="preorder-step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <div className="preorder-cta-band">
        <div className="container preorder-cta-inner">
          <div>
            <h3>Ready to reserve?</h3>
            <p>Tell us which model you're interested in — we'll send you an invoice and availability window.</p>
          </div>
          <div className="preorder-cta-btns">
            <a href={WHATSAPP_PREORDER} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" id="preorder-wa-btn">
              Ask on WhatsApp
            </a>
            <a href={emailUrl} className="btn btn-secondary-white" id="preorder-email-btn">
              Email Inquiry
            </a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="section">
        <div className="container preorder-faq-layout">
          <div>
            <span className="section-label">Common Questions</span>
            <h2 className="preorder-section-title">Frequently Asked</h2>
            <p className="preorder-section-sub">
              Pre-answered so you can make a confident decision.
            </p>
            <Link to="/contact" className="btn btn-secondary preorder-contact-btn" id="preorder-contact-btn"
              style={{ marginTop: '24px', display: 'inline-flex' }}>
              Still have questions? Contact us
            </Link>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  id={`faq-${i}`}>
                  <span>{faq.q}</span>
                  <svg className="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
