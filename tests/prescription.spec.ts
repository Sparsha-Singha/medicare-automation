import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NavigationPage } from '../pages/NavigationPage';
import { PrescriptionPage } from '../pages/PrescriptionPage';
import { PrescriptionFlowPage } from '../pages/PrescriptionFlowPage';

test('Prescription Flow - Doctor Room Selection', async ({ page }) => {
  const login = new LoginPage(page);
  const nav = new NavigationPage(page);
  const pres = new PrescriptionPage(page);

  // Login
  await login.goto();
  await login.login('SQA4', '123456');

  // Navigate to Prescription
  await nav.goToPrescription();

  // Validate Prescription Page
  await pres.waitForPrescriptionPage();

  // Select Doctor Room
  await pres.selectDoctorsRoom(`Doctor's Room - 01`);
});

