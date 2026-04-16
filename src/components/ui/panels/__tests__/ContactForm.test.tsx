import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock @formspree/react so tests don't hit the network. We toggle the mocked state
// per-test by reassigning the return value before rendering.
vi.mock('@formspree/react', () => {
  const useForm = vi.fn()
  const ValidationError = ({ prefix, errors }: { prefix?: string; errors: unknown }) =>
    errors && Array.isArray(errors) && errors.length > 0 ? (
      <span className="form-error">{prefix} error</span>
    ) : null
  return { useForm, ValidationError }
})

import { useForm } from '@formspree/react'
import ContactForm from '@/components/ui/panels/ContactForm'

const mockedUseForm = vi.mocked(useForm)

function setFormState(partial: { submitting?: boolean; succeeded?: boolean; errors?: unknown[] | null }) {
  mockedUseForm.mockReturnValue([
    { submitting: !!partial.submitting, succeeded: !!partial.succeeded, errors: partial.errors ?? null, result: null } as unknown as ReturnType<typeof useForm>[0],
    vi.fn() as unknown as ReturnType<typeof useForm>[1],
    vi.fn() as unknown as ReturnType<typeof useForm>[2],
  ])
}

describe('ContactForm (CONT-01)', () => {
  beforeEach(() => {
    mockedUseForm.mockReset()
    // Default: idle form
    setFormState({})
    // Stub env so FORM_AVAILABLE is true
    vi.stubEnv('VITE_FORMSPREE_FORM_ID', 'testformid')
  })

  it('renders labelled NAME, EMAIL, MESSAGE fields with matching htmlFor/id', () => {
    render(<ContactForm />)
    const name = screen.getByLabelText('NAME')
    const email = screen.getByLabelText('EMAIL')
    const message = screen.getByLabelText('MESSAGE')
    expect(name).toHaveAttribute('type', 'text')
    expect(email).toHaveAttribute('type', 'email')
    expect(message.tagName).toBe('TEXTAREA')
    expect(name).toBeRequired()
    expect(email).toBeRequired()
    expect(message).toBeRequired()
  })

  it('renders submit button "SEND MESSAGE" when idle', () => {
    render(<ContactForm />)
    const btn = screen.getByRole('button', { name: /SEND MESSAGE/i })
    expect(btn).toBeInTheDocument()
    expect(btn).not.toBeDisabled()
  })

  it('disables submit button and shows "SENDING..." when submitting', () => {
    setFormState({ submitting: true })
    render(<ContactForm />)
    const btn = screen.getByRole('button', { name: /SENDING/i })
    expect(btn).toBeDisabled()
  })

  it('replaces form with success message when succeeded=true', () => {
    setFormState({ succeeded: true })
    render(<ContactForm />)
    expect(screen.queryByLabelText('NAME')).toBeNull()
    expect(screen.getByRole('status')).toHaveTextContent(/MESSAGE SENT/i)
  })

  it('renders degraded fallback when VITE_FORMSPREE_FORM_ID is missing', () => {
    vi.stubEnv('VITE_FORMSPREE_FORM_ID', '')
    render(<ContactForm />)
    expect(
      screen.getByText(/Form temporarily unavailable/i),
    ).toBeInTheDocument()
  })
})
