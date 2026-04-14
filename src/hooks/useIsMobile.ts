import { useState, useEffect } from 'react'

// 768px aligns with MOB-01 breakpoint. Media query is (max-width: 767px)
// so 768 itself is desktop — matches the common Tailwind/Bootstrap md boundary.
const MOBILE_BREAKPOINT = 768

/**
 * Mobile detection via `window.matchMedia` — fires only at breakpoint
 * crossings, not on every resize pixel. Not SSR-safe; this app is static.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    // Sync initial value in case window changed between render and effect
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMobile
}
