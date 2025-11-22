# Content Contributor Guide

Guide for managing speakers, sessions, sponsors, and content for the DevOpsDays Zurich website.

## 📁 Content Structure

- **`/data/*.json`** - Structured data (speakers, sessions, sponsors, team)
- **`/content/`** - Markdown content pages
- **`/static/images/`** - Images and logos

## 🎯 Quick Workflows

### Adding a Speaker

1. **Add image:** `/static/images/speakers/firstname-lastname.webp`

2. **Update data:** Edit `/data/speakers.json`

   ```json
   {
     "id": "firstname-lastname",
     "name": "First Last",
     "image": "/images/speakers/firstname-lastname.webp",
     "page": "/speakers/firstname-lastname/"
   }
   ```

3. **Create detail page:** `/content/speakers/firstname-lastname.md`

   ```markdown
   ---
   title: "First Last"
   description: "First Last - DevOpsDays Zurich 2025"
   ---

   Brief bio and background.

   ## About

   Detailed biography...

   ## Expertise

   - Area 1
   - Area 2

   ## Social Links

   - LinkedIn: [username](https://linkedin.com/in/username)
   - Twitter: [@handle](https://twitter.com/handle)
   ```

### Adding a Session

1. **Update data:** Edit `/data/sessions.json`

   ```json
   {
     "id": "talks/session-slug",
     "title": "Session Title",
     "type": "talk",
     "day": "2025-06-15",
     "time": "14:00 - 14:45",
     "room": "Main Hall",
     "speakers": ["firstname-lastname"]
   }
   ```

   **Types:** `keynote`, `talk`, `ignite`, `workshop`, `other`

2. **Create detail page:** `/content/sessions/talks/session-slug.md`

   ```markdown
   ---
   title: "Session Title"
   description: "Session description"
   type: "session"
   sessionId: "talks/session-slug"
   ---

   Session overview.

   ## Abstract

   Detailed description...

   ## What You'll Learn

   - Learning objective 1
   - Learning objective 2

   ## Who Should Attend

   Target audience...
   ```

### Adding a Sponsor

1. **Add logo:** `/static/images/sponsors/company-name.webp`
   - Use transparent background
   - Minimum width: 400px
   - WebP format preferred

2. **Update data:** Edit `/data/sponsors.json`

   ```json
   {
     "id": "company-name",
     "name": "Company Name",
     "level": "gold",
     "logo": "/images/sponsors/company-name.webp",
     "website": "https://company.com",
     "description": "Gold Sponsor",
     "featured": true
   }
   ```

   **Levels:** `platinum`, `gold`, `silver`, `bronze`, `event`, `community`, `partner`

3. **Regenerate banner (local only):**

   ```bash
   npm run generate:banner
   ```

### Updating Team Members

Edit `/data/team.json`:

```json
{
  "id": "member-name",
  "name": "First Last",
  "role": "Organizer",
  "bio": "Brief bio...",
  "image": "/images/team/member-name.webp",
  "email": "email@example.com",
  "social": {
    "twitter": "https://twitter.com/handle",
    "linkedin": "https://linkedin.com/in/username"
  }
}
```

**Roles:** `Organizer`, `Volunteer`, `Program Committee`

### Updating Event Information

Edit `/data/events.json`:

```json
{
  "year": 2025,
  "date": "2025-06-15",
  "endDate": "2025-06-16",
  "status": "current",
  "venue": "Zürich HB",
  "city": "Zürich",
  "attendees": 300,
  "theme": "Building Resilient Systems"
}
```

**Status:** `upcoming`, `current`, `past`

### Editing Pages

Content pages are in `/content/`. Edit markdown files directly:

```markdown
---
title: "Page Title"
description: "SEO description"
---

# Main Heading

Content in standard Markdown format...
```

## 🎛️ Feature Flags

Control site sections in `/config.yaml`:

```yaml
params:
  features:
    show_program: true      # Program page visibility
    show_tickets: true      # Tickets page and CTA buttons
    show_cfp: false         # Call for Papers button
    show_speakers: true     # Speakers page visibility
```

**Common scenarios:**

- Before CFP opens: `show_cfp: false`
- Before schedule ready: `show_program: false`
- After sold out: `show_tickets: false`

## 📸 Image Guidelines

### Speaker Photos

- Location: `/static/images/speakers/`
- Format: WebP, JPEG, or PNG
- Naming: `firstname-lastname.webp`
- Size: 400x400px min, square ratio
- Quality: Professional headshot

### Sponsor Logos

- Location: `/static/images/sponsors/`
- Format: WebP or PNG (transparent)
- Naming: `company-name.webp`
- Size: 400px width min
- Quality: High-resolution

### Team Photos

- Location: `/static/images/team/`
- Format: WebP, JPEG, or PNG
- Naming: `firstname-lastname.webp`
- Size: 400x400px min, square ratio

## 🔄 Git Workflow

The `main` branch is protected. All changes require Pull Requests.

### Via GitHub Web Interface

1. Navigate to file → Click pencil icon
2. Make changes
3. Select "Create a new branch for this commit"
4. Describe changes → "Propose changes"
5. Create Pull Request

### Via Command Line

```bash
# Create branch
git checkout -b update-speakers

# Make changes, then commit
git add .
git commit -m "Add speaker: Jane Doe"

# Push and create PR
git push origin update-speakers
```

Then create PR on GitHub.

### Testing Locally (Optional)

```bash
# Clone repository
git clone https://github.com/dod-zh/web.git
cd web

# Start local preview
hugo server -D
```

Open <http://localhost:1313>

## 🚀 Deployment

### Preview (Netlify)

- Every PR gets automatic preview URL
- Check PR comments for link
- Updates on each commit

### Production (GitHub Pages)

- PR merged to `main` → deploys automatically
- Live at <https://devopsdays.ch> in ~2-3 minutes

## 📋 Event Workflow Checklist

### Before CFP Opens

- [ ] Update CFP URL in `config.yaml`
- [ ] Set `show_cfp: true`
- [ ] Update event dates in `data/events.json`

### After CFP Closes

- [ ] Set `show_cfp: false`
- [ ] Review submitted sessions

### Building Schedule

- [ ] Add speakers to `data/speakers.json`
- [ ] Add sessions to `data/sessions.json`
- [ ] Create speaker pages in `content/speakers/`
- [ ] Create session pages in `content/sessions/`
- [ ] Set `show_program: true` and `show_speakers: true`

### Tickets Go Live

- [ ] Update ticket URL
- [ ] Set `show_tickets: true`

### Adding Sponsors

- [ ] Add logos to `static/images/sponsors/`
- [ ] Update `data/sponsors.json`
- [ ] Verify banner generates correctly

### After Event

- [ ] Update status to `past` in `data/events.json`
- [ ] Add photos/videos
- [ ] Archive recordings

## 📚 File Reference

| File | Purpose |
|------|---------|
| `data/speakers.json` | Speaker listings |
| `data/sessions.json` | Conference schedule |
| `data/sponsors.json` | Sponsor information |
| `data/team.json` | Team members |
| `data/events.json` | Event history |
| `content/speakers/` | Speaker bio pages |
| `content/sessions/` | Session detail pages |
| `content/event/` | Event pages |
| `config.yaml` | Site configuration |

## ❓ FAQ

**Q: Do I need coding knowledge?**  
A: No. Edit JSON and Markdown files directly on GitHub.

**Q: JSON vs Markdown files?**  
A: JSON = structured data lists. Markdown = long-form content.

**Q: How long until changes go live?**  
A: ~2-3 minutes after PR merge to main.

**Q: Can I preview changes?**  
A: Yes. Every PR gets automatic Netlify preview URL.

**Q: What if I make a mistake?**  
A: All changes tracked in Git. Easy to revert.

## 🆘 Getting Help

- **Technical Setup:** [DEVELOPER.md](DEVELOPER.md)
- **Feature Flags:** [docs/FEATURE_FLAGS.md](docs/FEATURE_FLAGS.md)
- **Issues:** <https://github.com/dod-zh/web/issues>
- **Email:** <organizer@devopsdays.ch>
