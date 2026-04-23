const { test, expect } = require('@playwright/test');

// Test suite for navigation and routing functionality
test.describe('Navigation and Routing Tests', () => {
  // Test homepage navigation elements
  test('Homepage navigation elements are present and functional', async ({ page }) => {
    await page.goto('/');
    
    // Check main navigation links
    const navLinks = page.locator('nav a');
    await expect(navLinks).toHaveCount(4);
    
    // Check specific navigation items
    await expect(page.locator('nav a:has-text("Home")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Learn")')).toBeVisible();
    await expect(page.locator('nav a:has-text("About")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Get Involved")')).toBeVisible();
    
    // Check active state on homepage
    await expect(page.locator('nav a.active')).toHaveText('Home');
  });

  // Test navigation to Learn section
  test('Navigation to Learn section works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click Learn link
    await page.click('nav a:has-text("Learn")');
    await page.waitForURL('/learn/');
    
    // Verify we're on the Learn page
    await expect(page).toHaveURL('/learn/');
    await expect(page.locator('h1:has-text("Learn")')).toBeVisible();
    
    // Check active state
    await expect(page.locator('nav a.active')).toHaveText('Learn');
  });

  // Test navigation to About section
  test('Navigation to About section works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click About link
    await page.click('nav a:has-text("About")');
    await page.waitForURL('/about/');
    
    // Verify we're on the About page
    await expect(page).toHaveURL('/about/');
    await expect(page.locator('h1:has-text("About")')).toBeVisible();
    
    // Check active state
    await expect(page.locator('nav a.active')).toHaveText('About');
  });

  // Test navigation to Get Involved section
  test('Get Involved section navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Click Get Involved link (anchor link)
    await page.click('nav a[href="#get-involved"]');
    
    // Verify we scrolled to the section
    const section = page.locator('#get-involved');
    await expect(section).toBeInViewport();
    await expect(page.locator('h2:has-text("Get Involved")')).toBeVisible();
  });

  // Test Learn section sub-navigation
  test('Learn section sub-navigation works correctly', async ({ page }) => {
    await page.goto('/learn/');
    
    // Check equipment link
    await expect(page.locator('a[href="/learn/equipment/"]')).toBeVisible();
    await page.click('a[href="/learn/equipment/"]');
    await page.waitForURL('/learn/equipment/');
    await expect(page).toHaveURL('/learn/equipment/');
    
    // Go back to learn and test testing link
    await page.goto('/learn/');
    await page.click('a[href="/learn/testing/"]');
    await page.waitForURL('/learn/testing/');
    await expect(page).toHaveURL('/learn/testing/');
    
    // Go back to learn and test observations link
    await page.goto('/learn/');
    await page.click('a[href="/learn/observations/"]');
    await page.waitForURL('/learn/observations/');
    await expect(page).toHaveURL('/learn/observations/');
  });

  // Test specific equipment page navigation
  test('Equipment page navigation works', async ({ page }) => {
    await page.goto('/learn/equipment/');
    
    // Test ammonia kit link
    await expect(page.locator('a[href="ammonia-kit.html"]')).toBeVisible();
    await page.click('a[href="ammonia-kit.html"]');
    await page.waitForURL('/learn/equipment/ammonia-kit.html');
    await expect(page.locator('h1:has-text("Ammonia Testing Kit")')).toBeVisible();
  });

  // Test specific testing procedure navigation
  test('Testing procedure navigation works', async ({ page }) => {
    await page.goto('/learn/testing/');
    
    // Test ammonia testing link
    await expect(page.locator('a[href="ammonia-testing.html"]')).toBeVisible();
    await page.click('a[href="ammonia-testing.html"]');
    await page.waitForURL('/learn/testing/ammonia-testing.html');
    await expect(page.locator('h1:has-text("Ammonia Testing")')).toBeVisible();
  });

  // Test observation methods navigation
  test('Observation methods navigation works', async ({ page }) => {
    await page.goto('/learn/observations/');
    
    // Test wildlife observations link
    await expect(page.locator('a[href="wildlife.html"]')).toBeVisible();
    await page.click('a[href="wildlife.html"]');
    await page.waitForURL('/learn/observations/wildlife.html');
    await expect(page.locator('h1:has-text("Wildlife Observations")')).toBeVisible();
  });

  // Test external link navigation
  test('External links open correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test SciStarter link
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.click('a[href="https://scistarter.org/"]')
    ]);
    
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://scistarter.org/');
    await newPage.close();
  });

  // Test email link functionality
  test('Email link works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test email link
    await expect(page.locator('a[href="mailto:info@lakehealthproject.org"]')).toBeVisible();
    await expect(page.locator('a[href="mailto:info@lakehealthproject.org"]')).toHaveAttribute('href', 'mailto:info@lakehealthproject.org');
  });

  // Test 404 page navigation
  test('404 page navigation works', async ({ page }) => {
    await page.goto('/nonexistent-page');
    
    // Should be redirected to 404 page
    await expect(page.locator('h1:has-text("404")')).toBeVisible();
    
    // Test home link on 404 page
    await page.click('a:has-text("Home")');
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });

  // Test breadcrumb navigation (if present)
  test('Breadcrumb navigation works', async ({ page }) => {
    await page.goto('/learn/equipment/ammonia-kit.html');
    
    // Check if breadcrumbs exist and are functional
    const breadcrumbs = page.locator('.breadcrumb');
    if (await breadcrumbs.count() > 0) {
      const breadcrumbLinks = breadcrumbs.locator('a');
      for (let i = 0; i < await breadcrumbLinks.count(); i++) {
        await expect(breadcrumbLinks.nth(i)).toBeVisible();
      }
    }
  });
});