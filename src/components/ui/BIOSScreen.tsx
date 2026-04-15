import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// D-02: BIOS must display for at least 2000ms so fast/cached loads still
// show the boot sequence as an intentional experience (not a flash).
const BIOS_MIN_MS = 2000
// UI-SPEC: small dismiss delay after load completes so the user can read
// the final BIOS line.
const BIOS_DISMISS_DELAY_MS = 400

// UI-SPEC §Copywriting Contract: exact 5 messages in order.
const FAKE_MESSAGES = [
  'BIOS v2.08 (C)1993 Jordan Systems Inc.',
  'Detecting memory... 640K OK',
  'Detecting 3D coprocessor... FOUND',
  'Initializing portfolio subsystems...',
  'Loading scene assets...',
] as const

export default function BIOSScreen() {
  const { active, progress } = useProgress()
  const [mountTime] = useState(() => Date.now())
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Pitfall 4 (03-RESEARCH.md): Phase 3 has no async assets, so
    // useProgress may return {active:false, progress:0} from the start.
    // Treat BOTH "fully loaded (100%)" AND "nothing to load (0% & !active)"
    // as "done loading" so the BIOS actually dismisses in Phase 3.
    const done = !active && (progress === 100 || progress === 0)
    if (!done) return

    const elapsed = Date.now() - mountTime
    const remaining = Math.max(BIOS_MIN_MS - elapsed, 0)
    const t = setTimeout(() => setVisible(false), remaining + BIOS_DISMISS_DELAY_MS)
    return () => clearTimeout(t)
  }, [active, progress, mountTime])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="bios"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '10vh 10vw',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-amber)',
            fontSize: 14,
          }}
        >
          {FAKE_MESSAGES.map((msg, i) => {
            const threshold = (i / FAKE_MESSAGES.length) * 100
            const opacity = progress > threshold || i === 0 ? 1 : 0.2
            return (
              <div key={i} style={{ marginBottom: 8, opacity }}>
                {msg}
              </div>
            )
          })}

          <div style={{ marginTop: 32, width: '100%', maxWidth: 400 }}>
            <div style={{ marginBottom: 6 }}>
              Loading: {Math.round(progress)}%
            </div>
            <div style={{ height: 4, background: '#1a1a1a', width: '100%' }}>
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'var(--color-amber)',
                  transition: 'width 0.15s linear',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
