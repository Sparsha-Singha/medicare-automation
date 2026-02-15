import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { NavigationPage } from '../pages/NavigationPage';
import { PrescriptionPage } from '../pages/PrescriptionPage';
import { PrescriptionFlowPage } from '../pages/PrescriptionFlowPage';

test('Full Prescription Flow', async ({ page }) => {

  const login = new LoginPage(page);
  const nav = new NavigationPage(page);
  const presNav = new PrescriptionPage(page);
  const flow = new PrescriptionFlowPage(page);

  // Login
  await login.goto();
  await login.login('SQA4', '123456');

  // Navigation
  await nav.goToPrescription();
  await presNav.waitForPrescriptionPage();
  await presNav.selectDoctorsRoom(`Doctor's Room - 01`);

  // Queue
  await flow.quickAppointment('BA-111222');
  await flow.selectPatientFromQueue('Shariat Sunny');

  // Medical data
  await flow.openAdditionalOptions();
  await flow.fillMedicalHistory();

  // Prescription
  await flow.openQuickRx();
  await flow.fillChiefComplaints();
  await flow.fillPastHistory();
  await flow.fillInvestigations();

  // Medicines
  await flow.addMedicine('Ascorbic Acid', '1+0+1', '1');
  await flow.addMedicine('Paracetamol 500 mg Tab', '1+0+1', '30');
  await flow.addMedicine('Omeprazole 20', '1+0+1', '8');

  // Advice + Notes
  await flow.addAdvice();
  await flow.addNote('Exercise Daily');

  // Save
  await flow.savePrescription();

});

