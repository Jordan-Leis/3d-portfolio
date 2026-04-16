import type { CSSProperties } from 'react'
import { PROJECTS } from '@/config/projects'
import ProjectCard from '@/components/ui/panels/ProjectCard'

const emptyStateStyle: CSSProperties = {
  textAlign: 'center',
  fontSize: 14,
  color: 'rgba(255,179,71,0.5)',
  fontFamily: 'var(--font-mono)',
}

export default function ProjectsContent() {
  if (PROJECTS.length === 0) {
    // Defensive only — PROJECTS should never be empty in production per PROJ-01.
    return <p style={emptyStateStyle}>NO PROJECTS TO DISPLAY YET.</p>
  }

  return (
    <div>
      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.title}
          {...project}
          isLast={i === PROJECTS.length - 1}
        />
      ))}
    </div>
  )
}
