import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../context/AdminContext';
import '../styles/SearchOverlay.css';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { cars } = useInventory();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = query.trim().length > 0
    ? cars.filter(car => {
        const q = query.toLowerCase();
        return (
          car.name.toLowerCase().includes(q) ||
          car.brand.toLowerCase().includes(q) ||
          car.bodyType.toLowerCase().includes(q) ||
          String(car.year).includes(q) ||
          String(car.price).includes(q.replace(/[^0-9]/g, ''))
        );
      })
    : [];

  const handleSelect = (car) => {
    navigate(`/cars/${car.slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="search-modal">
        {/* Input bar */}
        <div className="search-bar">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="Search by name, brand, body type…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="search-overlay-input"
            autoComplete="off"
          />
          <button className="search-close-btn" onClick={onClose} aria-label="Close search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Results */}
        <div className="search-results">
          {query.trim() === '' && (
            <div className="search-hint">
              <p>Start typing to search our EV inventory…</p>
              <div className="search-quick-links">
                {['SUV', 'City Car', 'Pre-Order', 'In Stock'].map(tag => (
                  <button key={tag} className="search-tag" onClick={() => setQuery(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() !== '' && results.length === 0 && (
            <div className="search-empty">
              <p>No vehicles found for "<strong>{query}</strong>"</p>
              <a
                href={`https://wa.me/250782351635?text=Hi!%20I'm%20looking%20for%20a%20${encodeURIComponent(query)}%20electric%20vehicle.%20Can%20you%20help%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '14px', padding: '10px 20px' }}
                onClick={onClose}
              >
                Request this vehicle on WhatsApp
              </a>
            </div>
          )}

          {results.length > 0 && (
            <ul className="search-list">
              {results.map(car => (
                <li key={car.id}>
                  <button className="search-result-item" onClick={() => handleSelect(car)}>
                    <img
                      src={car.images?.[0] || '/car-model3.png'}
                      alt={car.name}
                      className="search-result-img"
                    />
                    <div className="search-result-info">
                      <strong className="search-result-name">{car.name}</strong>
                      <span className="search-result-meta">
                        {car.year} · {car.bodyType} · {car.range} km
                      </span>
                    </div>
                    <div className="search-result-right">
                      <span className="search-result-price">
                        RWF {car.price.toLocaleString('en-RW')}
                      </span>
                      <span className={`badge ${car.status === 'in-stock' ? 'badge-in-stock' : 'badge-pre-order'}`}
                        style={{ fontSize: '10px', padding: '3px 8px' }}>
                        {car.status === 'in-stock' ? 'In Stock' : 'Pre-Order'}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="search-footer">
          <span>Press <kbd>Esc</kbd> to close</span>
          {results.length > 0 && (
            <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>
    </div>
  );
}
