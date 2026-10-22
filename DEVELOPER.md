# Developer Guide

Technical documentation for developing and maintaining the DevOpsDays Zurich website.

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/dod-zh/web.git
cd web

# Start dev server
hugo server -D
```

Visit <http://localhost:1313>

## 🛠️ Development Environment

### Prerequisites

- Hugo Extended 0.168.0+
- Node.js 18+
- Git

### Local Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Clean build artifacts
npm run clean
```

### Dev Container (Recommended)

Uses VS Code Dev Containers with pre-configured environment.

**Requirements:**

- Docker Desktop
- VS Code
- Dev Containers extension

**Setup:**

1. Open project in VS Code
2. "Reopen in Container" when prompted
3. Wait for container build
4. Run `hugo server -D --bind 0.0.0.0`

**Included tools:** Hugo Extended, Go, Node.js, Git, GitHub CLI

## 📁 Project Structure

```
web/
├── .devcontainer/       # Dev container config
├── .github/workflows/   # CI/CD pipelines
├── content/            # Markdown content
│   ├── event/         # Event pages
│   ├── about/         # About pages
│   ├── speakers/      # Speaker bios
│   └── sessions/      # Session details
├── data/              # JSON data files
├── docs/              # Documentation
├── scripts/           # Build scripts
├── static/            # Static assets
│   ├── css/          # Stylesheets
│   ├── images/       # Images
│   └── js/           # JavaScript
├── themes/devopsdays/ # Hugo theme
│   ├── layouts/      # Templates
│   └── static/       # Theme assets
├── config.yaml        # Hugo config
└── package.json       # Node.js config
```

## ⚙️ Configuration

### Site Configuration (`config.yaml`)

```yaml
baseURL: 'https://devopsdays.ch'
languageCode: 'en-us'
title: DevOpsDays Zurich
theme: 'devopsdays'

params:
  description: 'Site description'
  features:
    show_program: true
    show_tickets: true
    show_cfp: false
    show_speakers: true
```

### Menu Configuration

```yaml
menu:
  main:
    - name: "Home"
      url: "/"
      weight: 10
    - name: "Event"
      url: "/event/"
      weight: 20
      identifier: "event"
    - name: "Tickets"
      url: "/event/tickets/"
      parent: "event"
      weight: 21
```

### Markup Configuration

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true      # Allow raw HTML in markdown
  highlight:
    style: github
    lineNos: true
```

### Privacy Settings (GDPR)

```yaml
privacy:
  googleAnalytics:
    disable: false
    anonymizeIP: true
    respectDoNotTrack: true
```

## 🎨 Theme Architecture

### Layouts

```
themes/devopsdays/layouts/
├── _default/
│   ├── baseof.html      # Base template
│   └── single.html      # Default page
├── index.html           # Homepage
├── partials/
│   ├── header.html      # Site header
│   ├── footer.html      # Site footer
│   ├── page-header.html # Page titles
│   ├── session-card.html          # Session cards
│   └── session-type-styling.html  # Session styling
├── program/
│   └── single.html      # Program page
├── speaker/
│   ├── list.html        # Speaker grid
│   └── single.html      # Speaker details
└── session/
    └── single.html      # Session details
```

### Styling

- **Framework:** Tailwind CSS
- **Custom styles:** `/static/css/custom.css`
- **Colors:** CSS variables in `:root`

```css
:root {
  --cerulean: #007fa3;
  --sunset: #f15d4f;
  --mint: #9ac3b7;
  --steel: #485967;
}
```

### Creating Custom Layouts

1. Create layout: `themes/devopsdays/layouts/[type]/single.html`
2. Set in frontmatter: `type: "[type]"`

## 🔨 Build Scripts

### Sponsor Banner Generation

Automatically generates composite banner from sponsor logos.

```bash
npm run generate:banner
```

**Script:** `scripts/generate-sponsor-banner.js`

**Features:**

- Reads `data/sponsors.json`
- Arranges logos by tier
- Outputs to `static/images/banner/sponsor-banner.jpg`
- Runs automatically during build

**Requirements:**

- Node packages: `canvas`, `sharp`
- Sponsor logos in `static/images/sponsors/`
- Header image: `static/images/banner/devopsdays-header.jpg`

### NPM Scripts

```json
{
  "dev": "hugo server -D --bind 0.0.0.0",
  "prebuild": "node scripts/generate-sponsor-banner.js",
  "build": "hugo --minify",
  "build:preview": "npm run prebuild && hugo --minify --baseURL=/preview/",
  "validate": "html-validate public/**/*.html",
  "lighthouse": "lhci autorun",
  "clean": "rm -rf public resources",
  "generate:banner": "node scripts/generate-sponsor-banner.js"
}
```

## 🚀 Deployment

### Architecture

- **Cloudflare Pages:** Production and preview deployments
- **GitHub Actions:** Build automation

### Workflow

**Pull Request:**

1. GitHub Actions detects PR
2. Builds preview deployment
3. Deploys to Cloudflare Pages
4. Posts preview URL in PR comments: `https://preview-pr-{number}.devopsdays-ch.pages.dev`
5. Updates on each commit

**Merged to `main`:**

1. GitHub Actions triggers
2. Builds with Hugo
3. Deploys to Cloudflare Pages
4. Live at <https://devopsdays.ch> in ~2-3 minutes

### Branch Protection

- `main` branch is protected
- Direct commits not allowed
- All changes via Pull Requests
- Automatic preview before merge

### Cloudflare Pages Configuration

Deployment is handled via GitHub Actions using Wrangler CLI.

**Workflows:**

- `.github/workflows/cloudflare-pages.yml` - Production deployment
- `.github/workflows/cloudflare-pages-preview.yml` - PR previews
- `.github/workflows/cloudflare-pages-cleanup.yml` - Deployment cleanup

**Required Secrets:**

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID

**Production:**

- **Trigger:** Push to `main` (via PR merge)
- **Build:** Hugo with production settings
- **Deploy:** Cloudflare Pages via Wrangler
- **Domain:** <https://devopsdays.ch>

**Preview:**

- **Trigger:** PR opened/updated
- **Build:** Hugo with preview settings
- **Deploy:** Cloudflare Pages branch deployment
- **URL:** `https://preview-pr-{number}.devopsdays-ch.pages.dev`

See [docs/CLOUDFLARE_PAGES.md](docs/CLOUDFLARE_PAGES.md) for complete setup instructions.

## 🧪 Testing

### Content Validation

```bash
# Check for issues
hugo --printI18nWarnings --printPathWarnings

# Validate HTML
npm run validate
```

### Performance Testing

```bash
# Lighthouse CI
npm run lighthouse
```

Configuration in `.lighthouserc.json`.

### Manual Testing

```bash
# Build production version
npm run build

# Check output
ls -la public/

# Test specific page
hugo server -D --navigateToChanged
```

## 🔍 Debugging

### Verbose Output

```bash
hugo server -D --verbose --debug
```

### Common Issues

**Port in use:**

```bash
# Use different port
hugo server -D --port 1314

# Kill process on 1313
lsof -ti:1313 | xargs kill -9
```

**Build errors:**

```bash
# Clear cache
hugo mod clean

# Clean everything
npm run clean
rm -rf public resources .hugo_build.lock

# Rebuild
npm run build
```

**Template errors:**

```bash
# Check Hugo version
hugo version

# Should be 0.168.0+ with extended
```

**Node.js issues:**

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📊 Data Architecture

### JSON Data Files

**Location:** `/data/`

| File | Structure | Purpose |
|------|-----------|---------|
| `speakers.json` | Array of speaker objects | Speaker info and references |
| `sessions.json` | Array of session objects | Schedule and session details |
| `sponsors.json` | Array of sponsor objects | Sponsor logos and info |
| `team.json` | Array of team objects | Organizing team |
| `events.json` | Array of event objects | Event history |

### Speaker Data Flow

1. Basic info in `data/speakers.json`
2. Detail page in `content/speakers/[id].md`
3. Template combines both sources
4. Links from sessions to speakers

### Session Data Flow

1. Schedule in `data/sessions.json`
2. Optional detail page in `content/sessions/[type]/[id].md`
3. Template renders with speaker info
4. Grouped by day/time in program

## 🎯 Feature Flags

Control visibility without removing content.

**Configuration:** `config.yaml`

```yaml
params:
  features:
    show_program: true
    show_tickets: true
    show_cfp: false
    show_speakers: true
    cfp_url: 'https://sessionize.com/...'
```

**Template usage:**

```go-html-template
{{ if .Site.Params.features.show_program }}
  <!-- Program content -->
{{ end }}
```

See [docs/FEATURE_FLAGS.md](docs/FEATURE_FLAGS.md) for details.

## 🛡️ SEO & Performance

### Built-in Features

- Structured data (Event schema)
- Open Graph tags
- Meta tags
- XML sitemap
- RSS feed

### Performance Optimization

- Minified HTML/CSS/JS
- Optimized images (WebP)
- CDN via Cloudflare Pages
- No external dependencies in critical path

### Analytics

Configured in `config.yaml`:

```yaml
privacy:
  googleAnalytics:
    disable: false
    anonymizeIP: true
    respectDoNotTrack: true
```

## 🤝 Contributing

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/my-feature
```

### Commit Convention

Use semantic commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Testing
- `chore:` Maintenance

### Code Style

- **Templates:** 2-space indentation
- **CSS:** Tailwind utility-first
- **JavaScript:** ES6+, no jQuery
- **Markdown:** Standard syntax

### Pull Request Process

1. Create branch from `main`
2. Make changes and test locally
3. Push and create PR
4. Review Cloudflare Pages preview
5. Address review comments
6. Merge when approved

## 📚 Resources

### Documentation

- [Hugo Docs](https://gohugo.io/documentation/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)

### Tools

- [Hugo](https://gohugo.io/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Canvas](https://www.npmjs.com/package/canvas) - Image generation
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing

### Community

- [DevOpsDays Global](https://devopsdays.org/)
- [Swiss DevOps Community](https://swiss-devops.org/)
- [DevOpsDays Slack](https://devopsdayscommunity.slack.com/)

## 🆘 Getting Help

- **Content Management:** [CONTRIBUTOR.md](CONTRIBUTOR.md)
- **Technical Docs:** [docs/TECHNICAL_SETUP.md](docs/TECHNICAL_SETUP.md)
- **Feature Flags:** [docs/FEATURE_FLAGS.md](docs/FEATURE_FLAGS.md)
- **Issues:** <https://github.com/dod-zh/web/issues>
- **Email:** <organizer@devopsdays.ch>

## 📄 License

MIT License - see [LICENSE](LICENSE) file.
