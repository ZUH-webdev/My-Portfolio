/**
 * Lightweight “magnetic” affordance without Framer — GPU-friendly scale on hover.
 * Call sites may pass `pullBase`; it is ignored (API compatibility with older Framer API).
 */
const Magnetic = ({ children, className = '' }) => (
  <div
    className={`inline-block origin-center transition-transform duration-200 ease-out will-change-transform [transform:translateZ(0)] hover:scale-[1.03] active:scale-[0.97] motion-reduce:transform-none motion-reduce:hover:scale-100 ${className}`}
  >
    {children}
  </div>
)

export default Magnetic
