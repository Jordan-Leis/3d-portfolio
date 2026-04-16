import type { CSSProperties } from 'react'
import type { Project } from '@/config/projects'

export type ProjectCardProps = Project

// Per 04-UI-SPEC.md § Projects Panel and § Code Examples "Project Card Structure"
const cardStyle: CSSProperties = {
  paddingBottom: 24,
  marginBottom: 24,
  borderBottom: '1px solid rgba(255,179,71,0.15)',
}
const lastCardOverrideStyle: CSSProperties = {
  paddingBottom: 0,
  marginBottom: 0,
  borderBottom: 'none',
}
const titleStyle: CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.2,
  margin: 0,
  marginBottom: 8,
  color: 'var(--color-amber)',
  fontFamily: 'var(--font-mono)',
}
const inProgressTagStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  marginLeft: 8,
  opacity: 0.7,
  color: 'var(--color-amber)',
  fontFamily: 'var(--font-mono)',
}
const descStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  margin: 0,
  marginBottom: 8,
  color: 'var(--color-amber)',
  fontFamily: 'var(--font-mono)',
}
const tagRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 4,
  marginBottom: 8,
}
const tagStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 1.4,
  height: 24,
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 8px',
  border: '1px solid var(--color-amber)',
  borderRadius: 2,
  color: 'rgba(255,179,71,0.8)',
  fontFamily: 'var(--font-mono)',
}
const linkRowStyle: CSSProperties = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
}
const linkStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 400,
  color: 'var(--color-amber)',
  fontFamily: 'var(--font-mono)',
  textDecoration: 'none',
}

interface InnerProps extends ProjectCardProps {
  isLast?: boolean
}

export default function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  demoUrl,
  inProgress,
  isLast,
}: InnerProps) {
  return (
    <article style={isLast ? { ...cardStyle, ...lastCardOverrideStyle } : cardStyle}>
      <h3 style={titleStyle}>
        {title}
        {inProgress && <span style={inProgressTagStyle}>[IN PROGRESS]</span>}
      </h3>
      <p style={descStyle}>{description}</p>
      <div style={tagRowStyle} role="list" aria-label={`${title} tech stack`}>
        {techStack.map((tag) => (
          <span key={tag} role="listitem" style={tagStyle}>
            {tag}
          </span>
        ))}
      </div>
      {(githubUrl ?? demoUrl) && (
        <div style={linkRowStyle}>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              aria-label={`${title} — view source on GitHub`}
            >
              VIEW SOURCE →
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              aria-label={`${title} — live demo`}
            >
              LIVE DEMO →
            </a>
          )}
        </div>
      )}
    </article>
  )
}
