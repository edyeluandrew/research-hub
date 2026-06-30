import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../config/site';

const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-dark-200 relative overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-10 right-20 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="section-title font-heading">What Clients Say</h2>
        <p className="section-subtitle">
          Trusted by founders, educators, and teams building the future from Uganda.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((item, index) => (
          <div key={index} className="card p-8 flex flex-col">
            <Quote className="text-gold-500 mb-4" size={32} />
            <p className="text-gray-300 leading-relaxed flex-1 mb-6">&ldquo;{item.quote}&rdquo;</p>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-gold-500 font-semibold">{item.name}</p>
              <p className="text-gray-400 text-sm">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
