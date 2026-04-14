// Phase 1 stub — lazy-loaded via React.lazy in App.tsx, which is what
// prevents the Three.js vendor chunk from downloading on mobile.
// Phase 2 replaces the body with <Canvas> and 3D content.
//
// This file CAN import 'three' and '@react-three/fiber' starting in Phase 2
// because it is only dynamically imported on desktop+WebGL clients.
export default function DesktopLayout() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-amber)',
        fontFamily: 'var(--font-mono)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>3D scene loads here (Phase 2)</p>
    </div>
  )
}
