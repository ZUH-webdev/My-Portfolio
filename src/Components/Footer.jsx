import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Twitter, ArrowUp, Instagram } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Magnetic from './Magnetic'

const Footer = () => {
  const [localTime, setLocalTime] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const footerRef = useRef(null)

  // Update local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // GMT+5 for Pakistan (Asia/Karachi)
      const gmt5Time = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }))
      setLocalTime(gmt5Time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Show/hide back to top based on footer visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollTop(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
    { name: 'X', url: 'https://twitter.com', icon: Twitter },
    { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
  ]

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#020617] py-16 overflow-hidden selection:bg-indigo-500/30"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Watermark - Anchored low */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none">
          <div aria-hidden="true" className="text-[35vw] font-black text-white/[0.02] leading-none tracking-tighter font-geist uppercase">
            ZAIN
          </div>
        </div>
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay layout-grain pointer-events-none" />

        {/* Minimal Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(circle_at_50%_100%,rgba(79,70,229,0.06),transparent_80%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-16 container relative z-10">
        {/* Top Boundary Line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col gap-12 sm:gap-16">
          {/* Main Horizontal Vision & Status Row */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-10">
            {/* Vision Text - High Impact / Minimal Footprint */}
            <div className="max-w-2xl text-center md:text-left">
              <p className="text-slate-300 text-xl md:text-2xl lg:text-3xl font-geist leading-[1.2] font-light">
                Engineering <span className="text-white font-medium italic">digital symphonies</span> where engineering precision meets aesthetic obsession.
              </p>
            </div>

            {/* Availability Pill - Integrated */}
            <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shrink-0">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]"></span>
              </div>
              <span className="text-[11px] font-geist uppercase tracking-[0.3em] text-slate-100 font-bold whitespace-nowrap">
                Ready: Q2/Q3 2026
              </span>
            </div>
          </div>

          {/* Bottom Meta & Social Bar */}
          <div className="pt-10 space-y-10 border-t border-white/5">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
              {/* Technical Meta Hub */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 sm:gap-12">
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-slate-500">Local Time (GMT+5)</span>
                  <span className="text-[11px] font-geist text-slate-200 font-bold uppercase tracking-tight">{localTime}</span>
                </div>
                <div className="hidden sm:block h-8 w-px bg-white/10" />
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-slate-500">System Status</span>
                  <span className="inline-flex items-center gap-2 text-[10px] font-geist text-emerald-400 font-bold uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    Optimal
                  </span>
                </div>
                <div className="hidden sm:block h-8 w-px bg-white/10" />
                <div className="flex flex-col items-center sm:items-start gap-2 text-center sm:text-left">
                  <span className="text-[10px] font-serif uppercase tracking-[0.3em] text-slate-500">Origin</span>
                  <span className="text-[11px] font-serif text-slate-200 font-bold uppercase tracking-tight">Pakistan // Global</span>
                </div>
              </div>

              {/* Social Index & Copyright */}
              <div className="flex flex-col items-center lg:items-end gap-6">
                {/* Minimal Icons */}
                <div className="flex items-center gap-6">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white bg-white/10 p-2 rounded-full transition-all duration-500 hover:scale-110"
                        title={social.name}
                      >
                        <Icon size={20} />
                      </a>
                    )
                  })}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-serif uppercase tracking-[0.4em] text-slate-500 font-extrabold">
                    Made with obsession
                  </span>
                  <span className="h-1 w-1 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-serif uppercase tracking-[0.4em] text-slate-500 font-bold">
                    © 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rise to Top - Minimized Contextual Component */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-10 right-10 z-50 p-2"
          >
            <Magnetic>
              <button
                onClick={scrollToTop}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#020617]/50 backdrop-blur-2xl transition-all duration-700 hover:border-white"
              >
                <ArrowUp size={24} className="text-slate-500 group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-1.5" />
                <span className="absolute inset-0 bg-white scale-0 group-hover:scale-[0.1] transition-transform duration-700 rounded-full" />
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer