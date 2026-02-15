import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Medicare HMS Login Flow', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('SQA4', '123456');

  // validation: login success = not in login page
  await expect(page).not.toHaveURL(/login/);

});
