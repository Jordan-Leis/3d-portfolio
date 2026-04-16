import type { CSSProperties } from 'react'

export interface ExperienceEntry {
  org: string
  role: string
  dates: string
  bullets?: string[]
}

interface Props {
  entries: ExperienceEntry[]
}

// Per 04-UI-SPEC.md § About Panel / Typography:
//   org:  14px / 400
//   role: 14px / 600
//   date: 12px / 400 @ 50% opacity (rgba(255,179,71,0.5))
//   separator: 1px solid rgba(255,179,71,0.2)
//   between entries: sm (8px)
//   role + date indented md (16px) from org
const entryWrapStyle: CSSProperties = {
  paddingBottom: 8,
  marginBottom: 8,
  borderBottom: '1px solid rgba(255,179,71,0.2)',
}
const lastEntryStyle: CSSProperties = { paddingBottom: 0, marginBottom: 0, borderBottom: 'none' }
const orgStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  margin: 0,
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-amber)',
}
const roleStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.5,
  margin: 0,
  marginLeft: 16,
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-amber)',
}
const dateStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.4,
  margin: 0,
  marginLeft: 16,
  fontFamily: 'var(--font-mono)',
  color: 'rgba(255,179,71,0.5)',
}
const bulletListStyle: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.5,
  marginTop: 4,
  marginLeft: 32,
  paddingLeft: 0,
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-amber)',
}

export default function ExperienceTimeline({ entries }: Props) {
  return (
    <div role="list" aria-label="Experience timeline">
      {entries.map((entry, i) => {
        const isLast = i === entries.length - 1
        return (
          <div
            key={`${entry.org}-${entry.role}-${entry.dates}`}
            role="listitem"
            style={isLast ? { ...entryWrapStyle, ...lastEntryStyle } : entryWrapStyle}
          >
            <p style={orgStyle}>{entry.org}</p>
            <p style={roleStyle}>{entry.role}</p>
            <p style={dateStyle}>{entry.dates}</p>
            {entry.bullets && entry.bullets.length > 0 && (
              <ul style={bulletListStyle}>
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
