@AGENTS.md

# How We Work — Deployment Process

Claude cannot push directly to GitHub from this cloud environment (git push always fails with 403 — no credentials). Every session uses this workflow:

1. Claude makes all code changes in this container and commits locally
2. Claude zips the changed files (preserving folder structure: app/, components/, types/, data/, etc.)
3. User downloads the zip and extracts it into their local Windows project folder, overwriting existing files
4. User opens a terminal in the project root and runs:
   ```
   git add .
   git commit -m "description of changes"
   git push
   ```

## Key facts
- Branch: `claude/gracious-ramanujan-fZ1kb`
- Repo: `jodijanwin/Community-Atlas-Drop` on GitHub
- Stack: Next.js App Router, TypeScript, Tailwind CSS v4, React-Leaflet v5
- Hosted via Vercel (or similar) — push triggers redeploy

## Current colour palette (updated June 2026)
- `#F5DEB3` — wheat cream (page background)
- `#0D2B3E` — dark navy (body text)
- `#0A3D5C` — deep navy (hero, footer, dark sections)
- `#1A6B8A` — ocean teal (primary accent, links)
- `#5BAEC9` — sky teal (secondary accent)
- `#FF6B6B` — coral (CTA buttons)
- `#FFA07A` — salmon (warm accent sections)
- `#C8E0EC` — ice blue (borders, light backgrounds)

## At the start of each new session
- Check `git status` to see what's been committed but not yet pushed (and therefore not yet downloaded by the user)
- Remind the user of the zip-and-push workflow before making new changes
- If changes are pending, zip them first before starting new work
