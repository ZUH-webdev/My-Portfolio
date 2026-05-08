import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useRef } from "react";
import Magnetic from "../Components/Magnetic";

const projects = [
  {
    id: "utility-tools",
    name: "Pocket Tools - All-in-One",
    subtitle:
      "Comprehensive suite of 80+ professional online tools for developers.",
    description:
      "Architected a high-performance utility platform featuring over 80+ tools including color pickers, fake IBAN generators, and QR creators. Optimized for zero-latency client-side processing.",
    impact: [
      { metric: "80+", label: "Digital Tools" },
      { metric: "0ms", label: "Server Latency" },
      { metric: "2.5k+", label: "Daily DAU" },
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    role: "Product Architecture, Tool Implementation",
    image: "/Tools.webp",
    link: "https://10015.io",
    github: "https://github.com/ZUH-webdev/My-Pocket-Tools",
  },
  {
    id: "ecommerce-platform",
    name: "Multi-Markets E-Commerce",
    subtitle:
      "Scalable marketplace platform with real-time inventory & checkout optimization.",
    description:
      "Built a production-grade e-commerce platform handling high-volume transactions. Achieved 99.9% uptime and optimized checkout flow for 40% conversion rate improvement.",
    impact: [
      { metric: "99.9%", label: "Uptime" },
      { metric: "800ms", label: "LCP Score" },
      { metric: "+40%", label: "Conversion" },
    ],
    tech: ["React", "Tailwind CSS", "Firebase", "Stripe"],
    role: "Full-stack Frontend, Payment Integration",
    image: "/multimarkets.webp",
    link: "https://multimarkets.vercel.app/",
    github: "https://github.com/ZUH-webdev/Multimarkets",
    featured: true,
  },
  {
    id: "aises-platform",
    name: "AISES",
    subtitle:
      "Structural intelligence layer for professional writing & content analysis.",
    description:
      "AI-powered writing platform that provides structural intelligence for professional content. Features deep scene analysis, narrative flow optimization, and real-time writing assistance with advanced scene breakdown and beat identification.",
    impact: [
      { metric: "Scene", label: "Flow Analysis" },
      { metric: "Real-time", label: "Assistance" },
      { metric: "AI", label: "Powered" },
    ],
    tech: ["Html", "CSS", "AI/ML", "Real-time Processing"],
    role: "Frontend Development, UI/UX Integration",
    image: "/aises-ny.png",
    link: "https://aises-ny.vercel.app/",
    github: "https://github.com/ZUH-webdev/Aises-NewYork-",

    featured: true,
  },

  {
    id: "corporate-website",
    name: "Flutron Corporate Hub",
    subtitle:
      "High-performance corporate site optimized for lead generation & SEO.",
    description:
      "Premium corporate website with advanced SEO optimization, resulting in 3x organic traffic increase. Built for conversion with automated lead capture and seamless CMS integration.",
    impact: [
      { metric: "+300%", label: "Organic Traffic" },
      { metric: "100", label: "Lighthouse Score" },
      { metric: "99.9%", label: "SEO Visibility" },
    ],
    tech: ["React", "Tailwind CSS", "Next.js", "SEO"],
    role: "Performance Optimization, SEO Implementation",
    image: "/Flutron.webp",
    link: "https://flutron.show",
    github: "https://github.com/ZUH-webdev/Flutron.show",
  },
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Alternating Layout Grid */}
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Image/Mockup - Changes position based on index */}
        <motion.div
          className={`relative order-2 ${isEven ? "lg:order-1" : "lg:order-2"}`}
          style={{ y, opacity }}
        >
          <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] p-1 shadow-2xl shadow-indigo-500/10">
            {/* Hover Glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 -z-10" />

            {/* Browser Frame */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-1">
              <div className="bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-700 relative aspect-video">
                <img
                  src={project.image}
                  alt={`${project.name} - ${project.subtitle} | Full Stack Development Project`}
                  className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-105"
                  loading="eager"
                />

                {/* Premium Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content - Changes position based on index */}
        <motion.div
          className={`order-1 ${isEven ? "lg:order-2" : "lg:order-1"}`}
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            {/* Featured Badge */}
            {project.featured && (
              <motion.span
                className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 border border-emerald-400/30 text-xs font-mono text-emerald-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                Featured Project
              </motion.span>
            )}

            {/* Title */}
            <div className="space-y-3">
              <h3 className="text-5xl sm:text-6xl font-geist font-black tracking-tight-extreme leading-[1.1] text-white">
                {project.name}
              </h3>
              <p className="text-lg text-slate-400 font-light leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="flex flex-wrap gap-8 py-6 border-y border-white/10">
              {project.impact.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-3xl font-geist font-black text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
                    {item.metric}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{item.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <p className="text-base text-slate-400 leading-relaxed font-light">
              {project.description}
            </p>

            {/* Tech Stack - Hover to Reveal */}
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
                Tech & Architecture
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-slate-300 hover:border-white/20 hover:bg-white/10 transition-all font-mono"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Magnetic pullBase={0.25}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
                >
                  <span>View Live Site</span>
                  <ExternalLink
                    size={16}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                </a>
              </Magnetic>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all duration-300"
                >
                  <Github size={16} />
                  <span className="font-medium">Repository</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      {index < projects.length - 1 && (
        <div className="mt-24 pt-24 border-t border-white/5" />
      )}
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative rounded-3xl border border-white/5 bg-[#020617]/50 px-6 pt-32 pb-20 shadow-[0_0_80px_rgba(15,23,42,0.9)] sm:px-12 lg:px-20 lg:py-32 backdrop-blur-3xl overflow-hidden"
    >
      {/* Ambient Lighting */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/3 h-80 w-80 rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      {/* Film Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[99] opacity-[0.03] mix-blend-overlay rounded-3xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Header */}
      <motion.div
        className="mb-32 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
          Featured Work
        </p>
        <h2 className="text-5xl sm:text-6xl font-geist font-black tracking-tight-extreme leading-[1.1] text-white mb-6">
          Case Studies in Impact
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-400 font-light">
          Every project demonstrates technical excellence meeting business
          objectives. These case studies showcase measurable impact and
          production-grade solutions.
        </p>
      </motion.div>

      {/* Projects */}
      <div className="relative z-20">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
