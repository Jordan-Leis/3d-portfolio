import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SocialLinks from '@/components/ui/panels/SocialLinks'
import { SOCIAL_LINKS } from '@/config/social'

describe('SocialLinks (CONT-03)', () => {
  it('renders at least GitHub and LinkedIn', () => {
    render(<SocialLinks />)
    expect(screen.getByRole('listitem', { name: /GitHub profile/i })).toBeInTheDocument()
    expect(screen.getByRole('listitem', { name: /LinkedIn profile/i })).toBeInTheDocument()
  })

  it('renders one listitem per SOCIAL_LINKS entry', () => {
    render(<SocialLinks />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(SOCIAL_LINKS.length)
  })

  it('every link has target="_blank" rel="noopener noreferrer" and https href', () => {
    render(<SocialLinks />)
    const links = screen.getAllByRole('listitem')
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link.getAttribute('href')).toMatch(/^https:\/\//)
    }
  })

  it('renders visible label text for each social link', () => {
    render(<SocialLinks />)
    for (const link of SOCIAL_LINKS) {
      expect(screen.getByText(link.label)).toBeInTheDocument()
    }
  })

  it('renders inline SVG icons (aria-hidden) inside each link', () => {
    const { container } = render(<SocialLinks />)
    const svgs = container.querySelectorAll('svg[aria-hidden="true"]')
    expect(svgs.length).toBe(SOCIAL_LINKS.length)
  })
})
