# Library CMS - Complete Setup Guide

This guide will help you set up the dynamic library CMS system locally and deploy it to Vercel.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git installed

## Local Development Setup

### 1. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 2. Install Prisma CLI Globally (Optional but Recommended)

\`\`\`bash
npm install -g prisma
\`\`\`

### 3. Setup Environment Variables

Copy the `.env.example` to `.env`:

\`\`\`bash
cp .env.example .env
\`\`\`

Update the `.env` file with your configuration:

\`\`\`env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
\`\`\`

To generate a secure `NEXTAUTH_SECRET`:
\`\`\`bash
openssl rand -base64 32
\`\`\`

### 4. Initialize Database

Generate Prisma Client and create the database:

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

### 5. Seed Database with Existing Data

Run the seed scripts to populate the database with your existing data:

\`\`\`bash
# Seed all data
npx tsx scripts/seed-database.ts
npx tsx scripts/seed-journals.ts
npx tsx scripts/seed-syllabi.ts
\`\`\`

This will import all data from your `data/` folder into the SQLite database.

### 6. Create Admin User

After seeding, you can create an admin user by running:

\`\`\`bash
npx tsx scripts/create-admin.ts
\`\`\`

Or manually add one through Prisma Studio:

\`\`\`bash
npx prisma studio
\`\`\`

Then navigate to the `User` model and create a user with:
- Email: admin@cahcet.ac.in
- Password: (use bcrypt to hash your password)
- Role: ADMIN

**Quick admin creation:**
Default credentials will be created automatically on first seed:
- Email: `admin@cahcet.ac.in`
- Password: `admin123`

**⚠️ IMPORTANT: Change this password immediately after first login!**

### 7. Run Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will be available at `http://localhost:3000`

### 8. Access Admin Dashboard

1. Navigate to `http://localhost:3000/admin/login`
2. Login with your admin credentials
3. Start managing content!

## Database Management

### View Database with Prisma Studio

\`\`\`bash
npx prisma studio
\`\`\`

This opens a visual database editor at `http://localhost:5555`

### Reset Database (if needed)

\`\`\`bash
npx prisma db push --force-reset
\`\`\`

Then re-run the seed scripts.

### Update Database Schema

If you modify `prisma/schema.prisma`:

\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

## Production Deployment (Vercel)

### 1. Prepare for Deployment

Ensure your repository is on GitHub, GitLab, or Bitbucket.

### 2. Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your repository
4. Configure project settings

### 3. Setup Environment Variables in Vercel

In Vercel project settings, add these environment variables:

\`\`\`
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-production-secret"
NEXT_PUBLIC_BASE_URL="https://your-domain.vercel.app"
\`\`\`

**For Production Database:**

Option 1: **Use Vercel Postgres** (Recommended)
- Add Vercel Postgres from Vercel dashboard
- It will automatically set `DATABASE_URL`

Option 2: **Use External PostgreSQL** (Neon, Supabase, etc.)
- Sign up for a PostgreSQL provider
- Copy the connection string
- Set as `DATABASE_URL`

### 4. Update Prisma for PostgreSQL

If using PostgreSQL in production, update `prisma/schema.prisma`:

\`\`\`prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
\`\`\`

### 5. Deploy

\`\`\`bash
git add .
git commit -m "Ready for deployment"
git push origin main
\`\`\`

Vercel will automatically:
- Build your application
- Run `prisma generate`
- Deploy your site

### 6. Initialize Production Database

After first deployment, run migrations:

1. Install Vercel CLI:
\`\`\`bash
npm install -g vercel
\`\`\`

2. Link your project:
\`\`\`bash
vercel link
\`\`\`

3. Run database migration:
\`\`\`bash
vercel env pull .env.production
npx prisma db push
\`\`\`

4. Seed production database:
\`\`\`bash
# Set environment to production
export DATABASE_URL="your-production-database-url"
npx tsx scripts/seed-database.ts
npx tsx scripts/seed-journals.ts
npx tsx scripts/seed-syllabi.ts
\`\`\`

Or use Vercel's serverless function to seed (create an admin endpoint for this).

## Admin Dashboard Features

Once logged in, you can manage:

1. **Statistics** - Update total books, journals, e-books counts
2. **Announcements** - Add/edit/delete announcements
3. **Library Hours** - Manage opening hours
4. **About Section** - History, activities, staff, facilities
5. **Journals** - Manage journal listings by department
6. **Syllabi** - Manage syllabi by department and year
7. **Gallery** - Add/edit/delete gallery images
8. **Policy** - Update vision, mission, objectives, policies
9. **Rules** - Manage library rules and regulations
10. **Committee** - Update committee information
11. **E-Resources** - Update DELNET credentials and info

All changes reflect immediately on the public website!

## Troubleshooting

### Issue: "Cannot find module '@prisma/client'"
**Solution:**
\`\`\`bash
npx prisma generate
\`\`\`

### Issue: Database connection errors
**Solution:**
- Check `DATABASE_URL` in `.env`
- Ensure database file exists (for SQLite)
- For PostgreSQL, verify connection string

### Issue: NextAuth errors
**Solution:**
- Verify `NEXTAUTH_URL` matches your domain
- Ensure `NEXTAUTH_SECRET` is set and not empty

### Issue: Can't login to admin
**Solution:**
- Check user exists in database via Prisma Studio
- Verify password is correctly hashed with bcrypt
- Check console for error messages

## Project Structure

\`\`\`
├── app/
│   ├── (auth)/
│   │   └── admin/
│   │       ├── login/          # Admin login page
│   │       └── dashboard/      # All admin CMS pages
│   ├── api/
│   │   ├── auth/               # NextAuth API routes
│   │   ├── admin/              # Protected admin API routes
│   │   └── [public-apis]/      # Public data fetching routes
│   └── [public-pages]/         # Public website pages
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── admin-*.tsx             # Admin-specific components
│   └── [public-components]/    # Public website components
├── lib/
│   ├── auth.ts                 # NextAuth configuration
│   └── prisma.ts               # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── dev.db                  # SQLite database (local)
├── scripts/
│   ├── seed-database.ts        # Seed main data
│   ├── seed-journals.ts        # Seed journals
│   └── seed-syllabi.ts         # Seed syllabi
└── data/
    ├── library-data.tsx        # Original static data (reference)
    ├── journals-data.tsx       # Original journals data
    └── syllabi-data.tsx        # Original syllabi data
\`\`\`

## Security Notes

1. **Change default admin password immediately**
2. Use strong, unique passwords for production
3. Keep `NEXTAUTH_SECRET` secure and never commit it
4. Enable HTTPS in production (Vercel does this automatically)
5. Regularly update dependencies: `npm update`

## Support

For issues or questions:
1. Check this guide thoroughly
2. Review error messages in browser console
3. Check Vercel deployment logs
4. Verify all environment variables are set correctly

## Next Steps

After successful setup:
1. Login to admin dashboard
2. Update all content to match your requirements
3. Test all CRUD operations
4. Verify changes reflect on public pages
5. Update default admin credentials
6. Add more admin users if needed

Your library CMS is now fully functional! 🎉
