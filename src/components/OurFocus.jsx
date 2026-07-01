import React from 'react';
import {
  Search,
  Package,
  Settings,
  GraduationCap,
  Check,
} from 'lucide-react';

const FOCUS_AREAS = [
  {
    id: 'research',
    label: 'Research & Innovation',
    title: 'Research That Drives Innovation',
    description:
      'Research is at the heart of everything we do. We begin by understanding problems, exploring opportunities, and learning from the people and environments we serve. We combine these insights with emerging technologies to create innovative products and practical solutions that make a lasting impact.',
    listTitle: 'What We Focus On',
    items: [
      'Problem Discovery & Needs Assessment',
      'User & Market Research',
      'Applied Research & Innovation',
      'Artificial Intelligence',
      'Blockchain & Emerging Technologies',
    ],
    icon: Search,
    accent: 'from-gold-500/20 to-transparent',
  },
  {
    id: 'product',
    label: 'Product Development',
    title: 'Turning Insight into Innovation',
    description:
      'After understanding the problem through research, we design and develop products that solve it. Every solution we create is built on research, validated by real-world needs, and refined through continuous learning to deliver lasting impact.',
    listTitle: 'We Build',
    items: [
      'Artificial Intelligence Products',
      'Mobile Applications',
      'Web Platforms',
      'Business Systems',
      'Data & Analytics Solutions',
    ],
    icon: Package,
    accent: 'from-gold-500/15 to-transparent',
  },
  {
    id: 'engineering',
    label: 'Solution Engineering',
    title: 'Building Solutions That Matter',
    description:
      "When organizations come to us with an idea, challenge, or opportunity, we don't jump straight into development. We collaborate to understand the problem, explore possible solutions, and engineer technology that delivers measurable value and long-term impact.",
    listTitle: 'We Build',
    items: [
      'Custom Software',
      'Business Systems',
      'Websites & Web Platforms',
      'Mobile Applications',
      'AI Solutions',
      'System Integrations',
    ],
    icon: Settings,
    accent: 'from-gold-500/15 to-transparent',
  },
  {
    id: 'talent',
    label: 'Talent Development',
    title: "Developing Tomorrow's Innovators",
    description:
      'Great innovation starts with great people. We invest in the next generation by providing opportunities to learn through real research, product development, and industry projects. By combining mentorship with hands-on experience, we help students and young professionals build the skills, confidence, and mindset needed to create meaningful solutions.',
    listTitle: 'Our Programs',
    items: [
      'Student Internships',
      'Research & Innovation Training',
      'Practical Product Development',
      'Industry Collaboration Projects',
      'Mentorship & Career Development',
    ],
    icon: GraduationCap,
    accent: 'from-gold-500/20 to-transparent',
  },
];

const OurFocus = () => (
  <section id="our-focus" className="py-10 md:py-12 bg-dark-200 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-3xl" />
    </div>

    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-5 relative z-10">
      {/* Section header */}
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2">
          Our Focus
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white font-heading leading-tight mb-3">
          Building Technology Through{' '}
          <span className="text-gold-500">Research, Innovation</span>
          {' '}and Collaboration
        </h2>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed">
          At Beta-Tech Labs, our work is centered around four key areas that enable us to transform
          research into meaningful products, practical solutions, and opportunities for the next
          generation of innovators.
        </p>
      </div>

      {/* Four pillars */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-5">
        {FOCUS_AREAS.map((area, index) => {
          const Icon = area.icon;
          return (
            <article
              key={area.id}
              className="group relative rounded-2xl border border-gray-800 bg-dark-100 overflow-hidden flex flex-col"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${area.accent} via-gold-500/40 to-transparent`} />

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-gold-500" size={22} />
                  </div>
                  <span className="text-sm font-bold text-gold-500/30 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-1.5">
                  {area.label}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                  {area.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
                  {area.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-800">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">
                    {area.listTitle}
                  </p>
                  <ul className="space-y-2">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <Check className="text-gold-500 flex-shrink-0 mt-0.5" size={15} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default OurFocus;
