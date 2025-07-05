import { ExcelReader, LoginTestData, SearchTestData, GroupedTestData } from './excelReader';

const excelFilePath = './testData/TestData.xlsx';
const excelReader = new ExcelReader(excelFilePath);
export const loginTestDataFromExcel: LoginTestData[] = excelReader.readLoginTestData();
export const searchTestDataFromExcel: SearchTestData[] = excelReader.readSearchTestData();
export const groupedTestData: GroupedTestData = excelReader.getGroupedTestData();

/**
 * Get login test data for a specific test case
 * @param testCase - Test case identifier (e.g., 'TC_Login_01')
 * @returns Array of login test data for the specified test case
 */
export function getLoginDataByTestCase(testCase: string): LoginTestData[] {
  return excelReader.getLoginDataByTestCase(testCase);
}

/**
 * Get search test data for a specific test case
 * @param testCase - Test case identifier (e.g., 'TC_Search_01')
 * @returns Array of search test data for the specified test case
 */
export function getSearchDataByTestCase(testCase: string): SearchTestData[] {
  return excelReader.getSearchDataByTestCase(testCase);
}

export function getFirstLoginDataByTestCase(testCase: string): LoginTestData | undefined {
  const data = getLoginDataByTestCase(testCase);
  return data.length > 0 ? data[0] : undefined;
}

export function getFirstSearchDataByTestCase(testCase: string): SearchTestData | undefined {
  const data = getSearchDataByTestCase(testCase);
  return data.length > 0 ? data[0] : undefined;
}

export const allTestData = excelReader.getAllTestData();

export const loginUser = loginTestDataFromExcel.map(data => ({
  username: data.username,
  password: data.password
}));

export const searchCondition = searchTestDataFromExcel.map(data => ({
  employeeName: data.employeeName,
  employeeId: data.employeeId,
  employmentStatus: data.employmentStatus,
  supervisorName: data.supervisorName,
  subUnit: data.subUnit,
  jobTitle: data.jobTitle
}));

export function debugTestData() {
  excelReader.getTestDataWithRowInfo();
} 