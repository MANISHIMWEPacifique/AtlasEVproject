import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SEED_INVENTORY } from '../data/inventory';

const API_BASE = 'http://localhost:3001/api';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  // ── Inventory State ──────────────────────────────────────────────
  const [cars, setCars]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false); // true if backend is offline

  // ── Admin Auth State ──────────────────────────────────────────────
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('atlas_admin') === 'true';
  });

  // ── Fetch cars from backend on mount ─────────────────────────────
  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/cars`);
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setCars(data);
      setApiError(false);
    } catch (err) {
      // Backend offline – fall back to localStorage / seed
      console.warn('Backend offline, falling back to localStorage:', err.message);
      setApiError(true);
      try {
        const stored = localStorage.getItem('atlas_ev_inventory');
        setCars(stored ? JSON.parse(stored) : SEED_INVENTORY);
      } catch {
        setCars(SEED_INVENTORY);
      }
    } finally {
      setLoading(false);
    }
  }

  // ── Auth actions ───────────────────────────────────────────────────
  const login = useCallback(async (password) => {
    // If backend is available, authenticate against the API
    if (!apiError) {
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        if (res.ok) {
          sessionStorage.setItem('atlas_admin', 'true');
          setIsAdmin(true);
          return true;
        }
        return false;
      } catch (err) {
        // Fallback to hardcoded check if API is down
        console.warn('API login failed, using local check');
      }
    }
    // Local fallback
    if (password === 'atlas2024') {
      sessionStorage.setItem('atlas_admin', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  }, [apiError]);

  const logout = useCallback(() => {
    sessionStorage.removeItem('atlas_admin');
    setIsAdmin(false);
  }, []);

  // ── Inventory CRUD ─────────────────────────────────────────────────
  const addCar = useCallback(async (carData) => {
    if (!apiError) {
      try {
        const res = await fetch(`${API_BASE}/cars`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData),
        });
        if (!res.ok) throw new Error('Failed to add car');
        const newCar = await res.json();
        setCars(prev => [newCar, ...prev]);
        return newCar;
      } catch (err) {
        console.error('Add car API error:', err);
      }
    }
    // Fallback: local only
    const newCar = {
      ...carData,
      id: carData.id || `car-${Date.now()}`,
      slug: carData.slug || slugify(carData.name),
      createdAt: new Date().toISOString().split('T')[0],
      images: carData.images?.length ? carData.images : ['/car-model3.png'],
      features: carData.features || [],
      specs: carData.specs || {},
    };
    setCars(prev => {
      const updated = [newCar, ...prev];
      localStorage.setItem('atlas_ev_inventory', JSON.stringify(updated));
      return updated;
    });
    return newCar;
  }, [apiError]);

  const updateCar = useCallback(async (id, updates) => {
    if (!apiError) {
      try {
        const res = await fetch(`${API_BASE}/cars/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error('Failed to update car');
        const updated = await res.json();
        setCars(prev => prev.map(c => c.id === id ? updated : c));
        return;
      } catch (err) {
        console.error('Update car API error:', err);
      }
    }
    // Fallback: local only
    setCars(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, ...updates } : c);
      localStorage.setItem('atlas_ev_inventory', JSON.stringify(updated));
      return updated;
    });
  }, [apiError]);

  const deleteCar = useCallback(async (id) => {
    if (!apiError) {
      try {
        const res = await fetch(`${API_BASE}/cars/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete car');
        setCars(prev => prev.filter(c => c.id !== id));
        return;
      } catch (err) {
        console.error('Delete car API error:', err);
      }
    }
    // Fallback: local only
    setCars(prev => {
      const updated = prev.filter(c => c.id !== id);
      localStorage.setItem('atlas_ev_inventory', JSON.stringify(updated));
      return updated;
    });
  }, [apiError]);

  const resetToSeed = useCallback(async () => {
    if (!apiError) {
      try {
        const res = await fetch(`${API_BASE}/admin/reset`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'atlas2024' }),
        });
        if (res.ok) {
          await fetchCars();
          return;
        }
      } catch (err) {
        console.error('Reset API error:', err);
      }
    }
    // Fallback: local only
    setCars(SEED_INVENTORY);
  }, [apiError]);

  const getFeatured = useCallback(() => {
    return cars.filter(c => c.featured);
  }, [cars]);

  return (
    <AdminContext.Provider value={{
      cars,
      loading,
      apiError,
      isAdmin,
      login,
      logout,
      addCar,
      updateCar,
      deleteCar,
      resetToSeed,
      getFeatured,
      refetch: fetchCars,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useInventory must be used inside AdminProvider');
  return ctx;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
}

// ── Helpers ────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
