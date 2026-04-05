import { useState, lazy, Suspense } from 'react'
import Header from './Header'
import HeroSection from '../sections/HeroSection'
import DeferredMount from './DeferredMount'

const AboutSection = lazy(() => import('../sections/AboutSection'))
const ServicesSection = lazy(() => import('../sections/ServicesSection'))
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'))
const ExperienceSection = lazy(() => import('../sections/ExperienceSection'))
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'))
const ContactSection = lazy(() => import('../sections/ContactSection'))
const Footer = lazy(() => import('./Footer'))
const ContactModal = lazy(() => import('./ContactModal'))

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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalEverOpened, setModalEverOpened] = useState(false)

  const openContactModal = () => {
    setModalEverOpened(true)
    setShowModal(true)
  }

  const handleNavClick = (id) => {
    setMobileOpen(false)
    scrollToId(id)
  }

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30 transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 z-100 opacity-[0.03] mix-blend-overlay layout-grain" />

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
        onOpenContact={openContactModal}
      />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        <div
          id="mobile-site-nav"
          inert={!mobileOpen}
          role="navigation"
          aria-label="Mobile"
          aria-hidden={!mobileOpen}
          className={`fixed inset-x-4 top-24 z-50 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-[0_24px_48px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 ease-out md:hidden ${
            mobileOpen
              ? 'visible translate-y-0 opacity-100'
              : 'invisible pointer-events-none -translate-y-3 opacity-0'
          }`}
        >
          <ul className="flex flex-col gap-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full rounded-lg py-4 text-center text-lg font-medium text-slate-100 transition-colors hover:bg-white/5 focus:outline-none focus-visible:bg-white/10"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {modalEverOpened && (
          <Suspense fallback={null}>
            <ContactModal open={showModal} onClose={() => setShowModal(false)} />
          </Suspense>
        )}

        <main className="shell-main-enter flex flex-1 flex-col gap-24 py-10 sm:py-16">
          <HeroSection onCtaScroll={scrollToId} />

          <DeferredMount minHeight="85vh" rootMargin="0px 0px 280px 0px">
            <Suspense fallback={null}>
              <AboutSection />
            </Suspense>
          </DeferredMount>

          <DeferredMount minHeight="70vh" rootMargin="0px 0px 280px 0px">
            <Suspense fallback={null}>
              <ServicesSection />
            </Suspense>
          </DeferredMount>

          <DeferredMount minHeight="90vh" rootMargin="0px 0px 280px 0px">
            <Suspense fallback={null}>
              <ProjectsSection />
            </Suspense>
          </DeferredMount>

          <DeferredMount minHeight="85vh" rootMargin="0px 0px 280px 0px">
            <Suspense fallback={null}>
              <ExperienceSection />
            </Suspense>
          </DeferredMount>

          <DeferredMount minHeight="75vh" rootMargin="0px 0px 280px 0px">
            <Suspense fallback={null}>
              <TestimonialsSection />
            </Suspense>
          </DeferredMount>

          <DeferredMount minHeight="85vh" rootMargin="0px 0px 280px 0px">
            <Suspense fallback={null}>
              <ContactSection />
            </Suspense>
          </DeferredMount>
        </main>

        <DeferredMount minHeight="320px" rootMargin="0px 0px 400px 0px">
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </DeferredMount>
      </div>
    </div>
  )
}

export default Layout
