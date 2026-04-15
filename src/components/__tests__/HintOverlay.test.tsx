import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { useStore } from '@/store/useStore'
import HintOverlay from '@/components/ui/HintOverlay'

describe('HintOverlay (INTER-03 + D-03)', () => {
  beforeEach(() => {
    sessionStorage.clear()
    useStore.setState({
      activePanel: null,
      cameraPreset: 'home',
      cameraTransitioning: false,
      hoveredObject: null,
    })
  })

  it('INTER-03: renders "Click objects to explore" when sessionStorage is empty', () => {
    render(<HintOverlay />)
    expect(screen.getByText('Click objects to explore')).toBeInTheDocument()
  })

  it('INTER-03: does NOT render when sessionStorage.hintDismissed === "1"', () => {
    sessionStorage.setItem('hintDismissed', '1')
    render(<HintOverlay />)
    expect(screen.queryByText('Click objects to explore')).toBeNull()
  })

  it('INTER-03 + D-03: dismisses when hoveredObject changes null → non-null', () => {
    render(<HintOverlay />)
    expect(screen.getByText('Click objects to explore')).toBeInTheDocument()

    act(() => {
      useStore.getState().setHoveredObject('monitor')
    })
    // Visible flag flipped — sessionStorage written. The DOM may still
    // contain the node during framer-motion exit, but the key flag
    // is the sessionStorage write.
    expect(sessionStorage.getItem('hintDismissed')).toBe('1')
  })

  it('INTER-03: wrapper has pointerEvents: none', () => {
    const { container } = render(<HintOverlay />)
    const html = container.innerHTML
    expect(html).toContain('pointer-events: none')
  })

  it('copy is exactly "Click objects to explore" (no period, no emoji)', () => {
    render(<HintOverlay />)
    const el = screen.getByText('Click objects to explore')
    expect(el.textContent).toBe('Click objects to explore')
  })
})
