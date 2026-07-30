import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import '../../styles/Admin.css';

const EMPTY_FORM = {
  name: '', brand: '', bodyType: 'SUV', year: new Date().getFullYear(),
  price: '', status: 'in-stock', range: '', battery: '', seats: 5,
  mileage: 0, color: '', description: '', featured: false,
  imageUrl: '/car-model3.png',
  featuresText: '',  // newline-separated features
  acceleration: '', topSpeed: '', chargingTime: '', driveType: 'FWD',
};

export default function AdminCarForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { cars, addCar, updateCar, isAdmin } = useAdmin();
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Load existing car data when editing
  useEffect(() => {
    if (isEditing) {
      const car = cars.find(c => c.id === id);
      if (car) {
        setForm({
          ...EMPTY_FORM,
          ...car,
          featuresText: car.features?.join('\n') || '',
          acceleration: car.specs?.acceleration || '',
          topSpeed: car.specs?.topSpeed || '',
          chargingTime: car.specs?.chargingTime || '',
          driveType: car.specs?.driveType || 'FWD',
          imageUrl: car.images?.[0] || '/car-model3.png',
        });
      }
    }
  }, [id, cars, isEditing]);

  if (!isAdmin) { navigate('/admin'); return null; }

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.price) {
      setError('Name and Price are required.');
      return;
    }

    const carData = {
      ...form,
      price: Number(form.price),
      range: Number(form.range),
      battery: Number(form.battery),
      seats: Number(form.seats),
      mileage: Number(form.mileage),
      year: Number(form.year),
      featured: form.featured,
      images: form.imageUrl ? [form.imageUrl] : [],
      features: form.featuresText.split('\n').map(s => s.trim()).filter(Boolean),
      specs: {
        acceleration: form.acceleration,
        topSpeed: form.topSpeed,
        chargingTime: form.chargingTime,
        driveType: form.driveType,
      },
    };

    if (isEditing) {
      updateCar(id, carData);
    } else {
      addCar(carData);
    }

    setSaved(true);
    setTimeout(() => navigate('/admin/dashboard'), 1200);
  };

  const BODY_TYPES = ['SUV', 'City Car', 'Premium Sedan', 'Commercial Van', 'Hatchback', 'Sedan'];
  const DRIVE_TYPES = ['FWD', 'RWD', 'AWD', '4WD'];

  return (
    <div className="admin-layout">
      {/* Sidebar (simplified) */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <div className="nav-logo-icon" style={{ width: 36, height: 36, fontSize: 13 }}>EV</div>
          <div><strong>ATLAS EV</strong><span>Admin</span></div>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="admin-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Inventory
          </Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-page-title">{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h1>
            <p className="admin-page-sub">
              {isEditing ? `Editing: ${form.name}` : 'Fill in the listing details below'}
            </p>
          </div>
        </div>

        {saved && (
          <div className="admin-success"><span className="material-symbols-outlined" style={{verticalAlign: 'middle', fontSize: '18px'}}>check_circle</span> {isEditing ? 'Changes saved!' : 'Vehicle added!'} Redirecting...</div>
        )}
        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form" id="admin-car-form">

          {/* ── Basic Info ── */}
          <div className="admin-form-section">
            <h3 className="admin-form-section-title">Basic Information</h3>
            <div className="admin-form-grid-2">
              <div className="form-group">
                <label>Vehicle Name *</label>
                <input type="text" className="form-control" placeholder="e.g. Neta U Pro 2022"
                  value={form.name} onChange={e => set('name', e.target.value)} required id="af-name"/>
              </div>
              <div className="form-group">
                <label>Brand *</label>
                <input type="text" className="form-control" placeholder="e.g. Neta, BYD, Atlas"
                  value={form.brand} onChange={e => set('brand', e.target.value)} required id="af-brand"/>
              </div>
              <div className="form-group">
                <label>Body Type</label>
                <select className="form-control" value={form.bodyType}
                  onChange={e => set('bodyType', e.target.value)} id="af-bodytype">
                  {BODY_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="form-control" value={form.status}
                  onChange={e => set('status', e.target.value)} id="af-status">
                  <option value="in-stock">In Stock</option>
                  <option value="pre-order">Pre-Order</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price (RWF) *</label>
                <input type="number" className="form-control" placeholder="23000000"
                  value={form.price} onChange={e => set('price', e.target.value)} required id="af-price"/>
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="number" className="form-control" min="2010" max="2030"
                  value={form.year} onChange={e => set('year', e.target.value)} id="af-year"/>
              </div>
              <div className="form-group">
                <label>Color / Trim</label>
                <input type="text" className="form-control" placeholder="e.g. Black, Pearl White"
                  value={form.color} onChange={e => set('color', e.target.value)} id="af-color"/>
              </div>
              <div className="form-group">
                <label>Mileage (km) — 0 for new</label>
                <input type="number" className="form-control" min="0"
                  value={form.mileage} onChange={e => set('mileage', e.target.value)} id="af-mileage"/>
              </div>
            </div>

            <div className="admin-form-checkbox">
              <label className="admin-checkbox-label">
                <input type="checkbox" checked={form.featured}
                  onChange={e => set('featured', e.target.checked)} id="af-featured"/>
                <span><span className="material-symbols-outlined" style={{color: '#fbbf24', verticalAlign: 'middle', fontSize: '18px', marginRight: '4px'}}>star</span> Show on Home Page (Featured)</span>
              </label>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label>Vehicle Image URL</label>
              <input type="text" className="form-control" placeholder="e.g. /car-suv-pro.png or https://example.com/image.jpg"
                value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} id="af-imageurl"/>
            </div>
          </div>

          {/* ── Performance ── */}
          <div className="admin-form-section">
            <h3 className="admin-form-section-title">Performance &amp; Battery</h3>
            <div className="admin-form-grid-3">
              <div className="form-group">
                <label>Range (km)</label>
                <input type="number" className="form-control" placeholder="400"
                  value={form.range} onChange={e => set('range', e.target.value)} id="af-range"/>
              </div>
              <div className="form-group">
                <label>Battery (kWh)</label>
                <input type="number" className="form-control" placeholder="70"
                  value={form.battery} onChange={e => set('battery', e.target.value)} id="af-battery"/>
              </div>
              <div className="form-group">
                <label>Seats</label>
                <input type="number" className="form-control" min="1" max="9"
                  value={form.seats} onChange={e => set('seats', e.target.value)} id="af-seats"/>
              </div>
              <div className="form-group">
                <label>0–100 km/h</label>
                <input type="text" className="form-control" placeholder="7.5s"
                  value={form.acceleration} onChange={e => set('acceleration', e.target.value)} id="af-accel"/>
              </div>
              <div className="form-group">
                <label>Top Speed</label>
                <input type="text" className="form-control" placeholder="170 km/h"
                  value={form.topSpeed} onChange={e => set('topSpeed', e.target.value)} id="af-topspeed"/>
              </div>
              <div className="form-group">
                <label>Drive Type</label>
                <select className="form-control" value={form.driveType}
                  onChange={e => set('driveType', e.target.value)} id="af-drive">
                  {DRIVE_TYPES.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label>Charging Time</label>
                <input type="text" className="form-control" placeholder="45 min (DC Fast Charge to 80%)"
                  value={form.chargingTime} onChange={e => set('chargingTime', e.target.value)} id="af-charge"/>
              </div>
            </div>
          </div>

          {/* ── Description ── */}
          <div className="admin-form-section">
            <h3 className="admin-form-section-title">Description &amp; Features</h3>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" rows={4}
                placeholder="Write a compelling description of this vehicle..."
                value={form.description} onChange={e => set('description', e.target.value)}
                style={{ resize: 'vertical' }} id="af-desc"/>
            </div>
            <div className="form-group">
              <label>
                Key Features
                <span className="admin-hint"> — One feature per line (like your WhatsApp posts <span className="material-symbols-outlined" style={{color: '#4ade80', verticalAlign: 'middle', fontSize: '14px'}}>check_circle</span>)</span>
              </label>
              <textarea className="form-control" rows={8}
                placeholder={'2022 Model\nFull Electric SUV\nUp to 400 km Driving Range\nPanoramic Sunroof\nAdvanced Safety Features'}
                value={form.featuresText} onChange={e => set('featuresText', e.target.value)}
                style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '13px' }}
                id="af-features"/>
              <p className="admin-hint-text">
                Each line becomes a <span className="material-symbols-outlined" style={{fontSize: '14px', verticalAlign: 'middle'}}>check</span> bullet on the car detail page, just like your WhatsApp posts.
              </p>
            </div>
          </div>

          {/* ── Images ── */}
          <div className="admin-form-section">
            <h3 className="admin-form-section-title">Image URL</h3>
            <div className="form-group">
              <label>Primary Image Path</label>
              <input type="text" className="form-control"
                placeholder="/car-model3.png or https://..."
                value={form.images[0] || ''}
                onChange={e => set('images', [e.target.value])} id="af-image"/>
              <p className="admin-hint-text">
                Place images in the <code>/public/</code> folder and enter the filename here (e.g. <code>/my-car.jpg</code>).
              </p>
            </div>
            {form.images[0] && (
              <div className="admin-img-preview">
                <img src={form.images[0]} alt="Preview"
                  onError={e => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="admin-form-actions">
            <Link to="/admin/dashboard" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary" id="admin-save-btn">
              {isEditing ? 'Save Changes' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
