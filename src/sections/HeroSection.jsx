import { ArrowRight } from 'lucide-react'
import { useRef, useEffect, memo } from 'react'

function parallaxAllowed() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

const HeroSection = ({ onCtaScroll }) => {
  const sectionRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const colRef = useRef(null)
  const imgWrapRef = useRef(null)
  const badgeParallaxRef = useRef(null)
  const cardParallaxRef = useRef(null)

  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  const applyParallax = (nx, ny) => {
    const px = nx * 15
    const py = ny * 15
    const tOrb = `translate3d(0, ${py}px, 0)`
    const tCol = `translate3d(${px}px, ${py}px, 0)`
    if (orb1Ref.current) orb1Ref.current.style.transform = tOrb
    if (orb2Ref.current) orb2Ref.current.style.transform = tOrb
    if (colRef.current) colRef.current.style.transform = tCol
    if (imgWrapRef.current) imgWrapRef.current.style.transform = `translate3d(0, ${py * 0.5}px, 0)`
    if (badgeParallaxRef.current)
      badgeParallaxRef.current.style.transform = `translate3d(0, ${py * 0.3}px, 0)`
    if (cardParallaxRef.current)
      cardParallaxRef.current.style.transform = `translate3d(0, ${py * 0.4}px, 0)`
  }

  const queueParallaxFrame = () => {
    if (rafRef.current != null) return
    const tick = () => {
      rafRef.current = null
      const c = currentRef.current
      const t = targetRef.current
      const k = 0.14
      c.x += (t.x - c.x) * k
      c.y += (t.y - c.y) * k
      applyParallax(c.x, c.y)
      const dx = t.x - c.x
      const dy = t.y - c.y
      if (dx * dx + dy * dy > 1e-6) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const handleMouseMove = (e) => {
    if (!parallaxAllowed() || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    targetRef.current = { x: nx, y: ny }
    queueParallaxFrame()
  }

  const handleMouseLeave = () => {
    targetRef.current = { x: 0, y: 0 }
    queueParallaxFrame()
  }

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero"
      className="relative min-h-[85vh] w-full flex flex-col justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#020617]/50 px-6 py-10 shadow-[0_0_80px_rgba(15,23,42,0.9)] sm:px-12 lg:px-20 lg:py-20 backdrop-blur-md md:backdrop-blur-3xl supports-[backdrop-filter]:bg-[#020617]/40"
    >
      <h1 className="sr-only">Zain UI Hassan - Full Stack Web Developer & Software Engineer</h1>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          ref={orb1Ref}
          className="absolute top-1/3 left-0 h-[280px] w-[280px] rounded-full bg-indigo-600/15 blur-[70px] md:h-[600px] md:w-[600px] md:blur-[150px]"
        />
        <div
          ref={orb2Ref}
          className="absolute bottom-0 right-1/4 h-[240px] w-[240px] rounded-full bg-purple-600/20 blur-[80px] md:h-[500px] md:w-[500px] md:blur-[160px]"
        />
        <div
          className="absolute top-1/2 right-0 h-[320px] w-[320px] rounded-full bg-violet-600/10 blur-[72px] motion-reduce:animate-none animate-pulse md:h-[700px] md:w-[700px] md:blur-[140px]"
          style={{ animationDuration: '8s' }}
        />
      </div>

      <div
        className="hero-glass-a hidden lg:block absolute right-20 top-10 h-64 w-64 rounded-3xl border border-white/10 bg-white/2 backdrop-blur-2xl mix-blend-overlay -z-10 shadow-[0_8px_32px_rgba(255,255,255,0.05)]"
        aria-hidden="true"
      />
      <div
        className="hero-glass-b hidden lg:block absolute left-[40%] bottom-10 h-40 w-40 rounded-full border border-white/10 bg-indigo-500/5 backdrop-blur-3xl -z-10 shadow-[0_8px_32px_rgba(99,102,241,0.1)]"
        aria-hidden="true"
      />

      <div className="grid gap-20 lg:grid-cols-[1.2fr_1fr] lg:items-center relative z-10">
        <div className="space-y-10 relative">
          <div className="absolute -inset-20 bg-indigo-600/10 blur-[120px] rounded-full -z-10" />

          <div className="hero-enter hero-enter-d1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-2 pr-3 py-1.5 backdrop-blur-md w-max hover:border-white/20 transition-colors duration-300 font-geist">
            <div className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[9px] font-mono font-semibold uppercase tracking-widest text-slate-400">
              OPEN FOR PROJECTS
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="hero-enter hero-enter-d2 max-w-4xl font-geist font-black text-5xl tracking-tight-extreme sm:text-5xl md:text-6xl lg:text-[78px] leading-[1.1] lg:leading-[1.05]">
              <span className="block bg-linear-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                SaaS & Business Startup Specialist
              </span>
            </h2>

            <p className="hero-enter hero-enter-d3 max-w-xl text-pretty text-sm sm:text-base font-light leading-relaxed text-slate-400 tracking-wide">
              I engineer the technical backbone of tomorrow&apos;s unicorns. Architecting high-converting,
              production-grade solutions where complexity becomes elegance.
            </p>
          </div>

          <div className="hero-enter hero-enter-d4 flex flex-wrap items-center gap-6 pt-2">
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

            <button
              type="button"
              onClick={() => onCtaScroll?.('contact')}
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10 focus:outline-none font-geist tracking-tight"
            >
              <span className="relative z-10 transition-transform group-hover:-translate-y-12">Let&apos;s Talk</span>
              <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-12 transition-transform group-hover:translate-y-0 text-white">
                Let&apos;s Talk
              </span>
            </button>
          </div>
        </div>

        <div
          ref={colRef}
          className="relative flex justify-center lg:justify-end h-full w-full [transform:translateZ(0)]"
        >
          <div className="hero-media-enter relative group w-full lg:max-w-[450px] h-[400px] md:h-[500px]">
            <div
              className="absolute -inset-10 md:-inset-20 bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 blur-[64px] motion-reduce:animate-none md:blur-[140px] rounded-full animate-pulse"
              style={{ animationDuration: '6s' }}
            />

            <div
              ref={imgWrapRef}
              className="relative w-full h-full overflow-hidden rounded-2xl [transform:translateZ(0)]"
            >
              {/* Vite: files in `public/` are served from site root — use `/myPP.webp`, never `/public/...` */}
              <img
                width={900}
                height={1125}
                src="/myPP.webp"
                alt="Zain UI Hassan - Full Stack MERN Developer specializing in SaaS and startup solutions"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(min-width: 1024px) 450px, 100vw"
                className="relative z-10 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 ease-out"
              />

              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 100% 100% at 50% 0%, transparent 0%, rgba(2, 6, 23, 0.3) 40%, rgba(2, 6, 23, 0.8) 70%, rgba(2, 6, 23, 1) 100%)`,
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent z-20 pointer-events-none" />
            </div>

            <div
              ref={badgeParallaxRef}
              className="hero-status-wrap absolute -left-6 bottom-40 z-40 hidden md:block [transform:translateZ(0)]"
            >
              <div className="hero-float-panel hero-status-inner rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-white/25 hover:bg-white/12 transition-colors duration-300 font-geist">
                <p className="text-[9px] font-mono font-semibold uppercase tracking-widest text-slate-500 mb-1">
                  Current Status
                </p>
                <p className="text-xs font-bold text-white tracking-tight">Solving SaaS Complexity</p>
              </div>
            </div>

            <div
              ref={cardParallaxRef}
              className="hero-tech-card-wrap absolute -right-4 -bottom-10 md:-right-8 md:bottom-20 z-30 w-56 md:w-64 [transform:translateZ(0)]"
            >
              <div className="hero-tech-card-inner rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_80px_rgba(79,70,229,0.2)] font-geist">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white tracking-tight">Tech Stack</h3>
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HeroSection)
