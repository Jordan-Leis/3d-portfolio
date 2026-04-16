// Phase 4 — Full mobile / no-WebGL layout.
// CRITICAL: zero imports from three, @react-three/fiber, or @react-three/drei.
// This file is in the eagerly-loaded bundle. Any three/r3f import here puts ~600KB
// of Three.js into the mobile waterfall and violates CLAUDE.md Rule 3 / MOB-04.
// Reuses desktop panel content components (ExperienceTimeline, SkillTags, ProjectCard,
// ContactForm, SocialLinks) so mobile and desktop never diverge on copy.
import { motion } from 'framer-motion'
import ExperienceTimeline, {
  type ExperienceEntry,
} from '@/components/ui/panels/ExperienceTimeline'
import SkillTags from '@/components/ui/panels/SkillTags'
import ProjectCard from '@/components/ui/panels/ProjectCard'
import ContactForm from '@/components/ui/panels/ContactForm'
import SocialLinks from '@/components/ui/panels/SocialLinks'
import { PROJECTS } from '@/config/projects'
import ScanlineOverlay from './ScanlineOverlay'

// About content — same data as AboutContent.tsx so desktop and mobile never diverge.
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

const INTERESTS = '3D art, game dev experiments, lo-fi music production, cycling.'

const REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

export default function MobileLayout() {
  return (
    <>
      <ScanlineOverlay />
      <main
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg)',
          color: 'var(--color-amber)',
          fontFamily: 'var(--font-mono)',
          padding: '24px',
          position: 'relative',
          zIndex: 0,
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Hero */}
          <motion.section {...REVEAL} style={{ paddingTop: 48, paddingBottom: 48 }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 600,
                lineHeight: 1.1,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              JORDAN&apos;S PORTFOLIO
            </h1>
            <p style={{ fontSize: 14, opacity: 0.5, marginTop: 8 }}>
              Software engineer &amp; 3D web explorer.
            </p>
            <div
              style={{
                height: 1,
                background: 'rgba(255,179,71,0.3)',
                marginTop: 24,
              }}
            />
          </motion.section>

          {/* About */}
          <motion.section
            {...REVEAL}
            aria-labelledby="mobile-about-heading"
            style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            <h2
              id="mobile-about-heading"
              style={{ fontSize: 20, fontWeight: 600, margin: 0, textTransform: 'uppercase' }}
            >
              ABOUT
            </h2>
            <ExperienceTimeline entries={EXPERIENCE} />
            <SkillTags skills={SKILLS} interests={INTERESTS} />
          </motion.section>

          {/* Projects */}
          <motion.section
            {...REVEAL}
            aria-labelledby="mobile-projects-heading"
            style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            <h2
              id="mobile-projects-heading"
              style={{ fontSize: 20, fontWeight: 600, margin: 0, textTransform: 'uppercase' }}
            >
              PROJECTS
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.title} {...p} isLast={i === PROJECTS.length - 1} />
              ))}
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section
            {...REVEAL}
            aria-labelledby="mobile-contact-heading"
            style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            <h2
              id="mobile-contact-heading"
              style={{ fontSize: 20, fontWeight: 600, margin: 0, textTransform: 'uppercase' }}
            >
              CONTACT
            </h2>
            <ContactForm />
            <SocialLinks />
          </motion.section>

          {/* Footer */}
          <footer
            style={{
              marginTop: 32,
              paddingTop: 32,
              paddingBottom: 32,
              fontSize: 12,
              opacity: 0.3,
              textAlign: 'center',
            }}
          >
            © 2025 Jordan Leis · Built with React + Three.js
          </footer>
        </div>
      </main>
    </>
  )
}
