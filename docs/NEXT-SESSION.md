# Next session — finish go-live

**Repo is pushed** (`main`). Supabase client + auth + cloud hubs are already in the code.

**Still for you / next time:**

1. Supabase **SQL Editor** → run `docs/supabase-schema.sql` (if not done)
2. Supabase **Auth → Redirect URLs** → `http://localhost:5173` + your Vercel URL
3. **Vercel env vars:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` → Redeploy
4. Smoke test: Sign up → add company → refresh → still there when signed in
5. Optional: turn off email confirm in Auth for easier testing

See also: `docs/SUPABASE-SETUP.md`, `docs/PLATFORM-AND-UX.md`

Do **not** wipe user data on deploy.
