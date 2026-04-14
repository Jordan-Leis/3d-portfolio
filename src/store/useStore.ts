import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// ---- Types ----
// PanelId is the set of 2D content panels that open when desk objects
// are clicked. cameraPreset includes 'home' (the default resting view)
// plus the three panel destinations.
export type PanelId = 'about' | 'projects' | 'contact'
export type CameraPreset = 'home' | 'projects' | 'about' | 'contact'

interface PortfolioStore {
  // Panel state
  activePanel: PanelId | null
  openPanel: (id: PanelId) => void
  closePanel: () => void

  // Camera state
  cameraPreset: CameraPreset
  setCameraPreset: (preset: CameraPreset) => void
  cameraTransitioning: boolean
  setCameraTransitioning: (v: boolean) => void

  // Interaction state
  hoveredObject: string | null
  setHoveredObject: (id: string | null) => void
}

// Zustand v5: use create<T>()() — curried for TypeScript inference.
// devtools middleware exposes the store in the Redux DevTools browser
// extension so INFRA-02 is verifiable in React DevTools.
// Store name 'PortfolioStore' is what shows up in the DevTools panel.
export const useStore = create<PortfolioStore>()(
  devtools(
    (set) => ({
      // Panel — null means no panel open, scene is in resting state
      activePanel: null,
      openPanel: (id) => set({ activePanel: id }, false, 'openPanel'),
      closePanel: () => set({ activePanel: null }, false, 'closePanel'),

      // Camera — 'home' is the cinematic resting preset
      cameraPreset: 'home',
      setCameraPreset: (preset) =>
        set({ cameraPreset: preset }, false, 'setCameraPreset'),
      cameraTransitioning: false,
      setCameraTransitioning: (v) =>
        set({ cameraTransitioning: v }, false, 'setCameraTransitioning'),

      // Interaction — string id of currently hovered interactive object
      hoveredObject: null,
      setHoveredObject: (id) =>
        set({ hoveredObject: id }, false, 'setHoveredObject'),
    }),
    { name: 'PortfolioStore' },
  ),
)
