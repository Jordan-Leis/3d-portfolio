import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useStore } from '@/store/useStore'

// Mock InteractiveMesh so we can render PlaceholderDesk outside a Canvas and
// inspect the panelId/name props that each mesh was configured with.
vi.mock('@/components/3d/InteractiveMesh', () => ({
  default: (props: { panelId: string; name: string }) => (
    <div
      data-testid={`interactive-${props.name}`}
      data-panel-id={props.panelId}
    />
  ),
}))

// PlaceholderDesk also contains lower-case <mesh>, <group>, <boxGeometry>,
// <meshStandardMaterial> elements. React-DOM in jsdom tolerates unknown
// lower-case tags (treats them as custom elements), so the render succeeds
// even without R3F/WebGL. The mock replaces InteractiveMesh with a capturable
// <div>, so testid queries work.

import PlaceholderDesk from '@/components/3d/PlaceholderDesk'

describe('PlaceholderDesk interactive meshes', () => {
  beforeEach(() => {
    useStore.setState({
      activePanel: null,
      cameraPreset: 'home',
      cameraTransitioning: false,
      hoveredObject: null,
    })
  })

  it('INTER-04: monitor InteractiveMesh is mounted with panelId="projects"', () => {
    render(<PlaceholderDesk />)
    const el = screen.getByTestId('interactive-monitor')
    expect(el).toBeInTheDocument()
    expect(el.getAttribute('data-panel-id')).toBe('projects')
  })

  it('INTER-05: papers InteractiveMesh is mounted with panelId="about"', () => {
    render(<PlaceholderDesk />)
    const el = screen.getByTestId('interactive-papers')
    expect(el).toBeInTheDocument()
    expect(el.getAttribute('data-panel-id')).toBe('about')
  })

  it('INTER-06: phone InteractiveMesh is mounted with panelId="contact"', () => {
    render(<PlaceholderDesk />)
    const el = screen.getByTestId('interactive-phone')
    expect(el).toBeInTheDocument()
    expect(el.getAttribute('data-panel-id')).toBe('contact')
  })

  it('exactly 3 InteractiveMesh children: monitor, papers, phone', () => {
    render(<PlaceholderDesk />)
    expect(screen.queryAllByTestId(/^interactive-/)).toHaveLength(3)
  })

  it('non-interactive meshes (lamp, desk-surface, scene-floor) are NOT InteractiveMesh', () => {
    render(<PlaceholderDesk />)
    expect(screen.queryByTestId('interactive-lamp')).toBeNull()
    expect(screen.queryByTestId('interactive-desk-surface')).toBeNull()
    expect(screen.queryByTestId('interactive-scene-floor')).toBeNull()
  })
})
