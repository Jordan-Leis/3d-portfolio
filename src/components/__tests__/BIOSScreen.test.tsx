import { describe, it, expect } from 'vitest'

// DIFF-01: BIOS screen with amber monospace text + progress bar fed by useProgress
// D-02: minimum 2000ms display time regardless of load speed

describe('BIOSScreen (Plan 04)', () => {
  // Sentinel: vitest v2 requires at least one non-todo it() to register the suite.
  // Plan 04 will replace this with real component tests.
  it('suite registered — BIOSScreen stubs pending Plan 04 implementation', () => {
    expect(true).toBe(true)
  })

  it.todo('DIFF-01: renders on mount with visible=true')
  it.todo('DIFF-01: renders the 5 fake BIOS messages from 03-UI-SPEC.md in order')
  it.todo('DIFF-01: first message "BIOS v2.08 (C)1993 Jordan Systems Inc." is visible immediately (threshold 0%)')
  it.todo('DIFF-01: progress bar width is bound to useProgress().progress')
  it.todo('DIFF-01: style.fontFamily references var(--font-mono)')
  it.todo('DIFF-01: style.color references var(--color-amber)')
  it.todo('DIFF-01: background is pure black (#000000), NOT var(--color-bg)')
  it.todo('D-02: dismisses at max(2000ms elapsed, loadedTime) + 400ms — never earlier than 2000ms after mount')
  it.todo('Pitfall 4: dismisses when useProgress returns { active: false, progress: 0 } (no async assets) after the 2s min')
})
