import { describe, it, expect } from 'vitest'

describe('ContactPanel content (Phase 4)', () => {
  it('sentinel: describe block is live', () => {
    expect(true).toBe(true)
  })

  it.todo('CONT-01: renders form element containing name, email, and message fields')
  it.todo('CONT-01: submit button is disabled when state.submitting is true')
  it.todo('CONT-01: form replaces with success message when state.succeeded is true')
  it.todo('CONT-02: renders mailto: link with jordan.jay.leis@gmail.com as href')
  it.todo('CONT-03: renders at least two social profile links (GitHub, LinkedIn)')
})
