import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  /**
   * Verify that the dashboard page has loaded successfully
   * Waits for the dashboard header to be visible
   */
  async isAtDashboard() {
    await this.page.waitForSelector('h6:has-text("Dashboard")');
  }

  /**
   * Navigate to the PIM (Personal Information Management) module
   * Clicks the PIM menu link
   */
  async navigateToPIMPage() {
    await this.page.click('a[href*="viewPimModule"]');
  }
}