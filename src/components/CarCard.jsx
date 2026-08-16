import { Link } from 'react-router-dom';
import '../styles/CarCard.css';

export default function CarCard({ car }) {
  const {
    slug,
    name,
    images,
    price,
    status,
    range,
    
   
    year,
    mileage,
  } = car;

  const isInStock = status === 'in-stock';
  const primaryImage = images?.[0] || '/car-model3.png';

  return (
    <article className="car-card" id={`car-card-${slug}`}>
      {/* Image */}
      <Link to={`/cars/${slug}`} className="car-card-image-link">
        <div className="car-card-image-wrap">
          <img
            src={primaryImage}
            alt={name}
            className="car-card-image"
            loading="lazy"
          />
          <span className={`badge car-card-badge ${isInStock ? 'badge-in-stock' : 'badge-pre-order'}`}>
            {isInStock ? (
              <><span className="badge-dot" />In Stock</>
            ) : 'Pre-Order'}
          </span>
          {mileage > 0 && (
            <span className="car-card-mileage-badge">
              {mileage.toLocaleString()} km
            </span>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="car-card-body">
        <div className="car-card-meta">
          <span className="car-card-type">{bodyType}</span>
          <span className="car-card-year">{year}</span>
        </div>

        <h3 className="car-card-name">
          <Link to={`/cars/${slug}`}>{name}</Link>
        </h3>

        <p className="car-card-price">
          RWF {price.toLocaleString('en-RW')}
        </p>

        {/* Specs row */}
        <div className="car-card-specs">
          <div className="car-card-spec" title="Driving Range">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <span>{range} km</span>
          </div>
          <div className="car-card-spec" title="Battery Capacity">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
              <line x1="23" y1="13" x2="23" y2="11" />
            </svg>
            <span>{battery} kWh</span>
          </div>
        </div>

        {/* Single action button */}
        <Link to={`/cars/${slug}`} className="car-card-view-btn" id={`view-${slug}`}>
          View Details
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
