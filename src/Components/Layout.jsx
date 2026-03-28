import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Moon, SunMedium, Menu, X } from 'lucide-react'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import ProjectsSection from '../sections/ProjectsSection'
import ExperienceSection from '../sections/ExperienceSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import ContactSection from '../sections/ContactSection'
// ...existing code...
import profile from '../../public/profilePic.jpeg'


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
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300">
      {/* Background gradient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      {/* App shell */}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        {/* Top navigation */}
        <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
          <div className="flex items-center justify-between py-4">
            <button
              type="button"
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2 text-lg font-semibold text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <img
                src={profile}
                alt="Zain Ul Hassan"
                className="h-10 w-10 rounded-full object-cover border-2 border-indigo-500"
              />
              <span className="hidden sm:inline">Zain · Saas & Startup Specialist</span>
            </button>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="relative rounded-full px-2 py-1 transition-colors hover:text-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* CTA Button */}
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:shadow-xl hover:shadow-violet-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                onClick={() => setShowModal(true)}
              >
                Start a Project
              </button>
              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/70 text-slate-200 shadow-sm shadow-slate-900/50 transition hover:border-cyan-400/70 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Menu className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="space-y-1 pb-4 pt-1 md:hidden"
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-200 hover:bg-slate-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    {item.label}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

         {/* Contact Modal */}
         <AnimatePresence>
           {showModal && (
             <motion.div
               className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
             >
               <motion.div
                 className="relative w-full max-w-md rounded-xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl"
                 initial={{ scale: 0.92, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.92, opacity: 0 }}
                 transition={{ type: 'spring', stiffness: 300, damping: 24 }}
               >
                 <button
                   className="absolute right-4 top-4 rounded-full bg-slate-800/60 p-1 text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none"
                   onClick={() => setShowModal(false)}
                   aria-label="Close modal"
                 >
                   <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12"/></svg>
                 </button>
                 <h2 className="mb-2 text-xl font-bold text-white">Start a Project</h2>
                 <p className="mb-6 text-sm text-slate-300">Let’s discuss your requirements and how I can help.</p>
                 <form onSubmit={handleModalSubmit} className="space-y-4">
                   <div>
                     <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1">Name</label>
                     <input
                       id="name"
                       name="name"
                       type="text"
                       required
                       className="w-full rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
                       placeholder="Your name"
                     />
                   </div>
                   <div>
                     <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                     <input
                       id="email"
                       name="email"
                       type="email"
                       required
                       className="w-full rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
                       placeholder="you@email.com"
                     />
                   </div>
                   <div>
                     <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1">Project Description / Requirements</label>
                     <textarea
                       id="message"
                       name="message"
                       required
                       rows={4}
                       className="w-full rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
                       placeholder="Describe your project..."
                     />
                   </div>
                   <div className="pt-2">
                     <button
                       type="submit"
                       disabled={modalStatus === 'sending'}
                       className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white shadow transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-70"
                     >
                       {modalStatus === 'sending' ? 'Sending…' : 'Send message'}
                     </button>
                   </div>
                   <div className="h-6 text-center text-xs">
                     <AnimatePresence>
                       {modalStatus === 'success' && (
                         <motion.span
                           initial={{ opacity: 0, y: 4 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -4 }}
                           transition={{ duration: 0.2 }}
                           className="text-emerald-300"
                         >
                           Message sent! I’ll be in touch shortly.
                         </motion.span>
                       )}
                     </AnimatePresence>
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
          <HeroSection onCtaScroll={scrollToId} />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <ExperienceSection />
          <TestimonialsSection />
          <ContactSection />
        </motion.main>

        {/* Footer */}
        <footer className="border-t border-slate-800/70 py-6 text-sm text-slate-400">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Zain Ul Hassan. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ZAIN1786-TECH"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3 py-1 text-xs font-medium text-slate-300 transition hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/zain-ul-hassan-dev?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3 py-1 text-xs font-medium text-slate-300 transition hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                LinkedIn
              </a>
              <span className="rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-medium text-slate-300 shadow-sm shadow-slate-900/70">
                Freelance & Full-time Available
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout

