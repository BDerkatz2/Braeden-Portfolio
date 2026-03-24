# Braeden Derkatz's Portfolio

Portfolio website built with React, TypeScript, and Vite.

## Features

- Homepage listing all projects from one data file
- Separate page URL for each project: /projects/your-slug
- Easy add-new-project workflow by editing one file

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Add A New Project

Edit src/data/projects.ts and add a new object to the projects array.

Required fields:

- slug: unique url value used for /projects/slug
- name
- tagline
- summary
- year
- status
- technologies
- highlights
- repositoryUrl

Optional field:

- liveUrl

Once you add an object, the homepage card and individual project page are generated automatically.

## Important Deployment Note

This app uses client-side routing. If deployed to static hosting, configure a fallback rewrite so all routes serve index.html.
