import { useEffect, useMemo, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import './App.css'
import { projects } from './data/projects'

const siteName = "Braeden Derkatz's Portfolio"

function normalizePath(path: string): string {
  const cleaned = path.replace(/\/+$/, '')
  return cleaned === '' ? '/' : cleaned
}

function getProjectSlug(pathname: string): string | null {
  if (!pathname.startsWith('/projects/')) {
    return null
  }

  return pathname.replace('/projects/', '').trim() || null
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
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}

function HomePage() {
  return (
    <>
      <header className="hero">
        <p className="eyebrow">Developer Portfolio</p>
        <h1>{siteName}</h1>
        <p className="hero-copy">
          A curated set of projects, each with its own page, context, and source
          repository.
        </p>
      </header>

      <main className="projects-grid" aria-label="Project list">
        {projects.map((project) => (
          <article key={project.slug} className="project-card">
            <p className="meta-line">
              <span>{project.year}</span>
              <span>{project.status}</span>
            </p>
            <h2>{project.name}</h2>
            <p>{project.tagline}</p>
            <ul className="tag-list" aria-label={`${project.name} technologies`}>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <div className="card-actions">
              <InternalLink href={`/projects/${project.slug}`} className="button">
                View Project Page
              </InternalLink>
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                Repository
              </a>
            </div>
          </article>
        ))}
      </main>

      <section className="add-project-note" aria-labelledby="add-project-heading">
        <h2 id="add-project-heading">How To Add A New Project</h2>
        <p>
          Add one object to <code>src/data/projects.ts</code> with a unique
          <code>slug</code>. The homepage and the project detail page are created
          automatically.
        </p>
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

      <header className="project-header">
        <p className="eyebrow">{project.year}</p>
        <h1>{project.name}</h1>
        <p>{project.summary}</p>
      </header>

      <section className="project-section">
        <h2>Highlights</h2>
        <ul>
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="project-section">
        <h2>Tech Stack</h2>
        <ul className="tag-list">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>

      <section className="project-section links">
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
  const [pathname, setPathname] = useState(() =>
    normalizePath(window.location.pathname),
  )

  useEffect(() => {
    const onPathChange = () => {
      setPathname(normalizePath(window.location.pathname))
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('popstate', onPathChange)
    return () => window.removeEventListener('popstate', onPathChange)
  }, [])

  useEffect(() => {
    document.title = siteName
  }, [])

  const projectSlug = useMemo(() => getProjectSlug(pathname), [pathname])

  return (
    <div className="app-shell">
      {pathname === '/' ? <HomePage /> : null}
      {pathname !== '/' && projectSlug ? <ProjectPage slug={projectSlug} /> : null}
      {pathname !== '/' && !projectSlug ? <NotFoundPage /> : null}
    </div>
  )
}

export default App
