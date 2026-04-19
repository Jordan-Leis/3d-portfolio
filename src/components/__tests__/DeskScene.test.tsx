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
// Node names match the actual gltfjsx-emitted names from the GLB
// (gltfjsx converts "Cube.000" → "Cube000", ".001" → "001").
// See 05-02-MODEL-NOTES.md for the full node inventory.
vi.mock('@react-three/drei', () => {
  const useGLTF = Object.assign(
    () => ({
      nodes: {
        // Interactive meshes (mapped via MESH_MAP in DeskScene.tsx)
        Computer_monitor001_ComputerDesk_0: { geometry: {}, material: {} },
        Phone_stand_ComputerDesk_0:         { geometry: {}, material: {} },
        Paper_ComputerDesk_0:               { geometry: {}, material: {} },
        // Monitor body and desk surface
        Cube000_ComputerDesk_0:             { geometry: {}, material: {} },
        Office_desk_ComputerDesk_0:         { geometry: {}, material: {} },
        // Static decorative meshes
        KeyboardCable_ComputerDesk_0:       { geometry: {}, material: {} },
        Paper2_ComputerDesk_0:              { geometry: {}, material: {} },
        Monitor_cable_ComputerDesk_0:       { geometry: {}, material: {} },
        Speakers_cable_ComputerDesk_0:      { geometry: {}, material: {} },
        Mouse_cord_ComputerDesk_0:          { geometry: {}, material: {} },
        CD_ComputerDesk_0:                  { geometry: {}, material: {} },
        Drawers_ComputerDesk_0:             { geometry: {}, material: {} },
        Phonehandle_ComputerDesk_0:         { geometry: {}, material: {} },
        CD_case_ComputerDesk_0:             { geometry: {}, material: {} },
        Pen_ComputerDesk_0:                 { geometry: {}, material: {} },
        Floppy_disk_FloppyDisk_0:           { geometry: {}, material: {} },
        Keyboard_ComputerDesk_0:            { geometry: {}, material: {} },
        SpeakerR_ComputerDesk_0:            { geometry: {}, material: {} },
        SpeakerL_ComputerDesk_0:            { geometry: {}, material: {} },
        Mousepad_ComputerDesk_0:            { geometry: {}, material: {} },
        Mouse_ComputerDesk_0:               { geometry: {}, material: {} },
        Computer_case_ComputerDesk_0:       { geometry: {}, material: {} },
      },
      materials: {
        ComputerDesk: {},
        FloppyDisk: {},
      },
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

  it('SCENE-01: about-prop InteractiveMesh is mounted with panelId="about" (phone-stand — mapped from Phone_stand_ComputerDesk_0 in MODEL-NOTES.md)', () => {
    render(<DeskScene />)
    // "phone-stand" is the semantic name chosen for Phone_stand_ComputerDesk_0 → About panel.
    // Regex includes original options + "phone-stand" (the chosen name from MODEL-NOTES.md).
    // Uses exact match excluding "papers" so it doesn't collide with the contact-prop testid.
    const el = screen.getByTestId(/^interactive-(notebook|book|stapler|coffee|phone-stand)$/)
    expect(el).toBeInTheDocument()
    expect(el.getAttribute('data-panel-id')).toBe('about')
  })

  it('SCENE-01: contact-prop InteractiveMesh is mounted with panelId="contact" (papers — mapped from Paper_ComputerDesk_0 in MODEL-NOTES.md)', () => {
    render(<DeskScene />)
    // "papers" is the semantic name chosen for Paper_ComputerDesk_0 → Contact panel.
    // Regex includes original options + "papers" (the chosen name from MODEL-NOTES.md).
    // Uses exact match excluding "phone-stand" so it doesn't collide with the about-prop testid.
    const el = screen.getByTestId(/^interactive-(phone|postcard|telephone|radio|mug|papers)$/)
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
