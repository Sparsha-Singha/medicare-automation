import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Wait for page network to settle
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // Generic safe click
  async safeClick(locator: string): Promise<void> {
    await this.waitForVisible(locator);
    await this.page.locator(locator).scrollIntoViewIfNeeded();
    await this.page.click(locator);
  }

  // Generic safe fill
  async safeFill(locator: string, value: string): Promise<void> {
    await this.waitForVisible(locator);
    await this.page.locator(locator).scrollIntoViewIfNeeded();
    await this.page.fill(locator, value);
  }

  // Generic safe select for <select> dropdowns
  async safeSelect(locator: string, value: string): Promise<void> {
    await this.waitForVisible(locator);
    await this.page.selectOption(locator, { label: value });
  }

  // Wait until element is visible
  async waitForVisible(locator: string): Promise<void> {
    await this.page.waitForSelector(locator, { state: 'attached', timeout: 25000 });
    await this.page.waitForSelector(locator, { state: 'visible', timeout: 25000 });
  }

  // Check visibility
  async isVisible(locator: string): Promise<boolean> {
    return await this.page.isVisible(locator);
  }

  // Pause
  async pause(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
