# DevOpsDays Zurich Website

This repository contains the source code for the DevOpsDays Zurich website, built with Hugo static site generator.

## 🚀 Quick Start

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (for development tools)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/dod-zh/web.git
   cd web
   ```

2. **Start the development server**

   ```bash
   hugo server -D
   ```

3. **Open your browser**
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
│   └── about/            # About section pages
├── data/                 # JSON data files
│   ├── events.json       # Past and future events timeline
│   ├── sessions.json     # Conference sessions and schedule
│   ├── speakers.json     # Speaker basic info (IDs, names, images)
│   ├── sponsors.json     # Sponsor information by tier
│   └── team.json         # Organizing team member details
├── docs/                 # Project documentation
│   └── README.md        # Documentation index
├── scripts/              # Helper scripts
│   └── generate-sponsor-banner.js  # Sponsor banner generation script
├── static/               # Static assets
│   ├── css/             # Custom stylesheets
│   ├── images/          # Images and logos
│   └── js/              # JavaScript files
├── themes/devopsdays/    # Hugo theme
│   └── layouts/         # HTML templates
└── config.yaml          # Hugo configuration
```

## 🎨 Theme Features

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, sitemap
- **GDPR Compliant**: Cookie consent management
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for Core Web Vitals
- **Multi-level Navigation**: Supports complex menu structures

## 📝 Content Management

### Adding Content

#### New Page

```bash
hugo new content/section/page-name.md
```

#### Session Information

Edit `data/sessions.json`:

```json
{
  "sessions": [
    {
      "id": "talks/session-slug",
      "title": "Session Title",
      "type": "talk|keynote|ignite|workshop|other",
      "day": "2025-03-12",
      "time": "10:00 - 10:45",
      "speakers": ["speaker-id"]
    }
  ]
}
```

**Session Types:**

- `talk` - Regular 45-minute talk
- `keynote` - Keynote presentation
- `ignite` - 5-minute lightning talk
- `workshop` - Hands-on workshop session
- `other` - Registration, breaks, social events

#### Speaker Profiles

Edit `data/speakers.json`:

```json
{
  "speakers": [
    {
      "id": "speaker-slug",
      "name": "Speaker Name",
      "image": "/images/speakers/speaker-slug.webp",
      "page": "/speakers/speaker-slug/"
    }
  ]
}
```

**Note:** Detailed speaker bios are stored in markdown files at `content/speakers/speaker-slug.md`

#### Sponsor Information

Edit `data/sponsors.json`:

```json
{
  "sponsors": [
    {
      "id": "sponsor-id",
      "name": "Company Name",
      "level": "platinum|gold|silver|bronze",
      "logo": "/images/sponsors/logo.webp",
      "website": "https://example.com",
      "description": "Sponsor tier",
      "featured": true
    }
  ]
}
```

#### Team Members

Edit `data/team.json`:

```json
{
  "team": [
    {
      "id": "team-id",
      "name": "Team Member Name",
      "role": "Organizer|Volunteer",
      "bio": "Biography text",
      "image": "/images/team/member.webp",
      "email": "email@example.com",
      "social": {
        "twitter": "@handle",
        "linkedin": "linkedin-username"
      }
    }
  ]
}
```

#### Events History

Edit `data/events.json`:

```json
{
  "events": [
    {
      "year": 2025,
      "date": "2025-06-15",
      "endDate": "2025-06-16",
      "status": "upcoming|current|past",
      "venue": "Venue Name",
      "city": "City",
      "attendees": 300,
      "theme": "Event Theme"
    }
  ]
}
```

### Front Matter

All content pages support these front matter fields:

```yaml
---
title: "Page Title"
description: "Meta description for SEO"
date: 2025-09-14
type: "custom-layout-type"
---
```

## 🎯 Special Pages

### Program Page

- Automatically generates schedule from `data/sessions.json`
- Groups sessions by day and time
- Links sessions to speaker profiles
- Color-coded by session type (talks, keynotes, ignites, workshops)

### Speakers Page

- Displays speaker profiles with images
- Combines data from `data/speakers.json` and `content/speakers/*.md`
- Supports social media links
- Links to individual speaker detail pages

### Sponsors Page

- Displays sponsors by tier (Platinum, Gold, Silver, Bronze)
- Pulls data from `data/sponsors.json`
- Featured sponsors can appear in header/footer
- Links to sponsor websites

### Contact/Team Page

- Shows team member cards from `data/team.json`
- Displays organizer and volunteer information
- Includes social media links and email contacts

### Past Events

- Historical event information from `data/events.json`
- Displays event timeline with attendance numbers
- Archives and links to previous content

## 📊 Data Files

All structured data is stored in JSON files in the `/data` directory:

| File | Purpose | Structure |
|------|---------|-----------|
| `sessions.json` | Conference sessions and schedule | Array of session objects with type, time, speakers |
| `speakers.json` | Speaker basic info and references | Array of speaker objects with ID, name, image |
| `sponsors.json` | Sponsor information and logos | Array of sponsor objects by tier |
| `team.json` | Organizing team members | Array of team member objects |
| `events.json` | Past and future events | Array of event objects with dates and stats |

**Note:** Speaker detailed bios are stored as markdown files in `content/speakers/` directory.

## 🚀 Deployment

### Automatic Deployment (Recommended)

The site automatically deploys when you:

1. Push to `main` branch → Production deployment
2. Create a pull request → Preview deployment at `/preview-[PR-number]/`

### Netlify

- Connect the GitHub repository to Netlify and select the `main` branch.
- The build command and publish directory are defined in `netlify.toml` (`hugo --gc --minify`, `public`).
- Hugo 0.150.0, Node 18, and Git info are enforced via environment variables so previews match production.
- Deploy previews and branch deploys automatically reuse the preview URL thanks to `DEPLOY_PRIME_URL`.

### Manual Deployment

```bash
# Build the site
hugo --minify

# Deploy to hosting provider
# (copy contents of ./public/ directory)
```

## 🔧 Configuration

### Site Configuration (`config.yaml`)

The site configuration is managed in `config.yaml`. Here are the main sections:

#### Basic Settings

```yaml
baseURL: 'https://devopsdays.ch'
languageCode: 'en-us'
title: DevOpsDays Zurich
theme: 'devopsdays'
```

- **baseURL**: Your production domain
- **languageCode**: Language code for the site (e.g., 'en-us', 'de-ch')
- **title**: Site title displayed in browser and meta tags
- **theme**: Hugo theme name (must match folder in `themes/`)

#### Custom Parameters

```yaml
params:
  description: 'Site description for SEO'
  author: 'DevOpsDays Zurich Team'
  keywords: 'devops, switzerland, conference, community, automation, culture'
  social:
    linkedin: 'https://www.linkedin.com/company/devopsdays-zurich'
    vimeo: 'https://vimeo.com/devopsdayszh'
    flickr: 'https://www.flickr.com/photos/...'
  features:
    show_program: true      # Show/hide program page
    show_tickets: true      # Show/hide tickets page
    show_cfp: false         # Show/hide Call for Papers
    show_speakers: true     # Show/hide speakers page
    cfp_url: 'https://sessionize.com/...'  # CFP platform URL
```

**Feature Flags**: Use the `features` section to toggle site sections on/off without removing content.

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
- Use `weight` to control ordering (lower numbers appear first)
- Keep weight gaps (10, 20, 30) to allow easy insertion of new items

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
    disable: false              # Set to true to disable Google Analytics
    anonymizeIP: true           # Anonymize visitor IP addresses
    respectDoNotTrack: true     # Respect browser Do Not Track setting
```

### Environment Variables

For production deployment:

```bash
HUGO_ENV=production    # Enables production optimizations
HUGO_VERSION=latest    # Hugo version (or specific version like 0.120.0)
```

## 🎨 Customization

### Styling

The site uses Tailwind CSS with custom overrides in `/static/css/custom.css`.

### Templates

Hugo templates are in `themes/devopsdays/layouts/`:

- `_default/baseof.html`: Base template
- `_default/single.html`: Single page template
- `index.html`: Homepage template
- `partials/`: Reusable components

### Adding New Layouts

1. Create new layout in `themes/devopsdays/layouts/[type]/single.html`
2. Set `type: "[type]"` in page front matter

## 🧪 Testing

### Content Validation

```bash
# Check for broken links
hugo --printI18nWarnings --printPathWarnings

# Validate HTML
npm install -g html-validate
html-validate public/**/*.html
```

### Performance Testing

```bash
# Lighthouse CI (configured in .lighthouserc.json)
npm install -g @lhci/cli
lhci autorun
```

## 📊 Analytics & SEO

### Built-in Features

- **Structured Data**: Event schema markup
- **Open Graph**: Social media previews
- **Meta Tags**: SEO optimization
- **Sitemap**: Auto-generated XML sitemap
- **RSS Feed**: Content syndication

### Analytics Setup

Configure in `config.yaml`:

```yaml
privacy:
  googleAnalytics:
    disable: false
    anonymizeIP: true
    respectDoNotTrack: true
```

## 🤝 Contributing

### Content Contributions

1. **Fork the repository**
2. **Create a feature branch**

   ```bash
   git checkout -b feature/new-content
   ```

3. **Make your changes**
4. **Test locally**

   ```bash
   hugo server -D
   ```

5. **Submit a pull request**

### Code Contributions

1. **Follow Hugo best practices**
2. **Use semantic HTML**
3. **Ensure accessibility compliance**
4. **Test on multiple devices**
5. **Update documentation**

### Content Guidelines

- **Markdown**: Use standard Markdown syntax
- **Images**: Optimize for web (WebP preferred)
- **Links**: Use relative links for internal content
- **Accessibility**: Include alt text for images

## 🐛 Troubleshooting

### Common Issues

**Hugo not found**

```bash
# Install Hugo extended
brew install hugo
# or
snap install hugo --channel=extended
```

**Dev container issues**

```bash
# Rebuild container
Ctrl+Shift+P → "Dev Containers: Rebuild Container"
```

**Build errors**

```bash
# Clear Hugo cache
hugo mod clean
```

**Template errors**

```bash
# Check Hugo version compatibility
hugo version
```

### Getting Help

- **Documentation**: [Hugo Documentation](https://gohugo.io/documentation/)
- **Issues**: Create a GitHub issue
- **Community**: [DevOpsDays Slack](https://devopsdayscommunity.slack.com/)
- **Email**: [organizer@devopsdays.ch](mailto:organizer@devopsdays.ch)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugo](https://gohugo.io/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [DevOpsDays Global](https://devopsdays.org/) - Global community
- [Swiss DevOps Community](https://swiss-devops.org/) - Local community

---

**Built with ❤️ by the Swiss DevOps community**
