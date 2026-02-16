# Minimal Lake Health Project Website Design

## Overview
This design proposes a streamlined website focused on project communication with essential educational resources, reducing the current 16 files to a core set of 9-10 pages.

## Proposed Structure

```
lake-health-website/
├── index.html                      # Main project hub
├── assets/
│   ├── css/
│   │   └── style.css              # Unified styling
│   ├── js/
│   │   └── main.js                # Minimal JavaScript
│   └── images/
│       └── (localized media assets)
├── learn/
│   ├── equipment/
│   │   ├── ammonia-kit.html       # Essential equipment guide
│   │   ├── phosphate-kit.html      # Essential equipment guide
│   │   └── multiparameter-meter.html # Essential equipment guide
│   ├── testing/
│   │   ├── ammonia-testing.html    # Core procedure
│   │   ├── phosphate-testing.html  # Core procedure
│   │   └── water-quality.html      # pH/temp/DO/ORP testing
│   └── observations/
│       ├── wildlife.html           # Observation methodology
│       └── social.html             # Observation methodology
└── about/
    └── project-info.html           # Simplified project background
```

## Content Mapping

### Current → New Structure

**Kept Content (Essential):**
- `index.html` → `index.html` (main hub)
- `closer-look-the-ammonia-testing-kit.html` → `learn/equipment/ammonia-kit.html`
- `closer-look-phosphate-testing-kit.html` → `learn/equipment/phosphate-kit.html`
- `closer-look-multiparameter-meter.html` → `learn/equipment/multiparameter-meter.html`
- `how-do-you-test-water-for-ammonia.html` → `learn/testing/ammonia-testing.html`
- `how-do-you-test-phosphate-levels-in-the-water.html` → `learn/testing/phosphate-testing.html`
- `how-do-you-test-for-ph-temperature-dissolved-oxygen-and-orp.html` → `learn/testing/water-quality.html`
- `wildlife-observations.html` → `learn/observations/wildlife.html`
- `social-observations.html` → `learn/observations/social.html`

**Removed Content (Non-essential for minimal site):**
- `collecting-ecological-data.html` (meta-content)
- `how-do-you-fill-out-a-datasheet.html` (process detail)
- `why-do-we-need-to-be-so-concerned-about-the-process.html` (process detail)
- `how-do-we-decide-how-to-collect-this-data.html` (meta-content)
- `what-sort-of-data-will-support-our-research-goal-and-why.html` (meta-content)
- `what-types-of-observations-can-we-make.html` (meta-content)
- `project-timeline.html` (placeholder only)

## Navigation Structure

### Main Navigation (Header)
```
[Home] [Learn] [About] [Get Involved]
```

### Learn Section Navigation
```
Equipment Guides:
- Ammonia Testing Kit
- Phosphate Testing Kit
- Multiparameter Meter

Testing Procedures:
- Ammonia Testing
- Phosphate Testing
- Water Quality Testing (pH/temp/DO/ORP)

Observation Methods:
- Wildlife Observations
- Social Observations
```

## Page Structure Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ PAGE_TITLE }} | Lake Health Project</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/learn/">Learn</a>
            <a href="/about/">About</a>
            <a href="#get-involved">Get Involved</a>
        </nav>
    </header>
    
    <main>
        <h1>{{ PAGE_TITLE }}</h1>
        {{ CONTENT }}
    </main>
    
    <footer>
        <p>© Lake Health Project | <a href="#">Contact Us</a></p>
    </footer>
    
    <script src="/assets/js/main.js"></script>
</body>
</html>
```

## Content Simplification Strategy

### 1. Index.html Focus
- Keep interactive slideshow and dashboard iframes
- Simplify project description to 2-3 key paragraphs
- Remove complex course structure explanation
- Keep SciStarter.org link but simplify discussion board integration
- Remove placeholder wildlife observation form or make it functional

### 2. Educational Content Streamlining
- Remove all Canvas LMS references and `$WIKI_REFERENCE$` placeholders
- Localize all media assets (images, videos)
- Standardize page structure across all educational content
- Add consistent navigation between related topics
- Remove redundant introductory text

### 3. Equipment Guides
- Keep visual equipment overviews
- Maintain manufacturer links for reference
- Add brief explanation of when/why each tool is used
- Standardize format across all three guides

### 4. Testing Procedures
- Keep video demonstrations (localized)
- Add step-by-step text instructions
- Include safety precautions
- Standardize format across all procedures

### 5. Observation Methodologies
- Keep wildlife observation submission concept
- Simplify social observation guidelines
- Add examples of useful observations
- Make submission process clear (even if just email for now)

## Implementation Phases

### Phase 1: Content Selection and Migration
1. Identify and extract the 9 essential content files
2. Create new directory structure
3. Localize all media assets
4. Remove Canvas LMS dependencies

### Phase 2: Content Standardization
1. Apply consistent HTML template to all pages
2. Standardize navigation across all pages
3. Clean up formatting and structure
4. Ensure mobile responsiveness

### Phase 3: Minimal Feature Implementation
1. Create functional wildlife observation form (or email link)
2. Implement basic search functionality
3. Add print-friendly versions of guides
4. Ensure accessibility compliance

### Phase 4: Launch and Iteration
1. Test all links and functionality
2. Gather user feedback
3. Iterate based on community needs
4. Plan for future expansion

## Benefits of This Design

1. **Focused User Experience**: Visitors can quickly find essential information
2. **Easier Maintenance**: Fewer pages to update and manage
3. **Clear Navigation**: Simple, intuitive structure
4. **Scalable Foundation**: Easy to add content later if needed
5. **Mobile-Friendly**: Simplified structure works better on all devices
6. **Content Prioritization**: Most important information is most accessible

## Future Expansion Options

When ready to expand, can add:
- Data Analysis section (as separate module)
- Science Communication section (as separate module)
- Project timeline (when actual data is available)
- Community forum integration
- Advanced educational resources

This design provides a solid foundation focused on the core mission of lake health monitoring while being much easier to maintain than the current comprehensive educational site.