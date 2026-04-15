import { describe, it, expect } from 'vitest'

// INTER-01: emissive intensity rises on pointer-over, resets on pointer-out
// INTER-02: document.body.style.cursor toggles between 'pointer' and 'default'
// INTER-07: onClick guard reads useStore.getState().cameraTransitioning and returns early when true

describe('InteractiveMesh (Plan 02)', () => {
  // Sentinel: vitest v2 requires at least one non-todo it() to register the suite.
  // Plan 02 will replace this with real component tests.
  it('suite registered — InteractiveMesh stubs pending Plan 02 implementation', () => {
    expect(true).toBe(true)
  })

  it.todo('INTER-01: onPointerOver sets materialRef.emissiveIntensity to 1.2 and onPointerOut resets it to idle value')
  it.todo('INTER-01: emissive mutation happens via ref mutation, not via React state (no re-render triggered)')
  it.todo('INTER-02: onPointerOver sets document.body.style.cursor = "pointer"')
  it.todo('INTER-02: onPointerOut sets document.body.style.cursor = "default"')
  it.todo('INTER-02: unmount cleanup resets document.body.style.cursor = "default"')
  it.todo('INTER-07: onClick is a no-op when useStore.getState().cameraTransitioning === true')
  it.todo('INTER-07: onClick calls setCameraPreset(panelId) + openPanel(panelId) when cameraTransitioning === false')
})
