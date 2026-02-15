import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NavigationPage } from '../pages/NavigationPage';
import { OpdReceptionPage } from '../pages/OpdReceptionPage';

test('OPD Reception Flow - CVS Center', async ({ page }) => {

  const login = new LoginPage(page);
  const nav = new NavigationPage(page);
  const opd = new OpdReceptionPage(page);

  // Login
  await login.goto();
  await login.login('SQA4', '123456');

  // Navigate
  await nav.goToOpdReception();

  // Validate page
  await opd.waitForOpdReceptionPage();

  // Validate department
  await opd.waitForDepartment('CVS Center');

  // Click IN
  await opd.clickDepartmentIn('CVS Center');

  // Select room
//   await opd.selectRoom('CVS Center', "Doctor's Room - 01");

  await opd.addPatientToQueue('BA-111222', '3: Object');


});
