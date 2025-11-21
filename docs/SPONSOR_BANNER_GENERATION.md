# Sponsor Banner Auto-Generation

## Overview

The sponsor banner is automatically generated during the site build process. It combines the `banner-header.jpg` with sponsor logos organized by sponsorship level.

## How It Works

### Build Integration

The banner is automatically generated before each build via the `prebuild` npm script:

```bash
npm run build        # Generates banner, then builds site
npm run generate:banner  # Generate banner only (for testing)
```

### Generated Output

- **Output Path**: `static/images/generated/sponsor-banner.jpg`
- **Format**: JPEG (quality: 90%)
- **Width**: 1200px (fixed)
- **Height**: Dynamic (based on number of sponsors)

### Banner Structure

1. **Header Section**: `banner-header.jpg` at the top
2. **Sponsor Sections**: Organized by sponsorship level with titles:
   - Gold Sponsors (300x120px logos)
   - Silver Sponsors (250x100px logos)
   - Bronze Sponsors (200x80px logos)
   - Event Sponsors (200x80px logos)
   - Partners (180x72px logos)
   - Community Sponsors (180x72px logos)

### Data Source

The script reads from:

- **Sponsors Data**: `data/sponsors.json`
- **Header Image**: `static/images/banner-header.jpg`
- **Sponsor Logos**: `static/images/sponsors/`

Each sponsor in `sponsors.json` must have:

```json
{
  "id": "sponsor-id",
  "name": "Sponsor Name",
  "level": "gold|silver|bronze|event|partner|community",
  "logo": "/images/sponsors/logo.webp",
  "website": "https://example.com/",
  "description": "Sponsor description"
}
```

## Layout Algorithm

- Logos are automatically arranged in rows
- Each row is center-aligned
- Logos maintain aspect ratio while fitting within level-specific dimensions
- Proper spacing between logos (30px) and rows (20px)
- Section padding: 40px

## Configuration

Edit `scripts/generate-sponsor-banner.js` to customize:

```javascript
const CONFIG = {
  bannerWidth: 1200,          // Fixed banner width
  sectionPadding: 40,         // Padding around sections
  logoSpacing: 30,            // Space between logos
  rowSpacing: 20,             // Space between rows
  backgroundColor: '#ffffff',  // Background color
  textColor: '#333333',       // Section title color
  
  // Logo sizes per level
  logoSizes: {
    gold: { width: 300, height: 120 },
    silver: { width: 250, height: 100 },
    // ... etc
  }
};
```

## System Requirements

The banner generation requires:

1. **Node.js** (>=18)
2. **npm packages**:
   - `sharp` - Image processing
   - `canvas` - Text rendering
3. **System fonts** (for proper text display):
   - `fonts-dejavu-core`
   - `fonts-liberation`
   - `fontconfig`

To install system dependencies on Debian/Ubuntu:

```bash
sudo apt-get install -y fonts-dejavu-core fonts-liberation fontconfig
```

## Troubleshooting

### Missing Logos

If logos are missing, check:

1. Logo file exists in `static/images/sponsors/`
2. Path in `sponsors.json` matches actual filename
3. File format is supported (PNG, JPEG, WebP)

### Image Processing Errors

The script uses Sharp for image processing. If you see errors:

```bash
npm install --save-dev sharp  # Reinstall sharp
```

### Text Rendering Issues (Squares/Missing Text)

If section titles show as squares or are missing:

1. Install system fonts:

   ```bash
   sudo apt-get install -y fonts-dejavu-core fonts-liberation fontconfig
   ```

2. Rebuild font cache:

   ```bash
   fc-cache -f -v
   ```

3. Regenerate the banner:

   ```bash
   npm run generate:banner
   ```

### Fontconfig Warning

The "Fontconfig error: Cannot load default config file" warning may appear but is harmless - the fonts will still work correctly.

## Manual Generation

To regenerate the banner without building the site:

```bash
npm run generate:banner
```

The generated banner will be at:

```text
static/images/generated/sponsor-banner.jpg
```

## Usage in Templates

In Hugo templates, reference the generated banner:

```html
<img src="/images/generated/sponsor-banner.jpg" 
     alt="Our Sponsors" 
     width="1200" 
     height="auto">
```

## Future Enhancements

Possible improvements:

- Add watermark or branding elements
- Support different banner themes/styles
- Generate multiple sizes for responsive images
- Add sponsor hover effects (requires SVG output)
- Customizable section order via config file
