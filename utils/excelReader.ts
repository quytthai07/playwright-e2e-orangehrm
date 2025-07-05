import * as XLSX from 'xlsx';

export interface LoginTestData {
  testCase: string;
  username: string;
  password: string;
  rowIndex?: number;
}

export interface SearchTestData {
  testCase: string;
  employeeName: string;
  employeeId: string;
  employmentStatus: string;
  supervisorName: string;
  subUnit: string;
  jobTitle: string;
  rowIndex?: number;
}

export interface GroupedTestData {
  [testCase: string]: {
    loginData?: LoginTestData[];
    searchData?: SearchTestData[];
  };
}

/**
 * Excel file reader for test data management
 * Handles reading and parsing Excel files containing test data
 */
export class ExcelReader {
  private workbook: XLSX.WorkBook;

  /**
   * Initialize Excel reader with file path
   * @param filePath - Path to the Excel file
   * @throws Error if file cannot be read
   */
  constructor(filePath: string) {
    try {
      this.workbook = XLSX.readFile(filePath);
    } catch (error) {
      console.error(`Error reading Excel file: ${filePath}`, error);
      throw error;
    }
  }

  getSheetNames(): string[] {
    return this.workbook.SheetNames;
  }

  readLoginTestData(sheetName: string = 'Login'): LoginTestData[] {
    try {
      const worksheet = this.workbook.Sheets[sheetName];
      if (!worksheet) {
        throw new Error(`Sheet '${sheetName}' not found`);
      }

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      const testData: LoginTestData[] = [];
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        if (row && row.length >= 3) {
          testData.push({
            testCase: row[0] || '',
            username: row[1] || '',
            password: row[2] || '',
            rowIndex: i + 1
          });
        }
      }

      return testData;
    } catch (error) {
      console.error(`Error reading login test data from sheet '${sheetName}':`, error);
      throw error;
    }
  }

  readSearchTestData(sheetName: string = 'Search'): SearchTestData[] {
    try {
      const worksheet = this.workbook.Sheets[sheetName];
      if (!worksheet) {
        throw new Error(`Sheet '${sheetName}' not found`);
      }

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      const testData: SearchTestData[] = [];
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        if (row && row.length >= 7) {
          testData.push({
            testCase: row[0] || '',
            employeeName: row[1] || '',
            employeeId: row[2] || '',
            employmentStatus: row[3] || '',
            supervisorName: row[4] || '',
            subUnit: row[5] || '',
            jobTitle: row[6] || '',
            rowIndex: i + 1
          });
        }
      }

      return testData;
    } catch (error) {
      console.error(`Error reading search test data from sheet '${sheetName}':`, error);
      throw error;
    }
  }

  getGroupedTestData(): GroupedTestData {
    try {
      const loginData = this.readLoginTestData();
      const searchData = this.readSearchTestData();
      
      const groupedData: GroupedTestData = {};
      
      loginData.forEach(data => {
        if (!groupedData[data.testCase]) {
          groupedData[data.testCase] = {};
        }
        if (!groupedData[data.testCase].loginData) {
          groupedData[data.testCase].loginData = [];
        }
        groupedData[data.testCase].loginData!.push(data);
      });
      
      searchData.forEach(data => {
        if (!groupedData[data.testCase]) {
          groupedData[data.testCase] = {};
        }
        if (!groupedData[data.testCase].searchData) {
          groupedData[data.testCase].searchData = [];
        }
        groupedData[data.testCase].searchData!.push(data);
      });
      
      return groupedData;
    } catch (error) {
      console.error('Error grouping test data:', error);
      throw error;
    }
  }

  getLoginDataByTestCase(testCase: string): LoginTestData[] {
    try {
      const loginData = this.readLoginTestData();
      return loginData.filter(data => data.testCase === testCase);
    } catch (error) {
      console.error('Error fetching login test data by test case:', error);
      throw error;
    }
  }

  getSearchDataByTestCase(testCase: string): SearchTestData[] {
    try {
      const searchData = this.readSearchTestData();
      return searchData.filter(data => data.testCase === testCase);
    } catch (error) {
      console.error('Error fetching search test data by test case:', error);
      throw error;
    }
  }

  getTestDataByTestCase(testCase: string): LoginTestData | SearchTestData | null {
    try {
      const loginData = this.getLoginDataByTestCase(testCase);
      if (loginData.length > 0) return loginData[0];

      const searchData = this.getSearchDataByTestCase(testCase);
      if (searchData.length > 0) return searchData[0];

      return null;
    } catch (error) {
      console.error('Error fetching test data by test case:', error);
      throw error;
    }
  }

  getAllTestData() {
    return {
      loginTestData: this.readLoginTestData(),
      searchTestData: this.readSearchTestData()
    };
  }

  getTestDataWithRowInfo() {
    const loginData = this.readLoginTestData();
    const searchData = this.readSearchTestData();
    
    console.log('=== Login Test Data ===');
    loginData.forEach(data => {
      console.log(`Row ${data.rowIndex}: ${data.testCase} - ${data.username}`);
    });
    
    console.log('=== Search Test Data ===');
    searchData.forEach(data => {
      console.log(`Row ${data.rowIndex}: ${data.testCase} - ${data.employeeName}`);
    });
    
    return { loginData, searchData };
  }
}

export function createLoginTestDataFixture(excelFilePath: string) {
  return async () => {
    try {
      const reader = new ExcelReader(excelFilePath);
      return reader.readLoginTestData();
    } catch (error) {
      console.error('Failed to load login test data from Excel:', error);
      return [];
    }
  };
}

export function createSearchTestDataFixture(excelFilePath: string) {
  return async () => {
    try {
      const reader = new ExcelReader(excelFilePath);
      return reader.readSearchTestData();
    } catch (error) {
      console.error('Failed to load search test data from Excel:', error);
      return [];
    }
  };
} 