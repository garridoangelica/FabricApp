# Backup Vault Explorer

A React web app for viewing and searching backup data (PDF files), designed for embedding in a Microsoft Fabric workload.

## Features

- **Dashboard** — Summary cards, charts (category distribution, status, backup trend), and recent files
- **Data Table** — Searchable, sortable, filterable table of all backup PDFs
- **Search Agent** — Chat interface to find documents using natural language queries
- **Examples** — Use-case cards showing what you can do with your backup data
- **Dark/Light mode** toggle

## Tech Stack

- React 18 + TypeScript
- Vite
- Fluent UI React v9 (Microsoft design system)
- Recharts (charts)
- React Router

## Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Docker

```bash
docker build -t fabricapp .
docker run -p 80:80 fabricapp
```

The app is served at `http://localhost`.
