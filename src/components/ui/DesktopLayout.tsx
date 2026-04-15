// DesktopLayout — Phase 2 Canvas host. This file is lazy-imported from
// src/App.tsx so Three.js lives in a separate chunk and never downloads
// on mobile. Safe to import 'three'/@react-three/* here.
//
// Leva renders its panel to a DOM portal; it is placed as a sibling of
// the Canvas and hidden in production builds.
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AdaptiveDpr } from '@react-three/drei'
import { Leva } from 'leva'
import CameraRig from '@/components/3d/CameraRig'
import Scene from '@/components/3d/Scene'

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
      {/* Leva panel — tree-shaken to hidden in production builds */}
      <Leva hidden={!import.meta.env.DEV} />
    </div>
  )
}
