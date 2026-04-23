const { test, expect } = require('@playwright/test');

// Test suite for responsive design functionality
test.describe('Responsive Design Tests', () => {
  
  // Test desktop layout
  test('Desktop layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    // Check main navigation is visible
    await expect(page.locator('nav ul')).toBeVisible();
    
    // Check card grid layout
    const cards = page.locator('.card');
    await expect(cards.first()).toBeVisible();
    
    // Check iframes are properly sized
    const iframes = page.locator('.iframe-container iframe');
    for (let i = 0; i < await iframes.count(); i++) {
      const iframe = iframes.nth(i);
      const width = await iframe.evaluate(node => node.offsetWidth);
      expect(width).toBeGreaterThan(300); // Should be reasonably wide on desktop
    }
  });

  // Test tablet layout
  test('Tablet layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check navigation is still visible
    await expect(page.locator('nav ul')).toBeVisible();
    
    // Check content is readable
    const mainContent = page.locator('main');
    const contentWidth = await mainContent.evaluate(node => node.offsetWidth);
    expect(contentWidth).toBeGreaterThan(700);
    
    // Check cards stack appropriately
    const cards = page.locator('.card');
    if (await cards.count() > 0) {
      const firstCardWidth = await cards.first().evaluate(node => node.offsetWidth);
      expect(firstCardWidth).toBeGreaterThan(300);
    }
  });

  // Test mobile layout
  test('Mobile layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    // Check if mobile menu exists or navigation adapts
    const nav = page.locator('nav ul');
    if (await nav.count() > 0) {
      // Navigation should either be hidden or adapted for mobile
      const navDisplay = await nav.evaluate(node => getComputedStyle(node).display);
      expect(navDisplay).not.toBe('none'); // Should be visible in some form
    }
    
    // Check content stacks vertically
    const mainContent = page.locator('main');
    const contentWidth = await mainContent.evaluate(node => node.offsetWidth);
    expect(contentWidth).toBeLessThan(400); // Should be narrow on mobile
    
    // Check cards stack vertically
    const cards = page.locator('.card');
    if (await cards.count() > 1) {
      const firstCardBottom = await cards.first().evaluate(node => node.getBoundingClientRect().bottom);
      const secondCardTop = await cards.nth(1).evaluate(node => node.getBoundingClientRect().top);
      expect(secondCardTop).toBeGreaterThan(firstCardBottom); // Cards should stack
    }
  });

  // Test responsive navigation menu
  test('Navigation menu works on different screen sizes', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const desktopNavLinks = page.locator('nav a');
    expect(await desktopNavLinks.count()).toBeGreaterThan(0);
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    
    // Check if mobile menu button appears
    const mobileMenuButton = page.locator('.mobile-menu-button');
    if (await mobileMenuButton.count() > 0) {
      await mobileMenuButton.click();
      const mobileNav = page.locator('nav ul.mobile-active');
      await expect(mobileNav).toBeVisible();
    }
  });

  // Test responsive card grid
  test('Card grid adapts to different screen sizes', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop - should show multiple cards per row
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    
    const cards = page.locator('.card');
    if (await cards.count() >= 3) {
      const firstCardRight = await cards.first().evaluate(node => node.getBoundingClientRect().right);
      const thirdCardLeft = await cards.nth(2).evaluate(node => node.getBoundingClientRect().left);
      expect(thirdCardLeft).toBeLessThan(firstCardRight + 500); // Should be in same row
    }
    
    // Test mobile - should stack cards vertically
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    
    if (await cards.count() >= 2) {
      const firstCardBottom = await cards.first().evaluate(node => node.getBoundingClientRect().bottom);
      const secondCardTop = await cards.nth(1).evaluate(node => node.getBoundingClientRect().top);
      expect(secondCardTop).toBeGreaterThan(firstCardBottom); // Should stack vertically
    }
  });

  // Test responsive iframes
  test('Iframes are responsive on different devices', async ({ page }) => {
    await page.goto('/');
    
    const iframes = page.locator('.iframe-container iframe');
    if (await iframes.count() > 0) {
      // Test desktop
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.reload();
      
      const desktopWidth = await iframes.first().evaluate(node => node.offsetWidth);
      expect(desktopWidth).toBeGreaterThan(500);
      
      // Test mobile
      await page.setViewportSize({ width: 375, height: 812 });
      await page.reload();
      
      const mobileWidth = await iframes.first().evaluate(node => node.offsetWidth);
      expect(mobileWidth).toBeLessThan(400);
      expect(mobileWidth).toBeGreaterThan(300); // Should still be usable
    }
  });

  // Test responsive typography
  test('Typography scales appropriately on different devices', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('h1');
    
    // Test desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    
    const desktopFontSize = await heading.evaluate(node => {
      return parseFloat(getComputedStyle(node).fontSize);
    });
    expect(desktopFontSize).toBeGreaterThan(24);
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    
    const mobileFontSize = await heading.evaluate(node => {
      return parseFloat(getComputedStyle(node).fontSize);
    });
    expect(mobileFontSize).toBeLessThan(desktopFontSize); // Should be smaller on mobile
    expect(mobileFontSize).toBeGreaterThan(18); // But still readable
  });

  // Test responsive images (if any)
  test('Images scale appropriately on different devices', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    if (await images.count() > 0) {
      // Test desktop
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.reload();
      
      const desktopWidth = await images.first().evaluate(node => node.offsetWidth);
      
      // Test mobile
      await page.setViewportSize({ width: 375, height: 812 });
      await page.reload();
      
      const mobileWidth = await images.first().evaluate(node => node.offsetWidth);
      expect(mobileWidth).toBeLessThan(desktopWidth); // Should scale down
    }
  });

  // Test viewport meta tag for responsive design
  test('Viewport meta tag is properly configured', async ({ page }) => {
    await page.goto('/');
    
    const viewportMeta = page.locator('meta[name="viewport"]');
    await expect(viewportMeta).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
  });

  // Test touch-friendly elements on mobile
  test('Elements are touch-friendly on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    // Check button sizes
    const buttons = page.locator('.btn');
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i);
      const width = await button.evaluate(node => node.offsetWidth);
      const height = await button.evaluate(node => node.offsetHeight);
      
      // Buttons should be at least 48x48px for touch
      expect(width).toBeGreaterThanOrEqual(48);
      expect(height).toBeGreaterThanOrEqual(48);
    }
    
    // Check navigation links
    const navLinks = page.locator('nav a');
    for (let i = 0; i < await navLinks.count(); i++) {
      const link = navLinks.nth(i);
      const height = await link.evaluate(node => node.offsetHeight);
      expect(height).toBeGreaterThanOrEqual(40); // Should be tall enough for touch
    }
  });

  // Test landscape vs portrait orientation
  test('Layout adapts to orientation changes', async ({ page }) => {
    // Test portrait
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    const portraitWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const portraitHeight = await page.evaluate(() => document.documentElement.clientHeight);
    expect(portraitHeight).toBeGreaterThan(portraitWidth);
    
    // Test landscape
    await page.setViewportSize({ width: 812, height: 375 });
    await page.reload();
    
    const landscapeWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const landscapeHeight = await page.evaluate(() => document.documentElement.clientHeight);
    expect(landscapeWidth).toBeGreaterThan(landscapeHeight);
    
    // Content should still be usable in landscape
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });
});