import { useForm, ValidationError } from '@formspree/react'
import type { CSSProperties } from 'react'

// Read at call time so vi.stubEnv() in tests can toggle FORM_AVAILABLE per-test.
function getFormId(): string {
  return import.meta.env.VITE_FORMSPREE_FORM_ID ?? ''
}
function isFormAvailable(): boolean {
  const id = getFormId()
  return typeof id === 'string' && id.length >= 6 && id !== 'xxxxxxxx'
}

// Styles per 04-UI-SPEC.md § Contact Panel + § Form Input States + § Form State Colors
const fieldGroupStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginBottom: 16,
}
const labelStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.4,
  color: 'var(--color-amber)',
  fontFamily: 'var(--font-mono)',
  letterSpacing: 1,
}
const inputBaseStyle: CSSProperties = {
  height: 36,
  padding: '0 8px',
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  background: 'transparent',
  border: '1px solid var(--color-amber)',
  color: 'var(--color-amber)',
  fontFamily: 'var(--font-mono)',
  borderRadius: 2,
  outline: 'none',
}
const textareaStyle: CSSProperties = {
  ...inputBaseStyle,
  height: 96,
  padding: '8px',
  resize: 'vertical',
}
const submitStyle: CSSProperties = {
  height: 36,
  padding: '0 16px',
  fontSize: 14,
  fontWeight: 600,
  background: 'var(--color-green)',
  color: '#000',
  border: 'none',
  borderRadius: 2,
  fontFamily: 'var(--font-mono)',
  cursor: 'pointer',
}
const submittingStyle: CSSProperties = {
  ...submitStyle,
  background: 'rgba(57,255,20,0.5)',
  cursor: 'wait',
}
const successStyle: CSSProperties = {
  fontSize: 14,
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-amber)',
  lineHeight: 1.5,
}
const degradedStyle: CSSProperties = {
  ...successStyle,
  color: 'rgba(255,179,71,0.5)',
}

// When Formspree is NOT configured, render a graceful fallback. This prevents a crash
// if someone forks the repo and runs dev without creating their own form.
function DegradedForm() {
  return (
    <p style={degradedStyle}>
      Form temporarily unavailable — please use the email link below.
    </p>
  )
}

// When Formspree IS configured, render the live form.
function LiveForm() {
  const [state, handleSubmit] = useForm(getFormId())

  if (state.succeeded) {
    return (
      <div role="status" aria-live="polite">
        <p style={successStyle}>MESSAGE SENT. I&apos;ll reply soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} aria-live="polite">
      <div style={fieldGroupStyle}>
        <label htmlFor="contact-name" style={labelStyle}>NAME</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          style={inputBaseStyle}
        />
        <ValidationError field="name" prefix="Name" errors={state.errors} className="form-error" as="span" />
      </div>

      <div style={fieldGroupStyle}>
        <label htmlFor="contact-email" style={labelStyle}>EMAIL</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          style={inputBaseStyle}
        />
        <ValidationError field="email" prefix="Email" errors={state.errors} className="form-error" as="span" />
      </div>

      <div style={fieldGroupStyle}>
        <label htmlFor="contact-message" style={labelStyle}>MESSAGE</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          style={textareaStyle}
        />
        <ValidationError field="message" prefix="Message" errors={state.errors} className="form-error" as="span" />
      </div>

      {/* Top-level form errors (e.g., network failure) */}
      <ValidationError errors={state.errors} className="form-error" as="div" />

      <button
        type="submit"
        disabled={state.submitting}
        style={state.submitting ? submittingStyle : submitStyle}
      >
        {state.submitting ? 'SENDING...' : 'SEND MESSAGE'}
      </button>

      {/* Inline style rule for ValidationError (which renders a plain div and bypasses
          our inline styles). Using a tiny <style> block is acceptable here because
          the rule is scoped to this component's emitted class name. Per 04-RESEARCH.md
          Pitfall 4 — ValidationError unstyled render. */}
      <style>{`.form-error { display: block; margin-top: 4px; color: #ff4444; font-size: 12px; font-family: var(--font-mono); }`}</style>
    </form>
  )
}

export default function ContactForm() {
  return isFormAvailable() ? <LiveForm /> : <DegradedForm />
}
