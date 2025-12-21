import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Events from './pages/Events';
import Admin from './pages/Admin';
import Research from './pages/Research';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Contact from './components/Contact';
import StructuredData from './components/StructuredData';
import Analytics from './components/Analytics';
import './index.css';

function App() {
  return (
    <div className="App main-container">
      {/* Google Analytics - tracks page views */}
      <Analytics />
      
      {/* Add Structured Data globally */}
      <StructuredData />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/labs" element={<Admin />} />
        <Route path="/research" element={<Research />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        {/* 404 catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;