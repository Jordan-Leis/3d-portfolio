// DesktopLayout — Phase 2 Canvas host extended in Phase 3 with BIOSScreen,
// PanelLayer, and HintOverlay siblings + VIS-04 pointer-events toggle.
//
// Architecture:
//   outer div (position: relative)
//     ├── canvas wrapper div (pointer-events toggle — VIS-04)
//     │     └── Canvas (Scene, CameraRig, AdaptiveDpr)
//     ├── BIOSScreen                (zIndex 100 — DIFF-01)
//     ├── PanelLayer                (backdrop zIndex 10 + panel zIndex 20)
//     ├── HintOverlay               (zIndex 5, pointer-events none)
//     └── Leva (DOM portal — dev only)
//
// DesktopLayout is the lazy chunk root (CLAUDE.md Rule 4) — all Three.js
// and framer-motion imports live here or below.
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AdaptiveDpr } from '@react-three/drei'
import { Leva } from 'leva'
import CameraRig from '@/components/3d/CameraRig'
import Scene from '@/components/3d/Scene'
import BIOSScreen from '@/components/ui/BIOSScreen'
import PanelLayer from '@/components/ui/PanelLayer'
import HintOverlay from '@/components/ui/HintOverlay'
import SceneErrorBoundary from '@/components/ui/SceneErrorBoundary'
import { useStore } from '@/store/useStore'

export default function DesktopLayout() {
  const activePanel = useStore((s) => s.activePanel)

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--color-bg)',
        position: 'relative',
      }}
    >
      {/* SceneErrorBoundary — catches GLB load failures (T-05-03-02) and renders
          the locked fallback copy instead of an infinite BIOSScreen spinner.
          Sits OUTSIDE the Canvas so its fallback <div> renders as plain DOM.
          DOM overlays (BIOSScreen, PanelLayer, HintOverlay) are siblings outside
          the boundary so they remain mounted on 3D load failure. */}
      <SceneErrorBoundary>
        {/* Canvas wrapper — VIS-04: pointer-events cascade to the inner <canvas>
            element so R3F stops intercepting clicks while a panel is open. Applied
            to the wrapper, NOT the Canvas component. */}
        <div
          data-testid="canvas-wrapper"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: activePanel ? 'none' : 'auto',
          }}
        >
          <Canvas
            shadows
            dpr={[1, 2]}
            frameloop="always"
            camera={{ fov: 50, near: 0.1, far: 100, position: [0, 3, 7] }}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <Scene />
              <CameraRig />
              <AdaptiveDpr pixelated />
            </Suspense>
          </Canvas>
        </div>
      </SceneErrorBoundary>

      {/* DOM overlays — siblings of the Canvas wrapper, stacked by zIndex */}
      <BIOSScreen />
      <PanelLayer />
      <HintOverlay />

      {/* Leva panel — unchanged from Phase 2, tree-shaken in prod */}
      <Leva hidden={!import.meta.env.DEV} />
    </div>
  )
}
