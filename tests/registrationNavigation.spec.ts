import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NavigationPage } from '../pages/NavigationPage';
import { RegistrationPage } from '../pages/RegistrationPage';

test('Register new service holder', async ({ page }) => {
  const login = new LoginPage(page);
  const nav = new NavigationPage(page);
  const reg = new RegistrationPage(page);

  // Login
  await login.goto();
  await login.login('SQA4', '123456');

  // Navigate to Registration
  await nav.goToRegistration();

  // Fill Registration Form
  await reg.selectServiceCategory('Army');
  await reg.selectPrefix('BD');
  await reg.selectRank('Gen');
  await reg.enterPersonalNumber('12345678904');
  await reg.enterName('Sparsha Singha');
  await reg.selectUnit('4 H');
  await reg.selectEligibility('SKS');
  await reg.selectPersonCategory('BM');
  await reg.selectCorps('AC');
  await reg.setJoiningDate('15/02/2026');
  await reg.setDOB('01/01/1997');
  await reg.selectGender('M');
  await reg.enterNationalId('199001011234');
  await reg.selectNationality('Bangladeshi');
  await reg.selectBloodGroup('A+');
  await reg.selectMaritalStatus('Married');
  await reg.selectReligion('Islam');
  await reg.enterIdentityMark('Scar on left hand');
  await reg.selectMedicalCategory('A');
  await reg.fillContact('01700000000', '01800000000', 'sparsha@example.com');
  await reg.fillNOK('Dipti', 'Wife', 'House 1, Street 2', '01711111111');
  await reg.fillAddress('Dhaka', 'Chittagong');
  await reg.selectNgOption('presentDistrict', 'Dhaka');
  await reg.selectNgOption('permanentDistrict', 'Chittagong');

  // Save registration
  await reg.clickSave();

  //  Assertion
  await reg.expectRegistrationSuccess();
});
