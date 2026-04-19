// SceneErrorBoundary — wraps the R3F Suspense in DesktopLayout so that GLB load
// failure (Plan 03 introduces useGLTF in DeskScene) renders the locked fallback
// copy from 05-UI-SPEC.md §Copywriting Contract instead of an infinite BIOSScreen.
//
// Class component is required: React Hooks cannot catch render errors.
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Scene load error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          data-testid="scene-error-fallback"
          style={{
            color: 'var(--color-amber)',
            fontFamily: 'var(--font-mono)',
            padding: '2rem',
          }}
        >
          Scene failed to load. Try refreshing the page.
        </div>
      )
    }
    return this.props.children
  }
}

export default SceneErrorBoundary
