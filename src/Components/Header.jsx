import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Testimonials" },
];

const Header = ({ handleNavClick, mobileOpen, setMobileOpen, setShowModal, profile }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <header className="sticky top-6 z-50 mx-auto w-full max-w-5xl px-4 sm:px-6">
      <nav className="relative flex items-center justify-between rounded-full border border-white/10 bg-[#020617]/60 px-6 py-3 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
        
        {/* Logo Section */}
        <button
          onClick={() => handleNavClick("hero")}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative">
            <img
              src="/myPP.png"
              alt="Zain UI Hassan, Full Stack Web Developer"
              loading="lazy"
              className="h-10 w-10 rounded-full border-2 border-indigo-500/50 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:border-indigo-400"
            />
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-sm group-hover:blur-md transition-all"></div>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-sm font-bold tracking-tighter text-white sm:text-base">
              ZAIN <span className="text-indigo-400">.</span>
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 z-0 rounded-full bg-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Magnetic>
            <button
              onClick={() => setShowModal(true)}
              className="group relative inline-flex items-center overflow-hidden rounded-full bg-white px-4 py-2 text-[10px] font-bold text-black transition-all hover:pr-8 hover:bg-slate-50 sm:px-6 sm:py-2.5 sm:text-sm shadow-[0_20px_50px_rgba(79,70,229,0.2)]"
            >
              <span className="relative z-10 transition-colors">Start a Project</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100 sm:right-3">
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black sm:h-4 sm:w-4"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </span>
              {/* Pulsing Glow */}
              <div className="absolute inset-0 -z-10 bg-indigo-500 opacity-0 blur-xl transition-opacity group-hover:opacity-40"></div>
            </button>
          </Magnetic>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;