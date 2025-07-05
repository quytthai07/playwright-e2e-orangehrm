import { Page, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { PIMPage } from '../pages/pimPage';

/**
 * Perform login with provided credentials
 * Navigates to login page and attempts authentication
 * @param page - Playwright page object
 * @param username - Login username
 * @param password - Login password
 * @returns LoginPage instance for further interactions
 */
export async function performLogin(page: Page, username: string, password: string): Promise<LoginPage> {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login(username, password);
  
  return loginPage;
}

/**
 * Navigate to PIM page from dashboard
 * Verifies dashboard is loaded before navigation
 * @param page - Playwright page object
 * @returns PIMPage instance for PIM operations
 */
export async function navigateToPIM(page: Page): Promise<PIMPage> {   
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.isAtDashboard();
  await dashboardPage.navigateToPIMPage();
  
  const pimPage = new PIMPage(page);
  
  return pimPage;
}

/**
 * Combined login and navigation to PIM page
 * Uses environment variables or default credentials if not provided
 * @param page - Playwright page object
 * @param username - Optional username (falls back to env var or default)
 * @param password - Optional password (falls back to env var or default)
 * @returns PIMPage instance ready for PIM operations
 */
export async function loginAndNavigateToPIM(page: Page, username?: string, password?: string): Promise<PIMPage> {
  const configUsername = username || process.env.PLAYWRIGHT_USERNAME || 'Admin';
  const configPassword = password || process.env.PLAYWRIGHT_PASSWORD || 'admin123';
  
  await performLogin(page, configUsername, configPassword);
  const pimPage = await navigateToPIM(page);
  
  return pimPage;
}