import { PARTNERS } from '../config/site';

const Partners = () => (
  <section className="py-5 bg-dark-200 border-b border-gray-800/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <span className="text-xs font-medium tracking-widest uppercase text-gray-500 whitespace-nowrap">
          Trusted by
        </span>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
          {PARTNERS.map((name) => (
            <span key={name} className="text-sm text-gray-400 font-medium">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Partners;
