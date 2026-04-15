import { useEffect } from 'react'
import { useStore } from '@/store/useStore'

/**
 * Attaches a window `keydown` listener while any panel is open.
 * Escape calls closePanel() AND setCameraPreset('home') per CAMERA-03.
 * The listener only lives while activePanel !== null — when the panel
 * closes, the effect's cleanup removes the listener so we never leak
 * globals.
 */
export function usePanelClose(): void {
  const closePanel = useStore((s) => s.closePanel)
  const setCameraPreset = useStore((s) => s.setCameraPreset)
  const activePanel = useStore((s) => s.activePanel)

  useEffect(() => {
    if (!activePanel) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePanel()
        setCameraPreset('home')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePanel, closePanel, setCameraPreset])
}
