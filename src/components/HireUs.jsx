import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { SERVICE_PACKAGES } from '../config/site';

const HireUs = () => {
  const navigate = useNavigate();

  const handleCta = () => {
    navigate('/contact');
  };

  return (
    <section id="hire-us" className="py-20 bg-dark-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title font-heading">Work With Us</h2>
          <p className="section-subtitle">
            From free discovery calls to full MVP builds — we help you ship research-backed technology.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICE_PACKAGES.map((pkg, index) => (
            <div
              key={index}
              className={`card p-8 flex flex-col ${
                pkg.highlighted ? 'border-2 border-gold-500/50 relative' : ''
              }`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-dark-200 text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gold-500 mb-2">{pkg.title}</h3>
              <p className="text-3xl font-bold text-white mb-4">{pkg.price}</p>
              <p className="text-gray-400 mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <Check className="text-gold-500 mr-2 flex-shrink-0" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={handleCta} className="btn-primary w-full flex items-center justify-center">
                {pkg.cta}
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireUs;
