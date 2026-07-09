# Supabase setup (Vite app — not Next.js)

Supabase’s default snippet is for **Next.js** (`NEXT_PUBLIC_…`, `@supabase/ssr`, middleware).  
**SS Research is Vite + React.** We use:

| Next.js guide says | We use instead |
|--------------------|----------------|
| `NEXT_PUBLIC_SUPABASE_*` | `VITE_SUPABASE_*` |
| Server + middleware cookies | Browser client (`@supabase/supabase-js`) |
| `page.tsx` todos example | Auth modal + hubs/companies tables |

## 1. Env (local)

`.env.local` (gitignored):

```
VITE_SUPABASE_URL=https://bsroqamltffzidminpct.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_key
```

## 2. Env (Vercel)

Project → Settings → Environment Variables — **same names**:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Redeploy after saving.

## 3. Create tables (required)

Supabase Dashboard → **SQL Editor** → New query → paste and **Run**  
`docs/supabase-schema.sql`

That creates:

- `hubs` (one per user)
- `companies` (`payload` jsonb = full story sheet)
- RLS so users only see their own rows

## 4. Auth settings

Supabase → **Authentication** → Providers:

- Enable **Email**
- For local/dev, you can turn **off** “Confirm email” temporarily for faster testing  
  (or leave on and use the inbox)

**URL config** → Redirect URLs add:

- `http://localhost:5173`
- `https://your-vercel-app.vercel.app`

## 5. How the app behaves

| State | Data |
|-------|------|
| Signed out | Browser `localStorage` only |
| Signed in | Private cloud hub; first login uploads existing local companies if cloud hub empty |
| Sign out | Back to local list |

Header: **Sign in** / email + green cloud dot when synced.

## 6. Packages

```bash
npm install @supabase/supabase-js @supabase/ssr
```

(`@supabase/ssr` is installed for compatibility; the SPA uses the browser client.)
