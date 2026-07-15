# Next session — finish go-live

**Repo:** `https://github.com/ShimSX/Stonks` (`main`).  
**Latest research seed:** includes **SKHY** (SK hynix) alongside TSLA, HOOD, COIN, MU, SNDK, HIMS, NBIS.

Supabase client + auth + cloud hubs are in the code. Local `.env.local` has project URL + publishable key.

### Status check (2026-07-15)

| Item | Status |
|------|--------|
| GitHub `main` | Pushed (includes SKHY sample sheet) |
| Local Vite build | Passes |
| Supabase project | Exists (`bsroqamltffzidminpct…`) |
| Tables `hubs` / `companies` | **Not created yet** (REST returns PGRST205) |
| Vercel CLI on this machine | Not logged in / not installed |

### Still for you / next time

1. Supabase **SQL Editor** → run `docs/supabase-schema.sql` (required — tables missing)
2. Supabase **Auth → Redirect URLs** → `http://localhost:5173` + your Vercel URL
3. Optional: Auth → turn off email confirm for faster testing
4. **Vercel:** import `ShimSX/Stonks` (Vite, `npm run build`, output `dist`)
5. **Vercel env vars:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` → Redeploy
6. Smoke test: Sign up → add company → refresh → still there when signed in

See also: `docs/SUPABASE-SETUP.md`, `docs/PLATFORM-AND-UX.md`

Do **not** wipe user data on deploy. Seed default template **once** per new hub only.
