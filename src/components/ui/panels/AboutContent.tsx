import type { CSSProperties } from 'react'
import ExperienceTimeline, {
  type ExperienceEntry,
} from '@/components/ui/panels/ExperienceTimeline'
import SkillTags from '@/components/ui/panels/SkillTags'

// Real content per 04-UI-SPEC.md Copywriting Contract § About Panel.
// No placeholder strings — all content is Jordan's actual biographical data.

const BIO_TEXT =
  'Jordan is a full-stack developer building immersive web experiences. ' +
  'Passionate about the intersection of 3D graphics, creative coding, and clean UI. ' +
  'Always experimenting at the edge of what browsers can do.'

const EXPERIENCE: ExperienceEntry[] = [
  {
    org: 'Freelance / Self-Employed',
    role: 'Full-Stack Developer',
    dates: '2022 – Present',
    bullets: [
      'Built interactive 3D web experiences with React Three Fiber and GSAP',
      'Delivered client projects spanning e-commerce, dashboards, and creative portfolios',
    ],
  },
  {
    org: 'Personal Projects',
    role: 'Creative Developer',
    dates: '2020 – 2022',
    bullets: [
      'Experimented with WebGL, Three.js, and generative art techniques',
      'Developed full-stack applications with Node.js and React',
    ],
  },
]

const SKILLS = [
  'REACT',
  'TYPESCRIPT',
  'THREE.JS',
  'R3F',
  'GSAP',
  'FRAMER MOTION',
  'VITE',
  'NODE.JS',
  'TAILWIND',
]

const INTERESTS =
  '3D art, game dev experiments, lo-fi music production, cycling.'

// No real headshot available — using ASCII/monogram placeholder per 04-UI-SPEC.md
const AVATAR_SRC: string | null = null

// Section styles per 04-UI-SPEC § About Panel layout:
//   32px (xl) between major sections, 16px (md) section-heading margin-bottom,
//   avatar 80×80 with 4px radius and amber border.
const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}
const headerRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}
const avatarStyle: CSSProperties = {
  width: 80,
  height: 80,
  borderRadius: 4,
  border: '1px solid var(--color-amber)',
  flexShrink: 0,
  objectFit: 'cover',
}
const avatarPlaceholderStyle: CSSProperties = {
  width: 80,
  height: 80,
  borderRadius: 4,
  border: '1px solid var(--color-amber)',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--font-mono)',
  fontSize: 24,
  color: 'var(--color-amber)',
  background: 'transparent',
}
const nameStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  margin: 0,
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-amber)',
}
const titleStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  margin: 0,
  marginTop: 4,
  color: 'rgba(255,179,71,0.5)',
  fontFamily: 'var(--font-mono)',
}
const sectionHeadingStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 400,
  margin: 0,
  marginBottom: 8,
  color: 'rgba(255,179,71,0.5)',
  fontFamily: 'var(--font-mono)',
  letterSpacing: 1,
}
const bioStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: 1.5,
  margin: 0,
  color: 'var(--color-amber)',
  fontFamily: 'var(--font-mono)',
}

export default function AboutContent() {
  return (
    <div style={containerStyle}>
      {/* Header: avatar + name + title */}
      <div style={headerRowStyle}>
        {AVATAR_SRC ? (
          <img src={AVATAR_SRC} alt="Jordan Leis — headshot" style={avatarStyle} />
        ) : (
          <div
            role="img"
            aria-label="Jordan Leis — avatar placeholder"
            style={avatarPlaceholderStyle}
          >
            [JL]
          </div>
        )}
        <div>
          <p style={nameStyle}>Jordan Leis</p>
          <p style={titleStyle}>Software Engineer</p>
        </div>
      </div>

      {/* BIO */}
      <section>
        <h3 style={sectionHeadingStyle}>BIO</h3>
        <p style={bioStyle}>{BIO_TEXT}</p>
      </section>

      {/* EXPERIENCE */}
      <section>
        <h3 style={sectionHeadingStyle}>EXPERIENCE</h3>
        <ExperienceTimeline entries={EXPERIENCE} />
      </section>

      {/* SKILLS */}
      <section>
        <h3 style={sectionHeadingStyle}>SKILLS</h3>
        <SkillTags skills={SKILLS} interests={INTERESTS} />
      </section>
    </div>
  )
}
