
# IHRC Paramedical College Website

This is the official website for IHRC Paramedical College, built with Next.js, TypeScript, Tailwind CSS, and Prisma. It provides information about the college, admissions, notices, results, and an admin dashboard for managing applicants and content.

## Features

- Modern, responsive design with Tailwind CSS
- Admissions application form with file uploads
- Admin dashboard for managing applicants, notices, and results
- Results publishing and search
- Fee payment integration (Razorpay)
- Email notifications for admissions
- Secure admin authentication

## Getting Started

1. Install dependencies:
	```bash
	npm install
	```
2. Set up your `.env` file with the required environment variables:
	- `DATABASE_URL` (for Prisma/SQLite)
	- `ADMIN_SESSION_SECRET`
	- `EMAIL_USER`, `EMAIL_PASS`, `ADMIN_EMAIL` (for notifications)
3. Run database migrations:
	```bash
	npm run prisma
	```
4. Start the development server:
	```bash
	npm run dev
	```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Main application routes and pages
- `config/` - Site configuration
- `lib/` - Utility libraries (auth, db, url)
- `prisma/` - Prisma schema and migrations
- `public/` - Static assets and images

## Deployment

You can deploy this app to Vercel, Netlify, or any Node.js hosting provider. For production, use a robust database (e.g., PostgreSQL) instead of SQLite.

## License

MIT
