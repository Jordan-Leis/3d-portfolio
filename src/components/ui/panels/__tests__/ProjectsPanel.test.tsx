import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsPanel from '@/components/ui/panels/ProjectsPanel'
import { useStore } from '@/store/useStore'
import { PROJECTS } from '@/config/projects'

function resetStore() {
  useStore.setState({
    activePanel: null,
    cameraPreset: 'home',
    cameraTransitioning: false,
    hoveredObject: null,
  })
}

describe('ProjectsPanel content (Phase 4)', () => {
  beforeEach(resetStore)

  it('Phase 3 regression: renders PROJECTS h2 and close button', () => {
    useStore.setState({ activePanel: 'projects' })
    render(<ProjectsPanel />)
    expect(screen.getByRole('heading', { name: 'PROJECTS' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeInTheDocument()
  })

  it('PROJ-01: renders between 3 and 5 project card articles', () => {
    useStore.setState({ activePanel: 'projects' })
    const { container } = render(<ProjectsPanel />)
    const articles = container.querySelectorAll('article')
    expect(articles.length).toBeGreaterThanOrEqual(3)
    expect(articles.length).toBeLessThanOrEqual(5)
    // And it matches the config:
    expect(articles.length).toBe(PROJECTS.length)
  })

  it('PROJ-02: each rendered card has a heading with title from config', () => {
    useStore.setState({ activePanel: 'projects' })
    render(<ProjectsPanel />)
    for (const project of PROJECTS) {
      expect(
        screen.getByRole('heading', { level: 3, name: new RegExp(project.title) }),
      ).toBeInTheDocument()
    }
  })

  it('PROJ-02: every non-inProgress project has at least one external link', () => {
    useStore.setState({ activePanel: 'projects' })
    render(<ProjectsPanel />)
    for (const project of PROJECTS) {
      if (project.inProgress) continue
      const hasLink = Boolean(project.githubUrl) || Boolean(project.demoUrl)
      expect(hasLink).toBe(true)
    }
  })

  it('PROJ-02: all external links use target="_blank" rel="noopener noreferrer"', () => {
    useStore.setState({ activePanel: 'projects' })
    render(<ProjectsPanel />)
    const links = screen.getAllByRole('link')
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      // Must be absolute https URL
      expect(link.getAttribute('href')).toMatch(/^https:\/\//)
    }
  })

  it('PROJ-02: each card renders at least one tech-stack tag', () => {
    useStore.setState({ activePanel: 'projects' })
    render(<ProjectsPanel />)
    for (const project of PROJECTS) {
      expect(project.techStack.length).toBeGreaterThanOrEqual(1)
      const list = screen.getByRole('list', { name: `${project.title} tech stack` })
      expect(list.querySelectorAll('[role="listitem"]').length).toBe(
        project.techStack.length,
      )
    }
  })
})
