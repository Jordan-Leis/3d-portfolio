import { describe, it, expect } from 'vitest'

// VIS-02: panels use AnimatePresence — entry + exit animations fire
// VIS-03: panels dismiss via × button, Escape key, backdrop click
// VIS-04: canvas wrapper gets pointer-events: none when activePanel !== null

describe('Panel shells (Plan 03 / Plan 04)', () => {
  // Sentinel: vitest v2 requires at least one non-todo it() to register the suite.
  // Plan 03 / Plan 04 will replace this with real component tests.
  it('suite registered — PanelShell stubs pending Plan 03/04 implementation', () => {
    expect(true).toBe(true)
  })

  it.todo('VIS-02: ProjectsPanel renders when activePanel === "projects" (AnimatePresence entry)')
  it.todo('VIS-02: AboutPanel renders when activePanel === "about"')
  it.todo('VIS-02: ContactPanel renders when activePanel === "contact"')
  it.todo('VIS-02: AnimatePresence mode="wait" is set on the panel wrapper (two panels never visible simultaneously)')
  it.todo('VIS-03: × button click calls closePanel() + setCameraPreset("home")')
  it.todo('VIS-03: Escape keydown while activePanel !== null calls closePanel() + setCameraPreset("home")')
  it.todo('VIS-03: Escape keydown while activePanel === null does NOTHING (no listener attached)')
  it.todo('VIS-03: backdrop click calls closePanel() + setCameraPreset("home")')
  it.todo('VIS-03: click inside panel body does NOT bubble to backdrop onClick (stopPropagation)')
  it.todo('VIS-04: DesktopLayout canvas wrapper has pointerEvents: "auto" when activePanel === null')
  it.todo('VIS-04: DesktopLayout canvas wrapper has pointerEvents: "none" when activePanel !== null')
})
