import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '@/store/useStore'

// INTER-07 guard: useStore.getState().cameraTransitioning is the authoritative
// read for the click handler (avoids React batching lag per 03-RESEARCH.md Pitfall 2).

describe('useStore cameraTransitioning guard (Plan 02)', () => {
  beforeEach(() => {
    // Reset store between tests
    useStore.setState({
      activePanel: null,
      cameraPreset: 'home',
      cameraTransitioning: false,
      hoveredObject: null,
    })
  })

  it('useStore.getState().cameraTransitioning returns false initially', () => {
    expect(useStore.getState().cameraTransitioning).toBe(false)
  })

  it('useStore.getState() reflects setCameraTransitioning(true) synchronously', () => {
    useStore.getState().setCameraTransitioning(true)
    expect(useStore.getState().cameraTransitioning).toBe(true)
  })

  // Intentional placeholder — Plan 02 makes this pass by implementing the guard path
  it.todo('INTER-07: click handler contract — guarded click does NOT call setCameraPreset or openPanel')
})
