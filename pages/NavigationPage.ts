import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // Navigate to Registration Page (OPD → Patient List → Add)
  async goToRegistration(): Promise<void> {

    // Wait for login to complete and page stabilize
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);

    // Click OPD link
    await this.safeClick("role=link[name=' OPD']");

    // Open Hospital Services dropdown
    await this.safeClick("role=button[name=' Hospital Services ']");

    // Open Out Patient Department dropdown
    await this.safeClick("role=button[name='Out Patient Department ']");

    // Open OPD Services dropdown
    await this.safeClick("role=button[name='OPD Services ']");

    // Click Patient List link
    await this.safeClick("role=link[name='Patient List']");

    // Wait for navigation to registration list page
    await this.page.waitForURL('**/opd/register-patient-list', { timeout: 15000 });
    await this.waitForPageLoad();

    await this.safeClick("role=button[name=' Add']");
    await this.waitForPageLoad();
  }

  // Click Add button in Registration Page
//   async clickAddPatient(): Promise<void> {
//     await this.safeClick("role=button[name=' Add']");
//     await this.waitForPageLoad();
//   }
  //  OPD → Hospital Services → OPD → OPD Services → Reception Rooms
  async goToOpdReception(): Promise<void> {

    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);

    // OPD main menu
    await this.safeClick("role=link[name=' OPD']");

    // Open Hospital Services dropdown
    await this.safeClick("role=button[name=' Hospital Services ']");

    // Open Out Patient Department dropdown
    await this.safeClick("role=button[name='Out Patient Department ']");

    // Open OPD Services dropdown
    await this.safeClick("role=button[name='OPD Services ']");

    // Receptions Rooms
    await this.safeClick('a:has-text("Receptions Rooms")');

    // Wait for OPD Reception page heading
    await this.page.waitForSelector('h5:has-text("OPD Reception")', { timeout: 15000 });
  }

  async goToPrescription() {
    // OPD
    const opd = this.page.getByRole('link', { name: ' OPD' });
    await opd.waitFor({ state: 'visible', timeout: 20000 });
    await opd.click();

    // Prescription System
    const presSystem = this.page.getByRole('button', { name: /Prescription System/i });
    await presSystem.waitFor({ state: 'visible', timeout: 20000 });
    await presSystem.click();

    // Prescription dropdown
    const presMenu = this.page.getByRole('button', { name: /^Prescription/i });
    await presMenu.waitFor({ state: 'visible', timeout: 20000 });
    await presMenu.click();

    // Prescription page
    const presLink = this.page.getByRole('link', { name: 'Prescription' });
    await presLink.waitFor({ state: 'visible', timeout: 20000 });
    await presLink.click();
  }
}
