import { useState, useMemo } from 'react';
import CarCard from '../components/CarCard';
import { useInventory } from '../context/AdminContext';
import '../styles/Cars.css';

const WHATSAPP_REQUEST = `https://wa.me/250782351635?text=Hi!%20I%20couldn't%20find%20what%20I%20was%20looking%20for%20in%20the%20inventory.%20Can%20you%20help%20me%20find%20a%20specific%20EV%3F`;

const BODY_TYPES = ['All', 'SUV', 'City Car', 'Premium Sedan', 'Commercial Van'];
const STATUSES  = ['All', 'In Stock', 'Pre-Order'];

export default function Cars() {
  const { cars, loading } = useInventory();

  const [bodyType, setBodyType] = useState('All');
  const [status, setStatus]     = useState('All');
  const [priceMax, setPriceMax] = useState(100000000);
  const [sort, setSort]         = useState('default');
  const [search, setSearch]     = useState('');

  const filtered = useMemo(() => {
    let list = cars.filter(car => {
      if (bodyType !== 'All' && car.bodyType !== bodyType) return false;
      if (status !== 'All') {
        const wantStock = status === 'In Stock';
        if (wantStock && car.status !== 'in-stock') return false;
        if (!wantStock && car.status !== 'pre-order') return false;
      }
      if (car.price > priceMax) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !car.name.toLowerCase().includes(q) &&
          !car.brand.toLowerCase().includes(q) &&
          !car.bodyType.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });

    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'newest')     list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return list;
  }, [cars, bodyType, status, priceMax, sort, search]);

  const resetFilters = () => {
    setBodyType('All');
    setStatus('All');
    setPriceMax(100000000);
    setSort('default');
    setSearch('');
  };

  const hasFilters = bodyType !== 'All' || status !== 'All' || priceMax < 100000000 || search !== '';

  return (
    <main className="cars-page" style={{ paddingTop: '80px' }}>

      {/* Page header */}
      <section className="cars-header">
        <div className="container">
          <span className="section-label" style={{ color: 'var(--color-secondary-container)' }}>
            Our Fleet
          </span>
          <h1 className="cars-headline">Cars for Sale</h1>
          <p className="cars-header-count">
            <span className="cars-count-num">{cars.length}</span> vehicles available
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="cars-filter-bar">
        <div className="container cars-filter-inner">
          {/* Search */}
          <div className="filter-search-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="search"
              className="filter-search"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="cars-filter-search"
            />
          </div>

          {/* Body type */}
          <select className="filter-select" value={bodyType}
            onChange={e => setBodyType(e.target.value)} id="filter-body-type">
            {BODY_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>

          {/* Status */}
          <select className="filter-select" value={status}
            onChange={e => setStatus(e.target.value)} id="filter-status">
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>

          {/* Price */}
          <div className="filter-price-wrap">
            <span className="filter-price-label">
              Max: RWF {(priceMax / 1000000).toFixed(0)}M
            </span>
            <input type="range" min={5000000} max={100000000} step={1000000}
              value={priceMax} onChange={e => setPriceMax(Number(e.target.value))}
              className="filter-price-slider" id="filter-price" />
          </div>

          {/* Sort */}
          <select className="filter-select" value={sort}
            onChange={e => setSort(e.target.value)} id="filter-sort">
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="newest">Newest First</option>
          </select>

          {/* Reset */}
          {hasFilters && (
            <button className="filter-reset-btn" onClick={resetFilters} id="filter-reset-btn">
              ✕ Reset
            </button>
          )}
        </div>
      </div>

      {/* Grid / empty state */}
      <div className="container cars-body">
        {/* Results meta */}
        <div className="cars-results-meta">
          <p>
            {loading
              ? 'Loading inventory...'
              : <>Showing <strong>{filtered.length}</strong> of {cars.length} vehicles
                {hasFilters && <button className="cars-clear-inline" onClick={resetFilters}>Clear filters</button>}
              </>
            }
          </p>
        </div>

        {loading ? (
          <div className="cars-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="car-card car-card-skeleton" aria-hidden="true">
                <div className="car-card-image-wrap" style={{ background: '#e8eaeb', borderRadius: '8px 8px 0 0', minHeight: 200 }} />
                <div className="car-card-body" style={{ gap: 10 }}>
                  <div style={{ height: 12, width: '40%', background: '#e8eaeb', borderRadius: 4 }} />
                  <div style={{ height: 18, width: '75%', background: '#e0e2e3', borderRadius: 4 }} />
                  <div style={{ height: 14, width: '55%', background: '#e8eaeb', borderRadius: 4 }} />
                  <div style={{ height: 38, background: '#e8eaeb', borderRadius: 6, marginTop: 8 }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="cars-empty">
            <div className="cars-empty-icon"><span className="material-symbols-outlined" style={{fontSize: '48px'}}>search_off</span></div>
            <h3>No vehicles found</h3>
            <p>Try adjusting your filters or reset to see all available vehicles.</p>
            <div className="cars-empty-actions">
              <button className="btn btn-secondary" onClick={resetFilters} id="empty-reset-btn">
                Reset Filters
              </button>
              <a href={WHATSAPP_REQUEST} target="_blank" rel="noopener noreferrer"
                className="btn btn-primary" id="empty-whatsapp-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message us your request
              </a>
            </div>
          </div>
        ) : (
          <div className="cars-grid">
            {filtered.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        )}
      </div>
    </main>
  );
}
