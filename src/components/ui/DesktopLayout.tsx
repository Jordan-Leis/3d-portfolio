// DesktopLayout — Phase 2 Canvas host. This file is lazy-imported from
// src/App.tsx so Three.js lives in a separate chunk and never downloads
// on mobile. It is safe to import from 'three', '@react-three/fiber',
// and '@react-three/drei' here — that's the entire point of the lazy split.
//
// In Wave 1 this Canvas hosts only the CameraRig (camera pipeline proof).
// Wave 2 drops <Scene /> inside the Suspense boundary to render lights
// and placeholder desk geometry.
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AdaptiveDpr } from '@react-three/drei'
import CameraRig from '@/components/3d/CameraRig'

export default function DesktopLayout() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--color-bg)',
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        // frameloop="always" is REQUIRED — GSAP mutates camera refs outside
        // React's awareness. 'demand' would freeze the view during tweens.
        frameloop="always"
        // Initial camera position matches the 'home' preset so the first
        // frame (before any CameraRig useEffect fires) is already correct.
        camera={{ fov: 50, near: 0.1, far: 100, position: [0, 3, 7] }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Wave 2 inserts <Scene /> here. */}
          <CameraRig />
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  )
}
