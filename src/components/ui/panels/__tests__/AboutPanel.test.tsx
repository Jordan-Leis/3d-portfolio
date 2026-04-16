import { describe, it, expect } from 'vitest'

describe('AboutPanel content (Phase 4)', () => {
  // Sentinel: vitest v2.1 requires one runnable it() per describe block alongside it.todo stubs.
  // STATE.md Active Decision [03-01].
  it('sentinel: describe block is live', () => {
    expect(true).toBe(true)
  })

  it.todo('ABOUT-01: renders bio paragraph element with real content (not placeholder)')
  it.todo('ABOUT-01: renders avatar image element with alt="Jordan Leis — headshot" or ASCII placeholder')
  it.todo('ABOUT-02: renders ExperienceTimeline with at least one entry')
  it.todo('ABOUT-03: renders SkillTags with at least one skill tag')
  it.todo('ABOUT-03: renders side interests text below skill tags')
})
