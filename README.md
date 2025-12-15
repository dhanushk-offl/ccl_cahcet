# CAHCET Central Library - Dynamic CMS

A comprehensive library management website with admin CMS capabilities. Built with Next.js, Prisma, SQLite, and NextAuth.

## Features

- **Dynamic Content Management**: Admin dashboard to manage all website content
- **Authentication System**: Secure admin login with NextAuth and bcrypt
- **Database-Driven**: All content stored in SQLite database via Prisma ORM
- **Comprehensive CMS**: Manage statistics, announcements, hours, committees, rules, journals, syllabi, gallery, and more
- **Responsive Design**: Mobile-first design with Tailwind CSS and shadcn/ui
- **Real-time Updates**: Frontend automatically reflects database changes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js with Credentials Provider
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

### Local Development Setup

1. **Clone the repository**
   \`\`\`bash
   cd your-project-folder
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   
   The `.env` file is already created with:
   \`\`\`env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="8x9mK2pN4rQ7sT1uV3wY5zA8bC0dE2fG4hJ6kL8mN0pQ2rS4tU6vX8yZ"
   NEXTAUTH_URL="http://localhost:3000"
   \`\`\`

4. **Initialize the database**
   \`\`\`bash
   # Generate Prisma client
   npx prisma generate
   
   # Create database and run migrations
   npx prisma db push
   \`\`\`

5. **Seed the database**
   \`\`\`bash
   # Seed main data
   npx tsx scripts/seed-database.ts
   
   # Seed journals data
   npx tsx scripts/seed-journals.ts
   
   # Seed syllabi data
   npx tsx scripts/seed-syllabi.ts
   \`\`\`

6. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   \`\`\`

7. **Open your browser**
   - Website: [http://localhost:3000](http://localhost:3000)
   - Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Default Admin Credentials

\`\`\`
Email: admin@library.com
Password: admin123
\`\`\`

**⚠️ IMPORTANT**: Change these credentials in production!

## Database Management

### View Database (Development)
\`\`\`bash
npx prisma studio
\`\`\`
This opens a visual editor at `http://localhost:5555` to browse and edit database records.

### Reset Database
\`\`\`bash
# Delete database file
rm prisma/dev.db

# Recreate and seed
npx prisma db push
npx tsx scripts/seed-database.ts
npx tsx scripts/seed-journals.ts
npx tsx scripts/seed-syllabi.ts
\`\`\`

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login to Vercel**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   vercel
   \`\`\`

4. **Set Environment Variables in Vercel**
   - Go to your project settings on Vercel Dashboard
   - Add environment variables:
     \`\`\`
     DATABASE_URL=file:./prod.db
     NEXTAUTH_SECRET=<generate-new-secret>
     NEXTAUTH_URL=https://your-domain.vercel.app
     \`\`\`
   - To generate a new secret: `openssl rand -base64 32`

5. **Important**: After first deployment, run seed scripts in Vercel terminal
   \`\`\`bash
   # In Vercel dashboard, go to your deployment
   # Open terminal and run:
   npm run seed
   \`\`\`

### Option 2: Deploy via GitHub

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables (same as above)
   - Deploy

3. **Seed Production Database**
   - After first deployment, SSH into Vercel or use their terminal
   - Run seed scripts

### Production Considerations

1. **Change Admin Password**: Immediately change the default admin credentials
2. **Use PostgreSQL**: For production, consider migrating from SQLite to PostgreSQL (Vercel Postgres)
3. **Backup Database**: Regular backups if using SQLite
4. **Security**: Enable rate limiting and CORS as needed

## Project Structure

\`\`\`
├── app/
│   ├── admin/
│   │   ├── dashboard/          # Admin CMS pages
│   │   └── login/              # Admin login
│   ├── api/                    # API routes
│   ├── about/                  # Public pages
│   └── ...                     # Other public pages
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── admin-content-list.tsx  # CMS helper
│   ├── library-sidebar.tsx     # Main navigation
│   └── top-marquee.tsx         # Marquee banner
├── lib/
│   ├── prisma.ts               # Prisma client
│   └── auth.ts                 # NextAuth config
├── prisma/
│   └── schema.prisma           # Database schema
├── scripts/
│   └── seed-*.ts               # Database seeding scripts
└── public/                     # Static assets
\`\`\`

## Admin Dashboard Features

Access at `/admin/dashboard` after logging in:

- **Statistics**: Update library statistics (books, journals, e-books)
- **Announcements**: Create, edit, delete announcements
- **Hours**: Manage library operating hours
- **About**: Update history, activities, staff, facilities
- **Committee**: Manage committee members and functions
- **Rules**: Update general, borrowing, and book bank rules
- **Policy**: Manage vision, mission, objectives, policies
- **E-Resources**: Update electronic resources and access instructions
- **Gallery**: Manage gallery images
- **Journals**: Add, edit, delete journal entries
- **Syllabi**: Manage syllabi for all departments
- **Navigation**: Update menu items

## Troubleshooting

### Database Issues
\`\`\`bash
# If migrations fail
npx prisma db push --force-reset

# If Prisma client is outdated
npx prisma generate
\`\`\`

### Build Errors
\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Authentication Issues
- Ensure NEXTAUTH_SECRET is set correctly
- Verify NEXTAUTH_URL matches your deployment URL
- Check that admin user exists in database

## Support

For issues or questions:
1. Check the database using Prisma Studio
2. Review API route logs in terminal
3. Check browser console for frontend errors

## License

This project is for CAHCET Central Library.
\`\`\`

```json file="" isHidden
