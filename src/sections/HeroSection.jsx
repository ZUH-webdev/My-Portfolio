import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Magnetic from '../Components/Magnetic'
import { useRef } from 'react'

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const floatingCard = {
  initial: { opacity: 0, y: 40, rotate: -8 },
  animate: { 
    opacity: 1, 
    y: 0, 
    rotate: 0,
    transition: { duration: 1, ease: "easeOut", delay: 0.4 }
  },
  hover: {
    y: -8,
    transition: { duration: 0.3 }
  }
}

const HeroSection = ({ onCtaScroll }) => {
  const sectionRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Create spring values for smooth parallax
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 })
  
  // Transform spring values to parallax movement (subtle 3D effect)
  const parallaxX = useTransform(springX, [-1, 1], [-15, 15])
  const parallaxY = useTransform(springY, [-1, 1], [-15, 15])

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return
    const { clientX, clientY } = e
    const { width, height, left, top } = sectionRef.current.getBoundingClientRect()
    const centerX = (clientX - left - width / 2) / (width / 2)
    const centerY = (clientY - top - height / 2) / (height / 2)
    
    mouseX.set(centerX)
    mouseY.set(centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero"
      className="relative min-h-[85vh] w-full flex flex-col justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#020617]/50 px-6 py-10 shadow-[0_0_80px_rgba(15,23,42,0.9)] sm:px-12 lg:px-20 lg:py-20 backdrop-blur-3xl"
    >
      {/* Film Grain Overlay - Premium Texture */}
      <div className="pointer-events-none absolute inset-0 z-[99] opacity-[0.03] mix-blend-overlay rounded-3xl" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }} />
      
      {/* Main Page H1 - Visually Hidden for SEO */}
      <h1 className="sr-only">Zain UI Hassan - Full Stack Web Developer & Software Engineer</h1>

      {/* Deep Ambient Lighting Orbs - Enhanced Stage Lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 left-0 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[150px]"
          style={{ y: parallaxY }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[160px]"
          style={{ y: parallaxY }}
        />
        <div className="absolute top-1/2 right-0 h-[700px] w-[700px] rounded-full bg-violet-600/10 blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      {/* Abstract CSS Frosted Glass Shapes */}
      <motion.div 
        initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="hidden lg:block absolute right-20 top-10 h-64 w-64 rounded-3xl border border-white/10 bg-white/2 backdrop-blur-2xl mix-blend-overlay -z-10 shadow-[0_8px_32px_rgba(255,255,255,0.05)]"
        style={{ transform: 'rotate(15deg) translateZ(0)' }}
      />
      <motion.div 
        initial={{ opacity: 0, rotate: 20, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 10, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        className="hidden lg:block absolute left-[40%] bottom-10 h-40 w-40 rounded-full border border-white/10 bg-indigo-500/5 backdrop-blur-3xl -z-10 shadow-[0_8px_32px_rgba(99,102,241,0.1)]"
      />

      <div className="grid gap-20 lg:grid-cols-[1.2fr_1fr] lg:items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-10 relative">
          {/* Indigo Ambient Glow Behind Text */}
          <div className="absolute -inset-20 bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
          
          {/* Status Badge - Refined & Elegant */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-2 pr-3 py-1.5 backdrop-blur-md w-max hover:border-white/20 transition-all font-geist"
            variants={textVariant}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-slate-400">
              OPEN FOR PROJECTS
            </span>
          </motion.div>

          {/* Premium Typography Hierarchy */}
          <div className="space-y-6">
            <motion.h1
              className="max-w-4xl font-geist font-black text-5xl tracking-tight-extreme sm:text-5xl md:text-6xl lg:text-[78px] leading-[1.1] lg:leading-[1.05]"
              variants={textVariant}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <span className="block bg-linear-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                SaaS & Business Startup Specialist
              </span>
            </motion.h1>

            <motion.p
              className="max-w-xl text-pretty text-sm sm:text-base font-light leading-relaxed text-slate-400 tracking-wide"
              variants={textVariant}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              I engineer the technical backbone of tomorrow's unicorns. Architecting high-converting, production-grade solutions where complexity becomes elegance.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-6 pt-2"
            variants={textVariant}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Magnetic pullBase={0.35}>
              <button
                type="button"
                onClick={() => onCtaScroll?.('projects')}
                className="group relative inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 pl-8 pr-6 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(79,70,229,0.35)] transition-all duration-300 hover:shadow-[0_30px_60px_rgba(79,70,229,0.5)] hover:pr-8 hover:from-indigo-500 hover:to-indigo-600 focus:outline-none active:scale-95 font-geist tracking-tight"
              >
                <span>View Projects</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Magnetic>

            <button
              type="button"
              onClick={() => onCtaScroll?.('contact')}
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10 focus:outline-none font-geist tracking-tight"
            >
              <span className="relative z-10 transition-transform group-hover:-translate-y-12">Let's Talk</span>
              <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-12 transition-transform group-hover:translate-y-0 text-white">Let's Talk</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column Image Container */}
        <motion.div
          className="relative flex justify-center lg:justify-end h-full w-full"
          style={{ y: parallaxY, x: parallaxX }}
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <div className="relative group w-full lg:max-w-[450px] h-[400px] md:h-[500px]">
            {/* The Stage Spotlight Glow */}
            <motion.div 
              className="absolute -inset-10 md:-inset-20 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 blur-[100px] md:blur-[140px] rounded-full animate-pulse" 
              style={{ animationDuration: '6s' }}
            />
            
            {/* Unboxed Image with Radial Fade */}
            <motion.div 
              className="relative w-full h-full overflow-hidden rounded-2xl"
              style={{ y: useTransform(parallaxY, v => v * 0.5) }}
            >
              <img 
               width="256" height="256"
                src="/myPP.webp" 
                alt="Zain UI Hassan - Full Stack MERN Developer specializing in SaaS and startup solutions" 
                loading="eager"

                className="relative z-10 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 ease-out"
              />
              
              {/* Radial Gradient Mask - Unbox Effect */}
              <div className="absolute inset-0 z-20 pointer-events-none" style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 0%, transparent 0%, rgba(2, 6, 23, 0.3) 40%, rgba(2, 6, 23, 0.8) 70%, rgba(2, 6, 23, 1) 100%)`
              }} />
              
              {/* The Bottom Fade that removes the 'ugly' cut-off */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent z-20 pointer-events-none" />
            </motion.div>

            {/* Floating Glassmorphic Status Badge - Overlapping */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{ y: useTransform(parallaxY, v => v * 0.3) }}
              className="absolute -left-6 bottom-40 z-40 hidden md:block"
            >
              <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-white/25 hover:bg-white/12 transition-all font-geist">
                <p className="text-[9px] font-mono font-semibold uppercase tracking-widest text-slate-500 mb-1">Current Status</p>
                <p className="text-xs font-bold text-white tracking-tight">Solving SaaS Complexity</p>
              </div>
            </motion.div>

            {/* Floating Glassmorphic Tech Card */}
            <motion.div
              variants={floatingCard}
              initial="initial"
              animate="animate"
              whileHover="hover"
              style={{ y: useTransform(parallaxY, v => v * 0.4) }}
              className="absolute -right-4 -bottom-10 md:-right-8 md:bottom-20 z-30 w-56 md:w-64 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_80px_rgba(79,70,229,0.2)] font-geist"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white tracking-tight">Tech Stack</h3>
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              
              <div className="space-y-3">
                {/* React Icon */}
                <div className="flex items-center gap-3 group/icon cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 group-hover/icon:from-cyan-500/30 group-hover/icon:to-blue-500/20 transition-all">
                    <svg className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 2.239-12 5s5.373 5 12 5 12-2.239 12-5-5.373-5-12-5zm0 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">React</p>
                    <p className="text-xs text-slate-500">UI Framework</p>
                  </div>
                </div>

                {/* Tailwind Icon */}
                <div className="flex items-center gap-3 group/icon cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-teal-500/10 border border-sky-400/30 group-hover/icon:from-sky-500/30 group-hover/icon:to-teal-500/20 transition-all">
                    <svg className="h-5 w-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22c-5.5 0-10-4.5-10-10S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">Tailwind</p>
                    <p className="text-xs text-slate-500">CSS Framework</p>
                  </div>
                </div>

                {/* Node.js Icon */}
                <div className="flex items-center gap-3 group/icon cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-400/30 group-hover/icon:from-emerald-500/30 group-hover/icon:to-green-500/20 transition-all">
                    <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zm9 7h-6l-2-2h-2l-2 2H3c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h18c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200">Node.js</p>
                    <p className="text-xs text-slate-500">Backend Runtime</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
