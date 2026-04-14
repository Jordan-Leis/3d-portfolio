// App-level gate — the ONLY place that decides whether to mount Three.js.
//
// Two independent conditions force the 2D path:
//   1. window width < 768px (INFRA-03 / MOB-01) — useIsMobile returns true
//   2. WebGL unavailable (INFRA-04) — isWebGLAvailable returns false
//
// DesktopLayout is imported via React.lazy so its chunk (and transitively
// three.js + R3F + drei) is NEVER requested when show3D is false. This is
// the structural guarantee behind INFRA-03, INFRA-04, and MOB-04.
//
// CRITICAL: Do NOT add static imports from three.js, react-three/fiber, or
// react-three/drei to this file. Any such import puts Three.js in the initial
// bundle and defeats the gate.
import { lazy, Suspense } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { isWebGLAvailable } from '@/hooks/useWebGL'
import MobileLayout from '@/components/mobile/MobileLayout'

// Dynamic import — Vite creates a separate chunk for DesktopLayout and
// everything it imports. The chunk is only fetched when React renders
// <DesktopLayout /> for the first time (i.e., only on desktop + WebGL).
const DesktopLayout = lazy(() => import('@/components/ui/DesktopLayout'))

// WebGL availability does not change during a session, so compute once
// at module load rather than on every render. Placing this at module
// scope (not inside App) also prevents a flicker between Mobile and
// Desktop on first render.
const webglAvailable = isWebGLAvailable()

export default function App() {
  const isMobile = useIsMobile()
  const show3D = !isMobile && webglAvailable

  if (!show3D) {
    return <MobileLayout />
  }

  return (
    <Suspense
      fallback={
        <div
          style={{
            background: 'var(--color-bg)',
            color: 'var(--color-amber)',
            fontFamily: 'var(--font-mono)',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading&hellip;
        </div>
      }
    >
      <DesktopLayout />
    </Suspense>
  )
}
