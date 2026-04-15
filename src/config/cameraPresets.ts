// Camera preset coordinates for Phase 2 — CAMERA-01.
// Values locked in 02-UI-SPEC.md CAMERA CONTRACT. Do not edit without updating
// the UI-SPEC contract first.
import type { CameraPreset } from '@/store/useStore'

export interface PresetConfig {
  position: [number, number, number]
  lookAt: [number, number, number]
}

export const CAMERA_PRESETS: Record<CameraPreset, PresetConfig> = {
  home:     { position: [0, 3, 7],      lookAt: [0, 0.5, 0] },
  projects: { position: [-1.5, 2, 4],   lookAt: [-1, 1, 0] },
  about:    { position: [1.5, 2, 4],    lookAt: [1, 0.5, 0] },
  contact:  { position: [2, 1.8, 4.5],  lookAt: [2, 0.5, 0] },
} as const
