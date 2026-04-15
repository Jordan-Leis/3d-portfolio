import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import ProjectsPanel from './panels/ProjectsPanel'
import AboutPanel from './panels/AboutPanel'
import ContactPanel from './panels/ContactPanel'
import { usePanelClose } from '@/hooks/usePanelClose'

/**
 * Owns:
 *   1. Escape-key dismissal via usePanelClose() (VIS-03)
 *   2. Full-screen backdrop under the panel — click dismisses (VIS-03)
 *   3. AnimatePresence for panel entry/exit animations (VIS-02)
 *
 * Note: pointer-events toggling on the CANVAS WRAPPER is NOT handled here —
 * DesktopLayout owns that (VIS-04, Plan 04). PanelLayer is purely the panel
 * DOM subtree.
 */
export default function PanelLayer() {
  const activePanel = useStore((s) => s.activePanel)
  usePanelClose()

  const handleBackdropClick = () => {
    // Imperative store access — same pattern as InteractiveMesh onClick
    useStore.getState().closePanel()
    useStore.getState().setCameraPreset('home')
  }

  return (
    <>
      {/* Backdrop — dims the 3D scene when a panel is open (zIndex 10) */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 10,
            }}
            onClick={handleBackdropClick}
          />
        )}
      </AnimatePresence>

      {/* Panel shells — mode='wait' prevents two panels visible simultaneously */}
      <AnimatePresence mode="wait">
        {activePanel === 'projects' && <ProjectsPanel key="projects" />}
        {activePanel === 'about'    && <AboutPanel    key="about"    />}
        {activePanel === 'contact'  && <ContactPanel  key="contact"  />}
      </AnimatePresence>
    </>
  )
}
