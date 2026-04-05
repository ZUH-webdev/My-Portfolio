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
  /** Stable anchor for in-page nav; must exist before lazy children mount */
  id,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    let observer
    let cancelled = false

    const arm = () => {
      if (cancelled || !el) return
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setVisible(true)
            observer.disconnect()
          }
        },
        { rootMargin, threshold }
      )
      observer.observe(el)
    }

    const idle = window.requestIdleCallback
    const id = idle ? idle(arm, { timeout: 2000 }) : null
    const t = id == null ? setTimeout(arm, 0) : null

    return () => {
      cancelled = true
      if (id != null) window.cancelIdleCallback?.(id)
      if (t != null) clearTimeout(t)
      observer?.disconnect()
    }
  }, [visible, rootMargin, threshold])

  return (
    <div ref={ref} id={id} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : null}
    </div>
  )
}
