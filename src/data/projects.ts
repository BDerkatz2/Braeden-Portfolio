export type Project = {
  slug: string
  name: string
  tagline: string
  summary: string
  year: string
  status: 'In Progress' | 'Completed' | 'Archived'
  technologies: string[]
  highlights: string[]
  repositoryUrl: string
  liveUrl?: string
}

// Add new projects here. The homepage and /projects/:slug page are generated automatically.
export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    name: "Braeden Derkatz's Portfolio",
    tagline: 'Personal portfolio site for showcasing full project write-ups.',
    summary:
      'A portfolio website designed to keep project documentation in one place and make new additions fast.',
    year: '2026',
    status: 'In Progress',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
    highlights: [
      'Data-driven project pages generated from a single file.',
      'Custom responsive layout with a bold editorial style.',
      'Simple structure built for ongoing repository additions.',
    ],
    repositoryUrl: 'https://github.com/your-username/portfolio-website',
  },
  {
    slug: 'project-placeholder-1',
    name: 'Project Placeholder 1',
    tagline: 'Swap this with one of your current repositories.',
    summary:
      'Use this slot for your next project by updating title, slug, links, and highlights.',
    year: '2025',
    status: 'Completed',
    technologies: ['Node.js', 'Express', 'PostgreSQL'],
    highlights: [
      'Document the core problem your project solves.',
      'Highlight a technical decision you are proud of.',
      'Summarize measurable outcomes if available.',
    ],
    repositoryUrl: 'https://github.com/your-username/project-placeholder-1',
    liveUrl: 'https://example.com',
  },
  {
    slug: 'project-placeholder-2',
    name: 'Project Placeholder 2',
    tagline: 'Another repository entry for your portfolio list.',
    summary:
      'Use this as a starting pattern when adding each new repository to your portfolio.',
    year: '2024',
    status: 'Completed',
    technologies: ['Python', 'FastAPI', 'Docker'],
    highlights: [
      'Each project gets its own route under /projects/slug.',
      'Tech stack badges are generated from the data array.',
      'Repository and live links are shown automatically.',
    ],
    repositoryUrl: 'https://github.com/your-username/project-placeholder-2',
  },
]
