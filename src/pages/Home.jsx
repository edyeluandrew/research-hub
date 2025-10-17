import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-200 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="section-spacing">
          <Hero />
        </div>
        <div className="section-spacing">
          <About />
        </div>
        <div className="section-spacing">
          <Team />
        </div>
        <div className="section-spacing">
          <Contact />
        </div>
      </main>
      <Footer className="footer-fix" />
    </div>
  );
};

export default Home;