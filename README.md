# Holidaze - Venue Booking Platform (Project Exam 2)

Welcome to Holidaze, a Next.js application for discovering and booking unique venues. This platform allows users to register, browse venues, manage their bookings, and for venue managers, to list and manage their properties. The project is built with a strong emphasis on Server-Side Rendering (SSR) and modern Next.js features for optimal performance and user experience. Accessibility and SEO is a top priority as well as speed. Careful considerations have been made to limit the amount of js needed for initial load.

## Features

- User Authentication: Secure registration and login for users and venue managers.
- Venue Discovery: Browse, search, and filter a diverse range of venues.
- Booking System: Seamlessly book venues for desired dates.
- Profile Management: Users can view their bookings and manage their profile information.
- Venue Management (for Venue Managers): Create, view, update, and delete venues. Manage bookings for their listed properties.
- Server-Centric Architecture: Leverages Next.js App Router with React Server Components for enhanced performance and SEO.
- Secure API Interaction: Handles communication with an external (Noroff) API for core data.

## Live Demo

[Holidaze](https://holidaze-two-steel.vercel.app/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.18.0 or later recommended)
- npm, yarn, pnpm, or bun

### Environment Variables

Before running the application, you'll need to set up your environment variables. Either copy the provided .env.local to the root or Create a .env.local file in the root of the project and add the following variables:

```env
Base URL for your application (e.g., http://localhost:3000 for development)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
Base URL for the Noroff API
NEXT_PUBLIC_API_BASE_URL=https://v2.api.noroff.dev
API Key for the external Noroff API
EXTERNAL_API_KEY=your_noroff_api_key_here
Google Maps API Key (Needed for displaying maps for venue managers that have displayed LAT and LNG)
Maps_API_KEY=your_Maps_api_key_here
```

Replace your_noroff_api_key_here and your_Maps_api_key_here with your actual API keys.

### Installation

Clone the repo:

```bash
 git clone https://github.com/Oyvindeavor/project-exam-2.git
```

Navigate to the project directory:

```bash
cd project-exam-2
```

Install NPM packages:

```bash
npm install
or
yarn install
or
pnpm install
or
bun install
```

### Running the Development Server

Execute one of the following commands to start the development server:

```bash
npm run dev
or
yarn dev
or
pnpm dev
or
bun dev
```

Open http://localhost:3000 with your browser to see the result.

## Available Scripts

- dev: Runs the app in development mode with Turbopack.
- build: Builds the app for production.
- start: Starts the production server.
- lint: Lints the project files.
- format: Formats the code using Prettier.
- format:check: Checks code formatting with Prettier.

## Technologies Used

- Framework: Next.js 15.2.5 (App Router)
- Language: TypeScript 5
- Styling: Sass & Bootstrap
- UI Components & Icons: Lucide React, Simple Icons
- Forms & Validation: React Hook Form (patterns)
- Mapping: @vis.gl/react-google-maps
- Date Handling: React Datepicker, date-fns
- Image Optimization: React Lazy Load Image Component (unfortunately next image cant be used effectively because of user provided image urls)
- Linting & Formatting: ESLint, Prettier

#### Key Directory Explanations:

- src/app/: Core of the application using the Next.js App Router.
- Subdirectories like auth, profile, venue define routes.
- layout.tsx defines the main HTML structure.
- api/ contains backend API route handlers.
- src/components/: Reusable React components, organized by functionality.
- src/styles/: Global SASS stylesheets (main.scss, \_variables.scss, \_custom.scss).
- src/types/: TypeScript interfaces for internal (MyApi) and external (NoroffApi) APIs.
- src/utils/: Helper functions, constants, and API interaction logic.
- api/: Functions for external Noroff API calls.
- auth/: Authentication utilities.
- constants/: API endpoints and base URLs.
- src/middleware.ts: Middleware for route protection.

## Authentication Flow

The application employs a robust token-based authentication system with a focus on server-side security:

- Login/Registration: Users authenticate via /api/auth/login or /api/auth/register which securely interact with the external Noroff API.
- Secure Cookies: Upon successful login, an accessToken, user name, and venueManager status are stored in browser cookies.
- The accessToken is HttpOnly (inaccessible to client-side JavaScript), Secure (in production), and SameSite=Strict for enhanced security.
- Middleware Protection: src/middleware.ts intercepts requests to protected routes, validating the accessToken (including its expiration) on the server. Unauthorized or expired sessions are redirected to the login page.
- Server-Side Utilities: Functions in src/utils/auth/ provide helpers for checking login status, retrieving authenticated headers for API calls, and fetching logged-in user data securely on the server.
- The user login data is cached and updated via revalidate when needed eg when users update the avatar, bio etc. Allowing for a ssr state and only one fetch on login for user data.

### Security Highlights:

- HttpOnly accessToken prevents XSS token theft.
- Secure cookies enforce HTTPS.
- SameSite=Strict protects against CSRF.
- Server-side token validation in middleware.
- External API key managed via environment variables.

## Server-Side Rendering (SSR) and Component Model

This project is architected with a server-first approach, leveraging Next.js's App Router and React Server Components (RSCs) to a great extent.

- Server Components by Default: Most components, especially pages and layouts within src/app/, are Server Components. They render on the server, fetching data directly using async/await before the page is sent to the client. This is critical for initial page load performance and SEO.
- For example, the homepage, venue listing pages, and individual venue detail pages all fetch their primary data server-side.
- Client Components for Interactivity: Components requiring browser APIs, state management (useState, useEffect), or event handling are explicitly marked with "use client";. This includes forms, interactive UI elements like carousels and dropdowns, and components that need to react to user input in real-time. These are hydrated on the client after the initial server render.
- API Routes & Server Actions:
- Backend logic for data fetching, mutations, and authentication is handled by server-side API Routes (src/app/api/) and Server Actions (functions marked with "use server";).
- Server Actions are used extensively for form submissions (e.g., creating a venue, booking a venue, updating a profile), allowing Client Components to directly call server-side logic without manual API endpoint setup.
- Benefits: This server-centric model improves Time to First Byte (TTFB), enhances SEO by providing fully rendered HTML to crawlers, and simplifies data fetching and mutation logic by co-locating it with server-side code.
