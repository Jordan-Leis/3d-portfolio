import type { CSSProperties } from 'react'
import ContactForm from '@/components/ui/panels/ContactForm'
import SocialLinks from '@/components/ui/panels/SocialLinks'

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}
const subHeadingStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  margin: 0,
  marginBottom: 8,
  color: 'rgba(255,179,71,0.5)',
  fontFamily: 'var(--font-mono)',
  letterSpacing: 1,
}
const mailtoWrapStyle: CSSProperties = {
  paddingTop: 16,
  borderTop: '1px solid rgba(255,179,71,0.2)',
}
const mailtoLabelStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 400,
  margin: 0,
  color: 'var(--color-amber)',
  fontFamily: 'var(--font-mono)',
}
const mailtoLinkStyle: CSSProperties = {
  color: 'var(--color-amber)',
  textDecoration: 'underline',
}
const elsewhereHeadingStyle: CSSProperties = {
  ...subHeadingStyle,
  marginBottom: 16,
}

const EMAIL = 'jordan.jay.leis@gmail.com'

export default function ContactContent() {
  return (
    <div style={containerStyle}>
      {/* FORM section */}
      <section>
        <h3 style={subHeadingStyle}>GET IN TOUCH</h3>
        <ContactForm />
      </section>

      {/* MAILTO FALLBACK — CONT-02 */}
      <div style={mailtoWrapStyle}>
        <p style={mailtoLabelStyle}>
          Or email directly:{' '}
          <a
            href={`mailto:${EMAIL}`}
            style={mailtoLinkStyle}
            aria-label={`Email Jordan at ${EMAIL}`}
          >
            {EMAIL}
          </a>
        </p>
      </div>

      {/* SOCIAL — CONT-03 */}
      <section>
        <h3 style={elsewhereHeadingStyle}>ELSEWHERE</h3>
        <SocialLinks />
      </section>
    </div>
  )
}
