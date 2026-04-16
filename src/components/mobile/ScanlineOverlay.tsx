// MOB-03 — CRT scanline overlay for mobile 2D page.
// Per 04-UI-SPEC.md: position: fixed, inset: 0, pointer-events: none, z-index: 1.
// 4px repeat period (2px transparent + 2px stripe) at 15% black opacity.
// aria-hidden because it is purely decorative.
export default function ScanlineOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 4px)',
      }}
    />
  )
}
