import { Page, expect } from '@playwright/test';

export class PrescriptionPage {
  constructor(private page: Page) {}

  //  Wait until doctor rooms are visible (real page indicator)
  async waitForPrescriptionPage() {
    const doctorRoom = this.page.getByRole('link', { name: /Doctor's Room/i });
    await expect(doctorRoom.first()).toBeVisible({ timeout: 20000 });
  }

  //  Select Doctor Room
  async selectDoctorsRoom(roomName: string) {
    const room = this.page.getByRole('link', { name: new RegExp(roomName) });
    await expect(room).toBeVisible({ timeout: 20000 });
    await room.scrollIntoViewIfNeeded();
    await room.click();
  }
}
