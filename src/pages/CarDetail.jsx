import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useInventory } from '../context/AdminContext';
import { getRelatedCars } from '../data/inventory';
import CarCard from '../components/CarCard';
import '../styles/CarDetail.css';

const WA = '250782351635';
const EMAIL = 'atlasevmotors@gmail.com';
const BASE_URL = 'https://atlasevmotors.rw';

function buildWA(carName, slug, intent) {
  const url = `${BASE_URL}/cars/${slug}`;
  const msg = intent === 'buy'
    ? `Hello Atlas EV Motors! I'm interested in purchasing the *${carName}*.\nCar link: ${url}\n\nCould you provide more information and next steps?`
    : `Hello! I'd like to pre-order the *${carName}*.\nI understand the 50% deposit upfront.\nCar link: ${url}\n\nPlease send the invoice and payment details.`;
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

function buildEmail(carName, slug) {
  const url = `${BASE_URL}/cars/${slug}`;
  const subj = encodeURIComponent(`Inquiry: ${carName} – Atlas EV Motors`);
  const body = encodeURIComponent(`Hello,\n\nI am interested in the ${carName}.\nVehicle page: ${url}\n\nPlease contact me.\n\nThank you.`);
  return `mailto:${EMAIL}?subject=${subj}&body=${body}`;
}

export default function CarDetail() {
  const { slug }  = useParams();
  const { cars }  = useInventory();
  const navigate  = useNavigate();
  const car       = cars.find(c => c.slug === slug);

  const [activeImg, setActiveImg] = useState(0);

  if (!car) {
    return (
      <main className="not-found-page" style={{ paddingTop: '80px' }}>
        <div className="container not-found-inner">
          <div className="not-found-icon"><span className="material-symbols-outlined" style={{fontSize: '64px', opacity: 0.8}}>directions_car</span></div>
          <h1>Vehicle not found</h1>
          <p>This listing may have been sold or the link is incorrect.</p>
          <div className="not-found-actions">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Go Back</button>
            <Link to="/cars" className="btn btn-primary">Browse All Cars</Link>
          </div>
        </div>
      </main>
    );
  }

  const images = car.images?.length ? car.images : ['/car-model3.png'];
  const isInStock = car.status === 'in-stock';
  const relatedCars = getRelatedCars(car.slug, cars, 3);

  return (
    <main className="car-detail-page" style={{ paddingTop: '80px' }}>

      {/* Breadcrumb */}
      <div className="car-detail-breadcrumb">
        <div className="container car-detail-breadcrumb-inner">
          <Link to="/cars">← All Cars</Link>
          <span className="breadcrumb-sep">/</span>
          <span>{car.name}</span>
        </div>
      </div>

      <div className="container car-detail-layout">

        {/* ── LEFT: Gallery ── */}
        <div className="car-detail-gallery">
          <div className="gallery-main">
            <img
              src={images[activeImg]}
              alt={`${car.name} - image ${activeImg + 1}`}
              className="gallery-main-img"
            />
            <span className={`badge gallery-badge ${isInStock ? 'badge-in-stock' : 'badge-pre-order'}`}>
              {isInStock ? <><span className="badge-dot" />In Stock</> : 'Pre-Order'}
            </span>
            {car.mileage > 0 && (
              <span className="gallery-mileage">
                {car.mileage.toLocaleString()} km
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`gallery-thumb${i === activeImg ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt={`${car.name} thumbnail ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Info + CTAs ── */}
        <div className="car-detail-info">
          <span className="car-detail-type">{car.bodyType}</span>
          <h1 className="car-detail-name">{car.name}</h1>
          <p className="car-detail-meta">{car.year} · {car.color}{car.mileage > 0 ? ` · ${car.mileage.toLocaleString()} km` : ' · New'}</p>

          <p className="car-detail-price">
            RWF {car.price.toLocaleString('en-RW')}
          </p>

          {/* Quick specs */}
          <div className="car-detail-specs-grid">
            <div className="detail-spec-item">
              <span className="detail-spec-label">Range</span>
              <span className="detail-spec-val">{car.range} km</span>
            </div>
            <div className="detail-spec-item">
              <span className="detail-spec-label">Battery</span>
              <span className="detail-spec-val">{car.battery} kWh</span>
            </div>
            <div className="detail-spec-item">
              <span className="detail-spec-label">Seats</span>
              <span className="detail-spec-val">{car.seats}</span>
            </div>
            <div className="detail-spec-item">
              <span className="detail-spec-label">Drive</span>
              <span className="detail-spec-val">{car.specs?.driveType || '—'}</span>
            </div>
            <div className="detail-spec-item">
              <span className="detail-spec-label">0–100 km/h</span>
              <span className="detail-spec-val">{car.specs?.acceleration || '—'}</span>
            </div>
            <div className="detail-spec-item">
              <span className="detail-spec-label">Top Speed</span>
              <span className="detail-spec-val">{car.specs?.topSpeed || '—'}</span>
            </div>
          </div>

          {/* ── PRIMARY CTAs (both green, unmissable) ── */}
          <div className="car-detail-ctas">
            <a
              href={buildWA(car.name, car.slug, 'buy')}
              target="_blank" rel="noopener noreferrer"
              className="btn car-detail-cta-btn cta-buy"
              id="car-detail-buy-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contact Owner to Buy
            </a>
            <a
              href={buildWA(car.name, car.slug, 'preorder')}
              target="_blank" rel="noopener noreferrer"
              className="btn car-detail-cta-btn cta-preorder"
              id="car-detail-preorder-btn"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              Pre-Order Now (50% Deposit)
            </a>
            <a
              href={buildEmail(car.name, car.slug)}
              className="car-detail-email-link"
              id="car-detail-email-link"
            >
              Or send an email inquiry →
            </a>
          </div>
        </div>
      </div>

      {/* ── Description + Features ── */}
      <section className="car-detail-body">
        <div className="container car-detail-body-grid">
          <div>
            <h2 className="car-detail-section-title">About this Vehicle</h2>
            <p className="car-detail-desc">{car.description}</p>

            {car.features?.length > 0 && (
              <div className="car-detail-features">
                <h3 className="car-detail-features-title">Key Features</h3>
                <ul className="car-detail-features-list">
                  {car.features.map((f, i) => (
                    <li key={i} className="car-detail-feature-item">
                      <span className="feature-check"><span className="material-symbols-outlined" style={{fontSize: '18px'}}>check</span></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h2 className="car-detail-section-title">Full Specifications</h2>
            <div className="car-detail-specs-table">
              {car.specs && Object.entries(car.specs).map(([key, val]) => (
                <div key={key} className="spec-row">
                  <span className="spec-key">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="spec-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── You might also like ── */}
      {relatedCars.length > 0 && (
        <section className="car-detail-related">
          <div className="container">
            <h2 className="car-detail-section-title">You Might Also Like</h2>
            <div className="related-cars-grid">
              {relatedCars.map(rc => <CarCard key={rc.id} car={rc} />)}
            </div>
            <div className="related-cars-cta">
              <Link to="/cars" className="btn btn-secondary" id="related-see-all-btn">
                See All Vehicles →
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
