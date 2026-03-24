import { useEffect, useMemo, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import './App.css'
import { projects } from './data/projects'
import { siteProfile } from './data/site'

const siteName = siteProfile.siteTitle
const emailHref = `mailto:${siteProfile.contactEmail}?subject=${encodeURIComponent('Portfolio inquiry')}`

function normalizeRoute(route: string): string {
  const cleaned = route.trim().replace(/^#/, '').replace(/\/+$/, '')
  return cleaned === '' ? '/' : cleaned
}

function getCurrentRoute(): string {
  return normalizeRoute(window.location.hash || '/')
}

function getProjectSlug(route: string): string | null {
  if (!route.startsWith('/projects/')) {
    return null
  }

  return route.replace('/projects/', '').trim() || null
}

type InternalLinkProps = {
  href: string
  className?: string
  children: ReactNode
}

function InternalLink({ href, className, children }: InternalLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }

    event.preventDefault()
    window.location.hash = href === '/' ? '/' : href
  }

  return (
    <a href={`#${href}`} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}

type HomePageProps = {
  activeTechnology: string
  onTechnologyChange: (technology: string) => void
}

function HomePage({ activeTechnology, onTechnologyChange }: HomePageProps) {
  const technologies = useMemo(
    () => [
      'All',
      ...new Set(projects.flatMap((project) => project.technologies)),
    ],
    [],
  )

  const visibleProjects = useMemo(() => {
    if (activeTechnology === 'All') {
      return projects
    }

    return projects.filter((project) =>
      project.technologies.includes(activeTechnology),
    )
  }, [activeTechnology])

  const featuredProjects = visibleProjects.filter((project) => project.featured)

  return (
    <>
      <header className="site-header panel">
        <div>
          <p className="eyebrow">Portfolio</p>
          <p className="site-title">{siteProfile.name}</p>
        </div>
        <nav className="site-nav" aria-label="External links">
          <a href={siteProfile.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={siteProfile.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={emailHref} title={siteProfile.contactEmail} aria-label={`Email ${siteProfile.contactEmail}`}>
            {siteProfile.contactEmail}
          </a>
        </nav>
      </header>

      <section className="hero panel">
        <div className="hero-copy-block">
          <p className="eyebrow">Developer Portfolio</p>
          <h1>{siteName}</h1>
          <p className="hero-copy">{siteProfile.intro}</p>
          <p className="hero-support">{siteProfile.availability}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Browse Projects
            </a>
            <a className="button" href={siteProfile.githubUrl} target="_blank" rel="noreferrer">
              View GitHub
            </a>
          </div>
        </div>

        <div className="hero-aside panel inset-panel">
          <p className="eyebrow">At A Glance</p>
          <p className="hero-role">{siteProfile.role}</p>
          <p className="hero-location">{siteProfile.location}</p>
          <dl className="facts-grid">
            {siteProfile.quickFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-block" id="projects">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2>Projects With Separate Detail Pages</h2>
          </div>
          <p className="section-copy">
            Filter by technology to keep the portfolio easy to browse as the list grows.
          </p>
        </div>

        <div className="filter-bar" aria-label="Project filters">
          {technologies.map((technology) => (
            <button
              key={technology}
              type="button"
              className={technology === activeTechnology ? 'filter-chip is-active' : 'filter-chip'}
              onClick={() => onTechnologyChange(technology)}
            >
              {technology}
            </button>
          ))}
        </div>

        {featuredProjects.length > 0 ? (
          <div className="featured-strip" aria-label="Featured projects">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="featured-card panel inset-panel">
                <p className="eyebrow">Featured</p>
                <h3>{project.name}</h3>
                <p>{project.tagline}</p>
                <InternalLink href={`/projects/${project.slug}`} className="text-link">
                  Open project page
                </InternalLink>
              </article>
            ))}
          </div>
        ) : null}

        <main className="projects-grid" aria-label="Project list">
          {visibleProjects.map((project) => (
            <article key={project.slug} className="project-card panel">
              <div className="card-topline">
                <p className="meta-line">
                  <span>{project.year}</span>
                  <span>{project.status}</span>
                </p>
                {project.featured ? <span className="status-badge">Featured</span> : null}
              </div>
              <h3>{project.name}</h3>
              <p>{project.tagline}</p>
              <p className="card-summary">{project.summary}</p>
              <ul className="tag-list" aria-label={`${project.name} technologies`}>
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <div className="card-actions">
                <InternalLink href={`/projects/${project.slug}`} className="button button-primary">
                  View Project
                </InternalLink>
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button">
                    Open App
                  </a>
                ) : null}
                <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                  Repository
                </a>
              </div>
            </article>
          ))}
        </main>
      </section>

      <section className="section-block">
        <div className="panel approach-panel">
          <p className="eyebrow">How I Work</p>
          <h2>Approach</h2>
          <div className="focus-list">
            {siteProfile.focusAreas.map((item) => (
              <article key={item.title} className="focus-card inset-panel">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

type ProjectPageProps = {
  slug: string
}

function ProjectPage({ slug }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <section className="not-found">
        <h1>Project Not Found</h1>
        <p>The requested project page does not exist yet.</p>
        <InternalLink href="/" className="button">
          Back To Portfolio
        </InternalLink>
      </section>
    )
  }

  return (
    <main className="project-page">
      <InternalLink href="/" className="back-link">
        Back To All Projects
      </InternalLink>

      <header className="project-header panel">
        <div>
          <p className="eyebrow">{project.year}</p>
          <h1>{project.name}</h1>
          <p>{project.summary}</p>
        </div>
        <div className="project-actions">
          <span className="status-badge">{project.status}</span>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          ) : null}
          <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
            Open Repository
          </a>
        </div>
      </header>

      <section className="project-layout">
        <aside className="project-sidebar panel">
          <h2>Project Info</h2>
          <dl className="project-facts">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
          </dl>
          <h2>Stack</h2>
          <ul className="tag-list">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </aside>

        <div className="project-content">
          <section className="project-section panel">
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </section>

          <section className="project-section panel">
            <h2>Highlights</h2>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>

          <section className="project-section panel">
            <h2>Outcome</h2>
            <p>{project.outcome}</p>
          </section>
        </div>
      </section>

      <section className="project-section links panel">
        <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
          Open Repository
        </a>
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        ) : null}
      </section>
    </main>
  )
}

function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>Page Not Found</h1>
      <p>This route is not part of the portfolio.</p>
      <InternalLink href="/" className="button">
        Back To Portfolio
      </InternalLink>
    </section>
  )
}

function App() {
  const [route, setRoute] = useState(getCurrentRoute)
  const [activeTechnology, setActiveTechnology] = useState('All')

  useEffect(() => {
    const onRouteChange = () => {
      setRoute(getCurrentRoute())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('hashchange', onRouteChange)
    return () => window.removeEventListener('hashchange', onRouteChange)
  }, [])

  useEffect(() => {
    const currentProject = projects.find((project) => project.slug === getProjectSlug(route))
    document.title = currentProject ? `${currentProject.name} | ${siteName}` : siteName
  }, [route])

  const projectSlug = useMemo(() => getProjectSlug(route), [route])

  return (
    <div className="app-shell">
      {route === '/' ? (
        <HomePage
          activeTechnology={activeTechnology}
          onTechnologyChange={setActiveTechnology}
        />
      ) : null}
      {route !== '/' && projectSlug ? <ProjectPage slug={projectSlug} /> : null}
      {route !== '/' && !projectSlug ? <NotFoundPage /> : null}
    </div>
  )
}

export default App
