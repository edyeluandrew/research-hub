import { Handshake } from 'lucide-react';
import { PARTNERS } from '../config/site';

const Partners = () => (
  <section className="py-12 bg-dark-200 border-y border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex items-center text-gold-500 font-semibold whitespace-nowrap">
          <Handshake className="mr-2" size={20} />
          Trusted by
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="text-gray-400 font-medium text-sm md:text-base hover:text-gold-400 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Partners;
