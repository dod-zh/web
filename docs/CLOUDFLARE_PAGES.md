# Cloudflare Pages Deployment Guide

This project is deployed using Cloudflare Pages for both production and PR previews.

## Overview

- **Production**: Automatically deployed from the `main` branch to `https://devopsdays.ch`
- **PR Previews**: Automatically deployed for each pull request

## Setup Instructions

### Prerequisites

1. A Cloudflare account with Pages enabled
2. Your domain configured in Cloudflare (if using custom domain)

### Initial Setup

1. **Create Cloudflare API Token**:
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Create token with "Cloudflare Pages" template or custom token with permissions:
     - Account > Cloudflare Pages > Edit
   - Copy the API token

2. **Get Cloudflare Account ID**:
   - Go to Cloudflare Dashboard → Pages
   - Account ID is visible in the right sidebar

3. **Create Cloudflare Pages Project**:
   - Option A: Let the GitHub Action create it automatically on first deployment
   - Option B: Manually create via Cloudflare Dashboard:
     - Go to Workers & Pages → Create application → Pages → Connect to Git
     - Skip framework preset (we use GitHub Actions)
     - Project name: `devopsdays-ch`

4. **Configure GitHub Repository Secrets**:
   Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

5. **Configure Custom Domain** (Optional):
   - Go to Cloudflare Pages → Your Project → Custom domains
   - Add `devopsdays.ch` and `www.devopsdays.ch`
   - DNS records will be automatically configured

### Workflows

#### Production Deployment (`.github/workflows/cloudflare-pages.yml`)

- **Triggers**: Push to `main` branch, manual dispatch
- **Hugo Version**: 0.150.0
- **Node Version**: 18
- **Build Process**:
  1. Install Hugo and Node.js dependencies
  2. Generate sponsor banner
  3. Build site with Hugo (minified)
  4. Deploy to Cloudflare Pages

#### PR Preview Deployment (`.github/workflows/cloudflare-pages-preview.yml`)

- **Triggers**: PR opened, synchronized, reopened, or closed
- **Features**:
  - Creates preview deployment for each PR
  - Posts/updates comment with preview URL
  - Automatically cleans up deployment when PR is closed
- **Build Process**: Same as production but with `HUGO_ENV=preview`

## Environment Variables

### GitHub Actions Variables

- `CLOUDFLARE_PAGES_URL`: (Optional) Override production URL (defaults to `https://devopsdays.ch`)

### Cloudflare Pages Build Settings

If using Cloudflare's build system instead of GitHub Actions:

- **Build command**: `npm run build`
- **Build output directory**: `public`
- **Root directory**: `/`
- **Environment variables**:
  - `HUGO_VERSION`: `0.150.0`
  - `NODE_VERSION`: `18`
  - `HUGO_ENV`: `production`

## Troubleshooting

### Build Failures

1. Check Hugo version matches (`0.150.0`)
2. Verify all npm dependencies install correctly
3. Ensure system fonts are available for banner generation

### Deployment Failures

1. Verify API token has correct permissions
2. Check Cloudflare account ID is correct
3. Ensure project name matches (`devopsdays-ch`)

### Preview URLs Not Working

1. Verify `baseURL` is set to `/` for previews
2. Check PR comment permissions in workflow
3. Ensure `GITHUB_TOKEN` has required permissions

## Migration from Netlify/GitHub Pages

The migration removes:

- `netlify.toml` configuration
- `.github/workflows/github_pages.yml`

Key changes:

- Hugo version updated to 0.150.0 (was 0.128.0 in GitHub Pages)
- Build process now consistent between production and previews
- PR previews include automatic comment updates
- Deployment cleanup on PR close

## Monitoring

- **Production**: Monitor via Cloudflare Pages dashboard
- **Build logs**: Available in GitHub Actions tab
- **Analytics**: Enable Web Analytics in Cloudflare dashboard

## Rollback

To rollback a deployment:

1. Go to Cloudflare Dashboard → Pages → Your Project
2. Click "View build" on desired deployment
3. Click "Rollback to this deployment"

Or re-run a previous successful GitHub Actions workflow.
