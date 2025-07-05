import { test, expect } from '@playwright/test';
import { getSearchDataByTestCase } from '../utils/excelTestData';
import { loginAndNavigateToPIM } from '../utils/testHelpers';

const searchTestData01 = getSearchDataByTestCase('TC_Search_01');
for (let i = 0; i < searchTestData01.length; i++) {
  const data = searchTestData01[i];
  test(`TC_Search_01 - Validate search existing employee with full valid name (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchEmployee(data.employeeName);
    await pimPage.clickSubmitBtn();
    await pimPage.expectResultsContain(data.employeeName);
  });
}

const searchTestData02 = getSearchDataByTestCase('TC_Search_02');
for (let i = 0; i < searchTestData02.length; i++) {
  const data = searchTestData02[i];
  test(`TC_Search_02 - Validate search existing employee with partial name (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchEmployee(data.employeeName);
    await pimPage.clickSubmitBtn();
    await pimPage.expectResultsContain(data.employeeName);
  });
}

const searchTestData03 = getSearchDataByTestCase('TC_Search_03');
for (let i = 0; i < searchTestData03.length; i++) {
  const data = searchTestData03[i];
  test(`TC_Search_03 - Validate search non-exist employee (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchEmployee(data.employeeName);
    await pimPage.clickSubmitBtn();
    await pimPage.expectNoRecordsFound();
  });
}

const searchTestData04 = getSearchDataByTestCase('TC_Search_04');
for (let i = 0; i < searchTestData04.length; i++) {
  const data = searchTestData04[i];
  test(`TC_Search_04 - Validate search with blank search field (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchEmployee(data.employeeName);
    await pimPage.clickSubmitBtn();
    const rowCount = await page.locator('.oxd-table-body .oxd-table-row').count();
    expect(rowCount).toBeGreaterThan(0);
  });
}

const searchTestData05 = getSearchDataByTestCase('TC_Search_05');
for (let i = 0; i < searchTestData05.length; i++) {
  const data = searchTestData05[i];
  test(`TC_Search_05 - Validate search with special characters (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchEmployee(data.employeeName);
    await pimPage.clickSubmitBtn();
    await pimPage.expectNoRecordsFound();
  });
}

const searchTestData06 = getSearchDataByTestCase('TC_Search_06');
for (let i = 0; i < searchTestData06.length; i++) {
  const data = searchTestData06[i];
  test(`TC_Search_06 - Validate search with text that has space (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchEmployee(data.employeeName);
    await pimPage.clickSubmitBtn();
    await pimPage.expectNoRecordsFound();
  });
}

const searchTestData07 = getSearchDataByTestCase('TC_Search_07');
for (let i = 0; i < searchTestData07.length; i++) {
  const data = searchTestData07[i];
  test(`TC_Search_07 - Validate all fields are clear when click Reset button (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchWithCombinationFilters(data.employeeName || '', data.jobTitle || '');
    await pimPage.clickResetBtn();
    await pimPage.expectSearchFieldsCleared();
  });
}

const searchTestData08 = getSearchDataByTestCase('TC_Search_08');
for (let i = 0; i < searchTestData08.length; i++) {
  const data = searchTestData08[i];
  test(`TC_Search_08 - Validate search with Employee ID (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchByEmployeeId(data.employeeId || '');
    await pimPage.clickSubmitBtn();
    await pimPage.expectResultsContainId(data.employeeId || '');
  });
}

const searchTestData09 = getSearchDataByTestCase('TC_Search_09');
for (let i = 0; i < searchTestData09.length; i++) {
  const data = searchTestData09[i];
  test(`TC_Search_09 - Validate search with Employee Status (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchByEmploymentStatus(data.employmentStatus || '');
    await pimPage.clickSubmitBtn();
    await pimPage.expectResultsContainStatus(data.employmentStatus || '');
  });
}

const searchTestData10 = getSearchDataByTestCase('TC_Search_10');
for (let i = 0; i < searchTestData10.length; i++) {
  const data = searchTestData10[i];
  test(`TC_Search_10 - Validate search with Supervisor Name (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchBySupervisorName(data.supervisorName || '');
    await pimPage.clickSubmitBtn();
    await pimPage.expectResultsContainSupervisor(data.supervisorName || '');
  });
}

const searchTestData11 = getSearchDataByTestCase('TC_Search_11');
for (let i = 0; i < searchTestData11.length; i++) {
  const data = searchTestData11[i];
  test(`TC_Search_11 - Validate search with Sub Unit (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchBySubUnit(data.subUnit || '');
    await pimPage.clickSubmitBtn();
    await pimPage.expectResultsContainSubUnit(data.subUnit || '');
  });
}

const searchTestData12 = getSearchDataByTestCase('TC_Search_12');
for (let i = 0; i < searchTestData12.length; i++) {
  const data = searchTestData12[i];
  test(`TC_Search_12 - Validate search with Job Title (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchByJobTitle(data.jobTitle || '');
    await pimPage.clickSubmitBtn();
    await pimPage.expectResultsContainJobTitle(data.jobTitle || '');
  });
}

const searchTestData13 = getSearchDataByTestCase('TC_Search_13');
for (let i = 0; i < searchTestData13.length; i++) {
  const data = searchTestData13[i];
  test(`TC_Search_13 - Validate search with combination conditions (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchWithCombinationFilters(data.employeeName || '', data.jobTitle || '');
    await pimPage.clickSubmitBtn();
    await pimPage.expectResultsContainCombination(
      data.employeeName || '', 
      data.jobTitle || ''
    );
  });
}

const searchTestData14 = getSearchDataByTestCase('TC_Search_14');
for (let i = 0; i < searchTestData14.length; i++) {
  const data = searchTestData14[i];
  test(`TC_Search_14 - Validate search with sensitivity character (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchEmployee(data.employeeName);
    await pimPage.clickSubmitBtn();
    await pimPage.expectResultsContain("Rebecca Harmony");
  });
}

const searchTestData15 = getSearchDataByTestCase('TC_Search_15');
for (let i = 0; i < searchTestData15.length; i++) {
  const data = searchTestData15[i];
  test(`TC_Search_15 - Validate search with XSS injection (Row ${i + 1})`, async ({ page }) => {
    const pimPage = await loginAndNavigateToPIM(page);
    await pimPage.searchEmployee(data.employeeName);
    await pimPage.clickSubmitBtn();
    await pimPage.expectNoRecordsFound();
  });
} 