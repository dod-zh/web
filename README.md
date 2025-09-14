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
   git clone https://github.com/tweinmann/devopsdays_ch-web.git
   cd devopsdays_ch-web
   ```

2. **Start the development server**

   ```bash
   hugo server -D
   ```

3. **Open your browser**
   Navigate to `http://localhost:1313`

### Using Dev Container

For a consistent development environment:

1. **Open in VS Code**
   - Install the "Dev Containers" extension
   - Open the project folder
   - Click "Reopen in Container" when prompted

2. **Start Hugo server inside container**

   ```bash
   hugo server -D --bind 0.0.0.0
   ```

## 📁 Project Structure

```
devopsdays_ch-web/
├── .devcontainer/          # Dev container configuration
├── .github/workflows/      # CI/CD pipelines
├── content/               # Markdown content files
│   ├── event/            # Event-related pages
│   └── about/            # About section pages
├── data/                 # JSON data files
│   ├── sessions.json     # Session information
│   ├── speakers.json     # Speaker profiles
│   ├── sponsors.json     # Sponsor information
│   ├── team.json         # Team member details
│   └── events.json       # Past and current events
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
  "id": "session-id",
  "title": "Session Title",
  "type": "talk|keynote|ignite|workshop",
  "day": 1,
  "time": "10:00",
  "duration": 30,
  "speaker": "speaker-id",
  "description": "Brief description",
  "abstract": "Detailed abstract",
  "room": "Room Name"
}
```

#### Speaker Profiles

Edit `data/speakers.json`:

```json
{
  "id": "speaker-id",
  "name": "Speaker Name",
  "title": "Job Title",
  "company": "Company Name",
  "bio": "Speaker biography",
  "image": "/images/speakers/speaker.jpg",
  "social": {
    "twitter": "@handle",
    "linkedin": "profile",
    "website": "https://example.com"
  }
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
- Links sessions to speaker profiles
- Color-coded by session type

### Sponsors Page

- Displays sponsors by tier (Platinum, Gold, Silver, Bronze)
- Pulls data from `data/sponsors.json`
- Featured sponsors appear in header

### Contact Page

- Shows team member cards from `data/team.json`
- Contact forms and information

### Past Events

- Historical event information from `data/events.json`
- Archives and links to previous content

## 🚀 Deployment

### Automatic Deployment (Recommended)

The site automatically deploys when you:

1. Push to `main` branch → Production deployment
2. Create a pull request → Preview deployment at `/preview-[PR-number]/`

### Manual Deployment

```bash
# Build the site
hugo --minify

# Deploy to hosting provider
# (copy contents of ./public/ directory)
```

## 🔧 Configuration

### Site Configuration (`config.yaml`)

Key configuration options:

- **baseURL**: Your domain
- **title**: Site title
- **params**: Custom parameters
- **menu**: Navigation structure
- **privacy**: GDPR settings

### Environment Variables

For production deployment:

- `HUGO_ENV=production`
- `HUGO_VERSION=latest`

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
- **Email**: [info@devopsdays.ch](mailto:info@devopsdays.ch)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugo](https://gohugo.io/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [DevOpsDays Global](https://devopsdays.org/) - Global community
- [Swiss DevOps Community](https://swiss-devops.org/) - Local community

---

**Built with ❤️ by the Swiss DevOps community**
