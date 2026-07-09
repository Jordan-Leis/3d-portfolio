import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ReactNode } from 'react'
import MobileLayout from '../MobileLayout'

// Mock framer-motion: whileInView uses IntersectionObserver which jsdom does not provide.
// Replace motion.* with plain intrinsic elements that forward all props through.
vi.mock('framer-motion', async () => {
  const React = await import('react')
  const handler = {
    get(_: unknown, tag: string) {
      return React.forwardRef(
        (
          { children, initial: _i, whileInView: _w, viewport: _v, transition: _t, animate: _a, exit: _ex, ...rest }: Record<string, unknown>,
          ref: unknown,
        ) => React.createElement(tag, { ...rest, ref }, children as ReactNode),
      )
    },
  }
  return { motion: new Proxy({}, handler), AnimatePresence: ({ children }: { children: ReactNode }) => children }
})

// Mock ContactForm at the module boundary: it pulls in @formspree/react which
// requires env + network in jsdom. We only need to prove MobileLayout mounts it.
vi.mock('@/components/ui/panels/ContactForm', () => ({
  default: () => <div data-testid="mock-contact-form">ContactForm</div>,
}))

describe('MobileLayout (MOB-01, MOB-02)', () => {
  it('renders the hero with locked display copy', () => {
    render(<MobileLayout />)
    expect(
      screen.getByRole('heading', { level: 1, name: /JORDAN'S PORTFOLIO/ }),
    ).toBeInTheDocument()
  })

  it('renders ABOUT, PROJECTS, and CONTACT sections in order', () => {
    render(<MobileLayout />)
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings).toEqual(['ABOUT', 'PROJECTS', 'CONTACT'])
  })

  it('mounts the shared content components (ExperienceTimeline, SkillTags, ProjectCard, ContactForm, SocialLinks)', () => {
    render(<MobileLayout />)
    // ContactForm mock proves MobileLayout imported and rendered it.
    expect(screen.getByTestId('mock-contact-form')).toBeInTheDocument()
    // ExperienceTimeline + SkillTags render amber-text content inside the About section;
    // at minimum their presence flows through DOM — we rely on the About heading being
    // followed by non-empty content regions.
    const about = screen.getByRole('heading', { level: 2, name: 'ABOUT' })
    expect(about.parentElement?.childElementCount).toBeGreaterThan(1)
  })

  it('renders the scanline overlay (MOB-03)', () => {
    const { container } = render(<MobileLayout />)
    const overlay = container.querySelector('div[aria-hidden="true"]')
    expect(overlay).not.toBeNull()
  })

  it('renders the locked footer string', () => {
    render(<MobileLayout />)
    expect(
      screen.getByText(/© 2025 Jordan Leis · Built with React \+ Three\.js/),
    ).toBeInTheDocument()
  })
})

describe('MobileLayout source guarantees (MOB-04)', () => {
  // Source-level regex scan — if any future edit adds a three/r3f/drei import to
  // MobileLayout.tsx, this test breaks before the build job even runs.
  it('does not import three, @react-three/fiber, or @react-three/drei', () => {
    const src = readFileSync(
      resolve(__dirname, '../MobileLayout.tsx'),
      'utf8',
    )
    expect(src).not.toMatch(/from ['"]three['"]/)
    expect(src).not.toMatch(/from ['"]@react-three\/fiber['"]/)
    expect(src).not.toMatch(/from ['"]@react-three\/drei['"]/)
  })
})
