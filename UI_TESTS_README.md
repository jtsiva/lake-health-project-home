# Lake Health Project UI Tests

This directory contains comprehensive UI tests for the Lake Health Project website using Playwright.

## Test Suite Overview

The test suite includes three main categories of tests:

1. **Navigation and Routing Tests** (`tests/navigation.spec.js`)
   - Tests all navigation links and routing functionality
   - Verifies page transitions and active states
   - Tests external links and anchor navigation

2. **Responsive Design Tests** (`tests/responsive.spec.js`)
   - Tests layout adaptation across different screen sizes
   - Verifies mobile, tablet, and desktop layouts
   - Tests touch-friendly elements and orientation changes

3. **Visual Regression Tests** (`tests/visual.spec.js`)
   - Captures screenshots for visual comparison
   - Tests visual consistency across pages
   - Verifies color schemes, typography, and spacing

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Playwright browsers (installed automatically)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test suites

**Navigation tests only:**
```bash
npm run test:navigation
```

**Responsive design tests only:**
```bash
npm run test:responsive
```

**Visual regression tests only:**
```bash
npm run test:visual
```

### Run tests with different configurations

**Headless mode (default):**
```bash
npm test
```

**Headful mode (see browser):**
```bash
npm run test:headed
```

**Debug mode:**
```bash
npm run test:debug
```

**Interactive UI mode:**
```bash
npm run test:ui
```

### Run tests on specific devices

**Desktop browsers:**
```bash
npm run test:desktop
```

**Mobile devices:**
```bash
npm run test:mobile
```

**All browsers:**
```bash
npm run test:all
```

## Test Configuration

The test configuration is defined in `playwright.config.js` and includes:

- **Base URL**: `http://localhost:8080` (served from `/docs` directory)
- **Browser support**: Chromium, Firefox, WebKit
- **Mobile devices**: Pixel 5, iPhone 12, iPad Mini
- **Screenshot comparison**: Visual regression testing
- **Parallel execution**: Tests run in parallel for faster execution
- **Retry policy**: 2 retries on CI, 0 retries locally

## Project Structure

```
/
├── tests/                  # Test files
│   ├── navigation.spec.js  # Navigation and routing tests
│   ├── responsive.spec.js   # Responsive design tests
│   └── visual.spec.js      # Visual regression tests
├── playwright.config.js    # Playwright configuration
├── package.json            # Project dependencies and scripts
└── UI_TESTS_README.md       # This file
```

## Writing New Tests

To add new tests:

1. Create a new `.spec.js` file in the `tests/` directory
2. Use the existing test files as templates
3. Follow the pattern of using `test.describe()` for test suites
4. Use meaningful test names that describe the behavior being tested

### Example Test Structure

```javascript
const { test, expect } = require('@playwright/test');

test.describe('New Feature Tests', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    // Test implementation
    await expect(something).toBeVisible();
  });
});
```

## Viewing Test Results

After running tests, you can view the HTML report:

```bash
npm run show-report
```

This will open the test report in your default browser, showing:
- Passed/failed tests
- Screenshots of failures
- Performance metrics
- Browser-specific results

## Continuous Integration

The tests are configured to work with CI systems:
- Set `CI=true` environment variable for CI-specific behavior
- Tests will retry failed attempts in CI
- Parallel execution is optimized for CI environments

## Best Practices

1. **Keep tests focused**: Each test should verify one specific behavior
2. **Use meaningful names**: Test names should clearly describe what they verify
3. **Avoid flaky tests**: Use proper waits and expectations
4. **Test across devices**: Ensure responsive behavior works everywhere
5. **Update visual baselines**: When making intentional visual changes, update the screenshot baselines

## Troubleshooting

### Tests fail on first run
This is expected for visual regression tests. The first run creates baseline screenshots. Subsequent runs compare against these baselines.

### Browser not installed
Run `npx playwright install` to install required browsers.

### Port conflicts
The test server runs on port 8080. If this port is in use, update the configuration in `playwright.config.js`.

### Slow test execution
Reduce parallelism by setting `workers: 1` in the configuration for resource-constrained environments.

## Maintenance

### Updating Playwright
```bash
npm update @playwright/test
npx playwright install
```

### Adding new devices
Add new device configurations in `playwright.config.js` under the `projects` section.

### Updating visual baselines
When making intentional visual changes:
1. Run tests with `--update-snapshots` flag
2. Review the changes in the updated screenshot files
3. Commit the updated baseline screenshots

## Test Coverage

The current test suite provides comprehensive coverage of:

- ✅ All navigation links and routes
- ✅ Responsive design across 6 different viewports
- ✅ Visual consistency across all major pages
- ✅ Critical user flows and interactions
- ✅ Mobile-specific touch targets and layouts
- ✅ Cross-browser compatibility (Chromium, Firefox, WebKit)

## Future Enhancements

Consider adding:
- Accessibility testing (WCAG compliance)
- Performance testing (load times, Lighthouse scores)
- Form validation testing
- Internationalization testing (if applicable)
- Dark mode testing (if implemented)