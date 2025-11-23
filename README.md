# DevOpsDays Zurich Website

Static website for DevOpsDays Zurich conference, built with Hugo.

## 🚀 Quick Start

```bash
git clone https://github.com/dod-zh/web.git
cd web
hugo server -D
```

Visit <http://localhost:1313>

## 📚 Documentation

- **[CONTRIBUTOR.md](CONTRIBUTOR.md)** - Content management guide (speakers, sessions, sponsors)
- **[DEVELOPER.md](DEVELOPER.md)** - Development and deployment guide
- **[docs/](docs/)** - Additional technical documentation

## 🛠️ Tech Stack

- **Hugo** 0.150.0+ (Extended) - Static site generator
- **Tailwind CSS** - Styling framework
- **Node.js** 18+ - Build tools
- **Cloudflare Pages** - Hosting and preview deployments

## 📁 Structure

```
web/
├── content/          # Markdown content pages
├── data/            # JSON data files (speakers, sessions, sponsors)
├── static/          # Static assets (images, css)
├── themes/devopsdays/ # Hugo theme with layouts
├── config.yaml      # Site configuration
└── package.json     # Build scripts
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Generate sponsor banner
npm run generate:banner

# Validate HTML
npm run validate
```

## 🚀 Deployment

### Preview Deployments

- Every PR gets automatic preview deployment to Cloudflare Pages
- Preview URL: `https://preview-pr-{number}.devopsdays-ch.pages.dev`
- Preview URL posted in PR comments
- Updates on each commit

### Production

- Merge to `main` triggers deployment to Cloudflare Pages
- Live at <https://devopsdays.ch> in ~2-3 minutes
- Deployed via GitHub Actions

**Note:** `main` branch is protected - all changes require Pull Requests.

## 🎯 Common Tasks

### Adding Content

Edit JSON files in `/data/` for structured data:

- `speakers.json` - Speaker info
- `sessions.json` - Conference schedule
- `sponsors.json` - Sponsor information
- `team.json` - Team members
- `events.json` - Event history

Create Markdown files in `/content/` for detailed pages.

### Feature Flags

Control visibility in `config.yaml`:

```yaml
params:
  features:
    show_program: true
    show_tickets: true
    show_cfp: false
    show_speakers: true
```

### Images

Place images in `/static/images/`:

- `speakers/` - Speaker photos
- `sponsors/` - Sponsor logos
- `team/` - Team photos

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/add-speaker

# Make changes and commit
git add .
git commit -m "feat: add new speaker"

# Push and create PR
git push origin feature/add-speaker
```

## 🧪 Testing

```bash
# Local preview
hugo server -D

# Build and validate
npm run build
npm run validate

# Performance testing
npm run lighthouse
```

## 📖 Additional Documentation

- **Feature Flags:** [docs/FEATURE_FLAGS.md](docs/FEATURE_FLAGS.md)
- **Technical Setup:** [docs/TECHNICAL_SETUP.md](docs/TECHNICAL_SETUP.md)
- **Quick Reference:** [docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes and test locally
4. Submit Pull Request

See [CONTRIBUTOR.md](CONTRIBUTOR.md) for content changes or [DEVELOPER.md](DEVELOPER.md) for technical contributions.

## 🆘 Support

- **Issues:** <https://github.com/dod-zh/web/issues>
- **Email:** <organizer@devopsdays.ch>
- **Community:** [DevOpsDays Slack](https://devopsdayscommunity.slack.com/)

## 📄 License

MIT License

---

Built with ❤️ by the Swiss DevOps community
