import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Moon, SunMedium, Menu, X } from 'lucide-react'
import Magnetic from './Magnetic'
import Header from './Header'
import Footer from './Footer'
import SectionFallback from './SectionFallback'
import profile from '../../public/profilePic.jpeg'

const HeroSection = lazy(() => import('../sections/HeroSection'))
const AboutSection = lazy(() => import('../sections/AboutSection'))
const ServicesSection = lazy(() => import('../sections/ServicesSection'))
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'))
const ExperienceSection = lazy(() => import('../sections/ExperienceSection'))
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'))
const ContactSection = lazy(() => import('../sections/ContactSection'))

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Testimonials' },
]

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const Layout = () => {
  // Theme logic removed
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalStatus, setModalStatus] = useState('idle') // idle | sending | success
  const [focusedField, setFocusedField] = useState(null)

  // Modal contact form submit handler (same logic as ContactSection)
  const handleModalSubmit = async (event) => {
    event.preventDefault()
    if (modalStatus === 'sending') return
    setModalStatus('sending')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      // eslint-disable-next-line no-console
      console.error(
        'EmailJS not configured. Update .env with:\n' +
        'VITE_EMAILJS_SERVICE_ID = your service id\n' +
        'VITE_EMAILJS_TEMPLATE_ID = your template id\n' +
        'VITE_EMAILJS_PUBLIC_KEY = your public key\n' +
        'See https://www.emailjs.com/'
      )
      alert('Email service not configured. Check browser console for setup instructions.')
      setModalStatus('idle')
      return
    }

    try {
      const form = event.target
      const formData = new FormData(form)
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }

      await emailjs.send(serviceId, templateId, payload, publicKey)
      setModalStatus('success')
      form.reset()
      setTimeout(() => {
        setModalStatus('idle')
        setShowModal(false)
      }, 2000)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to send contact message', err)
      setModalStatus('idle')
    }
  }

  // Theme effect removed

  // Theme toggle removed

  const handleNavClick = (id) => {
    setMobileOpen(false)
    scrollToId(id)
  }

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Noise texture overlay for 'Elite' feel */}
      <div className="pointer-events-none fixed inset-0 z-100 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Background gradient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute -bottom-32 left-1/3 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <Header 
        handleNavClick={handleNavClick}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setShowModal={setShowModal}
        profile={profile}
      />

      {/* App shell */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-4 top-24 z-50 rounded-2xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur-2xl md:hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full rounded-lg py-4 text-center text-lg font-medium hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

          {/* Contact Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Backdrop with Radial Glow Context */}
                <div 
                  className="absolute inset-0 bg-black/60 backdrop-blur-md" 
                  onClick={() => setShowModal(false)}
                />
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.15), transparent 70%)' }}
                />

                <motion.div
                  className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#020617]/95 p-5 sm:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-[40px] overflow-hidden"
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                >
                  {/* Subtle Gradient Border Overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 bg-linear-to-br from-white/10 via-transparent to-transparent" />

                  {/* Close button - High priority z-index and expanded touch area */}
                  <button
                    className="absolute right-4 top-4 z-100 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
                    onClick={() => setShowModal(false)}
                    aria-label="Close modal"
                  >
                    <X size={20} strokeWidth={1.5} className="sm:w-4 sm:h-4" />
                  </button>

                  {/* Header */}
                  <div className="relative z-10 mb-6 sm:mb-8">
                    <h2 className="mb-0.5 font-geist font-black text-2xl tracking-tighter text-white sm:text-3xl">
                      Start a Project
                    </h2>
                    <p className="font-outfit text-xs text-slate-400 sm:text-sm">
                      Tell me about your vision.
                    </p>
                  </div>

                  <form onSubmit={handleModalSubmit} className="relative z-10 space-y-4 sm:space-y-6 group">
                    {/* Form Ambient Glow - Background */}
                    <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-indigo-500/20 to-purple-500/10 opacity-0 blur-2xl pointer-events-none transition-opacity duration-500 group-focus-within:opacity-100" />
                    {/* Name Field */}
                    <div className="group/field relative">
                      {/* Focus Glow Background */}
                      <motion.div
                        className="absolute -inset-x-4 -inset-y-3 rounded-lg bg-indigo-500/0 blur-lg pointer-events-none"
                        animate={{
                          backgroundColor: focusedField === 'name' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0)',
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <label htmlFor="name" className="mb-1 block font-geist-mono text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-[9px]">
                        NAME
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Your identity"
                          className="peer relative w-full bg-transparent py-1.5 font-geist text-sm text-white placeholder-slate-800 outline-none transition-all sm:py-2 sm:text-base focus:border-indigo-500"
                        />
                        <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
                        {/* Animated Underline */}
                        {focusedField === 'name' && (
                          <motion.div
                            className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                            layoutId="modal-underline"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="group/field relative">
                      {/* Focus Glow Background */}
                      <motion.div
                        className="absolute -inset-x-4 -inset-y-3 rounded-lg bg-indigo-500/0 blur-lg pointer-events-none"
                        animate={{
                          backgroundColor: focusedField === 'email' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0)',
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <label htmlFor="email" className="mb-1 block font-geist-mono text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-[9px]">
                        EMAIL
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="hello@world.com"
                          className="peer relative w-full bg-transparent py-1.5 font-geist text-sm text-white placeholder-slate-800 outline-none transition-all sm:py-2 sm:text-base focus:border-indigo-500"
                        />
                        <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
                        {/* Animated Underline */}
                        {focusedField === 'email' && (
                          <motion.div
                            className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                            layoutId="modal-underline"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="group/field relative">
                      {/* Focus Glow Background */}
                      <motion.div
                        className="absolute -inset-x-4 -inset-y-3 rounded-lg bg-purple-500/0 blur-lg pointer-events-none"
                        animate={{
                          backgroundColor: focusedField === 'message' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0)',
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <label htmlFor="message" className="mb-1 block font-geist-mono text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-[9px]">
                        PROJECT SPECS
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={2}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Requirements..."
                          className="peer relative w-full resize-none bg-transparent py-1.5 font-geist text-sm text-white placeholder-slate-800 outline-none transition-all sm:py-2 sm:text-base focus:border-purple-500"
                        />
                        <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
                        {/* Animated Underline */}
                        {focusedField === 'message' && (
                          <motion.div
                            className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-purple-500 to-indigo-500 rounded-full"
                            layoutId="modal-underline"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Action Section */}
                    <div className="pt-2 sm:pt-4">
                      <div className="flex flex-col items-center gap-3">
                        <Magnetic pullBase={0.3} className="w-full">
                          <button
                            type="submit"
                            disabled={modalStatus === 'sending'}
                            className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-white text-[10px] font-black uppercase tracking-widest text-black shadow-[0_12px_32px_rgba(255,255,255,0.1)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 sm:h-14 sm:text-xs"
                          >
                            <span className="relative z-10">
                              {modalStatus === 'sending' ? 'Sending...' : 'Send Inquiry'}
                            </span>
                            <div className="absolute inset-0 -z-10 translate-y-full bg-slate-100 transition-transform duration-300 group-hover:translate-y-0" />
                          </button>
                        </Magnetic>

                        {/* Reliability Micro-label */}
                        <div className="flex flex-col items-center gap-1 opacity-40">
                          <p className="font-geist-mono text-[7px] uppercase tracking-[0.4em] sm:text-[8px]">
                            Immediate Response: &lt; 24 Hours
                          </p>
                          <div className="h-4">
                            <AnimatePresence>
                              {modalStatus === 'success' && (
                                <motion.span
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  className="font-geist text-[9px] font-bold text-emerald-400 sm:text-[10px]"
                                >
                                  Inquiry Received.
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

         {/* Main content */}
        <motion.main
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-1 flex-col gap-24 py-10 sm:py-16"
        >
          <Suspense fallback={<SectionFallback />}>
            <HeroSection onCtaScroll={scrollToId} />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ExperienceSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <TestimonialsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </motion.main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Layout

