import { motion } from 'framer-motion'
import { Code2, Cpu, Palette, Zap, GitBranch, Smartphone } from 'lucide-react'

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

const tileVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5 }
  }),
  hover: {
    y: -4,
    boxShadow: '0 20px 40px rgba(79, 70, 229, 0.2)',
    transition: { duration: 0.3 }
  }
}

const AboutSection = () => {
  const capabilities = [
    { icon: Code2, label: 'Frontend Eng', items: ['React', 'Next.js', 'TypeScript','Javascript'] },
    { icon: Palette, label: 'Design Systems', items: ['Tailwind', 'Responsive', 'A11y'] },
    { icon: Cpu, label: 'Performance', items: ['Core Web Vitals', 'Optimization', 'Analytics'] },
    { icon: Zap, label: 'Full Stack', items: ['APIs', 'Databases', 'Auth'] },
    { icon: GitBranch, label: 'Dev Ops', items: ['Vercel', 'Git', 'CI/CD'] },
    { icon: Smartphone, label: 'Mobile', items: ['Responsive', 'Cross-browser', 'Touch'] },
  ]

  const techStack = ['React', 'Next.js','Javascript', 'TypeScript', 'Figma','Tailwind CSS', 'Botstrap','Firebase', 'Node.js', 'REST APIs', 'Git', 'Framer Motion']

  return (
    <motion.section
      aria-label="About"
      className="relative min-h-screen rounded-3xl border border-white/5 bg-[#020617]/50 px-6 py-20 shadow-[0_0_80px_rgba(15,23,42,0.9)] sm:px-12 lg:px-20 lg:py-32 backdrop-blur-3xl overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Watermark "ABOUT" Text */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-40 transform -translate-y-1/2 text-[200px] sm:text-[300px] lg:text-[400px] font-geist font-black text-white/5 leading-none whitespace-nowrap select-none">
          ABOUT
        </div>
      </div>

      {/* Floating Glassmorphic Shape */}
      <motion.div 
        className="absolute top-20 right-20 h-96 w-96 rounded-3xl border border-white/10 bg-white/2 backdrop-blur-3xl -z-10 hidden lg:block"
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      {/* Ambient Lighting Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px]" />
      </div>

      {/* Asymmetric 2-Column Grid */}
      <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] relative z-20">
        
        {/* Left Column: Story & Philosophy */}
        <motion.div 
          className="space-y-8"
          variants={container}
        >
          <div className="space-y-6">
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-geist font-black tracking-tight-extreme leading-[1.1] text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Obsessed with calm, reliable SaaS.
            </motion.h2>

            <motion.div 
              className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="font-light">
                I bridge complex engineering with intuitive design. Every product I build prioritizes user delight without sacrificing performance or reliability.
              </p>
              <p className="font-light">
                With 3+ years of experience, I've architected interfaces for 20+ SaaS products, focusing on conversion-driven design and production-grade code.
              </p>
            </motion.div>
          </div>

          {/* Key Pillars - Factoids */}
          <motion.div 
            className="grid gap-4 sm:grid-cols-2"
            variants={container}
          >
            <motion.div 
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/20 hover:bg-white/8 transition-all"
              variants={tileVariant}
              custom={0}
              whileHover="hover"
            >
              <div className="text-3xl font-geist font-black text-transparent bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text">
                20+
              </div>
              <p className="text-sm text-slate-400 mt-1">SaaS Products Built</p>
            </motion.div>

            <motion.div 
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/20 hover:bg-white/8 transition-all"
              variants={tileVariant}
              custom={1}
              whileHover="hover"
            >
              <div className="text-3xl font-geist font-black text-transparent bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text">
                3+
              </div>
              <p className="text-sm text-slate-400 mt-1">Years Experience</p>
            </motion.div>

            <motion.div 
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/20 hover:bg-white/8 transition-all"
              variants={tileVariant}
              custom={2}
              whileHover="hover"
            >
              <div className="text-3xl font-geist font-black text-transparent bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text">
                100%
              </div>
              <p className="text-sm text-slate-400 mt-1">Quality First</p>
            </motion.div>

            <motion.div 
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/20 hover:bg-white/8 transition-all"
              variants={tileVariant}
              custom={3}
              whileHover="hover"
            >
              <div className="text-3xl font-geist font-black text-transparent bg-linear-to-r from-orange-400 to-red-400 bg-clip-text">
                ⚡
              </div>
              <p className="text-sm text-slate-400 mt-1">Performance Obsessed</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column: Capability Matrix */}
        <motion.div 
          className="space-y-8"
          variants={container}
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">Capability Matrix</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((cap, idx) => {
                const Icon = cap.icon
                const colors = [
                  'from-indigo-500/30 to-indigo-500/10 hover:from-indigo-500/40',
                  'from-violet-500/30 to-violet-500/10 hover:from-violet-500/40',
                  'from-cyan-500/30 to-cyan-500/10 hover:from-cyan-500/40',
                  'from-purple-500/30 to-purple-500/10 hover:from-purple-500/40',
                  'from-emerald-500/30 to-emerald-500/10 hover:from-emerald-500/40',
                  'from-pink-500/30 to-pink-500/10 hover:from-pink-500/40',
                ]
                return (
                  <motion.div
                    key={idx}
                    className={`p-5 rounded-2xl border border-white/10 bg-gradient-to-br ${colors[idx % colors.length]} backdrop-blur-xl transition-all hover:border-white/20`}
                    variants={tileVariant}
                    custom={idx}
                    whileHover="hover"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-5 w-5 text-slate-300" />
                      <p className="text-sm font-semibold text-white font-geist">{cap.label}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.items.map((item, i) => (
                        <span key={i} className="text-xs bg-white/10 rounded-full px-2 py-1 text-slate-300 font-mono">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Tech Stack as Dense Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Full Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-slate-300 font-mono hover:border-white/20 hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default AboutSection

