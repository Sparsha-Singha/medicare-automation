import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('http://115.127.218.89:8787/medicare-web-client-v2/#/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(username: string, password: string) {

    // Username
    const userBox = this.page.getByRole('textbox', { name: 'Username' });
    await userBox.waitFor({ state: 'visible', timeout: 20000 });
    await userBox.fill(username);

    // Password
    const passBox = this.page.getByRole('textbox', { name: 'Password' });
    await passBox.waitFor({ state: 'visible', timeout: 20000 });
    await passBox.fill(password);

    // Sign in
    const signInBtn = this.page.getByRole('button', { name: /Sign in/i });
    await signInBtn.waitFor({ state: 'visible', timeout: 20000 });
    await signInBtn.click();

    // Wait for dashboard load
    await this.page.waitForLoadState('networkidle');
  }
}
