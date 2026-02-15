import { Page, expect } from '@playwright/test';

export class PrescriptionFlowPage {
  constructor(private page: Page) {}

  /* -------------------- Queue -------------------- */
  async quickAppointment(personalNo: string) {
    const quickBtn = this.page.getByRole('button', { name: 'Quick Appt.' });
    await quickBtn.waitFor({ state: 'visible', timeout: 30000 });
    await quickBtn.click();

    const search = this.page.locator('.input-group.mb-2 > .form-control');
    await search.waitFor({ state: 'visible', timeout: 30000 });
    await search.fill(personalNo);

    const selectBtn = this.page.getByRole('button', { name: new RegExp(personalNo) });
    await selectBtn.waitFor({ state: 'visible', timeout: 30000 });
    await selectBtn.click();

    const addQueue = this.page.getByRole('button', { name: 'Add to Queue' });
    await addQueue.waitFor({ state: 'visible', timeout: 30000 });
    await addQueue.click();

    const modal = this.page.locator('.modal-content');
    await modal.waitFor({ state: 'visible', timeout: 30000 });

    const yesBtn = modal.locator('button.btn-success', { hasText: 'Yes' });
    await yesBtn.waitFor({ state: 'visible', timeout: 30000 });
    await yesBtn.click();
  }

  async selectPatientFromQueue(patientName: string) {
    const row = this.page.getByRole('row', { name: new RegExp(patientName) }).first();
    const checkbox = row.getByRole('checkbox');
    await checkbox.waitFor({ state: 'visible', timeout: 30000 });
    await checkbox.check();
  }

  /* -------------------- Additional Options -------------------- */
  async openAdditionalOptions() {
    const link = this.page.getByRole('link', { name: 'Additional Options' });
    await link.waitFor({ state: 'visible', timeout: 30000 });
    await link.click();
  }

  async fillMedicalHistory() {
    await this.fillRowInput('Medical', 'N/A');
    await this.fillRowInput('PCI / PTCA', '10');
    await this.fillTypeAhead('CVA', 'STROKE', 'Stroke');
    await this.fillTypeAhead('Renal Failure / Impairement', 'Chronic', 'Chronic');
    await this.selectOptionRow('Anaemia', 'Present');
    await this.selectOptionRow('Cyanosis', 'Absent');
    await this.selectOptionRow('Lymph Nodes', 'Present');
  }

  /* -------------------- Quick Rx -------------------- */
  async openQuickRx() {
    const link = this.page.getByRole('link', { name: 'Quick Rx' });
    await link.waitFor({ state: 'visible', timeout: 30000 });
    await link.click();
  }

  async fillChiefComplaints() {
    const cc = this.page
      .locator('app-basic-prescription-part')
      .filter({ hasText: 'Chief Complaint:' })
      .getByRole('textbox');
    await cc.waitFor({ state: 'visible', timeout: 30000 });

    await cc.fill('Back Pain Off and On');
    await cc.press('Enter');
    await cc.fill('Chest Pain');
    await cc.press('Enter');
  }

  async fillPastHistory() {
    await this.typeAndEnter('.pastIllness .typeAhead .form-control', 'dm');
    await this.typeAndEnter('.form-control.ng-untouched.ng-valid.ng-dirty', 'htn');
  }

  async fillInvestigations() {
    await this.typeAndEnter('app-basic-investigation .typeAhead .form-control', 'CBC');
    await this.typeAndEnter('.form-control.ng-untouched.ng-valid.ng-dirty', 'Serum T3');
    await this.typeAndEnter('.form-control.ng-untouched.ng-valid.ng-dirty', 'Serum T4');
  }

  /* -------------------- Medicine -------------------- */
  async addMedicine(name: string, dose = '1+0+1', days = '1', meal = 'Before Meal') {
    const searchbox = this.page.getByRole('searchbox').first();
    await searchbox.waitFor({ state: 'visible', timeout: 30000 });
    await searchbox.fill(name);
    await searchbox.press('Enter');

    const doseBtn = this.page.locator('button', { hasText: dose }).first();
    await doseBtn.waitFor({ state: 'visible', timeout: 30000 });
    await doseBtn.click();

    const daysBtn = this.page.getByRole('button', { name: days });
    await daysBtn.waitFor({ state: 'visible', timeout: 30000 });
    await daysBtn.click();

    const dayUnitBtn = this.page.getByRole('button', { name: 'Day(s)' });
    await dayUnitBtn.waitFor({ state: 'visible', timeout: 30000 });
    await dayUnitBtn.click();

    const mealSearchbox = this.page.getByRole('columnheader', { name: 'Before Meal After Meal' })
      .getByRole('searchbox');
    await mealSearchbox.waitFor({ state: 'visible', timeout: 30000 });
    await mealSearchbox.click();

    const mealBtn = this.page.getByRole('button', { name: meal });
    await mealBtn.waitFor({ state: 'visible', timeout: 30000 });
    await mealBtn.click();

    const addBtn = this.page.getByRole('button', { name: 'ADD' });
    await addBtn.waitFor({ state: 'visible', timeout: 30000 });
    await addBtn.click();
  }

  /* -------------------- Advice -------------------- */
  async addAdvice() {
    await this.typeAndEnter('.pastIllness .typeAhead .form-control', 'Regular Exercise');
    await this.typeAndEnter('.form-control.ng-untouched.ng-valid.ng-dirty', 'Reduce Salt');
  }

  async addNote(note: string) {
    const noteBox = this.page.locator('#note');
    await noteBox.waitFor({ state: 'visible', timeout: 30000 });
    await noteBox.fill(note);
  }

  /* -------------------- Save -------------------- */
  async savePrescription() {
    const popupPromise = this.page.waitForEvent('popup');
    const saveBtn = this.page.getByRole('button', { name: 'Save', exact: true });
    await saveBtn.waitFor({ state: 'visible', timeout: 30000 });
    await saveBtn.click();
    await popupPromise; // print / preview window
  }

  /* -------------------- Helpers -------------------- */
  private async fillRowInput(rowName: string, value: string) {
    const row = this.page.getByRole('row', { name: new RegExp(rowName) });
    const input = row.getByRole('textbox').first();
    await input.waitFor({ state: 'visible', timeout: 30000 });
    await input.fill(value);
  }

  private async fillTypeAhead(rowName: string, value: string, option: string) {
    const row = this.page.getByRole('row', { name: new RegExp(rowName) });
    const input = row.getByRole('searchbox').first();
    await input.waitFor({ state: 'visible', timeout: 30000 });
    await input.fill(value);

    const btn = this.page.getByRole('button', { name: new RegExp(option) });
    await btn.waitFor({ state: 'visible', timeout: 30000 });
    await btn.click();
  }

  private async selectOptionRow(rowName: string, option: string) {
    const row = this.page.getByRole('row', { name: new RegExp(rowName) });
    const searchbox = row.getByRole('searchbox').first();
    await searchbox.waitFor({ state: 'visible', timeout: 10000 });
    await searchbox.click();

    const btn = this.page.getByRole('button', { name: option });
    await btn.waitFor({ state: 'visible', timeout: 10000 });
    await btn.click();
  }

  private async typeAndEnter(selector: string, value: string) {
    const el = this.page.locator(selector).first();
    await el.waitFor({ state: 'visible', timeout: 10000 });
    await el.fill(value);
    await el.press('Enter');
  }
}
