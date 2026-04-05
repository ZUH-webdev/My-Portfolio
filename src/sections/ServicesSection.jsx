import { motion } from 'framer-motion'
import { ArrowRight, Zap, ShoppingCart, Smartphone, Gauge } from 'lucide-react'

const services = [
  {
    icon: ShoppingCart,
    title: 'High-Conversion E-commerce',
    description: 'Scalable, feature-rich platforms with intuitive product discovery and frictionless checkout optimization.',
    badge: 'Popular for Startups',
    color: 'from-emerald-500/30 to-emerald-500/10',
    highlight: 'emerald',
  },
  {
    icon: Smartphone,
    title: 'Multi-Platform SaaS',
    description: 'Bespoke interfaces for complex workflows. Responsive experiences that scale across web, tablet, and mobile.',
    badge: 'Enterprise-Grade',
    color: 'from-indigo-500/30 to-indigo-500/10',
    highlight: 'indigo',
  },
  {
    icon: Gauge,
    title: 'Performance & Core Web Vitals',
    description: 'Lightning-fast load times, optimized for SEO and user retention. Technical excellence meets business growth.',
    badge: 'Performance Optimized',
    color: 'from-violet-500/30 to-violet-500/10',
    highlight: 'violet',
  },
  {
    icon: Zap,
    title: 'Design Systems & Component Libraries',
    description: 'Scalable, maintainable design systems. Unified component architecture for rapid development and consistency.',
    badge: 'Scale-Ready',
    color: 'from-cyan-500/30 to-cyan-500/10',
    highlight: 'cyan',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 * i },
  }),
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 }
  }
}

const ServicesSection = () => {
  return (
    <section
      aria-label="Services"
      className="relative rounded-3xl border border-white/5 bg-[#020617]/50 px-6 pt-32 pb-20 shadow-[0_0_80px_rgba(15,23,42,0.9)] sm:px-12 lg:px-20 lg:py-32 backdrop-blur-3xl overflow-hidden"
    >
      {/* Ambient Lighting Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      {/* Film Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[99] opacity-[0.03] mix-blend-overlay rounded-3xl" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }} />

      {/* Section Header */}
      <motion.div 
        className="mb-24 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Premium Services</p>
          <h2 className="max-w-2xl text-5xl sm:text-6xl font-geist font-black tracking-tight-extreme leading-[1.1] text-white">
            Technical Solutions that Drive Growth
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate-400 font-light">
            Every service is engineered for business impact. I solve complex technical challenges while keeping conversion goals front and center.
          </p>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="grid gap-6 lg:grid-cols-2 relative z-20">
        {services.map((service, idx) => {
          const Icon = service.icon
          const { title, description, badge, color, highlight } = service
          return (
          <motion.div
            key={title}
            className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.05]"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={idx}
            whileHover="hover"
          >
            {/* Hover Glow Effect */}
            <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${color} opacity-0 blur-xl transition-all duration-300 group-hover:opacity-100 -z-10`} />
            
            {/* Main Content */}
            <div className="relative z-10 space-y-4">
              {/* Icon & Badge */}
              <div className="flex items-start justify-between">
                <motion.div 
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-${highlight}-400/30 bg-gradient-to-br ${color} text-${highlight}-300`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <motion.span 
                  className={`rounded-full bg-${highlight}-500/10 border border-${highlight}-400/30 px-3 py-1 text-xs font-mono text-${highlight}-300`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {badge}
                </motion.span>
              </div>

              {/* Heading */}
              <div>
                <h3 className="text-2xl font-geist font-black tracking-tight leading-tight text-white mb-3">
                  {title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base font-light">
                  {description}
                </p>
              </div>

              {/* CTA - Appears on Hover */}
              <motion.div
                className="flex items-center gap-2 text-sm font-semibold text-slate-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 pt-4 border-t border-white/5"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
              >
                <span>Book a discovery call</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.div>
            </div>
          </motion.div>
          )
        })}
      </div>

      {/* Trust Section */}
      <motion.div 
        className="mt-24 pt-12 border-t border-white/10 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-slate-400 mb-6 font-light">
          <span className="text-white font-semibold">Why clients trust this approach:</span> Every service is backed by production-grade code, industry best practices, and a proven track record of converting businesses.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>React + TypeScript Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>Conversion-Focused Design</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span>3+ Years SaaS Experience</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ServicesSection

