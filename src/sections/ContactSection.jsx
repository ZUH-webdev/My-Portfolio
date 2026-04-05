import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, MapPin, ArrowRight } from 'lucide-react'

const ContactSection = () => {
  const [status, setStatus] = useState('idle') // idle | sending | success
  const [focusedField, setFocusedField] = useState(null)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 })
  const magneticX = useTransform(springX, [-1, 1], [-8, 8])
  const magneticY = useTransform(springY, [-1, 1], [-8, 8])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1
    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        'EmailJS not configured. Update .env with:\n' +
        'VITE_EMAILJS_SERVICE_ID = your service id\n' +
        'VITE_EMAILJS_TEMPLATE_ID = your template id\n' +
        'VITE_EMAILJS_PUBLIC_KEY = your public key\n' +
        'See https://www.emailjs.com/'
      )
      alert('Email service not configured. Check browser console for setup instructions.')
      setStatus('idle')
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

      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(serviceId, templateId, payload, publicKey)
      setStatus('success')
      form.reset()
      setFocusedField(null)
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      console.error('Failed to send contact message', err)
      setStatus('idle')
    }
  }

  return (
    <section
      id="contact"
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
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-violet-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Glow behind Send Button */}
      <motion.div
        className="absolute right-12 top-1/2 w-64 h-64 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Watermark CONNECT */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div aria-hidden="true" className="absolute top-1/2 right-0 transform -translate-y-1/2 text-[400px] font-geist font-black text-white/[0.02] leading-[0.8] whitespace-nowrap">
          CONNECT
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
            Get Started
          </p>
          <h2 className="text-5xl sm:text-6xl font-geist font-black tracking-tight-extreme leading-[1.1] text-white mb-6">
            Let's build the next big thing
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400 font-light">
            Ready to transform your vision into production-grade SaaS? Let's discuss your project scope and timeline.
          </p>
        </motion.div>

        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Direct Contact Info */}
          <motion.div
            className="flex flex-col justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Direct Line */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
                  Direct Line
                </p>

                {/* Email Card */}
                <motion.div
                  className="mb-6 group cursor-pointer relative"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/20 to-indigo-500/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -z-10" />
                  <a
                    href="mailto:zainulhassan5857@gmail.com"
                    className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 backdrop-blur-xl transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex-shrink-0">
                      <Mail className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">
                        Email
                      </p>
                      <p className="text-sm font-geist font-black text-white break-all hover:text-indigo-300 transition">
                        zainulhassan5857@gmail.com
                      </p>
                    </div>
                  </a>
                </motion.div>

                {/* Location Card */}
                <motion.div
                  className="group cursor-pointer relative"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover Glow */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/20 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -z-10" />
                  <div className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 backdrop-blur-xl transition-all duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 border border-purple-500/40 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">
                        Location
                      </p>
                      <p className="text-sm font-geist font-black text-white">
                        Remote · GMT+5
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Typical Engagement Card - Premium SLA Style */}
              <motion.div
                className="mt-12 p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 mb-3">
                  ✓ Typical Engagement
                </p>
                <p className="text-sm leading-relaxed text-slate-200 font-light">
                  Design + build of core SaaS UI. Discovery through production-ready deployment. Technical excellence guaranteed.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Form Ambient Glow - Background */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 opacity-0 blur-2xl pointer-events-none transition-opacity duration-500 group-focus-within:opacity-100" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none" />
            
            <form
              onSubmit={handleSubmit}
              className="relative space-y-8 group"
              aria-describedby="contact-status"
            >
              {/* Name Field */}
              <div className="relative group/field">
                {/* Focus Glow */}
                <motion.div
                  className="absolute -inset-x-4 -inset-y-3 rounded-lg bg-indigo-500/0 blur-lg pointer-events-none"
                  animate={{
                    backgroundColor: focusedField === 'name' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0)',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="relative w-full bg-transparent border-b border-white/10 py-4 px-2 text-base text-white placeholder-transparent outline-none transition-all focus:border-indigo-500 focus:pl-3"
                  placeholder="Your name"
                />
                <label
                  htmlFor="name"
                  className="pointer-events-none absolute left-2 top-4 text-sm text-slate-400 transition-all duration-300 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-indigo-300"
                >
                  Your name
                </label>
                {/* Active Glow */}
                {focusedField === 'name' && (
                  <motion.div
                    className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    layoutId="underline"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Email Field */}
              <div className="relative group/field">
                {/* Focus Glow */}
                <motion.div
                  className="absolute -inset-x-4 -inset-y-3 rounded-lg bg-indigo-500/0 blur-lg pointer-events-none"
                  animate={{
                    backgroundColor: focusedField === 'email' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0)',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="relative w-full bg-transparent border-b border-white/10 py-4 px-2 text-base text-white placeholder-transparent outline-none transition-all focus:border-indigo-500 focus:pl-3"
                  placeholder="Work email"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute left-2 top-4 text-sm text-slate-400 transition-all duration-300 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-indigo-300"
                >
                  Work email
                </label>
                {/* Active Glow */}
                {focusedField === 'email' && (
                  <motion.div
                    className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    layoutId="underline"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Message Field */}
              <div className="relative group/field">
                {/* Focus Glow */}
                <motion.div
                  className="absolute -inset-x-4 -inset-y-3 rounded-lg bg-purple-500/0 blur-lg pointer-events-none"
                  animate={{
                    backgroundColor: focusedField === 'message' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0)',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="relative w-full bg-transparent border-b border-white/10 py-4 px-2 text-base text-white placeholder-transparent outline-none transition-all focus:border-indigo-500 focus:pl-3 resize-none"
                  placeholder="Tell me about your vision"
                />
                <label
                  htmlFor="message"
                  className="pointer-events-none absolute left-2 top-4 text-sm text-slate-400 transition-all duration-300 group-focus-within:top-0 group-focus-within:text-xs group-focus-within:text-indigo-300"
                >
                  Tell me about your vision
                </label>
                {/* Active Glow */}
                {focusedField === 'message' && (
                  <motion.div
                    className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                    layoutId="underline"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Submit Button with Magnetic Effect */}
              <div className="pt-4 flex items-center gap-4">
                <motion.button
                  ref={buttonRef}
                  type="submit"
                  disabled={status === 'sending'}
                  className="relative group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-slate-950 font-geist font-black text-sm transition-all disabled:opacity-70"
                  style={{ x: magneticX, y: magneticY }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glow background */}
                  <motion.div
                    className="absolute -inset-px rounded-full bg-gradient-to-r from-indigo-500/40 to-violet-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"
                    initial={false}
                  />
                  
                  {status === 'sending' ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending…
                    </>
                  ) : status === 'success' ? (
                    <>✓ Message sent</>
                  ) : (
                    <>
                      Send Message
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </>
                  )}
                </motion.button>

                <div
                  id="contact-status"
                  className="text-xs text-slate-400"
                  aria-live="polite"
                >
                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-emerald-300"
                      >
                        I'll be in touch shortly.
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

