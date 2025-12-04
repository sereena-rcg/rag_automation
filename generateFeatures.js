const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to Excel file
const excelFile = 'jira_input.xlsx'; // Place your Excel file in project root
const outputDir = path.join(__dirname, 'tests', 'features');

// Create output folder if not exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read Excel
const workbook = XLSX.readFile(excelFile);
const sheetName = workbook.SheetNames[0];
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Show Excel data content in table format (for demo)
console.log("\n=== Previewing Excel Input ===");
data.forEach((row, index) => {
    console.log(`\nRow ${index + 1}:`);
    console.log(`  Gap:              ${row['Gap']}`);
    console.log(`  TestCaseID:       ${row['TestCaseID']}`);
    console.log(`  Test Case:        ${row['Test Case']}`);
    console.log(`  Action:           ${row['Action']}`);
    console.log(`  Data:             ${row['Data']}`);
    console.log(`  Expected Result:  ${row['Expected Result']}`);
});
console.log("\n==============================\n");


// Generate Gherkin files
data.forEach(row => {
    const jira = row['Gap'] || '';
    const testId = row['TestCaseID'] || '';
    const testCase = row['Test Case'] || '';
    const action = row['Action'] || '';
    const inputData = row['Data'] || '';
    const expected = row['Expected Result'] || '';

    const gherkin = `@jira:${jira}
Feature: Travel and Tourism Automation

  Scenario: ${testId} - ${testCase}
    Given ${action}
    When ${inputData}
    Then ${expected}
`;

    const filePath = path.join(outputDir, `${testId}.feature`);
    fs.writeFileSync(filePath, gherkin, 'utf8');
});

console.log(`✅ Generated ${data.length} .feature files in ${outputDir}`);
