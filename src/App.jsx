import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Events from './pages/Events';
import Admin from './pages/Admin';
import Research from './pages/Research';
import Contact from './components/Contact'; // Import your contact component
import './index.css';

function App() {
  return (
    <div className="App main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/labs" element={<Admin />} />
        <Route path="/research" element={<Research />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;