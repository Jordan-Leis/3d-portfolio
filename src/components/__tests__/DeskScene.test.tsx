import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useStore } from '@/store/useStore'

// Mock InteractiveMesh — same pattern as SceneObjects.test.tsx — so we can render
// DeskScene outside a Canvas and inspect the panelId/name props on each interactive
// mesh wrapper.
vi.mock('@/components/3d/InteractiveMesh', () => ({
  default: (props: { panelId: string; name: string }) => (
    <div data-testid={`interactive-${props.name}`} data-panel-id={props.panelId} />
  ),
}))

// Mock useGLTF so the test never touches WebGL or the file system.
// The mock node names below are PLACEHOLDERS — Plan 03 updates these to match the
// gltfjsx-generated names from the actual GLB. Test assertions below depend ONLY on
// the testid output of the InteractiveMesh mock, NOT on these node names.
vi.mock('@react-three/drei', () => {
  const useGLTF = Object.assign(
    () => ({
      nodes: {
        Monitor_Screen: { geometry: {} },
        Monitor_Body: { geometry: {} },
        Papers: { geometry: {} },
        Phone: { geometry: {} },
        Lamp: { geometry: {} },
        Desk_Surface: { geometry: {} },
        Scene_Floor: { geometry: {} },
      },
      materials: {},
    }),
    { setDecoderPath: vi.fn(), preload: vi.fn() }
  )
  return { useGLTF }
})

import DeskScene from '@/components/3d/DeskScene'

describe('DeskScene interactive meshes (SCENE-01, SCENE-04)', () => {
  beforeEach(() => {
    useStore.setState({
      activePanel: null,
      cameraPreset: 'home',
      cameraTransitioning: false,
      hoveredObject: null,
    })
  })

  it('SCENE-01: monitor InteractiveMesh is mounted with panelId="projects"', () => {
    render(<DeskScene />)
    const el = screen.getByTestId('interactive-monitor')
    expect(el).toBeInTheDocument()
    expect(el.getAttribute('data-panel-id')).toBe('projects')
  })

  it('SCENE-01: about-prop InteractiveMesh is mounted with panelId="about" (papers OR substitute)', () => {
    render(<DeskScene />)
    const el = screen.getByTestId(/^interactive-(papers|notebook|book|stapler|coffee)$/)
    expect(el).toBeInTheDocument()
    expect(el.getAttribute('data-panel-id')).toBe('about')
  })

  it('SCENE-01: contact-prop InteractiveMesh is mounted with panelId="contact" (phone OR substitute)', () => {
    render(<DeskScene />)
    const el = screen.getByTestId(/^interactive-(phone|postcard|telephone|radio|mug)$/)
    expect(el).toBeInTheDocument()
    expect(el.getAttribute('data-panel-id')).toBe('contact')
  })

  it('SCENE-01: exactly 3 InteractiveMesh children (monitor + 2 props)', () => {
    render(<DeskScene />)
    expect(screen.queryAllByTestId(/^interactive-/)).toHaveLength(3)
  })

  it('SCENE-01: non-interactive desk meshes (lamp, desk-surface, floor) are NOT InteractiveMesh', () => {
    render(<DeskScene />)
    expect(screen.queryByTestId('interactive-lamp')).toBeNull()
    expect(screen.queryByTestId('interactive-desk-surface')).toBeNull()
    expect(screen.queryByTestId('interactive-scene-floor')).toBeNull()
  })

  it('SCENE-04: DeskScene source contains the locked CRT phosphor green color #39ff14', async () => {
    // Source-level assertion — test reads the implementation file to verify the locked
    // emissive color from 05-UI-SPEC.md §3D Material Overrides table is present.
    const fs = await import('node:fs/promises')
    const src = await fs.readFile('src/components/3d/DeskScene.tsx', 'utf8')
    expect(src).toContain('#39ff14')
  })

  it('SCENE-04: DeskScene source contains idle CRT emissiveIntensity 0.6 (above Bloom threshold 0.4)', async () => {
    const fs = await import('node:fs/promises')
    const src = await fs.readFile('src/components/3d/DeskScene.tsx', 'utf8')
    // 05-UI-SPEC.md §3D Material Overrides: CRT screen idle emissiveIntensity is 0.6
    expect(src).toMatch(/emissiveIntensity\s*=\s*\{?\s*0\.6\s*\}?/)
  })
})
