import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to Beta Tech Labs homepage to explore our AI and Blockchain research hub."
        ogUrl="https://www.beta-techlabs.com/404"
      />

      <div className="min-h-screen bg-dark-200 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          {/* 404 Number */}
          <h1 className="text-9xl font-bold text-gold-500 mb-4">404</h1>
          
          {/* Error Message */}
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Oops! The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best researchers sometimes hit dead ends.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn-primary flex items-center justify-center"
            >
              <Home className="mr-2" size={18} />
              Back to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 mb-4">Here are some helpful links:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/services" className="text-gold-400 hover:text-gold-300 transition-colors">
                Our Services
              </a>
              <span className="text-gray-600">•</span>
              <a href="/research" className="text-gold-400 hover:text-gold-300 transition-colors">
                Research
              </a>
              <span className="text-gray-600">•</span>
              <a href="/events" className="text-gold-400 hover:text-gold-300 transition-colors">
                Events
              </a>
              <span className="text-gray-600">•</span>
              <a href="/#contact" className="text-gold-400 hover:text-gold-300 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
