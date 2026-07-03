import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Services from './pages/Services';
import Events from './pages/Events';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppFloat from './components/WhatsAppFloat';
import Research from './pages/Research';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import ContactRedirect from './components/ContactRedirect';
import StructuredData from './components/StructuredData';
import Analytics from './components/Analytics';
import { initializeFirebaseData } from './data/dataStore';
import './index.css';

function App() {
  useEffect(() => {
    initializeFirebaseData();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => registrations.forEach((registration) => registration.unregister()))
        .catch((error) => console.error('Error unregistering service worker:', error));
    }

    localStorage.removeItem('pwaDismissedUntil');
    localStorage.removeItem('pwaInstalled');
  }, []);

  return (
    <div className="App main-container">
      <Analytics />
      <StructuredData />
      <WhatsAppFloat />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/labs"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/research" element={<Research />} />
        <Route path="/contact" element={<ContactRedirect />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
