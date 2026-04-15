import { describe, it, expect } from 'vitest'

// INTER-04: monitor click → cameraPreset='projects' + activePanel='projects'
// INTER-05: papers click → cameraPreset='about' + activePanel='about'
// INTER-06: phone click → cameraPreset='contact' + activePanel='contact'

describe('PlaceholderDesk interactive meshes (Plan 02)', () => {
  // Sentinel: vitest v2 requires at least one non-todo it() to register the suite.
  // Plan 02 will replace this with real component tests.
  it('suite registered — SceneObjects stubs pending Plan 02 implementation', () => {
    expect(true).toBe(true)
  })

  it.todo('INTER-04: clicking the mesh named "monitor" triggers setCameraPreset("projects") + openPanel("projects")')
  it.todo('INTER-05: clicking the mesh named "papers" triggers setCameraPreset("about") + openPanel("about")')
  it.todo('INTER-06: clicking the mesh named "phone" triggers setCameraPreset("contact") + openPanel("contact")')
  it.todo('non-interactive meshes (lamp, desk-surface, scene-floor) do NOT register pointer-over/click handlers')
})
