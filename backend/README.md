# Makhana Website Backend

The application backend runs from `backend/server` and is used by the Next.js API entrypoints. This folder contains the backend runtime, database documentation, environment templates, and future backend-only tooling.

## Current Runtime

- Framework: Express with TypeScript
- Database: MongoDB
- ODM: Mongoose
- API entrypoint: `backend/server/server.ts`
- API routes: `backend/server/routes`
- Mongoose models: `backend/server/models`
- Database connection and product seeding: `backend/server/dbUtils.ts`

## Database Concepts

The database is document-oriented. Each business concept is stored as a MongoDB collection and is represented by a Mongoose model. Orders contain embedded order items so that the purchased name, grade, size, price, and quantity remain stable even if a product changes later.

See [database/schema.md](database/schema.md) for the collection design and relationships.

## Environment

Copy `backend/.env.example` to `backend/.env.local` and fill in the required values. Set `MONGODB_URI` to enable MongoDB. When it is missing or unavailable, the application uses its existing in-memory fallback behavior for supported routes.

Do not commit secrets or local database credentials. Keep environment-specific values in `.env.local` or the deployment environment.

## Deploy On Render

Create a Render Web Service using the repository root as the root directory:

- Build command: `npm install`
- Start command: `npm run backend:start`
- Health check path: `/health`

Add `MONGODB_URI` and any notification credentials in Render's environment settings. Render supplies `PORT` automatically; the server binds to that value.
