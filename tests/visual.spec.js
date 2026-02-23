const { test, expect } = require('@playwright/test');

// Test suite for visual regression testing
test.describe('Visual Regression Tests', () => {
  
  // Test homepage visual appearance
  test('Homepage visual appearance', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100 // Allow small differences
    });
  });

  // Test Learn page visual appearance
  test('Learn page visual appearance', async ({ page }) => {
    await page.goto('/learn/');
    await expect(page).toHaveScreenshot('learn-page-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  // Test About page visual appearance
  test('About page visual appearance', async ({ page }) => {
    await page.goto('/about/');
    await expect(page).toHaveScreenshot('about-page-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  // Test equipment page visual appearance
  test('Equipment page visual appearance', async ({ page }) => {
    await page.goto('/learn/equipment/ammonia-kit.html');
    await expect(page).toHaveScreenshot('equipment-page-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  // Test mobile homepage visual appearance
  test('Mobile homepage visual appearance', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  // Test mobile Learn page visual appearance
  test('Mobile Learn page visual appearance', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/learn/');
    await expect(page).toHaveScreenshot('learn-page-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100
    });
  });

  // Test specific visual elements
  test('Header visual consistency', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header.png', {
      maxDiffPixels: 50
    });
  });

  // Test footer visual consistency
  test('Footer visual consistency', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer.png', {
      maxDiffPixels: 50
    });
  });

  // Test card component visual consistency
  test('Card component visual consistency', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('.card').first();
    await expect(firstCard).toHaveScreenshot('card-component.png', {
      maxDiffPixels: 50
    });
  });

  // Test navigation menu visual consistency
  test('Navigation menu visual consistency', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toHaveScreenshot('navigation-menu.png', {
      maxDiffPixels: 50
    });
  });

  // Test visual consistency across pages
  test('Visual consistency across pages', async ({ page }) => {
    // Capture header from homepage
    await page.goto('/');
    const homepageHeader = await page.locator('header').screenshot();
    
    // Capture header from Learn page
    await page.goto('/learn/');
    const learnPageHeader = await page.locator('header').screenshot();
    
    // Compare headers - they should look the same
    expect(homepageHeader).toEqual(learnPageHeader);
    
    // Capture footer from homepage
    await page.goto('/');
    const homepageFooter = await page.locator('footer').screenshot();
    
    // Capture footer from About page
    await page.goto('/about/');
    const aboutPageFooter = await page.locator('footer').screenshot();
    
    // Compare footers - they should look the same
    expect(homepageFooter).toEqual(aboutPageFooter);
  });

  // Test color scheme consistency
  test('Color scheme consistency', async ({ page }) => {
    await page.goto('/');
    
    // Test primary color usage
    const headerBgColor = await page.locator('header').evaluate(el => {
      return getComputedStyle(el).backgroundColor;
    });
    
    const buttonBgColor = await page.locator('.btn').first().evaluate(el => {
      return getComputedStyle(el).backgroundColor;
    });
    
    // Header and buttons should use consistent primary color
    expect(headerBgColor).toBe(buttonBgColor);
  });

  // Test typography consistency
  test('Typography consistency', async ({ page }) => {
    await page.goto('/');
    
    // Test heading font consistency
    const h1FontFamily = await page.locator('h1').evaluate(el => {
      return getComputedStyle(el).fontFamily;
    });
    
    const h2FontFamily = await page.locator('h2').first().evaluate(el => {
      return getComputedStyle(el).fontFamily;
    });
    
    // Headings should use the same font family
    expect(h1FontFamily).toBe(h2FontFamily);
  });

  // Test spacing consistency
  test('Spacing consistency', async ({ page }) => {
    await page.goto('/');
    
    // Test section spacing
    const sections = page.locator('section');
    if (await sections.count() >= 2) {
      const firstSectionMargin = await sections.first().evaluate(el => {
        return parseFloat(getComputedStyle(el).marginBottom);
      });
      
      const secondSectionMargin = await sections.nth(1).evaluate(el => {
        return parseFloat(getComputedStyle(el).marginBottom);
      });
      
      // Sections should have consistent spacing
      expect(firstSectionMargin).toBe(secondSectionMargin);
    }
  });

  // Test visual hierarchy
  test('Visual hierarchy is maintained', async ({ page }) => {
    await page.goto('/');
    
    // Test heading sizes
    const h1FontSize = await page.locator('h1').evaluate(el => {
      return parseFloat(getComputedStyle(el).fontSize);
    });
    
    const h2FontSize = await page.locator('h2').first().evaluate(el => {
      return parseFloat(getComputedStyle(el).fontSize);
    });
    
    const h3FontSize = await page.locator('h3').first().evaluate(el => {
      return parseFloat(getComputedStyle(el).fontSize);
    });
    
    // Headings should decrease in size appropriately
    expect(h1FontSize).toBeGreaterThan(h2FontSize);
    expect(h2FontSize).toBeGreaterThan(h3FontSize);
  });

  // Test mobile vs desktop visual differences
  test('Mobile vs desktop visual adaptation', async ({ page }) => {
    // Capture desktop screenshot
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const desktopScreenshot = await page.screenshot({ fullPage: true });
    
    // Capture mobile screenshot
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const mobileScreenshot = await page.screenshot({ fullPage: true });
    
    // They should be different (responsive adaptation)
    expect(desktopScreenshot).not.toEqual(mobileScreenshot);
  });

  // Test visual regression for critical user flows
  test('Critical user flow visual consistency', async ({ page }) => {
    // Test navigation flow
    await page.goto('/');
    const homepageNav = await page.locator('nav').screenshot();
    
    await page.click('nav a:has-text("Learn")');
    await page.waitForURL('/learn/');
    const learnPageNav = await page.locator('nav').screenshot();
    
    // Navigation should look consistent across pages
    expect(homepageNav).toEqual(learnPageNav);
  });
});