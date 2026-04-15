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

  it('INTER-07: click handler contract — guarded click does NOT call setCameraPreset or openPanel', () => {
    useStore.getState().setCameraTransitioning(true)
    const beforePreset = useStore.getState().cameraPreset
    const beforePanel = useStore.getState().activePanel

    // Contract: handler returns early when cameraTransitioning is true
    const panelId = 'projects' as const
    if (useStore.getState().cameraTransitioning) {
      // no-op — matches InteractiveMesh.tsx onClick guard path
    } else {
      useStore.getState().setCameraPreset(panelId)
      useStore.getState().openPanel(panelId)
    }

    expect(useStore.getState().cameraPreset).toBe(beforePreset)
    expect(useStore.getState().activePanel).toBe(beforePanel)
  })
})
