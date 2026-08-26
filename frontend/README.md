# Makhana Website Frontend

The customer-facing application is built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## Runtime Structure

Next.js discovers routing from the root `app` and `pages` directories. Reusable frontend modules are organized in this folder:

- `app` - App Router pages and the global stylesheet
- `frontend/components` - Reusable UI sections and controls
- `frontend/context` - Shared React context providers
- `frontend/hooks` - Reusable client-side hooks
- `frontend/lib` - Frontend utility and integration code
- `frontend/store` - Client state stores
- `frontend/types` - Shared frontend TypeScript types
- `frontend/utils` - Frontend utility functions
- `public` - Static images and other public assets

The API bridge remains in `pages/api` and forwards requests to the backend in `backend/server`.

## Main Pages

- `/` - Home page
- `/about` - Company and brand information
- `/products` - Product catalog
- `/contact` - Contact form and company contact details

## Development

Run the frontend from the project root with:

```bash
npm run dev
```

Keep browser-only logic in client components or hooks, and keep secrets in environment files rather than in frontend code. Public environment variables must use the `NEXT_PUBLIC_` prefix.

For a separate Render backend, set `NEXT_PUBLIC_API_URL` in the frontend deployment environment to the Render service URL, for example `https://your-backend.onrender.com`. The current default is `https://makhana-website-faue.onrender.com`, so review requests work even when the frontend variable has not been added yet.
