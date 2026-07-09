# SS Research — Go Live & Make It Usable

Notes for turning this local research tool into a real multi-user product, and for making it **obvious** so people get value without a manual.

---

## Part 1 — Deploy live (simple stack)

### Stack (recommended)

| Layer | Service | Role |
|--------|---------|------|
| Frontend | **Vercel** (or Netlify) | Hosts the Vite/React app |
| Auth | **Supabase Auth** | Sign up / login (email magic link or Google) |
| Database | **Supabase Postgres** | Each user’s hub + companies |
| Source | **GitHub** | Already at `ShimSX/Stonks` |

Avoid for v1: custom servers, AWS from scratch, rolling your own JWT auth.

### Phase 0 — Public demo (today’s app, no accounts)

Everyone still gets **browser-local** data. Fine for sharing a link; not multi-device or multi-user.

1. Push `main` to GitHub (done).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import `ShimSX/Stonks`.
3. Framework: Vite. Build: `npm run build`. Output: `dist`.
4. Deploy → you get `https://something.vercel.app`.
5. Optional: add a custom domain in Vercel.

**Env vars:** none required for Phase 0.

### Phase 1 — Real multi-user (Supabase)

Goal: log in → **your** research hub → data in the cloud → default template once on first hub.

#### 1. Create Supabase project

1. [supabase.com](https://supabase.com) → New project.
2. Save project URL + anon key (Settings → API).

#### 2. Schema (start minimal)

```sql
-- One hub per user is enough for v1; allow multiple later.
create table hubs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'My Research Hub',
  created_at timestamptz not null default now()
);

create table companies (
  id uuid primary key default gen_random_uuid(),
  hub_id uuid not null references hubs(id) on delete cascade,
  ticker text not null,
  payload jsonb not null,  -- full Company object as JSON (fastest path)
  updated_at date not null default (now()::date),
  unique (hub_id, ticker)
);

create table story_updates (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  date date not null,
  note text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: users only touch their own hubs
alter table hubs enable row level security;
alter table companies enable row level security;
alter table story_updates enable row level security;

create policy "hubs: own" on hubs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "companies: via hub" on companies
  for all using (
    exists (select 1 from hubs h where h.id = hub_id and h.user_id = auth.uid())
  )
  with check (
    exists (select 1 from hubs h where h.id = hub_id and h.user_id = auth.uid())
  );

create policy "story_updates: via company" on story_updates
  for all using (
    exists (
      select 1 from companies c
      join hubs h on h.id = c.hub_id
      where c.id = company_id and h.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from companies c
      join hubs h on h.id = c.hub_id
      where c.id = company_id and h.user_id = auth.uid()
    )
  );
```

Using `payload jsonb` for the whole company sheet keeps the first migration small. You can normalize columns later if needed.

#### 3. Auth

- Supabase Auth → enable **Email magic link** and/or **Google**.
- In the app: `@supabase/supabase-js` + login UI (or Clerk if you prefer; then store `user_id` carefully).

#### 4. App wiring (conceptual)

Replace `localStorage` in `useCompanies` with:

1. On login → load or create `hubs` row for `auth.uid()`.
2. If hub has **zero** companies → seed **once** from `demoCompanies` (default template).
3. On save / delete → write to `companies` for that `hub_id`.
4. **Never** re-seed on deploy or template update (same bug as versioned storage keys).

#### 5. Vercel env vars

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Redeploy after setting them.

#### 6. First-time user flow

1. Open app → **Sign in**.
2. System creates hub **My Research Hub**.
3. Seeds default companies (or “Start empty” / “Start with sample coverage” choice — prefer the choice).
4. Land on Research grid with a short **first-run tip** (see UX below).

### Phase 2 — Nice-to-haves later

- Custom domain (`research.yourdomain.com`).
- Export/import JSON as backup (already half there).
- Read-only share link for a hub.
- Stripe only if you charge; free is fine until then.

### Cost (early)

- Vercel free tier + Supabase free tier is enough for demos and friends.
- Domain ~$10–15/year.

### Do / don’t

| Do | Don’t |
|----|--------|
| Seed template **once** per new hub | Bump “storage version” and wipe data |
| RLS so users only see their rows | Trust the client alone for security |
| Keep Stonk fields in JSON at first | Over-engineer microservices |
| Ship a public demo URL early | Wait until “perfect” multi-tenant |

---

## Part 2 — Make it simple so people actually use it

Lynch process is powerful; raw forms are intimidating. Goal: **value in 60 seconds**, depth available when they want it.

### North star

> “I open the app, pick a company, write one sentence about the story, and I already feel smarter about what I own.”

Everything else is optional depth.

### 1. First-run experience (critical)

On first login / first empty hub, show a **3-step modal** (dismissible, never block forever):

1. **Add or pick a company** you care about (search ticker or choose from sample).
2. **Write the two-minute story** — one box only: *What do they do? Why might it 10X? What must happen? Main risk?*
3. **Come back when the story changes** — log a note after earnings.

No BS checklist on day one. Link: “Fill the full Stonk sheet when ready.”

**Hub create choice:**

- **Start with sample coverage** (demo list) — for learning the UI.
- **Start empty** — for real money / serious users.

Default recommendation: **Start empty** + one guided example company they can delete.

### 2. Home page: stories, not admin chrome

Research coverage should feel like a **watchlist of stories**, not a CMS.

| Keep visible | Hide until needed |
|--------------|-------------------|
| Company name, ticker, story blurb | Import / Export / Reset demo |
| Lynch type + recommendation chips | Dense filters (collapse into “Filter”) |
| Last updated | Cap size jargon until they open a sheet |
| Big **+ Add company** | Multiple tabs competing for attention |

Move **Import / Export / Reset** under a **⋯ menu** or Settings. Reset is dangerous; confirm hard or rename to “Restore sample companies (won’t delete yours — merge)” later.

### 3. One primary action per screen

| Screen | Primary job |
|--------|-------------|
| Research | Scan stories → open one |
| Company open | Read / edit **story** first |
| Compare | Pick 2–4 names → side-by-side stories |
| Principles | Reminders, not homework |
| Board | Power-user table (optional; can live under “View”) |

Consider collapsing **Board** into a view toggle on Research (`Cards | Table`) so nav is only: **Research · Compare · Principles** (+ account).

### 4. Progressive disclosure on the company sheet

Today the full Stonk form is a wall of fields. Structure as **levels**:

**Level 1 — Always open (the product)**  
- Two-minute story (textarea, large)  
- “Would I buy more down 30–50%?” (one line)  
- Recommendation: Watch / Buy / Avoid (3 big buttons)  
- **Log update** (date + note)

**Level 2 — “Lynch lenses” (one click expand)**  
- Product · Customer feedback · Market · People  

**Level 3 — “Full Stonk sheet” (advanced)**  
- BS checklist, superior criteria, financials, pros/cons, thesis/risks  

New users never need Level 3 to get value. Power users still have it. Export Stonk.MD still dumps all levels.

### 5. Add company should be dead simple

Wizard, 3 fields only:

1. **Ticker** (required)  
2. **Company name** (auto-suggest later; manual is fine)  
3. **Two-minute story** (required to save)

Everything else defaults empty. Optional: “Use sample questions” placeholders under the story box.

No CEO / domain / 12 dropdowns on create.

### 6. Copy and language

Replace internal jargon on the surface:

| Avoid leading with | Prefer |
|--------------------|--------|
| Stonk sheet | Company story |
| BS checklist | Hard questions |
| Lynch type | Company type (Fast grower, Stalwart, …) with a one-line tooltip |
| Superior company criteria | Quality checklist |
| Sheet 14/14 | (already removed — good) |

Keep Peter Lynch names in tooltips / Principles for people who care.

### 7. Empty and error states that teach

- **No companies:** “Add the first company you actually follow. Start with the story, not the price.”
- **Story empty on open:** Prompt with the four Lynch questions as ghost text.
- **After earnings season (soft reminder):** “Any story change to log this week?” (local or email later — not nagging modal spam).

### 8. Compare that doesn’t mix pages

Already separated — keep it. On Compare:

1. Chip picker at top (search + select).  
2. Cards show **story + thesis + risks only**.  
3. “Open full story” secondary.

No charts unless real data later.

### 9. Principles: short and sticky

- Keep the rotating strip — good.  
- Principles page: 5 cards max, one sentence each, then “How to research” as a short ordered list.  
- Optional: “Show tip of the day” on Research only, not a separate mental load.

### 10. Mobile

Most people will open this on phone after a headline.

- Cards stack cleanly (already mostly do).  
- Drawer full-screen on small viewports.  
- Big story box, sticky **Save** / **Log update**.  
- Delete behind “⋯” so fat fingers don’t wipe coverage.

### 11. Trust and safety of the product

- Footer: **Not financial advice. Your research notebook.**  
- No fake prices/charts (already removed).  
- If you add live quotes later, label clearly “market data, not a recommendation.”

### 12. Onboarding checklist (optional, 4 boxes)

Soft progress in the hub, not a completion score on every card:

- [ ] Added a company  
- [ ] Wrote a two-minute story  
- [ ] Set a recommendation  
- [ ] Logged one story update  

Celebrate once, then hide. Don’t recreate sheet 14/14 anxiety.

---

## Part 3 — Suggested product narrative (for landing / README)

**SS Research** is a personal notebook for company **stories**, built around Peter Lynch–style thinking:

1. Know what you own in two minutes.  
2. Focus on product, customers, and people.  
3. Update when the story changes.  
4. Time is on your side with superior companies.

It’s not a terminal, not a Twitter feed, not a signal service. It’s the place you **write down** why you care before the chart moves.

---

## Part 4 — Build order (if implementing next)

1. Deploy Phase 0 to Vercel (shareable URL).  
2. UX: first-run modal + progressive company sheet + simpler Add.  
3. Supabase auth + hubs + companies JSON.  
4. Seed template choice on hub create.  
5. Hide power tools behind Settings.  
6. Optional: live quotes, share link, LLM “draft story from ticker.”

### Prototype status (frontend-only)

Implemented in the app for local testing (no Supabase yet):

- First-run onboarding (3 steps + start empty / sample)
- New hubs start empty until you choose
- Quick add: ticker + name + story only
- Progressive company workspace (story → lenses → full sheet)
- Research: Cards | Table toggle, Filters, ⋯ menu (import/export/sample)
- Teaching empty state + getting-started checklist
- Nav: Research · Compare · Principles only

**Reset onboarding to retest:** in the browser console:

```js
localStorage.removeItem('ss-research-onboarding-v1');
localStorage.removeItem('ss-research-coverage');
location.reload();
```

---

## Quick reference

| Question | Answer |
|----------|--------|
| Where host the UI? | **Vercel** from GitHub |
| Where auth + data? | **Supabase** |
| How multi-user? | One hub (or more) per `user_id`, RLS |
| Default companies? | Seed **once** on new hub, never auto-replace |
| How stay simple? | Story first, progressive disclosure, short first-run |
| Killer habit? | Two-minute story + log when story changes |

---

*Last updated for the SS Research codebase. Implementation not required by this doc — it’s the playbook.*
