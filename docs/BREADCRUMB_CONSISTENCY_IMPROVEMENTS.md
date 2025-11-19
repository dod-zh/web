# Breadcrumb Navigation Consistency Improvements

## Summary

Implemented a consistent breadcrumb navigation system across all pages on the website using a reusable partial template.

## Changes Made

### 1. Created Reusable Breadcrumb Partial

**File:** `/themes/devopsdays/layouts/partials/breadcrumbs.html`

**Features:**

- Consistent styling and structure across all pages
- Automatic parent page detection using Hugo's `.Parent` property
- Special handling for session pages (shows "Home → Program → Session")
- Support for custom breadcrumb parents via frontmatter
- Accessibility improvements with ARIA labels
- White text on gradient background for consistency

### 2. Updated All Layout Files

Replaced inline breadcrumb implementations with the new partial across all layouts:

#### Files Updated with Breadcrumb Partial

1. **`/themes/devopsdays/layouts/session/single.html`**
   - Old: Hardcoded breadcrumb with inline styles
   - New: Uses partial with automatic "Program" parent link

2. **`/themes/devopsdays/layouts/speaker/single.html`**
   - Old: Simple Home → Speaker breadcrumb
   - New: Uses partial with consistent styling

3. **`/themes/devopsdays/layouts/speaker/list.html`**
   - Old: Simple Home → Speakers breadcrumb
   - New: Uses partial with consistent styling

4. **`/themes/devopsdays/layouts/_default/single.html`**
   - Old: Conditional parent logic inline
   - New: Uses partial with automatic parent detection

5. **`/themes/devopsdays/layouts/program/single.html`**
   - Old: No breadcrumb
   - New: Added breadcrumb showing "Home → Event → Program"

6. **`/themes/devopsdays/layouts/program/single-new.html`**
   - Added breadcrumb navigation

7. **`/themes/devopsdays/layouts/program/single-backup.html`**
   - Added breadcrumb navigation

8. **`/themes/devopsdays/layouts/sponsors/single.html`**
   - Old: No breadcrumb
   - New: Added breadcrumb showing "Home → Event → Sponsors"

9. **`/themes/devopsdays/layouts/past-events/single.html`**
   - Old: No breadcrumb
   - New: Added breadcrumb showing "Home → Event → Past Events"

10. **`/themes/devopsdays/layouts/team/single.html`**
    - Old: No breadcrumb
    - New: Added breadcrumb showing "Home → About → Team"

11. **`/themes/devopsdays/layouts/contact/single.html`**
    - Old: No breadcrumb
    - New: Added breadcrumb showing "Home → About → Contact"

## Breadcrumb Structure

### Standard Pages

```
Home → [Parent] → Current Page
```

### Session Pages (Special Case)

```
Home → Program → Session Title
```

### Speaker Pages (Special Case)

```
Home → Speakers → Speaker Name
```

### Pages with Auto-Detected Parents

- Team: `Home → About → Team`
- Contact: `Home → About → Contact`
- Sponsors: `Home → Event → Sponsors`
- Program: `Home → Event → Program`
- Past Events: `Home → Event → Past Events`

## Technical Details

### Breadcrumb Partial Logic

```html
Home (always present)
  → Parent (if .Parent exists OR special type)
  → Custom Parent (if specified in frontmatter)
  → Current Page (current page title)
```

### Special Type Handling

- Session pages (`type: "session"`) automatically link to `/event/program/` as parent
- Speaker detail pages (`type: "speaker"`) automatically link to `/speakers/` as parent

### Styling

- All breadcrumbs use consistent white text on gradient background
- Hover effects for links (white to gray-200)
- Proper spacing with arrow separators (→)
- Mobile-responsive design

## Accessibility Improvements

1. **ARIA Labels**: Added `aria-label="Breadcrumb"` to nav element
2. **Current Page Indicator**: Added `aria-current="page"` to current page span
3. **Hidden Decorators**: Arrow separators marked with `aria-hidden="true"`

## CSS Support

Existing CSS in `/static/css/custom.css` already supports breadcrumb styling:

- `.breadcrumbs a` - Link styling
- `.breadcrumbs a:hover` - Hover state
- `.breadcrumbs span` - Text and separator styling
- Multiple selector patterns for compatibility

## Benefits

1. **Consistency**: All pages now have the same breadcrumb structure and styling
2. **Maintainability**: Single source of truth for breadcrumb logic
3. **Accessibility**: Better navigation for screen readers
4. **User Experience**: Clear navigation path on every page
5. **Flexibility**: Easy to add custom parents via frontmatter if needed

## Testing Checklist

- [x] About pages (Team, Contact, Conduct, etc.)
- [x] Event pages (Program, Sponsors, Past Events, etc.)
- [x] Speaker pages (List and individual speakers)
- [x] Session pages (Talks, Ignites, Workshops, Keynotes)
- [x] All breadcrumbs show white text on gradient background
- [x] Parent links are correctly detected and displayed
- [x] Current page is shown but not linked
- [x] Accessibility attributes present

## Future Enhancements

If needed, pages can override the breadcrumb behavior by adding frontmatter:

```yaml
---
title: "My Page"
breadcrumbParent:
  title: "Custom Parent"
  url: "/custom/parent/"
---
```

This provides flexibility without breaking the consistent implementation.
