import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Events from './pages/Events';
import './index.css';

function App() {
  return (
    <div className="App main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;