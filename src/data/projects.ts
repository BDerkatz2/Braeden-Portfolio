export type Project = {
  slug: string
  name: string
  tagline: string
  summary: string
  year: string
  role: string
  status: 'In Progress' | 'Completed' | 'Archived'
  featured: boolean
  technologies: string[]
  highlights: string[]
  problem: string
  outcome: string
  repositoryUrl: string
  liveUrl?: string
}

// Add new projects here. The homepage and /projects/:slug page are generated automatically.
export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    name: "Braeden Derkatz's Portfolio",
    tagline: 'A scalable portfolio site built to showcase project work cleanly.',
    summary:
      'A portfolio website designed around reusable project data so new work can be added without rebuilding the layout each time.',
    year: '2026',
    role: 'Designer and developer',
    status: 'In Progress',
    featured: true,
    technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
    highlights: [
      'Generated separate project pages from a central data file.',
      'Created a more editorial visual direction instead of a default template look.',
      'Structured content so future repositories can be added with minimal edits.',
    ],
    problem:
      'A portfolio should stay easy to maintain as the number of repositories grows, not become a collection of hand-made pages that drift out of sync.',
    outcome:
      'This site now supports a repeatable project workflow with one shared data model, individual detail pages, and a homepage that stays organized as more work is added.',
    repositoryUrl: 'https://github.com/BDerkatz2/Braeden-Portfolio',
  },
  {
    slug: 'job-tracker-ai-tailor',
    name: 'Job Tracker AI Tailor',
    tagline: 'Full-stack job tracking platform with AI-assisted resume and cover letter tailoring.',
    summary:
      'A job application tracker that combines workflow management, analytics, and local AI tooling to help organize applications and tailor materials faster.',
    year: '2026',
    role: 'Full-stack developer',
    status: 'In Progress',
    featured: true,
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'Ollama', 'Chrome Extension'],
    highlights: [
      'Tracks job applications with status, company, role, notes, and Kanban board views.',
      'Includes AI-powered resume and cover letter suggestions using Ollama with Llama 3.1:8b.',
      'Adds a Chrome extension to capture job postings directly into the tracker.',
    ],
    problem:
      'Managing applications across multiple sites gets messy quickly, and tailoring resumes or cover letters manually for every posting takes too much time.',
    outcome:
      'This project centralizes job search workflow into one platform, combining application tracking, analytics, and local AI assistance with a browser capture flow.',
    repositoryUrl: 'https://github.com/BDerkatz2/Job-Tracker-AI-tailor',
    liveUrl: 'https://job-tracker-ai-tailor.onrender.com/',
  },
  {
    slug: 'crypto-tracker',
    name: 'Crypto Tracker',
    tagline: 'Full-stack cryptocurrency tracking app with portfolio analytics and caching.',
    summary:
      'A comprehensive crypto tracking application with a FastAPI backend, React frontend, Redis caching, and interactive portfolio insights.',
    year: '2026',
    role: 'Full-stack developer',
    status: 'Completed',
    featured: true,
    technologies: ['Python', 'FastAPI', 'React', 'Redis', 'SQLite', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Recharts'],
    highlights: [
      'Searches and tracks cryptocurrencies using CoinGecko-powered market data.',
      'Provides portfolio analytics, watchlists, and interactive data visualizations.',
      'Uses Redis caching and Dockerized services to improve performance and local development setup.',
    ],
    problem:
      'Crypto tools need to balance responsive frontend visuals with reliable backend data handling, especially when pulling market data repeatedly from external APIs.',
    outcome:
      'This application combines live market exploration, personal portfolio tracking, and backend caching into one cohesive full-stack product.',
    repositoryUrl: 'https://github.com/BDerkatz2/crypto-tracker',
    liveUrl: 'https://crypto-tracker-1-kfyi.onrender.com/#dashboard',
  },
  {
    slug: 'weather-app',
    name: 'Weather App',
    tagline: 'Responsive weather app with neon styling, geolocation, and 7-day forecasting.',
    summary:
      'A frontend weather experience focused on clear state handling, modern styling, and fast access to local forecast information.',
    year: '2026',
    role: 'Frontend developer',
    status: 'Completed',
    featured: false,
    technologies: ['React', 'TypeScript', 'Vite', 'CSS', 'OpenWeather API', 'Geolocation'],
    highlights: [
      'Supports city search and browser geolocation lookup.',
      'Includes responsive layout, loading skeletons, and explicit error handling.',
      'Lets users work with auto-detected units and manual unit switching.',
    ],
    problem:
      'Weather apps are common, but they often feel generic or fail to communicate loading, fallback, and responsive states clearly.',
    outcome:
      'This project turns a familiar app idea into a more polished frontend build with stronger visual direction and better state-driven UX.',
    repositoryUrl: 'https://github.com/BDerkatz2/Weather-App',
    liveUrl: 'https://weather-app-nine-eta-50.vercel.app',
  },
  {
    slug: 'budget-tracker',
    name: 'Budget Tracker',
    tagline: 'Personal finance tracker for accounts, budgets, transactions, and savings goals.',
    summary:
      'A budgeting application with authentication, transaction management, recurring items, CSV workflows, and monthly spending summaries.',
    year: '2026',
    role: 'Full-stack developer',
    status: 'Completed',
    featured: false,
    technologies: ['JavaScript', 'Node.js', 'JWT', 'SQLite', 'HTML', 'CSS'],
    highlights: [
      'Implements CRUD flows for accounts, categories, budgets, and transactions.',
      'Supports filters, search, pagination, recurring payments, and savings goals.',
      'Includes CSV import/export and monthly spending summary charts.',
    ],
    problem:
      'Budgeting tools need to support recurring financial workflows and reporting, not just simple transaction entry.',
    outcome:
      'This project packages core personal finance features into a manageable application with authentication, reporting, and structured data entry flows.',
    repositoryUrl: 'https://github.com/BDerkatz2/BUDGET-TRACKER',
    liveUrl: 'https://budget-tracker-1-bz5u.onrender.com/',
  },
]
