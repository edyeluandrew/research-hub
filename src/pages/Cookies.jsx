import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Cookie } from 'lucide-react';

const Cookies = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Cookie Policy"
        description="Beta Tech Labs Cookie Policy. Learn about the cookies we use on our website and how you can manage your cookie preferences."
        keywords="cookie policy, cookies, Beta Tech Labs cookies, website cookies, tracking"
        ogUrl="https://www.beta-techlabs.com/cookies"
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
                <Cookie className="text-dark-200" size={32} />
              </div>
              <h1 className="text-4xl font-bold text-gold-500 mb-4">Cookie Policy</h1>
              <p className="text-gray-400">Last updated: December 22, 2025</p>
            </div>

            {/* Content */}
            <div className="card p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">1. What Are Cookies?</h2>
                <p className="text-gray-300 leading-relaxed">
                  Cookies are small text files that are stored on your device when you visit a website. 
                  They help the website remember your preferences and improve your browsing experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-300 leading-relaxed mb-4">We use cookies for the following purposes:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li><strong className="text-gold-300">Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong className="text-gold-300">Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong className="text-gold-300">Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">3. Types of Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-gray-300 mt-4">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gold-400">Cookie Name</th>
                        <th className="text-left py-3 px-4 text-gold-400">Purpose</th>
                        <th className="text-left py-3 px-4 text-gold-400">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700/50">
                        <td className="py-3 px-4">_ga</td>
                        <td className="py-3 px-4">Google Analytics - tracks visitors</td>
                        <td className="py-3 px-4">2 years</td>
                      </tr>
                      <tr className="border-b border-gray-700/50">
                        <td className="py-3 px-4">_gid</td>
                        <td className="py-3 px-4">Google Analytics - distinguishes users</td>
                        <td className="py-3 px-4">24 hours</td>
                      </tr>
                      <tr className="border-b border-gray-700/50">
                        <td className="py-3 px-4">localStorage</td>
                        <td className="py-3 px-4">Stores site preferences and data</td>
                        <td className="py-3 px-4">Persistent</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">4. Managing Cookies</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
                  <li>Opt-out tools: Use browser extensions to block tracking cookies</li>
                  <li>Google Analytics opt-out: Install the Google Analytics Opt-out Browser Add-on</li>
                </ul>
                <p className="text-gray-400 mt-4 text-sm">
                  Note: Disabling cookies may affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">5. Third-Party Cookies</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may use third-party services like Google Analytics that set their own cookies. 
                  These cookies are governed by the respective third party's privacy policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">6. Updates to This Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Cookie Policy from time to time. Any changes will be posted on 
                  this page with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gold-400 mb-4">7. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about our use of cookies, please contact us:
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

export default Cookies;
