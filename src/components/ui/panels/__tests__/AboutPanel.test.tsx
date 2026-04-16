import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutPanel from '@/components/ui/panels/AboutPanel'
import { useStore } from '@/store/useStore'

function resetStore() {
  useStore.setState({
    activePanel: null,
    cameraPreset: 'home',
    cameraTransitioning: false,
    hoveredObject: null,
  })
}

describe('AboutPanel content (Phase 4)', () => {
  beforeEach(resetStore)

  it('ABOUT-01: renders bio paragraph with non-placeholder text', () => {
    useStore.setState({ activePanel: 'about' })
    render(<AboutPanel />)
    // BIO section heading + a paragraph that is not empty and not the Phase 3 placeholder
    expect(screen.getByRole('heading', { name: 'BIO' })).toBeInTheDocument()
    expect(screen.queryByText(/\[About content — Phase 4\]/)).toBeNull()
  })

  it('ABOUT-01: renders avatar element (image or placeholder) with descriptive alt/aria-label', () => {
    useStore.setState({ activePanel: 'about' })
    render(<AboutPanel />)
    const avatar = screen.getByRole('img', { name: /Jordan Leis/i })
    expect(avatar).toBeInTheDocument()
  })

  it('ABOUT-02: renders EXPERIENCE section with at least one entry', () => {
    useStore.setState({ activePanel: 'about' })
    render(<AboutPanel />)
    expect(screen.getByRole('heading', { name: 'EXPERIENCE' })).toBeInTheDocument()
    // ExperienceTimeline renders role="list" with listitems
    const timeline = screen.getByRole('list', { name: 'Experience timeline' })
    expect(timeline).toBeInTheDocument()
    const entries = timeline.querySelectorAll('[role="listitem"]')
    expect(entries.length).toBeGreaterThanOrEqual(1)
  })

  it('ABOUT-03: renders SKILLS section with at least one skill tag', () => {
    useStore.setState({ activePanel: 'about' })
    render(<AboutPanel />)
    expect(screen.getByRole('heading', { name: 'SKILLS' })).toBeInTheDocument()
    const skillsList = screen.getByRole('list', { name: 'Skills' })
    const tags = skillsList.querySelectorAll('[role="listitem"]')
    expect(tags.length).toBeGreaterThanOrEqual(1)
  })

  it('Phase 3 regression: still renders ABOUT h2 and close button', () => {
    useStore.setState({ activePanel: 'about' })
    render(<AboutPanel />)
    expect(screen.getByRole('heading', { name: 'ABOUT' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeInTheDocument()
  })
})
