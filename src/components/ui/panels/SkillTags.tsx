import type { CSSProperties } from 'react'

interface Props {
  skills: string[]
  interests?: string
}

// Per 04-UI-SPEC.md § About Panel "Skills section":
//   wrapping flex row of pill tags
//   tag: padding 4px 8px, border 1px solid amber, borderRadius 2px
//   font: 12/400 mono, ALL CAPS (caller provides caps-formatted strings)
//   gap: sm (8px); interests paragraph below at body 14/400
const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  marginBottom: 16,
}
const tagStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.4,
  padding: '4px 8px',
  border: '1px solid var(--color-amber)',
  borderRadius: 2,
  color: 'var(--color-amber)',
  fontFamily: 'var(--font-mono)',
}
const interestsStyle: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.5,
  margin: 0,
  marginTop: 8,
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-amber)',
}

export default function SkillTags({ skills, interests }: Props) {
  return (
    <>
      <div style={rowStyle} role="list" aria-label="Skills">
        {skills.map((skill) => (
          <span key={skill} role="listitem" style={tagStyle}>
            {skill}
          </span>
        ))}
      </div>
      {interests && <p style={interestsStyle}>{interests}</p>}
    </>
  )
}
