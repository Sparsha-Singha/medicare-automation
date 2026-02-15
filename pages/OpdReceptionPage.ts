import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OpdReceptionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //  Wait for OPD Reception Page
  async waitForOpdReceptionPage() {
    const header = this.page.locator('h5.subHeadingDocSetup:has-text("OPD Reception")');
    await expect(header).toBeVisible({ timeout: 20000 });
  }

  //  Wait for department tile
  async waitForDepartment(departmentName: string) {
    const dept = this.page.locator('.departmentArea h4 a', { hasText: departmentName });
    await expect(dept).toBeVisible({ timeout: 20000 });
  }

  // Click IN button of department
  async clickDepartmentIn(departmentName: string) {
    const inBtn = this.page.locator(
      `.departmentArea:has(h4 a:has-text("${departmentName}")) .departmentGo`
    );
    await expect(inBtn).toBeVisible({ timeout: 20000 });
    await inBtn.scrollIntoViewIfNeeded();
    await inBtn.click();
  }

  //  Select a doctor room by department
  async selectRoom(departmentName: string, roomName: string) {
    const room = this.page.locator(
      `.departmentArea:has(h4 a:has-text("${departmentName}")) .doctorContent h5 span`,
      { hasText: roomName }
    );
    await expect(room).toBeVisible({ timeout: 20000 });
    await room.scrollIntoViewIfNeeded();
    await room.click();
  }

  //  Add a patient to queue
  async addPatientToQueue(patientId: string, roomValue: string) {
  // --- Select patient ---
  const patientInput = this.page.getByRole('textbox').first();
  await patientInput.click();
  await patientInput.fill(patientId);

  const patientOption = this.page.getByRole('button', { name: new RegExp(`${patientId} -`) });
  await expect(patientOption).toBeVisible({ timeout: 10000 });
  await patientOption.click();

  // --- Select room dropdown ---
  const roomSelect = this.page.locator('select[name="rooms"]');
  await expect(roomSelect).toBeVisible({ timeout: 10000 });
  await expect(roomSelect).toBeEnabled({ timeout: 10000 });

  // Wait until options are populated (more than just default)
  await this.page.waitForFunction(
    (sel) => {
      const select = document.querySelector(sel) as HTMLSelectElement;
      return select && select.options.length > 1;
    },
    'select[name="rooms"]',
    { timeout: 30000 }
  );

  // --- Select by value, not text ---
  await roomSelect.selectOption(roomValue); // e.g., '3: Object'

  // --- Fill age ---
  // const ageInput = this.page.locator('input[name="age"]');
  // await ageInput.fill(age);

  // --- Add to Queue ---
  const addBtn = this.page.getByRole('button', { name: 'Add to Queue' });
  await expect(addBtn).toBeVisible({ timeout: 10000 });
  await addBtn.click();

  // --- Click "No" on confirmation ---
// Wait for the modal to appear (optional short timeout)
const modal = this.page.locator('.modal-content');
if (await modal.count() > 0) {
  await modal.waitFor({ state: 'visible', timeout: 5000 });

  // Find the "No" button inside this modal
  const noBtn = modal.locator('button', { hasText: /^No$/ }); // exact text "No"
  
  if (await noBtn.count() > 0) {
    await noBtn.click();
  }
}


}



}
