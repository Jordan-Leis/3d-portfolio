import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/ui/panels/ProjectCard'

describe('ProjectCard (PROJ-02)', () => {
  const baseProps = {
    title: '3D Portfolio',
    description: 'A short description of the project in one or two sentences.',
    techStack: ['REACT', 'TS', 'THREE.JS'],
  }

  it('renders title in an h3 with fontWeight 600', () => {
    render(<ProjectCard {...baseProps} />)
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('3D Portfolio')
    expect(heading.style.fontWeight).toBe('600')
  })

  it('renders description text', () => {
    render(<ProjectCard {...baseProps} />)
    expect(
      screen.getByText('A short description of the project in one or two sentences.'),
    ).toBeInTheDocument()
  })

  it('renders each techStack item as a separate tag element', () => {
    render(<ProjectCard {...baseProps} />)
    const tagList = screen.getByRole('list', { name: '3D Portfolio tech stack' })
    const tags = tagList.querySelectorAll('[role="listitem"]')
    expect(tags).toHaveLength(3)
    expect(tagList).toHaveTextContent('REACT')
    expect(tagList).toHaveTextContent('TS')
    expect(tagList).toHaveTextContent('THREE.JS')
  })

  it('renders GitHub link with correct href, target, rel when githubUrl is provided', () => {
    render(
      <ProjectCard
        {...baseProps}
        githubUrl="https://github.com/example/repo"
      />,
    )
    const link = screen.getByRole('link', { name: /view source on GitHub/i })
    expect(link).toHaveAttribute('href', 'https://github.com/example/repo')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveTextContent('VIEW SOURCE →')
  })

  it('renders Demo link with correct attributes when demoUrl is provided', () => {
    render(
      <ProjectCard {...baseProps} demoUrl="https://example.com/demo" />,
    )
    const link = screen.getByRole('link', { name: /live demo/i })
    expect(link).toHaveAttribute('href', 'https://example.com/demo')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveTextContent('LIVE DEMO →')
  })

  it('renders both links when both URLs are provided', () => {
    render(
      <ProjectCard
        {...baseProps}
        githubUrl="https://github.com/example/repo"
        demoUrl="https://example.com/demo"
      />,
    )
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('renders "[IN PROGRESS]" label when inProgress is true', () => {
    render(<ProjectCard {...baseProps} inProgress />)
    expect(screen.getByText('[IN PROGRESS]')).toBeInTheDocument()
  })

  it('omits "[IN PROGRESS]" when inProgress is false or undefined', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.queryByText('[IN PROGRESS]')).toBeNull()
  })

  it('omits the links row entirely when both githubUrl and demoUrl are undefined', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })
})
