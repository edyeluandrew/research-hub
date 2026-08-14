import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import HashLink from '../components/HashLink';
import { ArrowLeft, Home } from 'lucide-react';

const LINKS = [
  { name: 'What we do', href: '/services' },
  { name: 'Our work', href: '/projects' },
  { name: 'Events', href: '/events' },
  { name: 'Research', href: '/research' },
];

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for does not exist. Return to the Beta-Tech Labs homepage."
        ogUrl="https://www.beta-techlabs.com/404"
      />

      <div className="page">
        <Header />

        <main className="nf">
          <div>
            <p className="nf-code">404</p>
            <h1 className="nf-title">Page not found</h1>
            <p className="nf-lead">
              The page you are looking for has moved or never existed. Here is the way back.
            </p>

            <div className="nf-actions">
              <button type="button" className="btn btn--accent" onClick={() => navigate('/')}>
                <Home size={17} />
                Back to home
              </button>
              <button
                type="button"
                className="btn btn--ghost-ink"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={17} />
                Go back
              </button>
            </div>

            <div
              className="btn-row"
              style={{ marginTop: '2.5rem', justifyContent: 'center', gap: '1.25rem' }}
            >
              {LINKS.map((link) => (
                <Link key={link.name} to={link.href} className="btn-text">
                  {link.name}
                </Link>
              ))}
              <HashLink to="/#contact" className="btn-text">
                Contact
              </HashLink>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotFound;
