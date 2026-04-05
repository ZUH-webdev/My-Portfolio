
import { motion } from 'framer-motion'
import { useState } from 'react'

const experience = [
  {
    id: 1,
    year: '2022',
    endYear: 'PRESENT',
    company: 'Enigmatix.io',
    title: 'Frontend Developer',
    impact: 'Architected & Scaled E-commerce Interfaces—spearheading frontend development for high-traffic platforms with 10k+ monthly users.',
    description:
      'Leading the frontend architecture for multi-scale e-commerce solutions. Focused on pixel-perfect implementation, scalable state management, and conversion optimization. Built modular component systems that reduced development time by 30% and improved maintainability across teams.',
    tech: ['React', 'Tailwind', 'Firebase', 'Redux', 'TypeScript'],
  },
  {
    id: 2,
    year: '2021',
    endYear: '2022',
    company: 'Freelance Projects',
    title: 'Frontend Engineer',
    impact: 'Delivered High-Performance Web Solutions—built custom interfaces for 8+ clients with 95+ Lighthouse scores.',
    description:
      'Engineered responsive, modern web applications for diverse clientele. Implemented best practices in accessibility, performance optimization, and responsive design. Managed project scopes independently and delivered on-time, high-quality solutions.',
    tech: ['React', 'Next.js', 'CSS3', 'JavaScript', 'Figma'],
  },
  {
    id: 3,
    year: '2020',
    endYear: '2021',
    company: 'Learning & Growth',
    title: 'Web Development',
    impact: 'Built Foundation & Mastered Core Skills—completed 15+ projects demonstrating progressive expertise in modern web development.',
    description:
      'Developed deep expertise in full-stack web fundamentals. Created personal projects showcasing growth from basic HTML/CSS to complex React applications. Established engineering discipline through code review and continuous learning.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
  },
]

const ExperienceSection = () => {
  const [hoveredRole, setHoveredRole] = useState(null)

  return (
    <section
      aria-label="Experience"
      className="relative w-full min-h-screen py-20 lg:py-32 border border-slate-800/30 rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/80"
    >
      {/* Film Grain Overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay pointer-events-none"
        viewBox="0 0 400 400"
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
        </filter>
        <rect width="400" height="400" filter="url(#noise)" />
      </svg>

      {/* Ambient Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-violet-600/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Watermark EXPERIENCE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div aria-hidden="true" className="absolute top-10 left-0 text-[420px] font-geist font-black text-white/[0.02] leading-[0.8] whitespace-nowrap">
          EXPERIENCE
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-20 lg:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
            Professional Timeline
          </p>
          <h2 className="text-5xl sm:text-6xl font-geist font-black tracking-tight-extreme leading-[1.1] text-white mb-6">
            Engineering Excellence
          </h2>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-400 font-light">
            A progression of impact-driven roles showcasing technical leadership, scalable architecture, and measurable business outcomes.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Glowing Path Connector */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-600/60 via-indigo-500/30 to-purple-600/20" />

          {/* Pulsing Connector Dots */}
          {experience.map((_, idx) => (
            <div
              key={idx}
              className="absolute left-0 w-3 h-3 rounded-full transform -translate-x-1 border border-indigo-500/40"
              style={{
                top: `calc(${idx * 33.33}% + 60px)`,
                background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0.2) 70%)',
                boxShadow: '0 0 20px rgba(99,102,241,0.6), inset 0 0 10px rgba(99,102,241,0.4)',
              }}
            >
              <div
                className="absolute inset-0 rounded-full bg-indigo-500 opacity-75 animate-pulse"
                style={{ animation: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
              />
            </div>
          ))}

          {/* Experience Items */}
          <div className="space-y-24">
            {experience.map((item, idx) => (
              <motion.div
                key={item.id}
                className="relative pl-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Year Label - Huge & Bold */}
                  <motion.div
                    className="lg:col-span-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col lg:sticky lg:top-20">
                      <div className="text-6xl lg:text-7xl font-geist font-black text-white/8 leading-none mb-2">
                        {item.year}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">
                        {item.year} — {item.endYear}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content - Impact Focus */}
                  <motion.div
                    className="lg:col-span-9 relative"
                    onHoverStart={() => setHoveredRole(item.id)}
                    onHoverEnd={() => setHoveredRole(null)}
                  >
                    {/* Impact Badge */}
                    <motion.div
                      className="mb-4 inline-block"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                        IMPACT
                      </span>
                    </motion.div>

                    {/* Role Title */}
                    <motion.h3 className="text-3xl lg:text-4xl font-geist font-black tracking-tight-extreme leading-tight text-white mb-2">
                      {item.title}
                      <span className="text-slate-500 font-light"> @ {item.company}</span>
                    </motion.h3>

                    {/* Impact Statement - Highlighted */}
                    <motion.p
                      className="text-lg font-semibold leading-relaxed mb-4 bg-gradient-to-r from-indigo-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: idx * 0.15 + 0.1 }}
                    >
                      {item.impact}
                    </motion.p>

                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed mb-6 text-sm max-w-2xl">
                      {item.description}
                    </p>

                    {/* Tech Stack Pills - Interactive */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.25 }}
                    >
                      {item.tech.map((tech, techIdx) => (
                        <motion.span
                          key={tech}
                          className="relative px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider bg-white/[0.03] border border-white/10 rounded-lg text-slate-300 cursor-pointer transition-all duration-300"
                          whileHover={{
                            backgroundColor: 'rgba(99, 102, 241, 0.15)',
                            borderColor: 'rgba(99, 102, 241, 0.5)',
                            color: '#e0e7ff',
                            scale: 1.08,
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: idx * 0.15 + 0.3 + techIdx * 0.05,
                          }}
                        >
                          {tech}
                          {hoveredRole === item.id && (
                            <motion.div
                              className="absolute inset-0 rounded-lg bg-indigo-500/20 blur-md -z-10"
                              layoutId={`glow-${item.id}`}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection

