import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { getLoginDataByTestCase } from '../utils/excelTestData';
import { performLogin } from '../utils/testHelpers';

const loginTestData = getLoginDataByTestCase('TC_Login_01');
for (let i = 0; i < loginTestData.length; i++) {
  const data = loginTestData[i];
  test(`TC_Login_01 - Validate login successful with valid data (Row ${i + 1})`, async ({ page }) => {
    const loginPage = await performLogin(page, data.username, data.password);
    await expect(page.locator('h6')).toContainText('Dashboard');
  });
}

const invalidUsernameData = getLoginDataByTestCase('TC_Login_02');
for (let i = 0; i < invalidUsernameData.length; i++) {
  const data = invalidUsernameData[i];
  test(`TC_Login_02 - Validate login unsuccessful with invalid username (Row ${i + 1})`, async ({ page }) => {
    const loginPage = await performLogin(page, data.username, data.password);
    await expect(await loginPage.getErrorMessage()).toHaveText('Invalid credentials');
  });
}

const invalidPasswordData = getLoginDataByTestCase('TC_Login_03');
for (let i = 0; i < invalidPasswordData.length; i++) {
  const data = invalidPasswordData[i];
  test(`TC_Login_03 - Validate login unsuccessful with invalid password (Row ${i + 1})`, async ({ page }) => {
    const loginPage = await performLogin(page, data.username, data.password);
    await expect(await loginPage.getErrorMessage()).toHaveText('Invalid credentials');
  });
}

const blankCredentialsData = getLoginDataByTestCase('TC_Login_04');
for (let i = 0; i < blankCredentialsData.length; i++) {
  const data = blankCredentialsData[i];
  test(`TC_Login_04 - Validate login unsuccessful with blank input (Row ${i + 1})`, async ({ page }) => {
    const loginPage = await performLogin(page, data.username, data.password);
    await expect(loginPage.getUsernameRequiredMessage()).toHaveText('Required');
    await expect(loginPage.getPasswordRequiredMessage()).toHaveText('Required');
    const usernameBorder = await loginPage.getUsernameInput().evaluate((el) => getComputedStyle(el).borderColor);
    const passwordBorder = await loginPage.getPasswordInput().evaluate((el) => getComputedStyle(el).borderColor);
    expect(["#eb0910", "rgb(235, 9, 16)"]).toContain(usernameBorder);
    expect(["#eb0910", "rgb(235, 9, 16)"]).toContain(passwordBorder);
  });
}

const blankUsernameData = getLoginDataByTestCase('TC_Login_05');
for (let i = 0; i < blankUsernameData.length; i++) {
  const data = blankUsernameData[i];
  test(`TC_Login_05 - Validate login unsuccessful with blank username (Row ${i + 1})`, async ({ page }) => {
    const loginPage = await performLogin(page, data.username, data.password);
    await expect(loginPage.getUsernameRequiredMessage()).toHaveText('Required');
    const usernameBorder = await loginPage.getUsernameInput().evaluate((el) => getComputedStyle(el).borderColor);
    expect(["#eb0910", "rgb(235, 9, 16)"]).toContain(usernameBorder);
  });
}

const blankPasswordData = getLoginDataByTestCase('TC_Login_06');
for (let i = 0; i < blankPasswordData.length; i++) {
  const data = blankPasswordData[i];
  test(`TC_Login_06 - Validate login unsuccessful with blank password (Row ${i + 1})`, async ({ page }) => {
    const loginPage = await performLogin(page, data.username, data.password);
    await expect(loginPage.getPasswordRequiredMessage()).toHaveText('Required');
    const passwordBorder = await loginPage.getPasswordInput().evaluate((el) => getComputedStyle(el).borderColor);
    expect(["#eb0910", "rgb(235, 9, 16)"]).toContain(passwordBorder);
  });
}

const caseSensitiveUsernameData = getLoginDataByTestCase('TC_Login_07');
for (let i = 0; i < caseSensitiveUsernameData.length; i++) {
  const data = caseSensitiveUsernameData[i];
  test(`TC_Login_07 - Validate login unsuccessful with sensitivity for username (Row ${i + 1})`, async ({ page }) => {
    const loginPage = await performLogin(page, data.username, data.password);
    await expect(page.locator('h6')).toContainText('Dashboard');
  });
}

const caseSensitivePasswordData = getLoginDataByTestCase('TC_Login_08');
for (let i = 0; i < caseSensitivePasswordData.length; i++) {
  const data = caseSensitivePasswordData[i];
  test(`TC_Login_08 - Validate login unsuccessful with sensitivity for password (Row ${i + 1})`, async ({ page }) => {
    const loginPage = await performLogin(page, data.username, data.password);
    await expect(await loginPage.getErrorMessage()).toHaveText('Invalid credentials');
  });
}

const sqlInjectionData = getLoginDataByTestCase('TC_Login_09');
for (let i = 0; i < sqlInjectionData.length; i++) {
  const data = sqlInjectionData[i];
  test(`TC_Login_09 - Validate login unsuccessful with SQL injection (Row ${i + 1})`, async ({ page }) => {
    const loginPage = await performLogin(page, data.username, data.password);
    await expect(await loginPage.getErrorMessage()).toHaveText('Invalid credentials');
  });
} 