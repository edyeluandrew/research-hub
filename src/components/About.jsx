import React from 'react';
import { Search, Lightbulb, PenTool, Code, Rocket } from 'lucide-react';

const PROCESS_STEPS = [
  {
    phase: 'Research',
    title: 'Understand the Challenge',
    description:
      'We investigate problems, study users, analyze technologies, and identify opportunities worth solving.',
    icon: Search,
  },
  {
    phase: 'Discover',
    title: 'Shape Better Ideas',
    description:
      'We turn research into clear insights, identify innovative approaches, and define the best path forward.',
    icon: Lightbulb,
  },
  {
    phase: 'Design',
    title: 'Create Meaningful Experiences',
    description:
      'We design intuitive, scalable, and user-centered solutions that balance innovation with usability.',
    icon: PenTool,
  },
  {
    phase: 'Engineer',
    title: 'Build with Purpose',
    description:
      'We transform ideas into reliable technology, from AI solutions and business systems to mobile apps, web platforms, and custom software.',
    icon: Code,
  },
  {
    phase: 'Launch & Improve',
    title: 'Deliver Lasting Impact',
    description:
      'We continuously refine every product using feedback, research, and real-world experience to ensure it keeps creating value over time.',
    icon: Rocket,
  },
];

const About = () => (
  <section id="about" className="py-12 md:py-16 bg-dark-100 border-b border-gray-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 lg:items-stretch">
        {/* Left, intro, image, quote */}
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold text-gold-500 font-heading mb-4">
            How do we work?
          </h2>
          <div className="w-14 h-1 bg-gold-500 rounded-full mb-6" />

          <div className="space-y-4 text-base md:text-lg text-gray-300 leading-relaxed">
            <p>
              Every solution we create follows a research-driven process. Before we design or develop
              technology, we take time to understand the challenge, explore possible solutions, and
              validate ideas.
            </p>
            <p>
              Whether we&apos;re developing our own products or partnering with an organization, our
              approach remains the same.
            </p>
          </div>

          <div className="my-6 lg:my-8 flex-1 min-h-[220px] lg:min-h-[280px] rounded-xl overflow-hidden border border-gray-800 relative group">
            <img
              src="/images/how-we-work.jpg"
              alt="Team collaborating on research and product planning"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-200/80 via-dark-200/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gold-500 mb-1">
                Our Process
              </p>
              <p className="text-sm md:text-base text-white font-medium">
                From research insights to real-world solutions
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed italic mt-auto pt-6 border-t border-gray-800">
            &ldquo;Research isn&apos;t the end of our work. It&apos;s where every innovation begins. By
            combining research, engineering, and creativity, we transform ideas into products and
            technology solutions that make a real-world impact.&rdquo;
          </p>
        </div>

        {/* Right, process steps */}
        <div className="flex flex-col gap-4 h-full">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.phase}
                className="flex gap-4 p-5 md:p-6 rounded-xl border border-gray-800 bg-dark-200/50 flex-1"
              >
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="w-11 h-11 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-center justify-center">
                    <Icon className="text-gold-500" size={22} />
                  </div>
                  <span className="text-xs font-bold text-gold-500/50 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-xs md:text-sm font-semibold uppercase tracking-wider text-gold-500 mb-1">
                    {step.phase}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default About;
