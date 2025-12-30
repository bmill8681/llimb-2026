# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

This is a Next.js 16 project using the App Router pattern with:
- **React 19** and **TypeScript**
- **Tailwind CSS v4** (configured via `@tailwindcss/postcss` plugin)
- **Motion** Animation package
- **React Icons** Icon library
- **Geist font** family (sans and mono variants via `next/font`)

This project is a project showcase webapp showcasing games and services provided by the company LLimb Games.

### Project Structure

- `app/` - App Router pages and layouts
  - `components/` - Reusable components (each in its own folder)
    - `AboutUs/` - About section for home page
    - `Button/` - Reusable link button with icon support
    - `Footer/` - Page footer with contact and podcast links
    - `GameCard/` - Card displaying game info with image, description, status, Steam link
    - `GameShowcase/` - Container for GameCards on home page
    - `Header/` - Full-screen hero header with textured background
    - `ImageCarouselModal/` - Modal for viewing images in a carousel
    - `JammersTeaser/` - Promo section for Jammers Podcast
    - `NavBar/` - Responsive navigation with hamburger menu
    - `PrototypeCard/` - Card for game prototype with image, description, project link
    - `PrototypeList/` - List of PrototypeCards from data
    - `Service/` - Accordion component for service details
    - `ServiceImage/` - Clickable image thumbnail for services
    - `ServicesList/` - List of Service accordions from data
    - `ServicesTeaser/` - Teaser section linking to services page
  - `data/` - JSON data files
    - `games.json` - Game data (title, description, imageUrl, steamUrl, status, mainShowcase)
    - `prototypes.json` - Prototype data (title, description, projectUrl, imageUrl, visible)
    - `services.json` - Services data (title, description, images)
  - `games/` - Games page route
    - `page.tsx` - Lists all games and prototypes
  - `services/` - Services page route
    - `page.tsx` - Services page with accordion list
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Home page
  - `globals.css` - Global styles with Tailwind and CSS custom properties
- `public/` - Static assets
  - `games/` - Game images
  - `prototypes/` - Prototype images
  - `services/` - Service images

### Project Rules
- New components should be created in a new forlder for that component
- Never use default exports. Always use named exports. 

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).

### Styling

Tailwind v4 is used with CSS-first configuration in `globals.css`:
- Theme colors defined as CSS custom properties (`--background`, `--foreground`)
- Dark mode via `prefers-color-scheme` media query
- Custom theme values registered via `@theme inline`
