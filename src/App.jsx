import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppFloat from './components/WhatsAppFloat';
import ContactRedirect from './components/ContactRedirect';
import StructuredData from './components/StructuredData';
import Analytics from './components/Analytics';

const Services = lazy(() => import('./pages/Services'));
const Events = lazy(() => import('./pages/Events'));
const Projects = lazy(() => import('./pages/Projects'));
const Research = lazy(() => import('./pages/Research'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Cookies = lazy(() => import('./pages/Cookies'));

const PageFallback = () => <div className="page-fallback" aria-hidden="true" />;

function App() {
  useEffect(() => {
    const warm = () => {
      import('./data/dataStore').then((mod) => mod.initializeFirebaseData());
      import('./pages/Services');
      import('./pages/Projects');
      import('./pages/Events');
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(warm, { timeout: 2500 })
      : window.setTimeout(warm, 400);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => registrations.forEach((registration) => registration.unregister()))
        .catch(() => {});
    }

    localStorage.removeItem('pwaDismissedUntil');
    localStorage.removeItem('pwaInstalled');

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, []);

  return (
    <div className="App main-container">
      <Analytics />
      <StructuredData />
      <WhatsAppFloat />

      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
    </div>
  );
}

export default App;
