import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SceneErrorBoundary } from '@/components/ui/SceneErrorBoundary'

function Bomb(): JSX.Element {
  throw new Error('boom')
}

describe('SceneErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // React 18 logs caught render errors to console.error; silence + capture
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('renders children when no error is thrown', () => {
    render(
      <SceneErrorBoundary>
        <div data-testid="child">healthy</div>
      </SceneErrorBoundary>
    )
    expect(screen.getByTestId('child')).toHaveTextContent('healthy')
    expect(screen.queryByTestId('scene-error-fallback')).toBeNull()
  })

  it('renders the locked fallback copy when child throws', () => {
    render(
      <SceneErrorBoundary>
        <Bomb />
      </SceneErrorBoundary>
    )
    const fallback = screen.getByTestId('scene-error-fallback')
    expect(fallback).toHaveTextContent('Scene failed to load. Try refreshing the page.')
    expect(fallback.style.color).toBe('var(--color-amber)')
    expect(fallback.style.fontFamily).toBe('var(--font-mono)')
  })

  it('calls componentDidCatch (console.error) when child throws', () => {
    render(
      <SceneErrorBoundary>
        <Bomb />
      </SceneErrorBoundary>
    )
    // First call is React's own internal log; we assert ours is somewhere in the calls.
    const seen = consoleErrorSpy.mock.calls.some(
      (args) => typeof args[0] === 'string' && args[0].includes('Scene load error:')
    )
    expect(seen).toBe(true)
  })
})
