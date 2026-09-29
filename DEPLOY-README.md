# Deploying Kolez Buk Club — Vercel (free)

Your site is pre-configured for Vercel free hosting. Follow these steps in order.

---

## Step 1 — Install Git (one time)

**Windows:** download and install from https://git-scm.com/download/win
(keep clicking Next with the defaults), or run in PowerShell:

```
winget install --id Git.Git -e --source winget
```

**Mac:** run in Terminal (installs the developer tools that include git):

```
xcode-select --install
```

After installing, open a **new** terminal window (Terminal / PowerShell / Git Bash).

## Step 2 — Push this project to your GitHub repository

Your repo: https://github.com/kolezmordecaikolezauthorclub-cloud/kolez-buk-club
(Create it first on github.com if you haven't: **+ → New repository → name it
`kolez-buk-club` → Private → Create — do NOT tick "Add a README".)

In the terminal, inside this folder (the one containing this file):

```
git init
git add .
git commit -m "Kolez Buk Club website"
git branch -M main
git remote add origin https://github.com/kolezmordecaikolezauthorclub-cloud/kolez-buk-club.git
git push -u origin main
```

The first push will ask you to log in — a browser window opens, click Authorize.
Done: your code is now on GitHub.

## Step 3 — Deploy on Vercel (free)

1. Go to https://vercel.com → **Sign Up → Continue with GitHub**.
2. Click **Add New… → Project**.
3. Find `kolez-buk-club` in the list → **Import**.
4. Vercel auto-detects Next.js — leave Framework / Build / Output settings alone.
5. Open **Environment Variables** and add exactly one:
   - Key: `DATABASE_URL`
   - Value: `file:/tmp/kolez.db`
6. Click **Deploy** and wait ~2 minutes.

Your site goes live at: `https://kolez-buk-club.vercel.app`

## Step 4 — Check it works

- Open the live URL — browse Home, About, Voices, etc.
- Submit the Contact form with your own email — the message should arrive in
  kolezmordecai.kolezauthorclub@gmail.com (FormSubmit is already activated).

## Notes

- **Email delivery** is primary and works everywhere (FormSubmit → Gmail).
- **Database + uploaded files** are temporary on Vercel's free tier — the site
  is coded to keep working regardless. When you later move to a VPS with a
  persistent disk (Oracle Cloud free tier), the database backup and file
  storage start persisting automatically — no code changes needed.
- **Custom domain later:** Vercel → Settings → Domains → Add. HTTPS is free
  and automatic. (`kolezbukclub.com` is currently a placeholder inside the
  site's SEO metadata — tell the developer your real domain when you buy one.)
- **Future updates:** change anything in the code, then:
  `git add . && git commit -m "update" && git push` — Vercel redeploys
  automatically.
