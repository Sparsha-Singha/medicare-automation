import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Select service category from dropdown
  async selectServiceCategory(category: string) {
    await this.safeSelect('select[name="serviceCategory"]', category);
  }

  async selectPrefix(prefix: string) {
  const base = 'ng-select[name="persNumbPrefix"]';

  // Click input inside ng-select
  await this.safeClick(`${base} .ng-input input`);

  // Type value
  await this.safeFill(`${base} .ng-input input`, prefix);

  // Wait for dropdown options
  await this.page.waitForSelector('.ng-dropdown-panel .ng-option', { timeout: 10000 });

  // Select first matching option
  await this.page.keyboard.press('Enter');
}


  async selectRank(rank: string) {
    await this.safeTypeNgSelect('ng-select[name="rankNo"]', rank);
  }

  async enterPersonalNumber(number: string) {
    await this.safeFill('input[name="personalNumberViewOnly"]', number);
  }

  async enterName(name: string) {
    await this.safeFill('input[name="fname"]', name);
  }

  async selectUnit(unit: string) {
    await this.safeTypeNgSelect('ng-select[name="unitNo"]', unit);
  }

  async selectEligibility(status: string) {
    await this.safeSelect('select[name="eligibilityStatus"]', status);
  }

  async selectPersonCategory(category: string) {
    await this.safeTypeNgSelect('ng-select[name="personCategory"]', category);
  }

  async selectCorps(corps: string) {
    await this.safeTypeNgSelect('ng-select[name="corps"]', corps);
  }

  async setJoiningDate(date: string) {
    await this.safeFill('input[name="joiningDate"]', date);
  }

  async setDOB(dob: string) {
    await this.safeFill('input[name="dob"]', dob);
  }

  async selectGender(gender: 'M' | 'F') {
    await this.safeClick(`input[name="gender"][value="${gender}"]`);
  }

  async enterNationalId(id: string) {
    await this.safeFill('input[name="nationalId"]', id);
  }

  async selectNationality(nationality: string) {
    await this.safeSelect('select[name="nationality"]', nationality);
  }

  async selectBloodGroup(group: string) {
    await this.safeSelect('select[name="bloodGroup"]', group);
  }

  async selectMaritalStatus(status: string) {
    await this.safeSelect('select[name="maritalStatus"]', status);
  }

  async selectReligion(religion: string) {
    await this.safeSelect('select[name="religion"]', religion);
  }

  async enterIdentityMark(mark: string) {
    await this.safeFill('input[name="identityMark"]', mark);
  }

  async selectMedicalCategory(category: string) {
    await this.safeSelect('select[name="medicalCategory"]', category);
  }

  async fillContact(phone: string, phone2?: string, email?: string) {
    await this.safeFill('input[name="phoneMobile"]', phone);
    if (phone2) await this.safeFill('input[name="phoneMobile2"]', phone2);
    if (email) await this.safeFill('input[name="email"]', email);
  }

  async fillNOK(name: string, relation: string, address: string, contact: string) {
    await this.safeSelect('select[name="nokRelation"]', relation);
    await this.safeFill('input[name="nokName"]', name);
    await this.safeFill('textarea[name="nokAddress"]', address);
    await this.safeFill('input[name="nokContact"]', contact);
  }

  async fillAddress(present: string, permanent: string) {
    await this.safeFill('textarea[name="presentAddress"]', present);
    await this.safeFill('textarea[name="permanertAddress"]', permanent);
  }

  async selectNgOption(ngSelectName: string, value: string) {
  const input = this.page.locator(`ng-select[name="${ngSelectName}"] input[role="combobox"]`);

  await input.waitFor({ state: 'visible', timeout: 30000 });
  await input.click();
  await input.fill(value);

  // wait for dropdown options
  const option = this.page.locator('.ng-dropdown-panel .ng-option').first();
  await option.waitFor({ state: 'visible', timeout: 30000 });

  await this.page.keyboard.press('Enter');
}


  // Click Save button
  async clickSave() {
    await this.safeClick('button[type="submit"]:has-text("Save")');
  }

  // Click Clear button
  async clickClear() {
    await this.safeClick('button[type="button"]:has-text("Clear")');
  }

  // Helper for ng-select fields
  async safeTypeNgSelect(selector: string, value: string) {
    await this.safeClick(selector); // open dropdown
    const input = `${selector} input[role="combobox"]`;
    await this.safeFill(input, value);
    await this.page.keyboard.press('Enter'); // select the first matching option
  }
  
  async expectRegistrationSuccess() {
  // Common patterns for success messages / toasts
  const successMsg = this.page.locator(
    'text=/Registration Save Successfully/i'
  );

  await expect(successMsg).toBeVisible({ timeout: 15000 });
}

}
