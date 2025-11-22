# Sponsor Package Configuration - Implementation Summary

## Changes Made

### 1. Created Package Configuration File

**File:** `data/sponsor_packages.json`

- Defines all sponsor packages with their limits
- Supports unlimited packages (using -1 for max_available)
- Contains pricing and metadata for each package

**Package Limits:**

- Gold: 5 packages
- Silver: 3 packages
- Bronze: unlimited
- Evening Event: 1 package
- Coffee: 1 package
- Meals: 1 package
- Snacks: 1 package

### 2. Created Dynamic Availability Shortcode

**File:** `themes/devopsdays/layouts/shortcodes/sponsor_availability.html`

- Calculates available packages in real-time
- Counts current sponsors from sponsors.json
- Compares with package limits
- Displays: number available, "unlimited", or "SOLD OUT"

### 3. Updated Sponsors Page

**File:** `content/event/sponsors.md`

- Replaced static availability values with dynamic shortcodes
- Now automatically updates when sponsors are added/removed
- Uses format: `{{< sponsor_availability "Package Name" >}}`

### 4. Documentation

**File:** `docs/SPONSOR_PACKAGES.md`

- Complete guide for managing sponsor packages
- Configuration reference
- Usage examples
- Troubleshooting tips

## Current Availability Status

Based on current sponsors in `data/sponsors.json`:

| Package       | Max Available | Current Sponsors | Available |
|--------------|---------------|------------------|-----------|
| Gold         | 5             | 4                | 1         |
| Silver       | 3             | 1                | 2         |
| Bronze       | unlimited     | 1                | unlimited |
| Evening Event| 1             | 1                | SOLD OUT  |
| Coffee       | 1             | 0                | 1         |
| Meals        | 1             | 0                | 1         |
| Snacks       | 1             | 0                | 1         |

## How to Use

### Adding a New Sponsor

1. Edit `data/sponsors.json`
2. Add sponsor with appropriate `level` field
3. Rebuild site - availability updates automatically

### Changing Package Limits

1. Edit `data/sponsor_packages.json`
2. Update `max_available` for the desired package
3. Rebuild site - page updates automatically

### Viewing Changes

- Development: `hugo server` (auto-reloads)
- Production: `hugo` to build static site

## Technical Details

- Hugo shortcode handles all calculations
- No manual updates to sponsors.md needed
- Matches sponsors by `level` field
- Supports unlimited packages with -1 value
- Shows "SOLD OUT" when max reached

## Testing

Site has been built and tested successfully:

- All shortcodes render correctly
- Availability calculations are accurate
- Bronze package correctly shows "unlimited"
- Sold out packages show "SOLD OUT"
- Development server running at <http://localhost:1313>
