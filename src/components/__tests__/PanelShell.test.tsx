import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useStore } from '@/store/useStore'
import ProjectsPanel from '@/components/ui/panels/ProjectsPanel'

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

  it.todo('VIS-02: AboutPanel renders heading "ABOUT"')
  it.todo('VIS-02: ContactPanel renders heading "CONTACT"')
  it.todo('VIS-02: PanelLayer with activePanel=null renders neither panel nor backdrop')
  it.todo('VIS-02: PanelLayer with activePanel="projects" renders ProjectsPanel')
  it.todo('VIS-02: PanelLayer with activePanel="about" renders AboutPanel')
  it.todo('VIS-02: PanelLayer with activePanel="contact" renders ContactPanel')
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

  it.todo('VIS-03: Escape keydown while activePanel="projects" closes and returns home')
  it.todo('VIS-03: Escape keydown while activePanel=null does nothing (no listener attached)')
  it.todo('VIS-03: backdrop click calls closePanel + setCameraPreset("home")')
  it.todo('VIS-03: click inside panel body does NOT close panel (stopPropagation)')
  it.todo('VIS-03: AnimatePresence mode="wait" is set on the panel AnimatePresence (prevents two panels visible at once)')
})

describe('Panel shells — VIS-04 (pointer-event layering)', () => {
  // VIS-04 is implemented in Plan 04 (DesktopLayout modification).
  // These tests are intentionally left as it.todo so Plan 04 converts them.
  it.todo('VIS-04: DesktopLayout canvas wrapper has pointerEvents: "auto" when activePanel === null')
  it.todo('VIS-04: DesktopLayout canvas wrapper has pointerEvents: "none" when activePanel !== null')
})
