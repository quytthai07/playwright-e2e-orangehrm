# Playwright E2E Testing Framework

A straightforward E2E test automation framework utilizing a modern testing tool with Playwright. 

### Framework Structure
```
playwright-e2e-orangehrm/
├──  pages/                    
│   ├── loginPage.ts            # Login page element and action
│   ├── dashboardPage.ts        # Dashboard page element and action
│   └── pimPage.ts              # PIM page  element and action
├──  tests/                   
│   ├── login.spec.ts           # Login test cases
│   └── search.spec.ts          # Search test cases
├──  utils/                   
│   └── testHelpers.ts          # Utilities and helper
│   └── excelTestData.ts        # Excel data reader
├──  testData/                
│   └── TestData.xlsx           # Test data
├── playwright.config.ts       # Playwright configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```


### What You Need
- Node.js (version 16 or newer)
- npm or yarn package manager

### Installation

1. **Download the project**
   ```bash
   git clone <repository-url>
   cd playwright-e2e-orangehrm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

### Configuration

#### Setting Up Environment Variables (Optional)
You can create a `.env` file in the project folder:
```env
PLAYWRIGHT_USERNAME=Admin
PLAYWRIGHT_PASSWORD=admin123
```

#### Default Settings in `playwright.config.ts`:
- **Username**: `Admin`
- **Password**: `admin123`
- **Website URL**: `https://opensource-demo.orangehrmlive.com/`

##  Test Execution

### Commands You Can Use

#### 1. **Run All Tests**
```bash
npm test
```

#### 2. **Run Tests with Visual Interface**
```bash
npx playwright test --ui
```

#### 3. **Run Tests with Browser Window Open**
```bash
npx playwright test --headed
```

#### 4. **Run a Specific Test File**
```bash
npx playwright test tests/search.spec.ts
or 
npx playwright test tests/login.spec.ts
```

#### 5. **Run Tests in a Specific Browser**
```bash
npx playwright test --project=Firefox
```

#### 6. Run Tests in Debug Mode
```bash
npx playwright test --debug
```

#### 7. Run Tests with Detailed Logging
```bash
npx playwright test --trace on
```

#### 8. **Create and View Test Report**
```bash
npm run report
```

##  What We Test

### 1. **Login Functionality** (`login.spec.ts`)
- Valid login
- Invalid login

### 2. **Employee Search Functionality** (`search.spec.ts`)
- Valid search
- Invalid search

### 3. Working with Excel Files ('TestData.xlsx')
- Use the `xlsx` library to read Excel files
- Each test case can use multiple rows of data for multi-cases

## Browser Support
- **Chromium**
- **Firefox**
- **WebKit** (Safari)


##  Test Reports

### HTML Report
- HML file created when tests run finished
- Stored in `playwright-report/` folder
- Contains: screenshots, videos, log

### How to View Reports
```bash
npm run report
```

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Framework Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained By**: [Khanh Huynh]
