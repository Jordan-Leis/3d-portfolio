import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock @formspree/react before importing ContactPanel (which transitively imports
// ContactForm → @formspree/react).
vi.mock('@formspree/react', () => {
  const useForm = vi.fn(() => [
    { submitting: false, succeeded: false, errors: null, result: null },
    vi.fn(),
    vi.fn(),
  ])
  const ValidationError = () => null
  return { useForm, ValidationError }
})

import ContactPanel from '@/components/ui/panels/ContactPanel'
import { useStore } from '@/store/useStore'
import { SOCIAL_LINKS } from '@/config/social'

function resetStore() {
  useStore.setState({
    activePanel: null,
    cameraPreset: 'home',
    cameraTransitioning: false,
    hoveredObject: null,
  })
}

describe('ContactPanel content (Phase 4)', () => {
  beforeEach(() => {
    resetStore()
    vi.stubEnv('VITE_FORMSPREE_FORM_ID', 'testformid')
  })

  it('Phase 3 regression: renders CONTACT h2 and close button', () => {
    useStore.setState({ activePanel: 'contact' })
    render(<ContactPanel />)
    expect(screen.getByRole('heading', { name: 'CONTACT' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeInTheDocument()
  })

  it('CONT-01: renders GET IN TOUCH heading and form fields', () => {
    useStore.setState({ activePanel: 'contact' })
    render(<ContactPanel />)
    expect(screen.getByRole('heading', { name: 'GET IN TOUCH' })).toBeInTheDocument()
    expect(screen.getByLabelText('NAME')).toBeInTheDocument()
    expect(screen.getByLabelText('EMAIL')).toBeInTheDocument()
    expect(screen.getByLabelText('MESSAGE')).toBeInTheDocument()
  })

  it('CONT-02: renders mailto: link to jordan.jay.leis@gmail.com', () => {
    useStore.setState({ activePanel: 'contact' })
    render(<ContactPanel />)
    const link = screen.getByRole('link', { name: /Email Jordan/i })
    expect(link).toHaveAttribute('href', 'mailto:jordan.jay.leis@gmail.com')
  })

  it('CONT-03: renders ELSEWHERE section with all SOCIAL_LINKS entries', () => {
    useStore.setState({ activePanel: 'contact' })
    render(<ContactPanel />)
    expect(screen.getByRole('heading', { name: 'ELSEWHERE' })).toBeInTheDocument()
    const socialList = screen.getByRole('list', { name: 'Social profiles' })
    const items = socialList.querySelectorAll('[role="listitem"]')
    expect(items.length).toBe(SOCIAL_LINKS.length)
    expect(items.length).toBeGreaterThanOrEqual(2)
  })

  it('CONT-03: at minimum GitHub and LinkedIn are present', () => {
    useStore.setState({ activePanel: 'contact' })
    render(<ContactPanel />)
    expect(screen.getByRole('listitem', { name: /GitHub profile/i })).toBeInTheDocument()
    expect(screen.getByRole('listitem', { name: /LinkedIn profile/i })).toBeInTheDocument()
  })
})
