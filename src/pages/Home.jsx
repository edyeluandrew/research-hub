import React from 'react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home - AI & Blockchain Research Hub"
        description="Beta Tech Research Hub is Uganda's premier AI and Blockchain research organization. We conduct cutting-edge research, develop innovative solutions, and offer tech education programs in Kabale."
        keywords="AI research Uganda, Blockchain research Uganda, tech hub Kabale, machine learning Uganda, software development Uganda, tech education, research hub Uganda"
        ogUrl="https://www.beta-techlabs.com/"
        ogImage="https://www.beta-techlabs.com/images/og-home.svg"
      />
      
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
    </>
  );
};

export default Home;