This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Supabase Configuration

This project requires Supabase. Copy the `.env.example` file to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project anonymous key.

## Deployment

### 1. GitHub Push (Completed)
Changes are already pushed to your GitHub repository: [https://github.com/qlcnl87-maker/blog](https://github.com/qlcnl87-maker/blog)

### 2. Live Deployment via Vercel (Recommended)
To get a live URL (e.g., `https://your-blog.vercel.app`) quickly:

1.  **[Click here to import to Vercel](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2Fqlcnl87-maker%2Fblog)**
2.  Login with your GitHub account.
3.  In the **Environment Variables** section, add:
    - `NEXT_PUBLIC_SUPABASE_URL`: (Your Supabase URL)
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
4.  Click **Deploy**.

### GitHub Actions
A GitHub Action is configured to automatically verify the build on every push to the `main` branch.

## Learn More
