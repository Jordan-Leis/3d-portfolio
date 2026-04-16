import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ExperienceTimeline, {
  type ExperienceEntry,
} from '@/components/ui/panels/ExperienceTimeline'

const entries: ExperienceEntry[] = [
  { org: 'Acme', role: 'Senior Engineer', dates: '2024 – Present' },
  { org: 'Beta Corp', role: 'Engineer', dates: '2022 – 2024' },
  { org: 'Gamma LLC', role: 'Junior Engineer', dates: '2020 – 2022' },
]

describe('ExperienceTimeline (ABOUT-02)', () => {
  it('renders every entry in the passed order', () => {
    render(<ExperienceTimeline entries={entries} />)
    expect(screen.getByText('Acme')).toBeInTheDocument()
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument()
    expect(screen.getByText('2024 – Present')).toBeInTheDocument()
    expect(screen.getByText('Beta Corp')).toBeInTheDocument()
    expect(screen.getByText('Gamma LLC')).toBeInTheDocument()
  })

  it('renders the correct number of listitems (one per entry)', () => {
    render(<ExperienceTimeline entries={entries} />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(entries.length)
  })

  it('applies fontWeight 600 to role text and fontWeight 400 to org text', () => {
    render(<ExperienceTimeline entries={[entries[0]!]} />)
    const role = screen.getByText('Senior Engineer')
    const org = screen.getByText('Acme')
    expect(role.style.fontWeight).toBe('600')
    expect(org.style.fontWeight).toBe('400')
  })

  it('renders no bullet list when entry.bullets is undefined', () => {
    // No <ul> should be rendered when bullets missing
    const { container } = render(<ExperienceTimeline entries={[entries[0]!]} />)
    expect(container.querySelectorAll('ul').length).toBe(0)
  })

  it('renders bullet list when entry.bullets is provided', () => {
    const withBullets: ExperienceEntry = {
      ...entries[0]!,
      bullets: ['Shipped feature X', 'Scaled Y to 10M users'],
    }
    render(<ExperienceTimeline entries={[withBullets]} />)
    expect(screen.getByText('Shipped feature X')).toBeInTheDocument()
    expect(screen.getByText('Scaled Y to 10M users')).toBeInTheDocument()
  })
})
