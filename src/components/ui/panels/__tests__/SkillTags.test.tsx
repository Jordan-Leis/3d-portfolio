import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillTags from '@/components/ui/panels/SkillTags'

describe('SkillTags (ABOUT-03)', () => {
  it('renders each skill as a tag element', () => {
    render(<SkillTags skills={['REACT', 'TYPESCRIPT', 'THREE.JS']} />)
    expect(screen.getByText('REACT')).toBeInTheDocument()
    expect(screen.getByText('TYPESCRIPT')).toBeInTheDocument()
    expect(screen.getByText('THREE.JS')).toBeInTheDocument()
  })

  it('renders skills inside a flex container with flexWrap wrap', () => {
    const { container } = render(<SkillTags skills={['A']} />)
    const row = container.querySelector('div[role="list"]') as HTMLDivElement | null
    expect(row).not.toBeNull()
    expect(row!.style.display).toBe('flex')
    expect(row!.style.flexWrap).toBe('wrap')
  })

  it('renders interests paragraph when prop is provided', () => {
    render(<SkillTags skills={['A']} interests="Also into synthwave and analog photography." />)
    expect(
      screen.getByText('Also into synthwave and analog photography.'),
    ).toBeInTheDocument()
  })

  it('does not render interests paragraph when prop is omitted', () => {
    const { container } = render(<SkillTags skills={['A']} />)
    // Only one text node should exist (the tag); no extra <p>
    expect(container.querySelectorAll('p').length).toBe(0)
  })
})
