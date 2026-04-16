import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ScanlineOverlay from '../ScanlineOverlay'

describe('ScanlineOverlay (MOB-03)', () => {
  it('renders a decorative fixed-position overlay', () => {
    const { container } = render(<ScanlineOverlay />)
    const overlay = container.querySelector('div[aria-hidden="true"]')
    expect(overlay).not.toBeNull()
    const style = (overlay as HTMLElement).getAttribute('style') ?? ''
    expect(style).toMatch(/position:\s*fixed/)
    expect(style).toMatch(/pointer-events:\s*none/)
    expect(style).toMatch(/repeating-linear-gradient/)
  })

  it('is inert — has no children and no interactive elements', () => {
    const { container } = render(<ScanlineOverlay />)
    const overlay = container.querySelector('div[aria-hidden="true"]') as HTMLElement
    expect(overlay.children.length).toBe(0)
  })
})
