import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import '../../styles/Admin.css';

export default function AdminDashboard() {
  const { cars, deleteCar, resetToSeed, logout, isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  if (!isAdmin) {
    navigate('/admin');
    return null;
  }

  const filtered = cars.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    deleteCar(id);
    setDeleteConfirm(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleReset = () => {
    if (window.confirm('Reset all inventory to original seed data? This cannot be undone.')) {
      resetToSeed();
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <div className="nav-logo-icon" style={{ width: 36, height: 36, fontSize: 13 }}>EV</div>
          <div>
            <strong>ATLAS EV</strong>
            <span>Admin</span>
          </div>
        </div>

        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="admin-nav-link active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Inventory
          </Link>
          <Link to="/admin/cars/new" className="admin-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Add New Car
          </Link>
          <Link to="/" className="admin-nav-link" target="_blank">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Website
          </Link>
        </nav>

        <div className="admin-sidebar-bottom">
          <button className="admin-nav-link admin-reset-btn" onClick={handleReset}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
            </svg>
            Reset to Defaults
          </button>
          <button className="admin-nav-link admin-logout-btn" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1 className="admin-page-title">Inventory Management</h1>
            <p className="admin-page-sub">{cars.length} vehicle{cars.length !== 1 ? 's' : ''} in the database</p>
          </div>
          <Link to="/admin/cars/new" className="btn btn-primary admin-add-btn" id="admin-add-car-btn">
            + Add New Car
          </Link>
        </div>

        {/* Search */}
        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="search" placeholder="Search listings..." value={search}
              onChange={e => setSearch(e.target.value)} className="admin-search" id="admin-search-input" />
          </div>
          <span className="admin-count">{filtered.length} shown</span>
        </div>

        {/* Table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Price</th>
                <th>Status</th>
                <th>Range</th>
                <th>Year</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(car => (
                <tr key={car.id} className={deleteConfirm === car.id ? 'admin-row-deleting' : ''}>
                  <td>
                    <div className="admin-car-cell">
                      <img src={car.images?.[0] || '/car-model3.png'} alt={car.name}
                        className="admin-car-thumb" />
                      <div>
                        <strong className="admin-car-name">{car.name}</strong>
                        <span className="admin-car-type">{car.bodyType} · {car.brand}</span>
                      </div>
                    </div>
                  </td>
                  <td className="admin-price">RWF {car.price.toLocaleString('en-RW')}</td>
                  <td>
                    <span className={`badge ${car.status === 'in-stock' ? 'badge-in-stock' : 'badge-pre-order'}`}
                      style={{ fontSize: '11px' }}>
                      {car.status === 'in-stock' ? 'In Stock' : 'Pre-Order'}
                    </span>
                  </td>
                  <td className="admin-meta">{car.range} km</td>
                  <td className="admin-meta">{car.year}</td>
                  <td className="admin-meta">
                    {car.featured ? <span className="material-symbols-outlined" style={{fontSize: '16px', color: '#fbbf24', verticalAlign: 'middle'}}>star</span> : '—'}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link to={`/admin/cars/edit/${car.id}`}
                        className="admin-action-btn admin-edit-btn" title="Edit">
                        Edit
                      </Link>
                      {deleteConfirm === car.id ? (
                        <div className="admin-delete-confirm">
                          <span>Sure?</span>
                          <button className="admin-action-btn admin-confirm-yes"
                            onClick={() => handleDelete(car.id)}>Yes</button>
                          <button className="admin-action-btn admin-confirm-no"
                            onClick={() => setDeleteConfirm(null)}>No</button>
                        </div>
                      ) : (
                        <button className="admin-action-btn admin-delete-btn"
                          onClick={() => setDeleteConfirm(car.id)} title="Delete">
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="admin-empty">
              <p>No vehicles match your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Delete overlay */}
      {deleteConfirm && (
        <div className="admin-overlay" onClick={() => setDeleteConfirm(null)} />
      )}
    </div>
  );
}
