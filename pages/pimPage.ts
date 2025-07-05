import { Page, expect } from '@playwright/test';

export class PIMPage {
  constructor(private page: Page) {}

  //#region Button Actions
  /**
   * Click the search submit button and wait for results to load
   * Note: 5-second wait is used to ensure search results are fully loaded
   */
  async clickSubmitBtn() {
    await this.page.click('button[type="submit"]');
    await this.page.waitForTimeout(5000);
  }

  /**
   * Click the reset button to clear all search filters
   */
  async clickResetBtn() {
    await this.page.click('button[type="reset"]');
  }
  //#endregion Button Actions

  //#region Search Methods
  /**
   * Search for employee by name using the employee name field
   * @param name - Employee name to search for
   */
  async searchEmployee(name: string) {
    await this.page.fill('input[placeholder="Type for hints..."]', name);
  }

  /**
   * Search for employee by employee ID
   * @param employeeId - Employee ID to search for
   */
  async searchByEmployeeId(employeeId: string) {
    await this.page.fill('.oxd-input.oxd-input--active >> nth=1', employeeId);
  }

  /**
   * Search for employees by employment status using dropdown
   * @param employmentStatus - Employment status to filter by
   */
  async searchByEmploymentStatus(employmentStatus: string) {
    await this.page.click('.oxd-input-group:has(label:has-text("Employment Status")) .oxd-select-text');
    await this.page.click(`.oxd-select-option:has-text("${employmentStatus}")`);
  }  

  /**
   * Search for employees by supervisor name
   * @param supervisorName - Supervisor name to search for
   */
  async searchBySupervisorName(supervisorName: string) {
    await this.page.fill('input[placeholder="Type for hints..."] >> nth=1', supervisorName);
  }

  /**
   * Search for employees by sub unit using dropdown
   * Note: 5-second wait ensures dropdown is fully loaded before interaction
   * @param subUnit - Sub unit to filter by
   */
  async searchBySubUnit(subUnit: string) {
    await this.page.waitForTimeout(5000);
    await this.page.click('.oxd-input-group:has(label:has-text("Sub Unit")) .oxd-select-text');
    await this.page.click(`.oxd-select-option:has-text("${subUnit}")`);
  }

  /**
   * Search for employees by job title using dropdown
   * @param jobTitle - Job title to filter by
   */
  async searchByJobTitle(jobTitle: string) {
    await this.page.click('.oxd-input-group:has(label:has-text("Job Title")) .oxd-select-text');
    await this.page.click(`.oxd-select-option:has-text("${jobTitle}")`);
  }

  /**
   * Search using multiple filters simultaneously
   * Only applies filters if values are provided (not empty)
   * @param employeeName - Employee name filter (optional)
   * @param jobTitle - Job title filter (optional)
   */
  async searchWithCombinationFilters(employeeName: string, jobTitle: string) {
    if (employeeName) {
      await this.page.fill('input[placeholder="Type for hints..."] >> nth=1', employeeName);
    }
    
    if (jobTitle) {
      await this.page.click('.oxd-input-group:has(label:has-text("Job Title")) .oxd-select-text');
      await this.page.click(`.oxd-select-option:has-text("${jobTitle}")`);
    }
  }
  //#endregion Search Methods

  //#region Validation Methods
  /**
   * Verify that search results contain the specified employee name
   * @param name - Employee name to verify in results
   */
  async expectResultsContain(name: string) {
    await expect(this.page.locator('.oxd-table')).toContainText(name);
  }

  /**
   * Verify that no search results were found
   * Checks for "No Records Found" message
   */
  async expectNoRecordsFound() {
    await expect(
      this.page.locator('.oxd-text.oxd-text--span').filter({ hasText: 'No Records Found' })
    ).toBeVisible();
  }

  /**
   * Verify that search results contain the specified employee ID
   * @param employeeId - Employee ID to verify in results
   */
  async expectResultsContainId(employeeId: string) {
    await expect(this.page.locator('.oxd-table')).toContainText(employeeId);
  }

  /**
   * Verify that search results contain the specified employment status
   * @param employmentStatus - Employment status to verify in results
   */
  async expectResultsContainStatus(employmentStatus: string) {
    await expect(this.page.locator('.oxd-table')).toContainText(employmentStatus);
  }

  /**
   * Verify that supervisor name field contains the expected value
   * @param supervisorName - Supervisor name to verify
   */
  async expectResultsContainSupervisor(supervisorName: string) {
    await expect(this.page.locator('input[placeholder="Type for hints..."] >> nth=1')).toHaveValue(supervisorName);
  }

  /**
   * Verify that sub unit dropdown contains the expected value
   * @param subUnit - Sub unit to verify
   */
  async expectResultsContainSubUnit(subUnit: string) {
    await expect(this.page.locator('.oxd-input-group:has(label:has-text("Sub Unit")) .oxd-select-text-input')).toContainText(subUnit);
  }

  /**
   * Verify that search results contain the specified job title
   * @param jobTitle - Job title to verify in results
   */
  async expectResultsContainJobTitle(jobTitle: string) {
    await expect(this.page.locator('.oxd-table')).toContainText(jobTitle);
  }

  /**
   * Verify combination search results for multiple filters
   * Only validates provided values (skips empty ones)
   * @param employeeName - Employee name to verify (optional)
   * @param jobTitle - Job title to verify (optional)
   */
  async expectResultsContainCombination(employeeName: string, jobTitle: string) {
    if (employeeName) {
      await expect(this.page.locator('input[placeholder="Type for hints..."] >> nth=1')).toHaveValue(employeeName);
    }
    if (jobTitle) {
      await expect(this.page.locator('.oxd-input-group:has(label:has-text("Job Title")) .oxd-select-text-input')).toContainText(jobTitle);
    }
  }

  /**
   * Verify that all search fields have been cleared after reset
   * Checks that input fields are empty and dropdowns show default "Select" text
   */
  async expectSearchFieldsCleared() {
    await expect(this.page.locator('input[placeholder="Type for hints..."]').first()).toHaveValue('');
    
    await expect(this.page.locator('.oxd-input.oxd-input--active >> nth=1')).toHaveValue('');
    
    await expect(this.page.locator('.oxd-input-group:has(label:has-text("Employment Status")) .oxd-select-text-input')).toContainText('-- Select --');
    
    await expect(this.page.locator('input[placeholder="Type for hints..."]').last()).toHaveValue('');
    
    await expect(this.page.locator('.oxd-input-group:has(label:has-text("Job Title")) .oxd-select-text-input')).toContainText('-- Select --');
    
    await expect(this.page.locator('.oxd-input-group:has(label:has-text("Sub Unit")) .oxd-select-text-input')).toContainText('-- Select --');
  }
  //#endregion Validation Methods
}