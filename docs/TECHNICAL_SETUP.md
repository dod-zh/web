# Technical Setup Guide

This guide covers the technical setup, development environment, and deployment configuration for the DevOpsDays Zurich website.

## 🚀 Development Setup

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version 0.150.0 or later)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) v18 or later (for build tools)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/dod-zh/web.git
   cd web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   hugo server -D
   ```

4. **Open your browser**
   Navigate to `http://localhost:1313`

### Using Dev Container (Recommended)

This project includes a fully configured dev container with Hugo, Go, Node.js, and all necessary tools pre-installed.

#### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or compatible container runtime
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Setup

1. **Open in VS Code**
   - Open the project folder in VS Code
   - When prompted, click "Reopen in Container"
   - Or use Command Palette (F1) → "Dev Containers: Reopen in Container"

2. **Wait for container to build**
   - First build may take a few minutes
   - Subsequent launches are much faster

3. **Start Hugo server**

   ```bash
   hugo server -D --bind 0.0.0.0
   ```

4. **Access the site**
   - The site will be available at `http://localhost:1313`
   - VS Code will automatically forward the port

#### What's Included

- **Hugo Extended** - Latest version with SCSS/SASS support
- **Go** - Required for Hugo modules
- **Node.js & npm** - For build tools and dependencies
- **Git & GitHub CLI** - Version control and GitHub integration
- **Common CLI tools** - curl, wget, jq, and more

#### Benefits

- ✅ Consistent environment across all developers
- ✅ No need to install Hugo or dependencies locally
- ✅ Isolated from your host system
- ✅ Easy onboarding for new team members
- ✅ Same environment used in CI/CD

## 📁 Project Structure

```
devopsdays_ch-web/
├── .devcontainer/          # Dev container configuration
├── .github/workflows/      # CI/CD pipelines
├── content/               # Markdown content files
│   ├── event/            # Event-related pages
│   ├── about/            # About section pages
│   ├── speakers/         # Speaker detail pages
│   └── sessions/         # Session detail pages
├── data/                 # JSON data files
│   ├── events.json       # Past and future events timeline
│   ├── sessions.json     # Conference sessions and schedule
│   ├── speakers.json     # Speaker basic info (IDs, names, images)
│   ├── sponsors.json     # Sponsor information by tier
│   └── team.json         # Organizing team member details
├── docs/                 # Project documentation
│   ├── README.md         # Documentation index
│   └── TECHNICAL_SETUP.md # This file
├── scripts/              # Helper scripts
│   └── generate-sponsor-banner.js  # Sponsor banner generation
├── static/               # Static assets
│   ├── css/             # Custom stylesheets
│   ├── images/          # Images and logos
│   └── js/              # JavaScript files
├── themes/devopsdays/    # Hugo theme
│   ├── layouts/         # HTML templates
│   └── static/          # Theme assets
├── config.yaml          # Hugo configuration
├── netlify.toml         # Netlify deployment config
└── package.json         # Node.js dependencies
```

## 🚀 Deployment

### Deployment Architecture

The site uses a dual deployment strategy:

1. **Netlify** - Preview deployments for Pull Requests
2. **GitHub Pages** - Production deployment at <https://devopsdays.ch>

### Automatic Deployment Flow

**Pull Request Created/Updated:**

1. Netlify automatically detects the PR
2. Builds a preview deployment
3. Posts preview URL in PR comments
4. Updates preview on each new commit

**Pull Request Merged to `main`:**

1. GitHub Actions workflow triggers
2. Builds the site with Hugo
3. Deploys to GitHub Pages
4. Site goes live at <https://devopsdays.ch> (~2-3 minutes)

### Branch Protection

The `main` branch is protected:

- ❌ Direct commits not allowed
- ✅ All changes must go through Pull Requests
- ✅ Ensures review before production
- ✅ Automatic preview before merge

### Netlify Configuration (Preview Only)

- Build command: `npm run build` (defined in `netlify.toml`)
- Publish directory: `public`
- Hugo version: 0.150.0
- Node version: 18
- Environment: Preview mode with custom baseURL

**Netlify.toml settings:**

```toml
[build]
command = "npm run build"
publish = "public"

[build.environment]
HUGO_VERSION = "0.150.0"
HUGO_ENV = "production"
HUGO_ENABLEGITINFO = "true"
NODE_VERSION = "18"

[context.deploy-preview]
command = "npm run generate:banner && hugo --gc --minify --baseURL=$DEPLOY_PRIME_URL"
```

### GitHub Pages Configuration (Production)

Production deployment is handled by GitHub Actions:

- Workflow file: `.github/workflows/deploy.yml` (or similar)
- Trigger: Push to `main` branch (via PR merge)
- Build: Hugo with production settings
- Deploy: GitHub Pages at <https://devopsdays.ch>
- DNS: Custom domain configured in repository settings

### Manual Deployment

```bash
# Generate sponsor banner
npm run generate:banner

# Build the site
hugo --minify

# Deploy to hosting provider
# (copy contents of ./public/ directory)
```

## 🔧 Configuration

### Site Configuration (`config.yaml`)

The site configuration is managed in `config.yaml`.

#### Basic Settings

```yaml
baseURL: 'https://devopsdays.ch'
languageCode: 'en-us'
title: DevOpsDays Zurich
theme: 'devopsdays'
```

- **baseURL**: Production domain (must match hosting)
- **languageCode**: Language code (e.g., 'en-us', 'de-ch')
- **title**: Site title displayed in browser and meta tags
- **theme**: Hugo theme name (must match folder in `themes/`)

#### Custom Parameters

```yaml
params:
  description: 'DevOpsDays Zurich - Switzerland's premier DevOps conference'
  author: 'DevOpsDays Zurich Team'
  keywords: 'devops, switzerland, conference, community, automation, culture'
  social:
    linkedin: 'https://www.linkedin.com/company/devopsdays-zurich'
    vimeo: 'https://vimeo.com/devopsdayszh'
    flickr: 'https://www.flickr.com/photos/...'
```

#### Feature Flags

Control visibility of site sections without removing content:

```yaml
params:
  features:
    show_program: true      # Show/hide program page and menu
    show_tickets: true      # Show/hide tickets page and CTA buttons
    show_cfp: false         # Show/hide Call for Papers button
    show_speakers: true     # Show/hide speakers page and menu
    cfp_url: 'https://sessionize.com/devopsdays-zurich-2025/'
```

See [FEATURE_FLAGS.md](FEATURE_FLAGS.md) for detailed documentation.

#### Markup Configuration

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true          # Allow raw HTML in markdown
  highlight:
    style: github           # Syntax highlighting theme
    lineNos: true           # Show line numbers in code blocks
```

#### Menu Structure

The navigation menu supports multi-level hierarchies:

```yaml
menu:
  main:
    - name: "Home"
      url: "/"
      weight: 10          # Lower weight = appears first
    - name: "Event"
      url: "/event/"
      weight: 20
      identifier: "event" # Required for parent items
    - name: "Tickets"
      url: "/event/tickets/"
      parent: "event"     # Creates submenu under "Event"
      weight: 21
```

**Tips:**

- Use `identifier` for parent menu items
- Use `parent` to create submenus
- Use `weight` to control ordering (lower = first)
- Keep weight gaps (10, 20, 30) for easy insertion

#### Output Formats

```yaml
outputFormats:
  RSS:
    mediatype: "application/rss"
    baseName: "feed"      # Creates /feed.xml instead of /index.xml
```

#### Privacy Settings (GDPR Compliance)

```yaml
privacy:
  googleAnalytics:
    disable: false              # Set to true to disable GA
    anonymizeIP: true           # Anonymize visitor IPs
    respectDoNotTrack: true     # Respect browser DNT setting
```

### Environment Variables

For production deployment:

```bash
HUGO_ENV=production          # Enables production optimizations
HUGO_VERSION=0.150.0        # Hugo version
HUGO_ENABLEGITINFO=true     # Enable Git info in templates
NODE_VERSION=18             # Node.js version
```

## 🎨 Customization

### Styling

The site uses Tailwind CSS with custom overrides in `/static/css/custom.css`.

**Color Variables:**

```css
:root {
  --cerulean: #007fa3;
  --sunset: #f15d4f;
  --mint: #9ac3b7;
  --steel: #485967;
}
```

### Templates

Hugo templates are in `themes/devopsdays/layouts/`:

- `_default/baseof.html`: Base template with HTML structure
- `_default/single.html`: Single page template
- `index.html`: Homepage template
- `partials/`: Reusable components
  - `header.html`: Site header and navigation
  - `footer.html`: Site footer
  - `page-header.html`: Page title sections
  - `session-card.html`: Session display cards
  - `session-type-styling.html`: Session type styling logic

### Adding New Layouts

1. Create new layout in `themes/devopsdays/layouts/[type]/single.html`
2. Set `type: "[type]"` in page front matter
3. Template will automatically use the custom layout

## 🧪 Testing

### Content Validation

```bash
# Check for broken links and warnings
hugo --printI18nWarnings --printPathWarnings

# Validate HTML output
npm run validate
```

### Performance Testing

```bash
# Run Lighthouse CI
npm run lighthouse
```

Configuration in `.lighthouserc.json`.

### Build Commands

```bash
# Development build with drafts
npm run dev

# Production build
npm run build

# Clean build artifacts
npm run clean

# Generate sponsor banner only
npm run generate:banner
```

## 🔨 Build Scripts

### Sponsor Banner Generation

The `generate-sponsor-banner.js` script automatically creates a composite banner image from sponsor logos:

```bash
npm run generate:banner
```

**Features:**

- Reads sponsor data from `data/sponsors.json`
- Arranges logos by tier (Gold, Silver, Bronze, etc.)
- Outputs to `static/images/banner/sponsor-banner.jpg`
- Automatically runs during `npm run build`

**Requirements:**

- Node.js packages: `canvas`, `sharp`
- Sponsor logos in `static/images/sponsors/`
- Header image at `static/images/banner/devopsdays-header.jpg`

## 📊 Analytics & SEO

### Built-in Features

- **Structured Data**: Event schema markup for search engines
- **Open Graph**: Social media preview cards
- **Meta Tags**: SEO optimization with title/description
- **Sitemap**: Auto-generated XML sitemap at `/sitemap.xml`
- **RSS Feed**: Content syndication at `/feed.xml`

### Analytics Setup

Configure Google Analytics in `config.yaml`:

```yaml
privacy:
  googleAnalytics:
    disable: false              # Enable/disable tracking
    anonymizeIP: true           # GDPR compliance
    respectDoNotTrack: true     # Respect browser settings
```

## 🐛 Troubleshooting

### Common Issues

**Hugo not found**

```bash
# macOS
brew install hugo

# Linux (snap)
snap install hugo --channel=extended

# Windows (chocolatey)
choco install hugo-extended
```

**Dev container issues**

```bash
# Rebuild container completely
Ctrl+Shift+P → "Dev Containers: Rebuild Container"

# Check Docker is running
docker ps
```

**Build errors**

```bash
# Clear Hugo cache
hugo mod clean

# Remove generated files
npm run clean

# Rebuild from scratch
npm run build
```

**Template errors**

```bash
# Check Hugo version
hugo version

# Should be 0.150.0 or later with extended features
```

**Node.js dependency issues**

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

Run Hugo with verbose output:

```bash
hugo server -D --verbose --debug
```

### Port Already in Use

```bash
# Use different port
hugo server -D --port 1314

# Or kill existing process
lsof -ti:1313 | xargs kill -9
```

## 🤝 Contributing

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/my-improvement
   ```

3. **Make your changes**
4. **Test locally**

   ```bash
   npm run build
   hugo server -D
   ```

5. **Submit a pull request**

### Development Guidelines

- **Follow Hugo best practices**
- **Use semantic HTML5**
- **Ensure accessibility (WCAG 2.1 AA)**
- **Test responsive design (mobile, tablet, desktop)**
- **Update documentation for changes**
- **Use meaningful commit messages**

### Code Style

- **Templates**: Use consistent indentation (2 spaces)
- **CSS**: Follow Tailwind CSS utility-first approach
- **JavaScript**: ES6+ syntax, avoid jQuery
- **Markdown**: Follow standard Markdown syntax

## 📚 Additional Resources

### Documentation

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

### DevOpsDays Resources

- [DevOpsDays Global](https://devopsdays.org/)
- [Swiss DevOps Community](https://swiss-devops.org/)
- [DevOpsDays Slack](https://devopsdayscommunity.slack.com/)

### Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/dod-zh/web/issues)
- **Email**: [organizer@devopsdays.ch](mailto:organizer@devopsdays.ch)
- **Community Slack**: Join the DevOpsDays community

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
