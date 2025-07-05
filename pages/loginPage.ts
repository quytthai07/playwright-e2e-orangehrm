import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Perform login with provided credentials
   * @param username - User's login username
   * @param password - User's login password
   */
  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  /**
   * Get error message element for invalid login attempts
   */
  async getErrorMessage() {
    return this.page.locator('.oxd-alert-content-text');
  }

  /**
   * Get username field validation message element
   * Uses XPath for specific validation message targeting
   */
  getUsernameRequiredMessage() {
    const xpathUsernameRequiredMessage = "//div[@class='orangehrm-login-slot-wrapper']//div[1]//div[1]//span[1]";
    return this.page.locator(xpathUsernameRequiredMessage);
  }

  /**
   * Get password field validation message element
   * Uses XPath for specific validation message targeting
   */
  getPasswordRequiredMessage() {
    const xpathPasswordRequiredMessage = "//div[@class='orangehrm-login-form']//div[2]//div[1]//span[1]";
    return this.page.locator(xpathPasswordRequiredMessage);
  }

  /**
   * Get username input field element
   */
  getUsernameInput() {
    return this.page.locator('input[name="username"]');
  }

  /**
   * Get password input field element
   */
  getPasswordInput() {
    return this.page.locator('input[name="password"]');
  }
}