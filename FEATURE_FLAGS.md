# Feature Flags Configuration

This document explains how to control the visibility of various sections of the DevOpsDays Zurich website using feature flags.

## Available Feature Flags

Feature flags are configured in `config.yaml` under `params.features`:

```yaml
params:
  features:
    show_program: true      # Show/hide Program page and menu item
    show_tickets: true      # Show/hide Tickets page, menu item, and "Get Tickets" button
    show_cfp: false         # Show/hide "Submit Your Talk" button (Call for Proposals)
    show_speakers: true     # Show/hide Speakers page and menu item
    cfp_url: 'https://sessionize.com/devopsdays-zurich-2025/'  # CFP platform URL
```

## Feature Flag Details

### `show_program`

- **Default:** `true`
- **Controls:**
  - "Program" menu item in navigation
  - "View Program" button on landing page
  - "Program" link in footer
  - Access to `/event/program/` page
- **Use case:** Set to `false` before the program is finalized

### `show_tickets`

- **Default:** `true`
- **Controls:**
  - "Tickets" menu item in navigation
  - "Get Tickets" CTA button in header (desktop and mobile)
  - "Get Your Tickets" button on landing page
  - "Tickets" link in footer
  - Access to `/event/tickets/` page
- **Use case:** Set to `false` before ticket sales open or after they close

### `show_cfp`

- **Default:** `false`
- **Controls:**
  - "Submit Your Talk" CTA button in header (desktop and mobile)
  - "Submit your Proposal" button on landing page
  - Links to the CFP platform specified in `cfp_url`
- **Use case:** Set to `true` when Call for Proposals is open
- **Note:** Remember to update `cfp_url` with your actual CFP platform URL

### `show_speakers`

- **Default:** `true`
- **Controls:**
  - "Speakers" menu item in navigation
  - Access to `/speakers/` page
- **Use case:** Set to `false` before speakers are announced

## Typical Timeline

Here's a suggested timeline for toggling these flags during your event planning:

### Early Planning Phase

```yaml
show_program: false
show_tickets: false
show_cfp: true
show_speakers: false
```

### CFP Closed, Speakers Announced

```yaml
show_program: false
show_tickets: false
show_cfp: false
show_speakers: true
```

### Program Published, Ticket Sales Open

```yaml
show_program: true
show_tickets: true
show_cfp: false
show_speakers: true
```

### After Event

```yaml
show_program: true
show_tickets: false
show_cfp: false
show_speakers: true
```

## Important Notes

1. **Event Menu Item:** The "Event" dropdown menu will be hidden automatically if all of its child items (Program, Tickets, Speakers) are hidden.

2. **Page Access:** While the menu items are hidden, the pages are still accessible via direct URL. If you need to completely restrict access, consider:
   - Using Hugo's draft status
   - Adding a "coming soon" message to the page
   - Using `.gitignore` to exclude the page from the build

3. **CFP URL:** Don't forget to update the `cfp_url` parameter with your actual Call for Proposals platform URL (e.g., Sessionize, Papercall, etc.)

## Testing

After changing feature flags, rebuild and test your site:

```bash
hugo server -D
```

Check both desktop and mobile navigation to ensure the flags are working as expected.
