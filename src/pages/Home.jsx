import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import OurFocus from '../components/OurFocus';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { SITE } from '../config/site';

const Home = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  return (
    <>
      <SEO
        title="Home - AI & Blockchain Research Hub"
        description={`${SITE.name} is Uganda's premier AI and Blockchain research organization. We conduct cutting-edge research, develop innovative solutions, and offer tech education programs in Kabale.`}
        keywords="AI research Uganda, Blockchain research Uganda, tech hub Kabale, machine learning Uganda, software development Uganda, tech education, research hub Uganda"
        ogUrl={`${SITE.url}/`}
        ogImage={`${SITE.url}/images/og-home.svg`}
      />

      <div className="min-h-screen bg-dark-200 flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <OurFocus />
          <Team />
          <Testimonials />
          <Contact />
        </main>
        <Footer className="footer-fix" />
      </div>
    </>
  );
};

export default Home;
