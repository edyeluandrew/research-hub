import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import MissionVision from '../components/MissionVision';
import IterativeProcess from '../components/IterativeProcess';
import About from '../components/About';
import ProductShowcase from '../components/ProductShowcase';
import ImpactStats from '../components/ImpactStats';
import CoreValues from '../components/CoreValues';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Newsletter from '../components/Newsletter';
import Wordmark from '../components/Wordmark';
import Footer from '../components/Footer';
import { SITE } from '../config/site';
import { scrollToSection } from '../utils/homeNavigation';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const fromState = location.state?.scrollTo;
    const fromHash = (location.hash || window.location.hash || '').replace('#', '');
    const sectionId = fromState || fromHash;
    if (!sectionId) return undefined;

    let tries = 0;
    const tryScroll = () => {
      if (scrollToSection(sectionId) || tries > 15) return;
      tries += 1;
      setTimeout(tryScroll, 50);
    };

    const timer = setTimeout(tryScroll, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, location.state, location.hash]);

  return (
    <>
      <SEO
        title="Home"
        description={`${SITE.legalName} transforms research into innovative products and technology solutions. ${SITE.brandPromise} Based in ${SITE.location}.`}
        keywords="Beta-Tech Labs Uganda, AI products Africa, product innovation, solution engineering, talent development, The Beta-Tech Way"
        ogUrl={`${SITE.url}/`}
        ogImage={`${SITE.url}/images/og-home.svg`}
      />

      <div className="page">
        <Header />

        <main className="page-main">
          <Hero />
          <Partners />
          <MissionVision />
          <IterativeProcess />
          <About />
          <ProductShowcase />
          <ImpactStats />
          <CoreValues />
          <Team />
          <Testimonials />
          <Contact />
          <Newsletter />
        </main>

        <Wordmark />
        <Footer />
      </div>
    </>
  );
};

export default Home;
