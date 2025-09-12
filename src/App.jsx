import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import AppContext
import { useAppContext } from './context/AppContext';

// Import element for route protection
import ProtectedRoute from './components/ProtectedRoute';

// Import components for general pages
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AccountPage from './pages/AccountPage';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import OurProducts from './pages/OurProducts';
import MyOrders from './pages/MyOrders';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import ShippingReturns from './pages/ShippingReturns';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// Import components for admin pages
import AdminProductsPage from './pages/AdminProductsPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import AdminProductForm from './components/AdminProductForm';
import AdminCategoryForm from './components/AdminCategoryForm';
import Analytics from './pages/AnalyticsPage';

import './App.css';

const AppContent = () => {
  const { isAuthenticated } = useAppContext();
  const location = useLocation();
  const isAccountPage = location.pathname === '/account';

  return (
    <div className="app-container">
      {!isAccountPage && <Header />}
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/account"
            element={
              isAuthenticated ? <Navigate to="/our-products" replace /> : <AccountPage />
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<ShippingReturns />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/our-products" element={<OurProducts />} />
          <Route path="/categories" element={<Navigate to="/our-products" replace />} />

          {/* Routes for authenticated users */}
          <Route path="/cart" element={<ProtectedRoute role="User" element={<Cart />} />} />
          <Route path="/my-orders" element={<ProtectedRoute role="User" element={<MyOrders />} />} />

          {/* Admin Routes */}
          <Route
            path="/admin/analytics"
            element={<ProtectedRoute role="Admin" element={<Analytics />} />}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute role="Admin" element={<Navigate to="/admin/products" replace />} />}
          />
          <Route
            path="/admin/products"
            element={<ProtectedRoute role="Admin" element={<AdminProductsPage />} />}
          />
          <Route
            path="/admin/products/new"
            element={<ProtectedRoute role="Admin" element={<AdminProductForm />} />}
          />
          <Route
            path="/admin/products/edit/:id"
            element={<ProtectedRoute role="Admin" element={<AdminProductForm />} />}
          />
          <Route
            path="/admin/categories"
            element={<ProtectedRoute role="Admin" element={<AdminCategoriesPage />} />}
          />
          <Route
            path="/admin/categories/new"
            element={<ProtectedRoute role="Admin" element={<AdminCategoryForm />} />}
          />
          <Route
            path="/admin/categories/edit/:id"
            element={<ProtectedRoute role="Admin" element={<AdminCategoryForm />} />}
          />
          
          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
