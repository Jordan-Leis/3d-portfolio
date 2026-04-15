import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

export default function ContactPanel() {
  const closePanel = useStore((s) => s.closePanel)
  const setCameraPreset = useStore((s) => s.setCameraPreset)

  // CAMERA-03: every close path returns the camera to the home preset
  const handleClose = () => {
    closePanel()
    setCameraPreset('home')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: '10vh',
        left: '5vw',
        width: 'min(480px, 90vw)',
        maxHeight: '80vh',
        overflowY: 'auto',
        background: 'rgba(10,10,10,0.95)',
        border: '1px solid var(--color-amber)',
        color: 'var(--color-amber)',
        fontFamily: 'var(--font-mono)',
        padding: '24px',
        zIndex: 20,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: 12,
          right: 16,
          background: 'none',
          border: 'none',
          color: 'var(--color-amber)',
          fontSize: 20,
          cursor: 'pointer',
        }}
        aria-label="Close panel"
      >
        ×
      </button>
      <h2 style={{ margin: 0, marginBottom: 16, fontSize: 20 }}>CONTACT</h2>
      <p style={{ opacity: 0.5 }}>[Contact content — Phase 4]</p>
    </motion.div>
  )
}
