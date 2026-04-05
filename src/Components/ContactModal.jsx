import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Magnetic from './Magnetic'

export default function ContactModal({ open, onClose }) {
  const [modalStatus, setModalStatus] = useState('idle')
  const [focusedField, setFocusedField] = useState(null)

  const handleModalSubmit = async (event) => {
    event.preventDefault()
    if (modalStatus === 'sending') return
    setModalStatus('sending')

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

      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(serviceId, templateId, payload, publicKey)
      setModalStatus('success')
      form.reset()
      setTimeout(() => {
        setModalStatus('idle')
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Failed to send contact message', err)
      setModalStatus('idle')
    }
  }

  return (
    <AnimatePresence>
      {open && (
      <motion.div
        key="contact-modal"
        className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(79, 70, 229, 0.15), transparent 70%)',
          }}
        />

        <motion.div
          className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#020617]/95 p-5 sm:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-[40px] overflow-hidden"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 bg-linear-to-br from-white/10 via-transparent to-transparent" />

          <button
            type="button"
            className="absolute right-4 top-4 z-100 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={1.5} className="sm:w-4 sm:h-4" />
          </button>

          <div className="relative z-10 mb-6 sm:mb-8">
            <h2 className="mb-0.5 font-geist font-black text-2xl tracking-tighter text-white sm:text-3xl">
              Start a Project
            </h2>
            <p className="font-geist text-xs text-slate-400 sm:text-sm">
              Tell me about your vision.
            </p>
          </div>

          <form onSubmit={handleModalSubmit} className="relative z-10 space-y-4 sm:space-y-6 group">
            <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-indigo-500/20 to-purple-500/10 opacity-0 blur-2xl pointer-events-none transition-opacity duration-500 group-focus-within:opacity-100" />

            <div className="group/field relative">
              <motion.div
                className="absolute -inset-x-4 -inset-y-3 rounded-lg bg-indigo-500/0 blur-lg pointer-events-none"
                animate={{
                  backgroundColor:
                    focusedField === 'name'
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(99, 102, 241, 0)',
                }}
                transition={{ duration: 0.3 }}
              />
              <label
                htmlFor="modal-name"
                className="mb-1 block font-geist-mono text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-[9px]"
              >
                NAME
              </label>
              <div className="relative">
                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your identity"
                  className="peer relative w-full bg-transparent py-1.5 font-geist text-sm text-white placeholder-slate-800 outline-none transition-all sm:py-2 sm:text-base focus:border-indigo-500"
                />
                <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
                {focusedField === 'name' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                    layoutId="modal-underline"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </div>

            <div className="group/field relative">
              <motion.div
                className="absolute -inset-x-4 -inset-y-3 rounded-lg bg-indigo-500/0 blur-lg pointer-events-none"
                animate={{
                  backgroundColor:
                    focusedField === 'email'
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(99, 102, 241, 0)',
                }}
                transition={{ duration: 0.3 }}
              />
              <label
                htmlFor="modal-email"
                className="mb-1 block font-geist-mono text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-[9px]"
              >
                EMAIL
              </label>
              <div className="relative">
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="hello@world.com"
                  className="peer relative w-full bg-transparent py-1.5 font-geist text-sm text-white placeholder-slate-800 outline-none transition-all sm:py-2 sm:text-base focus:border-indigo-500"
                />
                <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
                {focusedField === 'email' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                    layoutId="modal-underline"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </div>

            <div className="group/field relative">
              <motion.div
                className="absolute -inset-x-4 -inset-y-3 rounded-lg bg-purple-500/0 blur-lg pointer-events-none"
                animate={{
                  backgroundColor:
                    focusedField === 'message'
                      ? 'rgba(168, 85, 247, 0.1)'
                      : 'rgba(168, 85, 247, 0)',
                }}
                transition={{ duration: 0.3 }}
              />
              <label
                htmlFor="modal-message"
                className="mb-1 block font-geist-mono text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-[9px]"
              >
                PROJECT SPECS
              </label>
              <div className="relative">
                <textarea
                  id="modal-message"
                  name="message"
                  required
                  rows={2}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Requirements..."
                  className="peer relative w-full resize-none bg-transparent py-1.5 font-geist text-sm text-white placeholder-slate-800 outline-none transition-all sm:py-2 sm:text-base focus:border-purple-500"
                />
                <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
                {focusedField === 'message' && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-purple-500 to-indigo-500 rounded-full"
                    layoutId="modal-underline"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </div>

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
  )
}
