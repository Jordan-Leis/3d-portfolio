import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useStore } from '@/store/useStore'
import ProjectsPanel from '@/components/ui/panels/ProjectsPanel'
import AboutPanel from '@/components/ui/panels/AboutPanel'
import ContactPanel from '@/components/ui/panels/ContactPanel'
import PanelLayer from '@/components/ui/PanelLayer'

function resetStore() {
  useStore.setState({
    activePanel: null,
    cameraPreset: 'home',
    cameraTransitioning: false,
    hoveredObject: null,
  })
}

describe('Panel shells — VIS-02 (AnimatePresence entry/exit)', () => {
  beforeEach(resetStore)

  it('VIS-02: ProjectsPanel renders heading "PROJECTS" and placeholder body', () => {
    render(<ProjectsPanel />)
    expect(screen.getByRole('heading', { name: 'PROJECTS' })).toBeInTheDocument()
    expect(screen.getByText('[Projects content — Phase 4]')).toBeInTheDocument()
  })

  it('VIS-02: AboutPanel renders heading "ABOUT"', () => {
    render(<AboutPanel />)
    expect(screen.getByRole('heading', { name: 'ABOUT' })).toBeInTheDocument()
    expect(screen.getByText('[About content — Phase 4]')).toBeInTheDocument()
  })

  it('VIS-02: ContactPanel renders heading "CONTACT"', () => {
    render(<ContactPanel />)
    expect(screen.getByRole('heading', { name: 'CONTACT' })).toBeInTheDocument()
    expect(screen.getByText('[Contact content — Phase 4]')).toBeInTheDocument()
  })

  it('VIS-02: PanelLayer with activePanel=null renders neither panel nor backdrop', () => {
    resetStore()
    render(<PanelLayer />)
    expect(screen.queryByRole('heading', { name: 'PROJECTS' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'ABOUT' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'CONTACT' })).toBeNull()
  })

  it('VIS-02: PanelLayer with activePanel="projects" renders ProjectsPanel', () => {
    useStore.setState({ activePanel: 'projects' })
    render(<PanelLayer />)
    expect(screen.getByRole('heading', { name: 'PROJECTS' })).toBeInTheDocument()
  })

  it('VIS-02: PanelLayer with activePanel="about" renders AboutPanel', () => {
    useStore.setState({ activePanel: 'about' })
    render(<PanelLayer />)
    expect(screen.getByRole('heading', { name: 'ABOUT' })).toBeInTheDocument()
  })

  it('VIS-02: PanelLayer with activePanel="contact" renders ContactPanel', () => {
    useStore.setState({ activePanel: 'contact' })
    render(<PanelLayer />)
    expect(screen.getByRole('heading', { name: 'CONTACT' })).toBeInTheDocument()
  })
})

describe('Panel shells — VIS-03 (dismissal vectors)', () => {
  beforeEach(resetStore)

  it('VIS-03: × button click calls closePanel + setCameraPreset("home")', () => {
    useStore.setState({ activePanel: 'projects', cameraPreset: 'projects' })
    render(<ProjectsPanel />)
    const closeBtn = screen.getByRole('button', { name: 'Close panel' })
    fireEvent.click(closeBtn)
    expect(useStore.getState().activePanel).toBeNull()
    expect(useStore.getState().cameraPreset).toBe('home')
  })

  it('VIS-03: × button character is U+00D7 multiplication sign', () => {
    render(<ProjectsPanel />)
    const closeBtn = screen.getByRole('button', { name: 'Close panel' })
    expect(closeBtn.textContent).toBe('\u00D7')
  })

  it('VIS-03: Escape keydown while activePanel="projects" closes and returns home', () => {
    useStore.setState({ activePanel: 'projects', cameraPreset: 'projects' })
    render(<PanelLayer />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(useStore.getState().activePanel).toBeNull()
    expect(useStore.getState().cameraPreset).toBe('home')
  })

  it('VIS-03: Escape keydown while activePanel=null does nothing (no listener attached)', () => {
    resetStore()
    render(<PanelLayer />)
    fireEvent.keyDown(window, { key: 'Escape' })
    // Store state unchanged
    expect(useStore.getState().activePanel).toBeNull()
    expect(useStore.getState().cameraPreset).toBe('home')
  })

  it('VIS-03: backdrop click calls closePanel + setCameraPreset("home")', () => {
    useStore.setState({ activePanel: 'about', cameraPreset: 'about' })
    const { container } = render(<PanelLayer />)
    // Backdrop is the first motion.div — it has the zIndex:10 and background:rgba style.
    // Query by style — it's the only absolute-positioned full-screen div in the layer.
    const backdrops = container.querySelectorAll('div[style*="rgba(0, 0, 0, 0.5)"]')
    expect(backdrops.length).toBeGreaterThanOrEqual(1)
    fireEvent.click(backdrops[0]!)
    expect(useStore.getState().activePanel).toBeNull()
    expect(useStore.getState().cameraPreset).toBe('home')
  })

  it('VIS-03: click inside panel body does NOT close panel (stopPropagation)', () => {
    useStore.setState({ activePanel: 'projects', cameraPreset: 'projects' })
    render(<PanelLayer />)
    const heading = screen.getByRole('heading', { name: 'PROJECTS' })
    // Click the heading — it's inside the panel body
    fireEvent.click(heading)
    // Panel is still open — stopPropagation prevented bubble to backdrop
    expect(useStore.getState().activePanel).toBe('projects')
  })

  it('AnimatePresence mode="wait" is set on the panel AnimatePresence (prevents two panels visible at once)', () => {
    // Smoke test: mount PanelLayer, confirm only ONE h2 exists at any time.
    useStore.setState({ activePanel: 'projects' })
    const { rerender } = render(<PanelLayer />)
    expect(screen.queryAllByRole('heading').length).toBe(1)

    useStore.setState({ activePanel: 'about' })
    rerender(<PanelLayer />)
    // During the crossfade window, mode='wait' ensures at most ONE heading is in the DOM
    // at any given render. The test above is the strongest we can do in jsdom where
    // animations run instantly.
    expect(screen.queryAllByRole('heading').length).toBe(1)
  })
})

describe('Panel shells — VIS-04 (pointer-event layering)', () => {
  // VIS-04 is implemented in Plan 04 (DesktopLayout modification).
  // These tests are intentionally left as it.todo so Plan 04 converts them.
  it.todo('VIS-04: DesktopLayout canvas wrapper has pointerEvents: "auto" when activePanel === null')
  it.todo('VIS-04: DesktopLayout canvas wrapper has pointerEvents: "none" when activePanel !== null')
})
