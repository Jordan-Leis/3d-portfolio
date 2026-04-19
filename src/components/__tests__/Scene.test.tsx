import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'

// Mock DeskScene — replaces it with a div so we can render Scene without WebGL.
// (DeskScene module imports useGLTF at module scope; we don't want to pull that in here.)
vi.mock('@/components/3d/DeskScene', () => ({
  default: () => <div data-testid="desk-scene" />,
}))

// Mock drei to avoid WebGL imports
vi.mock('@react-three/drei', () => ({
  Environment: (props: { children?: React.ReactNode }) => <div data-testid="env">{props.children}</div>,
  BakeShadows: () => <div data-testid="bake-shadows" />,
}))

// Mock leva — Scene imports useControls + button + Leva from leva
vi.mock('leva', () => ({
  useControls: vi.fn(() => ({})),
  button: (fn: () => void) => fn,
  Leva: () => null,
}))

// Mock postprocessing wrapper components so we can assert by testid that each was rendered.
vi.mock('@react-three/postprocessing', () => ({
  EffectComposer: (props: { children?: React.ReactNode }) => (
    <div data-testid="effect-composer">{props.children}</div>
  ),
  Bloom: () => <div data-testid="effect-bloom" />,
  Scanline: () => <div data-testid="effect-scanline" />,
  Vignette: () => <div data-testid="effect-vignette" />,
}))

// Mock postprocessing peer dep so BlendFunction import resolves
vi.mock('postprocessing', () => ({
  BlendFunction: { OVERLAY: 'OVERLAY', NORMAL: 'NORMAL' },
}))

// Mock the store — Scene's CameraDebugPanel uses useStore.
vi.mock('@/store/useStore', () => ({
  useStore: Object.assign(() => vi.fn(), { getState: () => ({}) }),
}))

import Scene from '@/components/3d/Scene'

describe('Scene postprocessing (VIS-01)', () => {
  beforeEach(() => {
    // Force DEV-mode false so Leva debug panel doesn't add extra elements
  })

  it('VIS-01: Scene mounts an EffectComposer', () => {
    const { getByTestId } = render(<Scene />)
    expect(getByTestId('effect-composer')).toBeInTheDocument()
  })

  it('VIS-01: EffectComposer contains Bloom', () => {
    const { getByTestId } = render(<Scene />)
    expect(getByTestId('effect-bloom')).toBeInTheDocument()
  })

  it('VIS-01: EffectComposer contains Scanline', () => {
    const { getByTestId } = render(<Scene />)
    expect(getByTestId('effect-scanline')).toBeInTheDocument()
  })

  it('VIS-01: EffectComposer contains Vignette', () => {
    const { getByTestId } = render(<Scene />)
    expect(getByTestId('effect-vignette')).toBeInTheDocument()
  })

  it('VIS-01: Scene source uses locked Bloom luminanceThreshold 0.4 from 05-UI-SPEC.md', async () => {
    const fs = await import('node:fs/promises')
    const src = await fs.readFile('src/components/3d/Scene.tsx', 'utf8')
    expect(src).toMatch(/luminanceThreshold\s*=\s*\{?\s*0\.4\s*\}?/)
  })

  it('VIS-01: Scene source uses locked Bloom intensity 1.5 from 05-UI-SPEC.md', async () => {
    const fs = await import('node:fs/promises')
    const src = await fs.readFile('src/components/3d/Scene.tsx', 'utf8')
    expect(src).toMatch(/intensity\s*=\s*\{?\s*1\.5\s*\}?/)
  })

  it('VIS-01: Scene source uses locked Vignette darkness 0.6', async () => {
    const fs = await import('node:fs/promises')
    const src = await fs.readFile('src/components/3d/Scene.tsx', 'utf8')
    expect(src).toMatch(/darkness\s*=\s*\{?\s*0\.6\s*\}?/)
  })

  it('SCENE-01: Scene renders DeskScene (replaces PlaceholderDesk)', () => {
    const { getByTestId } = render(<Scene />)
    expect(getByTestId('desk-scene')).toBeInTheDocument()
  })
})
