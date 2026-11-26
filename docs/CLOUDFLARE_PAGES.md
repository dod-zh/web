# Cloudflare Pages Deployment Guide

This project is deployed using Cloudflare Pages with Wrangler for both production and PR previews.

## Overview

- **Production**: Automatically deployed from the `main` branch to `https://devopsdays.ch`
- **PR Previews**: Automatically deployed for each pull request to `https://preview-pr-{number}.devopsdays-ch.pages.dev`

## Setup Instructions

### Prerequisites

1. A Cloudflare account with Pages enabled
2. Your domain configured in Cloudflare (if using custom domain)

### Initial Setup

1. **Create Cloudflare API Token**:
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Click **Create Token** → **Custom Token** → **Get started**
   - Token name: `GitHub Actions - DevOpsDays`
   - **Permissions**:
     - **Account** → **Cloudflare Pages** → **Edit**
   - Click **Continue to summary** → **Create Token**
   - Copy the API token (you won't see it again!)

2. **Get Cloudflare Account ID**:
   - Go to Cloudflare Dashboard → Workers & Pages
   - Account ID is visible in the right sidebar
   - Or get it from the URL: `https://dash.cloudflare.com/<ACCOUNT_ID>/pages`

3. **Configure GitHub Repository Secrets**:
   Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions → New repository secret):
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

4. **First Deployment Creates the Project**:
   - The first workflow run will automatically create the `devopsdays-ch` project in Cloudflare Pages
   - No manual project creation needed with `wrangler-action`

5. **Configure Custom Domain** (After First Deployment):
   - Go to Cloudflare Pages → devopsdays-ch → Custom domains
   - Add `devopsdays.ch` and `www.devopsdays.ch`
   - DNS records will be automatically configured

### Workflows

#### Production Deployment (`.github/workflows/cloudflare-pages.yml`)

- **Triggers**: Push to `main` branch, manual dispatch
- **Hugo Version**: 0.170.0
- **Node Version**: 18
- **Deployment**: Uses `wrangler-action@v3` with `pages deploy` command
- **Build Process**:
  1. Install Hugo and Node.js dependencies
  2. Generate sponsor banner
  3. Build site with Hugo (minified)
  4. Deploy to Cloudflare Pages using Wrangler

#### PR Preview Deployment (`.github/workflows/cloudflare-pages-preview.yml`)

- **Triggers**: PR opened, synchronized, reopened, or closed
- **Features**:
  - Creates preview deployment for each PR at `https://preview-pr-{number}.devopsdays-ch.pages.dev`
  - Posts/updates comment with preview URL
  - Preview deployments remain accessible after PR close
- **Build Process**: Same as production but with `HUGO_ENV=preview`

## Environment Variables

### GitHub Actions Variables

- `CLOUDFLARE_PAGES_URL`: (Optional) Override production URL (defaults to `https://devopsdays.ch`)

### Cloudflare Pages Build Settings

The project uses GitHub Actions for building (not Cloudflare's build system).
If you want to use Cloudflare's native builds instead:

- **Build command**: `npm run build`
- **Build output directory**: `public`
- **Root directory**: `/`
- **Environment variables**:
  - `HUGO_VERSION`: `0.170.0`
  - `NODE_VERSION`: `18`
  - `HUGO_ENV`: `production`

## Custom 404 page and redirects

Cloudflare Pages treats a project without a top-level `404.html` as a single-page application and serves the homepage (`/`) with HTTP 200 for any unknown path. That is a soft 404: Google can index the same homepage under many URLs ("Duplicate without user-selected canonical").

Hugo renders `themes/devopsdays/layouts/404.html` to `public/404.html`. With that file at the output root, Pages returns a real HTTP 404 and the custom page. The 404 template sets `noindex` and omits the canonical tag so it cannot point at the homepage.

Path redirects live in `static/_redirects` and are copied to the output root. Do not add a catch-all `/* /index.html 200` (or similar) rule; that would restore the SPA fallback. Keep both slash variants for legacy paths, and point targets at current trailing-slash URLs to avoid redirect chains. `www.devopsdays.ch` is redirected to the apex at the hostname level, not in `_redirects`.

## Troubleshooting

### Build Failures

1. Check Hugo version matches (`0.170.0`)
2. Verify all npm dependencies install correctly
3. Ensure system fonts are available for banner generation

### Deployment Failures

1. Verify API token has correct permissions (**Account** → **Cloudflare Pages** → **Edit**)
2. Check Cloudflare account ID is correct
3. Ensure project name matches (`devopsdays-ch`)
4. First deployment will auto-create the project (requires correct permissions)

### Preview URLs Not Working

1. Verify `baseURL` is set to `/` for previews
2. Check PR comment permissions in workflow
3. Preview URL format: `https://preview-pr-{number}.devopsdays-ch.pages.dev`

## Migration from Netlify/GitHub Pages

The migration removes:

- `netlify.toml` configuration
- `.github/workflows/github_pages.yml`

Key changes:

- Uses `wrangler-action@v3` instead of deprecated `pages-action@v1`
- Hugo version updated to 0.168.0 (was 0.150.0; originally 0.128.0 in GitHub Pages)
- Hugo version updated to 0.170.0 (standard edition; extended/LibSass dropped upstream)
- Build process now consistent between production and previews
- PR previews include automatic comment updates
- Project auto-creation on first deployment
- Predictable preview URLs based on PR number

## Wrangler Action vs Pages Action

This setup uses `cloudflare/wrangler-action@v3` which:

- ✅ Auto-creates projects on first deployment
- ✅ Actively maintained and recommended by Cloudflare
- ✅ Unified tool for Workers and Pages
- ✅ Better error messages and logging

The deprecated `cloudflare/pages-action@v1`:

- ❌ Requires manual project creation
- ❌ No longer maintained (archived Oct 2024)
- ❌ Limited deployment outputs

## Monitoring

- **Production**: Monitor via Cloudflare Pages dashboard
- **Build logs**: Available in GitHub Actions tab
- **Analytics**: Enable Web Analytics in Cloudflare dashboard
- **Deployment history**: View in Cloudflare Pages → devopsdays-ch → View builds

## Rollback

To rollback a deployment:

1. Go to Cloudflare Dashboard → Pages → devopsdays-ch
2. Click "View build" on desired deployment
3. Click "Rollback to this deployment"

Or re-run a previous successful GitHub Actions workflow.
