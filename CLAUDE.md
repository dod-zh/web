# Claude Code Instructions for DevOpsDays Zurich Website

## Git Workflow

- `main` branch is **protected**. Direct pushes are not allowed.
- Always create a feature branch and open a Pull Request.
- Branch naming: `feat/`, `fix/`, `refactor/`, `docs/` prefixes.
- Commit convention: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- PRs get automatic Cloudflare Pages preview deployments.

## Tech Stack

- **Hugo** (Extended 0.150.0+) static site generator
- **Tailwind CSS** for styling
- **Node.js 18+** for build tools
- **Cloudflare Pages** for hosting

## Project Structure

- `data/`: JSON data files (speakers, sessions, sponsors, team, events)
- `content/` : Markdown content pages (speaker bios, session details)
- `themes/devopsdays/layouts/`: Hugo templates
- `config.yaml`: Site config including feature flags
- `static/images/`: Images (speakers/, sponsors/, team/)

## Key Data Files

- `data/sessions.json`: Conference schedule and session details
- `data/speakers.json`: Speaker information
- `data/sponsors.json`: Sponsor information and tiers
- `data/team.json`: Organizing team members

## Development

```bash
npm install        # Install dependencies
npm run dev        # Dev server (hugo server -D)
npm run build      # Production build
npm run validate   # HTML validation
```

## Feature Flags

Controlled in `config.yaml` under `params.features`:
`show_program`, `show_tickets`, `show_cfp`, `show_speakers`

## Current Event

- **DevOpsDays Zurich 2026**: May 6-7, 2026
- **Venue**: Alte Kaserne, Winterthur
- Event dates are hardcoded in templates (`baseof.html`, `program/single.html`) and content files. Use `2026-05-06` (Day 1) and `2026-05-07` (Day 2).
- Sessions in `data/sessions.json` use the `day` field with these dates.

## References

See README.md, CONTRIBUTOR.md, and DEVELOPER.md for full documentation.
