import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

const HINT_KEY = 'hintDismissed'

export default function HintOverlay() {
  // Lazy initializer — read sessionStorage once at mount
  const [visible, setVisible] = useState<boolean>(
    () => !sessionStorage.getItem(HINT_KEY),
  )
  const hoveredObject = useStore((s) => s.hoveredObject)

  // D-03: first hover (hoveredObject null → non-null) dismisses the hint.
  useEffect(() => {
    if (hoveredObject && visible) {
      sessionStorage.setItem(HINT_KEY, '1')
      setVisible(false)
    }
  }, [hoveredObject, visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          style={{
            position: 'fixed',
            bottom: '8vh',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-amber)',
            fontSize: 14,
            opacity: 0.7,
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          Click objects to explore
        </motion.div>
      )}
    </AnimatePresence>
  )
}
