// Scene — root R3F scene for Phase 2. Composes lighting (SCENE-03),
// placeholder geometry (Phase 5 replaces), and a dev-only Leva panel
// that drives camera presets so we can manually verify CAMERA-02..04
// before the click-to-panel system ships in Phase 3.
//
// Lighting values, positions, and intensities are locked in 02-UI-SPEC.md.
import { Environment, BakeShadows } from '@react-three/drei'
import { useControls, button, Leva } from 'leva'
import { useStore } from '@/store/useStore'
import DeskScene from './DeskScene'

// Leva control component — rendered inside the R3F scene tree (returns null).
// React context propagates through R3F's Canvas renderer, so useControls()
// and useStore() both work here. The actual Leva panel DOM is portaled
// outside by Leva itself — no manual DOM placement needed.
// <Leva hidden={...}> is placed as a DOM sibling of Canvas in DesktopLayout.
function CameraDebugPanel() {
  const setCameraPreset = useStore((s) => s.setCameraPreset)
  useControls('Camera Debug', {
    Home:     button(() => setCameraPreset('home')),
    Projects: button(() => setCameraPreset('projects')),
    About:    button(() => setCameraPreset('about')),
    Contact:  button(() => setCameraPreset('contact')),
  })
  return null
}

function Lighting() {
  return (
    <>
      {/* Key — desk lamp, amber, physically based decay */}
      <pointLight
        color="#ffb347"
        intensity={2.0}
        position={[-1.5, 2.5, 0]}
        distance={8}
        decay={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Fill — barely-perceptible cool blue ambient */}
      <ambientLight color="#1a1a2e" intensity={0.15} />
      {/* Rim — cold blue from behind, no shadow */}
      <directionalLight
        color="#3a3aff"
        intensity={0.8}
        position={[2, 3, -4]}
        castShadow={false}
      />
      {/* HDRI ambient bounce — subtle, keyed lower than the pointlight */}
      <Environment
        preset="apartment"
        background={false}
        environmentIntensity={0.3}
      />
    </>
  )
}

export default function Scene() {
  return (
    <>
      <Lighting />
      <DeskScene />
      {/* BakeShadows AFTER geometry — drei bakes once from what is mounted */}
      <BakeShadows />
      {import.meta.env.DEV && <CameraDebugPanel />}
    </>
  )
}

// Exported so DesktopLayout can mount the Leva panel + hidden gate
// outside Canvas. Leva panels must not render inside <Canvas>.
export { CameraDebugPanel }

// Re-export Leva DOM component for convenience — DesktopLayout uses it
// to set the hidden flag based on import.meta.env.DEV.
export { Leva }
