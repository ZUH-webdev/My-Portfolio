import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Elena Rossi',
    title: 'Founder, BillingOS',
    company: 'BillingOS',
    logo: '🏢',
    logoColor: 'text-emerald-400',
    quote: 'Turned our messy Figma ideas into a calm, Stripe-grade dashboard. Scaled Core Web Vitals by 34%, directly improving user retention.',
    highlight: 'Stripe-grade dashboard',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Head of Product, Launchpad',
    company: 'Launchpad',
    logo: '🚀',
    logoColor: 'text-indigo-400',
    quote: 'Engineered a 3x faster feature iteration cycle through bespoke component library. The code quality transformed our entire product team\'s velocity.',
    highlight: '3x faster iteration',
  },
  {
    id: 3,
    name: 'Aisha Khan',
    title: 'CTO, Pulse Analytics',
    company: 'Pulse Analytics',
    logo: '📊',
    logoColor: 'text-cyan-400',
    quote: 'Architected real-time dashboards handling 5k+ concurrent users. Performance never degraded, even under peak load. Engineering excellence.',
    highlight: '5k+ concurrent users',
  },
  {
    id: 4,
    name: 'Marcus Lee',
    title: 'Founder, DataFlow',
    company: 'DataFlow',
    logo: '⚡',
    logoColor: 'text-purple-400',
    quote: 'Reduced time-to-interactive by 2.2s with meticulous performance optimization. Our organic search ranking climbed within weeks.',
    highlight: '2.2s performance gain',
  },
  {
    id: 5,
    name: 'Sofia Bergstrom',
    title: 'VP Design, FinTech Co',
    company: 'FinTech Co',
    logo: '💎',
    logoColor: 'text-amber-300',
    quote: 'Built a design system component library we use daily for 10+ product features. Immaculate code quality with zero technical debt.',
    highlight: 'design system library',
  },
  {
    id: 6,
    name: 'James Wu',
    title: 'CEO, Scale Ventures',
    company: 'Scale Ventures',
    logo: '🎯',
    logoColor: 'text-red-400',
    quote: 'From concept to production-ready SaaS interface in 6 weeks. The pixel-perfect implementation saved us months of iterations.',
    highlight: 'production-ready SaaS',
  },
]

const TestimonialCard = ({ testimonial, isEven }) => {
  return (
    <motion.div
      className={`relative flex-shrink-0 ${isEven ? 'w-96' : 'w-80'} rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:bg-white/[0.04] hover:border-white/10 group`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-px rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100"
        initial={false}
      />

      <div className="relative z-10">
        {/* Author Header with Logo */}
        <div className="mb-6 flex gap-3 items-center">
          {/* Monochrome Logo Orb */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/60 border border-white/10 flex-shrink-0 text-xl overflow-hidden">
            {/* Grayscale default */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full filter grayscale opacity-60 group-hover:opacity-0 transition-opacity duration-300">
              {testimonial.logo}
            </div>
            {/* Colored on hover */}
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full ${testimonial.logoColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            >
              {testimonial.logo}
            </div>
          </div>
          <div>
            <p className="text-sm font-geist font-black text-white tracking-tight">{testimonial.name}</p>
            <p className="text-xs text-slate-500 tracking-wider uppercase font-mono">{testimonial.title}</p>
          </div>
        </div>

        {/* Quote - Muted with highlighted key phrases */}
        <blockquote className="mb-4">
          <p className="text-base leading-relaxed tracking-tight text-slate-350 font-light">
            "{testimonial.quote.split(testimonial.highlight).map((part, i) =>
              i === 0 ? (
                part
              ) : (
                <motion.span
                  key={i}
                  className="text-white font-semibold"
                  initial={{ opacity: 0.7 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonial.highlight}
                  {part}
                </motion.span>
              )
            )}"
          </p>
        </blockquote>

        {/* Company Tag */}
        <motion.div
          className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {testimonial.company}
        </motion.div>
      </div>
    </motion.div>
  )
}

const TestimonialsSection = () => {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  const parallaxX = useTransform(springX, [-1, 1], [-5, 5])
  const parallaxY = useTransform(springY, [-1, 1], [-5, 5])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1
    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  // Duplicate testimonials for infinite marquee effect
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section
      aria-label="Testimonials"
      className="relative w-full py-20 lg:py-32 border border-slate-800/30 rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/80"
      onMouseMove={handleMouseMove}
      ref={containerRef}
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

      {/* Watermark RESULTS/TRUST */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[320px] font-geist font-black text-white/[0.015] leading-[0.8] whitespace-nowrap">
          RESULTS
        </div>
      </div>

      <div className="relative z-20">
        {/* Header Section */}
        <div className="px-6 lg:px-12 mb-16 max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
              Client Proof Points
            </p>
            <h2 className="text-5xl sm:text-6xl font-geist font-black tracking-tight-extreme leading-[1.1] text-white mb-6">
              Engineered for Impact
            </h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-400 font-light">
              Senior engineers trust proven technical execution and measurable business outcomes.
            </p>
          </motion.div>
        </div>

        {/* Infinite Marquee Container */}
        <motion.div
          className="relative overflow-hidden"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <motion.div
            className="flex gap-6 px-6 lg:px-12"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {duplicatedTestimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={`${testimonial.id}-${idx}`}
                testimonial={testimonial}
                isEven={idx % 2 === 0}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Credibility Stats */}
        <motion.div
          className="px-6 lg:px-12 mt-20 pt-12 border-t border-white/10 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-geist font-black text-white">50+</p>
              <p className="text-xs text-slate-400 font-light">Clients Served</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-3xl font-geist font-black text-white">98+</p>
              <p className="text-xs text-slate-400 font-light">Avg Lighthouse</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-3xl font-geist font-black text-white">100%</p>
              <p className="text-xs text-slate-400 font-light">Satisfaction Rate</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Conversion Signal */}
        <motion.div
          className="mt-12 flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <motion.div className="text-indigo-400 text-3xl font-bold">↓</motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
