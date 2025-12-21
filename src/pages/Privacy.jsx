import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Shield } from 'lucide-react';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Beta Tech Labs Privacy Policy. Learn how we collect, use, and protect your personal information when you use our services and website."
        keywords="privacy policy, data protection, Beta Tech Labs privacy, GDPR, data security"
        ogUrl="https://www.beta-techlabs.com/privacy"
      />

      <div className="min-h-screen bg-dark-200 flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </button>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-dark-200" size={32} />
              </div>
              <h1 className="text-4xl font-bold text-gold-500 mb-4">Privacy Policy</h1>
              <p className="text-gray-400">Last updated: December 22, 2025</p>
            </div>

            {/* Content */}
            <div className="card p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed">
                  Beta Tech Labs ("we," "our," or "us") respects your privacy and is committed to protecting 
                  your personal data. This privacy policy explains how we collect, use, and safeguard your 
                  information when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">2. Information We Collect</h2>
                <p className="text-gray-300 leading-relaxed mb-4">We may collect the following types of information:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li><strong className="text-gold-300">Contact Information:</strong> Name, email address, phone number when you contact us</li>
                  <li><strong className="text-gold-300">Usage Data:</strong> How you interact with our website (pages visited, time spent)</li>
                  <li><strong className="text-gold-300">Technical Data:</strong> IP address, browser type, device information</li>
                  <li><strong className="text-gold-300">Event Registration:</strong> Information provided when registering for workshops or events</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To send you updates about our events, research, and services</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">4. Data Security</h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of 
                  transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">5. Your Rights</h2>
                <p className="text-gray-300 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">6. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-dark-100 rounded-lg">
                  <p className="text-gold-400">Email: betatechlabs10@gmail.com</p>
                  <p className="text-gold-400">Phone: +256 791018086</p>
                  <p className="text-gold-400">Location: Kabale, Uganda</p>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Privacy;
