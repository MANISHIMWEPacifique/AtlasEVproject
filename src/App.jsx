import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AdminProvider } from './context/AdminContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetail from './pages/CarDetail';
import SellMyCar from './pages/SellMyCar';
import PreOrder from './pages/PreOrder';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCarForm from './pages/admin/AdminCarForm';

import './styles/global.css';

// Wrapper to conditionally show Navbar/Footer/FAB
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />

    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* ── Admin Routes (no navbar/footer) ── */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/cars/new" element={<AdminCarForm />} />
      <Route path="/admin/cars/edit/:id" element={<AdminCarForm />} />

      {/* ── Public Routes ── */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/cars" element={<PublicLayout><Cars /></PublicLayout>} />
      {/* key={location.pathname} forces CarDetail to remount on every slug change,
          fixing the bug where navigating between car detail pages showed stale data */}
      <Route path="/cars/:slug" element={<PublicLayout><CarDetail key={location.pathname} /></PublicLayout>} />
      <Route path="/sell" element={<PublicLayout><SellMyCar /></PublicLayout>} />
      <Route path="/preorder" element={<PublicLayout><PreOrder /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
    </Routes>
    </>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AdminProvider>
  );
}
