// Phase 1 stub — full 2D content arrives in Phase 4.
// CRITICAL: zero imports from three.js, react-three/fiber, or react-three/drei.
// This file is in the eagerly-loaded bundle; any three/r3f import here breaks MOB-04
// (Three.js absent from mobile waterfall) before Phase 4 even starts.
export default function MobileLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-amber)',
        fontFamily: 'var(--font-mono)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: 640 }}>
        <h1 style={{ marginTop: 0 }}>Jordan&apos;s Portfolio</h1>
        <p>
          Mobile / no-WebGL layout. Full content (About, Projects, Contact)
          ships in Phase 4.
        </p>
      </div>
    </div>
  )
}
