# Next session — deploy SS Research live

**Priority when we pick this up again:**

Ship the app to production with the stack in `docs/PLATFORM-AND-UX.md`:

1. **Vercel** — connect `ShimSX/Stonks`, deploy Vite app (`npm run build` → `dist`)
2. **Supabase** — project, Auth (magic link / Google), Postgres tables + RLS for hubs/companies
3. **Wire the app** — replace local-only storage with per-user hubs; seed default template **once** on hub create
4. **Env vars** on Vercel: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
5. **Smoke test** — new user signup → empty or sample hub → add company → story persists after refresh

Do **not** wipe user data on deploy (stable storage / no forced demo overwrite).

UX prototype is already in the app (onboarding, quick add, progressive story sheet). Deploy can ship that first; Supabase can follow in the same session or right after Phase 0.
