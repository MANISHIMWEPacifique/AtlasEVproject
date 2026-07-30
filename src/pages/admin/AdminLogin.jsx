import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import '../../styles/Admin.css';

export default function AdminLogin() {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [showPass, setShowPass]   = useState(false);
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Small delay for UX feel
    await new Promise(r => setTimeout(r, 600));
    const ok = await login(password);
    if (ok) {
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className={`al-page ${mounted ? 'al-mounted' : ''}`}>

      {/* ── LEFT PANEL – Branded visual ── */}
      <div className="al-brand-panel">
        {/* Animated orbs */}
        <div className="al-orb al-orb-1" />
        <div className="al-orb al-orb-2" />
        <div className="al-orb al-orb-3" />

        <div className="al-brand-content">
          {/* Logo mark */}
          <div className="al-logo-mark">
            <img src="/logo.png" alt="Atlas EV Motors" className="al-brand-logo-img" />
          </div>

          {/* Headline */}
          <div className="al-brand-headline">
            <h1>Admin Portal</h1>
            <p>Manage your vehicle inventory, listings, and content from one secure panel.</p>
          </div>

          {/* Stats strip */}
          <div className="al-brand-stats">
            <div className="al-stat">
              <span className="al-stat-num">100%</span>
              <span className="al-stat-label">Electric Fleet</span>
            </div>
            <div className="al-stat-divider" />
            <div className="al-stat">
              <span className="al-stat-num">24h</span>
              <span className="al-stat-label">Live Updates</span>
            </div>
            <div className="al-stat-divider" />
            <div className="al-stat">
              <span className="al-stat-num">∞</span>
              <span className="al-stat-label">Listings</span>
            </div>
          </div>
        </div>

        {/* Car silhouette illustration */}
        <div className="al-car-silhouette">
          <svg viewBox="0 0 480 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M60 100 C60 100 80 60 140 55 C180 51 200 48 240 45 C280 42 310 52 340 60 C370 68 400 80 420 100 L430 100 L430 115 C430 115 400 120 240 120 C80 120 50 115 50 115 L50 100 Z"
              fill="rgba(255,255,255,0.07)"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.5"
            />
            {/* Windows */}
            <path
              d="M155 82 C155 82 175 57 210 53 C240 50 270 50 295 54 C315 57 330 70 330 82 Z"
              fill="rgba(255,255,255,0.12)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            {/* Wheels */}
            <circle cx="130" cy="118" r="22" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
            <circle cx="130" cy="118" r="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            <circle cx="350" cy="118" r="22" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
            <circle cx="350" cy="118" r="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            {/* Ground line */}
            <line x1="40" y1="140" x2="440" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
            {/* Charging bolt */}
            <path d="M235 68 L228 80 H234 L231 92 L242 78 H236 Z" fill="rgba(74,222,128,0.8)"/>
          </svg>
        </div>
      </div>

      {/* ── RIGHT PANEL – Login form ── */}
      <div className="al-form-panel">
        <div className="al-form-card">
          {/* Mobile logo (hidden on desktop) */}
          <div className="al-mobile-logo">
            <div className="al-mobile-logo-icon">EV</div>
            <span>ATLAS EV MOTORS</span>
          </div>

          <div className="al-form-header">
            <div className="al-lock-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 className="al-form-title">Welcome back</h2>
            <p className="al-form-sub">Sign in to your admin account to manage the Atlas EV inventory.</p>
          </div>

          {error && (
            <div className="al-error-alert" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="al-form" id="admin-login-form">
            <div className="al-field-group">
              <label htmlFor="admin-password" className="al-label">Admin Password</label>
              <div className="al-input-wrap">
                <div className="al-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                  </svg>
                </div>
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  className="al-input"
                  placeholder="Enter your admin password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  required
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="al-toggle-pass"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`al-submit-btn ${loading ? 'al-loading' : ''}`}
              disabled={loading}
              id="admin-login-btn"
            >
              {loading ? (
                <>
                  <div className="al-spinner" />
                  Authenticating...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <div className="al-form-footer">
            <a href="/" className="al-back-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
