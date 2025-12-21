import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, FileText } from 'lucide-react';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Terms of Service"
        description="Beta Tech Labs Terms of Service. Read our terms and conditions for using our website, services, and participating in our programs."
        keywords="terms of service, terms and conditions, Beta Tech Labs terms, user agreement"
        ogUrl="https://www.beta-techlabs.com/terms"
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
                <FileText className="text-dark-200" size={32} />
              </div>
              <h1 className="text-4xl font-bold text-gold-500 mb-4">Terms of Service</h1>
              <p className="text-gray-400">Last updated: December 22, 2025</p>
            </div>

            {/* Content */}
            <div className="card p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  By accessing and using the Beta Tech Labs website and services, you accept and agree to 
                  be bound by these Terms of Service. If you do not agree to these terms, please do not 
                  use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">2. Our Services</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Beta Tech Labs provides the following services:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>AI and Blockchain research and development</li>
                  <li>Software engineering and consulting services</li>
                  <li>Educational workshops and training programs</li>
                  <li>Student internship programs</li>
                  <li>Final year project guidance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">3. User Responsibilities</h2>
                <p className="text-gray-300 leading-relaxed mb-4">When using our services, you agree to:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of any account credentials</li>
                  <li>Not use our services for any illegal or unauthorized purpose</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">4. Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed">
                  All content on this website, including text, graphics, logos, and software, is the 
                  property of Beta Tech Labs and is protected by intellectual property laws. You may 
                  not reproduce, distribute, or create derivative works without our written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">5. Event Registration</h2>
                <p className="text-gray-300 leading-relaxed">
                  When registering for our events or workshops, you agree to attend as scheduled. 
                  Cancellations should be made at least 48 hours in advance. We reserve the right 
                  to cancel or reschedule events with reasonable notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed">
                  Beta Tech Labs shall not be liable for any indirect, incidental, special, or 
                  consequential damages arising from your use of our services. Our total liability 
                  shall not exceed the amount paid by you for the specific service in question.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">7. Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting on this page. Your continued use of our services constitutes 
                  acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">8. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us:
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

export default Terms;
