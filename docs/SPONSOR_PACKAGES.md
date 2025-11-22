# Sponsor Package Configuration

## Overview

The sponsor package availability on the sponsors page is now dynamically calculated based on the current sponsors in `data/sponsors.json` and the package limits defined in `data/sponsor_packages.json`.

## Configuration Files

### `data/sponsor_packages.json`

This file defines the available sponsor packages and their limits:

```json
{
  "packages": [
    {
      "name": "Gold",
      "level": "gold",
      "max_available": 5,
      "price": 8000,
      "currency": "CHF"
    },
    {
      "name": "Silver",
      "level": "silver",
      "max_available": 3,
      "price": 5000,
      "currency": "CHF"
    },
    {
      "name": "Bronze",
      "level": "bronze",
      "max_available": -1,
      "price": 750,
      "currency": "CHF",
      "note": "unlimited"
    }
    // ... more packages
  ]
}
```

**Field Descriptions:**

- `name`: Display name of the package (used in the sponsors page table)
- `level`: Internal level identifier (must match the `level` field in `data/sponsors.json`)
- `max_available`: Maximum number of packages available
  - Use `-1` for unlimited packages
  - Use a positive integer for limited packages
- `price`: Package price (for documentation/reference)
- `currency`: Currency code
- `note`: Optional note (e.g., "unlimited")

### `data/sponsors.json`

This file contains the list of current sponsors:

```json
{
  "sponsors": [
    {
      "id": "sponsor-01",
      "name": "VSHN AG",
      "level": "gold",
      "logo": "/images/sponsors/vshn.webp",
      "website": "https://vshn.ch/",
      "description": "Gold Sponsor",
      "featured": true
    }
    // ... more sponsors
  ]
}
```

**Important:** The `level` field must match a `level` in `sponsor_packages.json` for the availability calculation to work correctly.

## How It Works

1. The `sponsor_availability` shortcode reads both configuration files
2. It counts the number of sponsors at each level from `sponsors.json`
3. It compares the count with the `max_available` from `sponsor_packages.json`
4. It displays:
   - The remaining number of packages (e.g., "3")
   - "unlimited" for packages with `max_available: -1`
   - "SOLD OUT" when all packages are taken

## Usage in Markdown

In `content/event/sponsors.md`, use the shortcode in the table:

```markdown
| # Available Packages | {{< sponsor_availability "Gold" >}} | {{< sponsor_availability "Silver" >}} | {{< sponsor_availability "Bronze" >}} |
```

The shortcode parameter must match the `name` field in `sponsor_packages.json`.

## Updating Package Limits

To update the available packages for a sponsorship tier:

1. Edit `data/sponsor_packages.json`
2. Change the `max_available` value for the desired package
3. Rebuild the site with `hugo` or wait for automatic rebuild in development mode
4. The sponsors page will automatically reflect the new availability

## Adding a New Sponsor

When adding a new sponsor:

1. Add the sponsor to `data/sponsors.json` with the appropriate `level`
2. The availability count will automatically update on the next build
3. No manual updates to the sponsors page are needed

## Example Scenarios

### Scenario 1: All Gold packages taken

- `sponsor_packages.json`: `"max_available": 5`
- `sponsors.json`: 5 sponsors with `"level": "gold"`
- **Result:** "SOLD OUT" displayed

### Scenario 2: Unlimited Bronze packages

- `sponsor_packages.json`: `"max_available": -1`
- `sponsors.json`: Any number of sponsors with `"level": "bronze"`
- **Result:** "unlimited" displayed

### Scenario 3: Some Silver packages available

- `sponsor_packages.json`: `"max_available": 3`
- `sponsors.json`: 1 sponsor with `"level": "silver"`
- **Result:** "2" displayed (3 - 1 = 2 remaining)

## Current Package Configuration

| Package       | Level    | Max Available | Current | Status      |
|--------------|----------|---------------|---------|-------------|
| Gold         | gold     | 5             | 4       | 1 available |
| Silver       | silver   | 3             | 1       | 2 available |
| Bronze       | bronze   | unlimited     | 1       | unlimited   |
| Evening Event| event    | 1             | 1       | SOLD OUT    |
| Coffee       | coffee   | 1             | 0       | 1 available |
| Meals        | meals    | 1             | 0       | 1 available |
| Snacks       | snacks   | 1             | 0       | 1 available |

## Troubleshooting

### Availability not updating

- Ensure the `level` field in `sponsors.json` matches the `level` in `sponsor_packages.json`
- Rebuild the site with `hugo --cleanDestinationDir`
- Check for typos in the shortcode parameter (must match the `name` field exactly)

### Shortcode not rendering

- Verify the shortcode file exists: `themes/devopsdays/layouts/shortcodes/sponsor_availability.html`
- Check that the markdown file is using the correct shortcode syntax: `{{< sponsor_availability "Package Name" >}}`
- Ensure there are no syntax errors in the shortcode template

### Wrong count displayed

- Verify that all sponsors have the correct `level` field
- Check for duplicate sponsor entries
- Ensure `max_available` is set correctly (use `-1` for unlimited)
