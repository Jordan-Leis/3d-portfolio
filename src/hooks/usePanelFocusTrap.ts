import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Traps Tab/Shift+Tab focus cycling within the returned ref's container while `active`
 * is true. Does NOT handle Escape — that remains owned by usePanelClose (Phase 3).
 * See 04-RESEARCH.md Pattern 2 + Pitfall 3.
 */
export function usePanelFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active || !containerRef.current) return

    const container = containerRef.current
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    )
    if (focusable.length === 0) return

    // Focus first element on open. Delay one frame so AnimatePresence entry
    // animation does not steal focus back.
    const focusTimer = window.setTimeout(() => {
      focusable[0]?.focus()
    }, 0)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [active])

  return containerRef
}
