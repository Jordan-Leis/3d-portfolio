export interface Project {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  inProgress?: boolean
}

/**
 * Featured portfolio entries. Source: Jordan's GitHub (Jordan-Leis).
 * Order in this array IS the render order in both the desktop panel and the mobile
 * layout. Most impressive / recent work appears first.
 *
 * Per 04-UI-SPEC.md: 3–5 entries. Title Case titles. ALL CAPS tech tags. Real URLs.
 */
export const PROJECTS: Project[] = [
  {
    title: '3D Portfolio',
    description:
      'An immersive vintage-desk 3D scene built with React Three Fiber, GSAP camera animations, and a Zustand-driven interaction model. Desktop visitors get the CRT-aesthetic experience; mobile visitors get a full 2D scrollable fallback.',
    techStack: ['REACT', 'TS', 'THREE.JS', 'R3F', 'GSAP', 'ZUSTAND', 'VITE'],
    githubUrl: 'https://github.com/Jordan-Leis/3d-portfolio',
    demoUrl: 'https://jordaniscool.github.io/3d-portfolio/',
    inProgress: true,
  },
  {
    title: 'Microgrid-RL',
    description:
      'A 150-run comparative study benchmarking six deep reinforcement learning algorithms for autonomous energy management in off-grid solar + battery + diesel microgrids across sub-Saharan Africa. Trained on five years of real NASA POWER climate data; accompanied by an IEEE paper showing DDPG achieves 23% lower diesel consumption than competing methods.',
    techStack: ['PYTHON', 'RL', 'PYTORCH', 'PANDAS', 'NASA-API'],
    githubUrl: 'https://github.com/Jordan-Leis/Microgrid-RL',
  },
  {
    title: 'Linkedin Cracked',
    description:
      'A Next.js application that uses Puppeteer and PDF parsing to extract and analyse LinkedIn profile data. Built with Supabase for authentication and data persistence, with a Radix UI interface for reviewing parsed results.',
    techStack: ['NEXT.JS', 'TS', 'SUPABASE', 'PUPPETEER', 'RADIX'],
    githubUrl: 'https://github.com/Jordan-Leis/Linkedin-Cracked',
    demoUrl: 'https://linkedin-cracked.vercel.app',
  },
  {
    title: 'Coursify',
    description:
      'A production MVP for planning University of Waterloo Engineering courses term by term. Students can map out their full degree plan, track prerequisites, and see which courses are available each term. Built with Next.js 14 App Router, Supabase Auth + Postgres, and deployed on Vercel.',
    techStack: ['NEXT.JS', 'TS', 'SUPABASE', 'POSTGRES', 'TAILWIND'],
    githubUrl: 'https://github.com/Jordan-Leis/Course-Selector',
    demoUrl: 'https://coursify-iota.vercel.app',
  },
]
