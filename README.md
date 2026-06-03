# 💌 ask-for-date

A cute, mobile-first "will you go on a date with me?" app. Frontend-only React —
no backend. Responses are written **straight to the database from the browser**
(Supabase), and the app still works with zero setup (saves locally + a
"copy plan & text me" button).

Flow: **Yes / No** (the No button runs away) → 🎉 **you said yes!** →
📅 **when are you free** → 🍽️ **what are we feeling** → 🪩 **what's your vibe** →
💌 **it's a date** recap.

---

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the printed URL on your laptop, or on your phone (same Wi-Fi) via the
Network URL Vite prints.

## 2. Make it yours

Everything personal lives in **`src/config.js`** — just edit the text in quotes:

- The question, the celebration line, the "p.s." note
- The **time options** (`when.times`) — the right-hand text is where your inside jokes go
- The **food** and **vibe** options
- `yourPhone` — your number for the "text me" button (with country code, e.g. `+15551234567`)

**Music:** drop your track at `public/music/song.mp3` (see that folder's README).
It starts on first tap and has a mute button in the corner.

## 3. Save responses to a database (optional, no backend)

This uses **Supabase** — a free, hosted Postgres that's safe to write to directly
from a browser. ~3 minutes:

1. Create a free project at https://supabase.com
2. In the SQL editor, run:

   ```sql
   create table responses (
     id uuid primary key default gen_random_uuid(),
     created_at timestamptz default now(),
     answer text,
     date date,
     time text,
     foods text[],
     vibe text,
     user_agent text
   );

   -- lock it down: the public (anon) key can only INSERT, never read
   alter table responses enable row level security;
   create policy "anon can insert" on responses
     for insert to anon with check (true);
   ```

3. In Supabase → Project Settings → API, copy the **Project URL** and the
   **anon public** key.
4. Copy `.env.example` to `.env` and paste them in:

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...
   ```

5. Restart `npm run dev`. Done — every "yes" now lands in your `responses` table.
   View them in the Supabase Table editor. (The anon key is public by design;
   the RLS policy above means nobody can read the table from the browser.)

> No `.env`? Totally fine. The app saves to `localStorage` and the recap's
> "copy plan & text me" button still delivers the answer to you.

## 4. Deploy (GitHub Pages)

**Live at: https://milekag01.github.io/will-you/**

Already wired up. To ship any change:

```bash
npm run deploy     # builds + pushes /dist to the gh-pages branch
```

GitHub Pages serves the `gh-pages` branch. `vite.config.js` sets `base: './'`
(relative asset paths) so the same build works at the project path now and at a
custom domain later — no rebuild gymnastics.

> ⚠️ **Env is baked at build time.** Put your Supabase keys / notify webhook in
> `.env` *before* `npm run deploy`, or the live site won't have them.

### Cuter URL: willyou.milekway.in (optional)
1. Add a DNS `CNAME` record at milekway.in's provider: `willyou` → `milekag01.github.io`
2. Drop a file `public/CNAME` containing `willyou.milekway.in`, then `npm run deploy`
3. Repo → Settings → Pages → set the custom domain (it'll verify + issue HTTPS)
