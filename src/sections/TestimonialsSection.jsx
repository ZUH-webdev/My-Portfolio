import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Elena Rossi',
    role: 'Founder, BillingOS',
    quote:
      'Zain took our messy Figma ideas and turned them into a calm, Stripe-grade dashboard. Our team shipped twice as fast because the UI decisions were clear.',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Product, Launchpad',
    quote:
      'Every feature shipped with a thoughtful UX narrative. State management, loading skeletons, error states—nothing was left as &quot;we’ll fix it later&quot;.',
  },
  {
    name: 'Aisha Khan',
    role: 'CTO, Pulse Analytics',
    quote:
      'Performance and polish rarely come together like this. Our dashboards feel dense, but never overwhelming, even on smaller screens.',
  },
]


const TestimonialsSection = () => {
  const [index, setIndex] = useState(0)
  // Show 2 testimonials at a time
  const getVisible = () => {
    if (testimonials.length <= 2) return testimonials
    if (index === testimonials.length - 1) return [testimonials[index], testimonials[0]]
    return [testimonials[index], testimonials[index + 1]]
  }
  const visible = getVisible()

  const goTo = (dir) => {
    setIndex((prev) => {
      const next = (prev + dir + testimonials.length) % testimonials.length
      return next
    })
  }

  return (
    <section
      id="testimonials"
      className="rounded-3xl border border-slate-800/80 bg-slate-950/70 px-5 py-8 sm:px-8 sm:py-10"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-50 sm:text-xl text-center">
          Testimonials
        </h2>
        <p className="text-xs text-slate-400 sm:text-sm text-center">
          Kind words from product leaders and founders.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
        {visible.map((t) => (
          <motion.figure
            key={t.name}
            className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <blockquote className="mb-3 text-sm text-slate-200">“{t.quote}”</blockquote>
            <figcaption className="text-xs text-slate-300">
              <p className="font-semibold text-slate-50">{t.name}</p>
              <p className="text-[11px] text-slate-400">{t.role}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(-1)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-300 shadow-sm shadow-slate-900 hover:border-slate-500 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Previous testimonials"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => goTo(1)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-300 shadow-sm shadow-slate-900 hover:border-slate-500 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Next testimonials"
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default TestimonialsSection

