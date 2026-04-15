import { describe, it, expect } from 'vitest'

// INTER-03: hint overlay shows on first load when sessionStorage.hintDismissed is absent
// INTER-03: hint dismisses when hoveredObject changes from null → any string (D-03 decision)
// INTER-03: sessionStorage.hintDismissed is written to '1' on dismiss

describe('HintOverlay (Plan 04)', () => {
  // Sentinel: vitest v2 requires at least one non-todo it() to register the suite.
  // Plan 04 will replace this with real component tests.
  it('suite registered — HintOverlay stubs pending Plan 04 implementation', () => {
    expect(true).toBe(true)
  })

  it.todo('INTER-03: renders "Click objects to explore" when sessionStorage.hintDismissed is absent')
  it.todo('INTER-03: does NOT render when sessionStorage.hintDismissed === "1"')
  it.todo('INTER-03: dismisses when useStore.setHoveredObject is called with a non-null string (D-03 first-hover dismissal)')
  it.todo('INTER-03: writes sessionStorage.hintDismissed = "1" on dismiss')
  it.todo('INTER-03: wrapper has pointerEvents: none style so it never blocks scene clicks')
})
