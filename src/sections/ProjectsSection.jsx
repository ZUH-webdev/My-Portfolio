import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Github } from 'lucide-react'

const projects = [
  {
    id: 'ecommerce-platform',
    name: 'E-Commerce Platform',
    tagline: 'Multi-scale online shopping solution with product catalog and checkout.',
    description:
      'A fully functional e-commerce platform featuring product listings, shopping cart management, user authentication, and secure payment integration. Built with responsive design for optimal mobile and desktop experiences.',
    tech: ['React', 'Tailwind CSS', 'Firebase', 'JavaScript'],
    role: 'Frontend development, responsive design, payment integration',
    link: 'https://multimarkets.netlify.app/',
    github: 'https://github.com/ZAIN1786-TECH/Multi-Markets',
  },
  {
    id: 'service-website',
    name: 'Service-Based Website',
    tagline: 'Professional service provider website with booking system.',
    description:
      'A comprehensive service platform with service listings, client reviews, booking management, and service provider dashboards. Designed for scalability and user-friendly navigation.',
    tech: ['React', 'Tailwind CSS', 'Firebase', 'REST APIs'],
    role: 'UI/UX implementation, frontend architecture',
    link: 'https://all-tools-app.netlify.app/',
    github: 'https://github.com/ZAIN1786-TECH/All-Tools-App',
  },
  {
    id: 'corporate-website',
    name: 'Corporate Website',
    tagline: 'Modern, responsive business website with portfolio showcase.',
    description:
      'Professional corporate website featuring company information, services showcase, team profiles, and contact forms. Optimized for performance and SEO best practices.',
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'CSS'],
    role: 'Full frontend development, responsive design',
    link: 'https://flutron.show',
    github: 'https://github.com/ZAIN1786-TECH/Flutron',
  },
]

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section
      id="projects"
      className="rounded-3xl border border-slate-800/80 bg-slate-950/70 px-5 py-8 sm:px-8 sm:py-10"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">Projects</h2>
          <p className="text-xs text-slate-400 sm:text-sm">
            Selected projects showcasing e-commerce, service-based platforms, and web applications.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.article
            key={project.id}
            className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-800/80 bg-linear-to-br from-slate-950/90 via-slate-950/60 to-slate-950/90 p-4 shadow-sm shadow-slate-900/80 transition hover:-translate-y-1 hover:border-indigo-400/60 hover:shadow-glow-indigo"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 * idx }}
            onClick={() => setActiveProject(project)}
            aria-label={`Open details for ${project.name}`}
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  SaaS product
                </p>
                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300">
                  Case study
                </span>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                {project.name}
              </h3>
              <p className="mb-3 text-xs text-slate-300">{project.tagline}</p>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-slate-200">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-700/80 bg-slate-900/70 px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-10 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="relative max-h-[80vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-800/80 bg-slate-950/95 p-5 shadow-2xl shadow-slate-950/90"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-300 shadow-sm shadow-slate-900 hover:border-slate-500 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Close project details"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <div className="space-y-4 pt-2">
                <header className="space-y-1">
                  <p
                    id="project-dialog-title"
                    className="text-xs uppercase tracking-wide text-slate-400"
                  >
                    Case study
                  </p>
                  <h3 className="text-lg font-semibold text-slate-50">
                    {activeProject.name}
                  </h3>
                  <p className="text-xs text-slate-300">{activeProject.tagline}</p>
                </header>

                <p className="text-sm text-slate-200">{activeProject.description}</p>

                <div className="space-y-2 text-xs text-slate-300">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Role
                  </p>
                  <p>{activeProject.role}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Tech stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 text-xs">
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-900 shadow-sm shadow-slate-900/30 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    Live preview
                  </a>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-950/80 px-3 py-1.5 text-[11px] font-semibold text-slate-100 hover:border-cyan-400/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <Github className="h-3 w-3" aria-hidden="true" />
                    View code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectsSection

