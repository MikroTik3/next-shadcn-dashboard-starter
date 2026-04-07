# Next.js Dashboard starter with TypeScript & Shadcn UI

Admin Panel - features multiple dashboards, authentication layouts, customizable theme presets, and more.

<img src="https://github.com/MikroTik3/next-shadcn-dashboard-starter/blob/master/public/opengraph.png?version=5" alt="Opengraph Screenshot">

Most admin templates I came across-whether free or paid-felt bloated, outdated, or overly restrictive. I created this as a cleaner, more flexible alternative, adding features that are often missing, like theme switching and layout customization, while maintaining a modern and minimal design.

The design draws inspiration from various sources. If you’d like attribution for anything specific, feel free to open an issue or get in touch.

> **View demo:** [studio admin](https://next-shadcn-dashboard-starter.vercel.app)

> [!TIP]
> I’m also working on Nuxt.js, Svelte, and React (Vite + TanStack Router) versions of this dashboard. They’ll be live soon.

## Features

- Built with Next.js 16, TypeScript, Tailwind CSS v4, and Shadcn UI  
- Responsive and mobile-friendly  
- Flexible layouts (collapsible sidebar, variable content widths) 
- Authentication flows and screens
- Role-Based Access Control (RBAC) with config-driven UI and multi-tenant support *(planned)*  

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4  
- **UI Components**: Shadcn UI  
- **Validation**: Zod  
- **Tables & Data Handling**: TanStack Table  
- **Tooling & DX**: Eslint, Prettier, Husky  

## Screens

### Available
- Overview Dashboard  
- User Dashboard  
- Product Dashboard  
- Authentication

### Coming Soon
- Setting Page  
- Kanban Board  

## Getting Started

You can run this project locally, or deploy it instantly with Vercel.

### Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%MikroTik2%2Fnext-shadcn-dashboard-starter)

_Deploy your own copy with one click._

### Run locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/MikroTik2/next-shadcn-dashboard-starter.git
   ```
   
2. **Navigate into the project**
   ```bash
    cd next-shadcn-dashboard-starter
   ```
   
3. **Install dependencies**
   ```bash
    npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

Your app will be running at [http://localhost:3000](http://localhost:3000)

### Formatting and Linting

Format, lint, and organize imports
```bash
npm run format
```

---

> [!IMPORTANT]  
> This project is updated frequently. If you’re working from a fork or an older clone, pull the latest changes before syncing. Some updates may include breaking changes.

---
