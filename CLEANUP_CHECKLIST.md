# Website Code Cleanup Checklist

## Completed ✅

### Layout Files

- [x] Removed `program/single-backup.html` (backup file)
- [x] Removed `program/single-new.html` (unused alternative)
- [x] Created `partials/session-type-styling.html` (centralized styling logic)
- [x] Created `partials/session-card.html` (reusable session cards)
- [x] Created `partials/page-header.html` (consistent page headers)
- [x] Refactored `program/single.html` to use new partials
- [x] Refactored `session/single.html` to use session-type-styling
- [x] Refactored `_default/single.html` to use page-header
- [x] Refactored `speaker/list.html` to use page-header
- [x] Refactored `sponsors/single.html` to use page-header
- [x] Refactored `team/single.html` to use page-header
- [x] Refactored `contact/single.html` to use page-header
- [x] Refactored `past-events/single.html` to use page-header

### Documentation

- [x] Created `REFACTORING_SUMMARY.md` with detailed changes

## Recommended Next Steps 📋

### 1. Additional Partial Creation (Optional)

#### Speaker Card Partial

Create `partials/speaker-card.html`:

```hugo
{{/* Usage: {{ partial "speaker-card.html" . }} */}}
<a href="/speakers/{{ .id }}/" class="group">
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="relative">
            <img src="{{ .image }}" alt="{{ .name }}" class="w-full h-64 object-cover">
        </div>
        <div class="p-4">
            <h3 class="text-lg font-semibold text-center group-hover:text-cerulean transition-colors">
                {{ .name }}
            </h3>
        </div>
    </div>
</a>
```

**Files to update:**

- [ ] `speaker/list.html`
- [ ] `speaker/single.html` (Other Speakers section)

#### Team Member Card Partial

Create `partials/team-member-card.html`:

```hugo
{{/* Usage: {{ partial "team-member-card.html" . }} */}}
<div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img src="{{ .image }}" alt="{{ .name }}" class="w-full h-64 object-cover">
    <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">{{ .name }}</h3>
        <p class="font-medium mb-3" style="color: var(--cerulean);">{{ .role }}</p>
        <p class="text-gray-600 text-sm mb-4">{{ .bio }}</p>
        <!-- Social links... -->
    </div>
</div>
```

**Files to update:**

- [ ] `team/single.html`

#### Sponsor Tier Partial

Create `partials/sponsor-tier.html`:

```hugo
{{/* Usage: {{ partial "sponsor-tier.html" (dict "tier" "gold" "sponsors" $sponsors "tierName" "Gold Sponsors") }} */}}
```

**Files to update:**

- [ ] `partials/sponsors.html`

### 2. CSS Cleanup (Optional)

#### Consolidate Duplicate Rules

Review and consolidate:

- [ ] Multiple `.prose` heading rules (h1-h6)
- [ ] Duplicate color variable references
- [ ] Redundant hover state definitions

#### Remove Unused Styles

Check for unused CSS classes:

- [ ] Search codebase for each CSS class
- [ ] Remove classes not found in any template
- [ ] Document removed classes

#### Organize CSS by Component

Reorganize `custom.css`:

- [ ] Group related styles together
- [ ] Add section comments
- [ ] Consider splitting into multiple files

### 3. Layout Consistency Review

#### Remaining Layouts to Check

- [ ] `speaker/single.html` - Could use more partials
- [ ] Other layout folders (conduct, diversity, faq, location, sustainability, tickets)
- [ ] Check if they use consistent patterns

#### Verify Page Headers

Ensure all pages use `page-header.html`:

- [x] _default/single.html
- [x] program/single.html
- [x] speaker/list.html
- [x] sponsors/single.html
- [x] team/single.html
- [x] contact/single.html
- [x] past-events/single.html
- [ ] session/single.html (custom header - review)
- [ ] speaker/single.html (custom header - review)

### 4. Data File Cleanup

#### Review JSON Data Files

- [ ] Check for unused fields in `speakers.json`
- [ ] Check for unused fields in `sessions.json`
- [ ] Check for unused fields in `sponsors.json`
- [ ] Check for unused fields in `team.json`
- [ ] Validate JSON structure consistency

#### Scripts Cleanup

- [ ] Review Python scripts in `/scripts`
- [ ] Check if all scripts are still needed
- [ ] Add documentation to scripts
- [ ] Consider consolidating similar scripts

### 5. Content Cleanup

#### Session Content Files

Check `/content/sessions/` subfolders:

- [ ] Review ignites folder
- [ ] Review keynotes folder
- [ ] Review talks folder
- [ ] Review workshops folder
- [ ] Remove any unused/outdated session files

#### Speaker Content Files

- [ ] Verify all speaker files are linked to sessions
- [ ] Remove orphaned speaker files
- [ ] Check for duplicate speaker entries

### 6. Static Assets Review

#### Images

- [ ] Check for unused images in `/static/images`
- [ ] Optimize image sizes (compression)
- [ ] Consider WebP format for better performance
- [ ] Verify all images have alt text references

#### CSS/JS Files

- [ ] Remove unused CSS files
- [ ] Check for JavaScript files (if any)
- [ ] Minify CSS for production

### 7. Configuration Cleanup

#### config.yaml

- [ ] Remove unused parameters
- [ ] Verify all menu items are valid
- [ ] Check feature flags are still relevant
- [ ] Clean up commented-out sections

### 8. Testing & Validation

#### Build Testing

- [ ] Run `hugo` without errors
- [ ] Run `hugo server -D` and check all pages
- [ ] Check browser console for errors
- [ ] Verify responsive design on mobile

#### Visual Testing

- [ ] Compare pages before/after refactoring
- [ ] Check all session cards render correctly
- [ ] Verify page headers are consistent
- [ ] Test all links and navigation

#### Performance Testing

- [ ] Run Lighthouse audit
- [ ] Check page load times
- [ ] Verify Core Web Vitals
- [ ] Test on slow connections

### 9. Documentation Updates

#### Update README.md

- [ ] Document new partials
- [ ] Update project structure section
- [ ] Add refactoring notes
- [ ] Update contribution guidelines

#### Developer Documentation

- [ ] Create partial usage guide
- [ ] Document component patterns
- [ ] Add coding standards document
- [ ] Create architecture diagram

#### Code Comments

- [ ] Add comments to complex partials
- [ ] Document function parameters
- [ ] Add JSDoc-style comments where appropriate

### 10. Git & Version Control

#### Commit Strategy

- [x] Commit refactored files
- [ ] Create detailed commit messages
- [ ] Tag release version
- [ ] Update CHANGELOG.md

#### Code Review

- [ ] Self-review all changes
- [ ] Request peer review
- [ ] Address review comments
- [ ] Merge to main branch

## Priority Levels

### 🔴 High Priority (Do First)

1. Testing & Validation (#8)
2. Build Testing
3. Visual Testing

### 🟡 Medium Priority (Nice to Have)

1. Speaker Card Partial (#1)
2. CSS Cleanup (#2)
3. Documentation Updates (#9)

### 🟢 Low Priority (Future Enhancement)

1. Team Member Card Partial (#1)
2. Sponsor Tier Partial (#1)
3. Content Cleanup (#5)
4. Static Assets Review (#6)

## Maintenance Schedule

### Weekly

- [ ] Review for new duplications
- [ ] Check for unused files
- [ ] Update documentation as needed

### Monthly

- [ ] Run performance audits
- [ ] Review and optimize images
- [ ] Update dependencies

### Quarterly

- [ ] Major refactoring review
- [ ] Architecture improvements
- [ ] Code quality assessment

## Success Metrics

### Code Quality

- ✅ Reduced duplicate code by ~500 lines
- ✅ Created 3 reusable partials
- ✅ Refactored 10+ layout files
- 🎯 Target: 0 linting errors
- 🎯 Target: 0 build warnings

### Performance

- 🎯 Lighthouse Score > 90
- 🎯 Build Time < 2 seconds
- 🎯 Page Load Time < 2 seconds

### Maintainability

- ✅ Single source of truth for components
- ✅ Consistent patterns across files
- 🎯 100% code documentation
- 🎯 Clear contribution guidelines

---

**Last Updated:** October 6, 2025  
**Status:** Phase 1 Complete ✅  
**Next Phase:** Testing & Validation
