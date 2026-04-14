// Phase 1 stub — replaced in plan 02 (mobile gate + WebGL detection + lazy DesktopLayout).
// CRITICAL: keep this file free of Three.js and R3F imports.
// Those heavy imports belong inside DesktopLayout (lazy-loaded) so the vendor-three chunk
// never downloads on mobile / no-WebGL visitors. See 01-RESEARCH.md Pitfall 5.
export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-amber)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <p>Phase 1 scaffold — gate wired in plan 02.</p>
    </div>
  )
}
