# Feature Flags - Quick Reference

## How to Toggle Features

Edit `config.yaml` and change the values under `params.features`:

```yaml
params:
  features:
    show_program: true      # Program page & menu
    show_tickets: true      # Tickets page, menu & "Get Tickets" button
    show_cfp: false         # "Submit Your Talk" button (currently disabled)
    show_speakers: true     # Speakers page & menu
    cfp_url: 'https://sessionize.com/devopsdays-zurich-2025/'
```

## What Each Flag Controls

| Flag | Menu Item | CTA Button | Landing Page | Page Access |
|------|-----------|------------|--------------|-------------|
| `show_program` | ✅ Program | - | ✅ View Program | /event/program/ |
| `show_tickets` | ✅ Tickets | ✅ Get Tickets | ✅ Get Your Tickets | /event/tickets/ |
| `show_cfp` | - | ✅ Submit Your Talk | ✅ Submit your Proposal | External CFP URL |
| `show_speakers` | ✅ Speakers | - | - | /speakers/ |

## Quick Actions

### Open Call for Proposals

```yaml
show_cfp: true
```

Don't forget to update `cfp_url` with your CFP platform URL!

### Close Ticket Sales

```yaml
show_tickets: false
```

### Hide Program Before It's Ready

```yaml
show_program: false
```

### Hide Speakers Before Announcement

```yaml
show_speakers: false
```

## After Changing Flags

1. Save `config.yaml`
2. Hugo will automatically rebuild (if server is running)
3. Refresh your browser to see changes
4. Check both desktop and mobile navigation

---

For detailed documentation, see [FEATURE_FLAGS.md](FEATURE_FLAGS.md)
