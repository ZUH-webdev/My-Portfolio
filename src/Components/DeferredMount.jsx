import { useEffect, useRef, useState } from 'react'

/**
 * Renders children only after the sentinel enters (or nears) the viewport
 * so below-the-fold chunks are not fetched or executed during initial load.
 */
export default function DeferredMount({
  children,
  minHeight = '40vh',
  rootMargin = '0px 0px 320px 0px',
  threshold = 0,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [visible, rootMargin, threshold])

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : null}
    </div>
  )
}
