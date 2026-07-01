import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../config/site';

const getInitials = (name) =>
  name
    .replace(/^Dr\.\s*/i, '')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const Testimonials = () => (
  <section id="testimonials" className="py-8 md:py-10 bg-dark-200 relative overflow-hidden border-t border-gray-800/50">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-1.5">
          Client Feedback
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-2 leading-tight">
          What Partners Say About Us
        </h2>
        <p className="text-sm md:text-base text-gray-400 leading-snug">
          Founders, educators, and product teams across Uganda who have worked with us on
          research, engineering, and delivery.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-3 md:gap-4">
        {TESTIMONIALS.map((item, index) => (
          <article
            key={index}
            className="flex flex-col h-full rounded-xl border border-gray-800 bg-dark-100 p-4 md:p-5"
          >
            <Quote className="text-gold-500/60 mb-2 flex-shrink-0" size={22} />
            <p className="text-sm text-gray-300 leading-snug flex-1 mb-4">
              &ldquo;{item.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-gold-500">{getInitials(item.name)}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white leading-snug truncate">{item.name}</p>
                <p className="text-xs text-gold-500/90 leading-snug">{item.role}</p>
                <p className="text-xs text-gray-500 leading-snug truncate">
                  {item.organization}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
