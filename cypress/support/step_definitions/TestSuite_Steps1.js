/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { Assertion } from 'chai';

When('user adds new testsuite', () => {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get('div[class*="_wrapperMain"] button:nth-child(2)').click({
    force: true
  });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoSuite', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  cy.contains('Success', { timeout: 60000 });
  //cy.get('*[class="fi-check text-sm"]').click({ force: true });

  //Adding test case
  cy.get('div[class*="justify-right p-3"] button:nth-child(1)', {
    timeout: 60000
  }).click({ force: true });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoTestCase', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('textarea[name="expectedResults"]').type('Pass', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  cy.contains('Test Case Added successfully', { timeout: 60000 });
  cy.wait(3000);
  //Adding test step
  cy.contains('Add Test Step').click({ force: true });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoTestCase', {
    force: true
  });
  cy.get('input[placeholder="Select Doppel Model"]').type('DATAPOINTS', {
    force: true
  });
  cy.wait(3000);
  cy.selectFirstOptionFromDropDown();
  //Add Payload format
  cy.get(
    '#modal-root > div div > form > div:nth-child(1) > ' +
      'div:nth-child(2) > div > div:nth-child(1) > ' +
      'div.col-sm-6 > div > div > div:nth-child(1) > input'
  ).type('All_DP_JSON', { force: true });
  cy.selectFirstOptionFromDropDown();
  //Add Connection
  cy.get(
    '#modal-root > div div > div > form > div:nth-child(1) > ' +
      'div:nth-child(2) > div > div:nth-child(1) > div.col-md-6 > ' +
      'div  div:nth-child(1) > input'
  ).type('demoMQTTConn', { force: true });
  cy.selectFirstOptionFromDropDown();
  //Add Publish interval
  cy.get('input[value="5"]').clear({ force: true }).type('10', { force: true });
  cy.get('input[max="50"]').clear({ force: true }).type('3', { force: true });
  cy.get(' input[id="radioA"]').click({ force: true });
  cy.get('button[type="submit"]').click({ force: true });
  //cy.get('*[class="fi-check text-sm"]').click({ force: true });
});
When('user delete testSuite', () => {
  cy.wait(5000);
  //Delete Test Step
  cy.get('div[class*="dropDownWrapper"] > button')
    .invoke('show')
    .click({ force: true });
  cy.contains('Delete Test Step').click({ force: true });
  cy.contains('Are you sure you want to delete Test Step:', { timeout: 2000 });
  cy.get('i[class="fi-trash"]').click({ force: true });
  cy.contains('Test Step Deleted successfully', { timeout: 30000 });

  // cy.contains('OK', { timeout: 15000 }).click({ force: true });

  //Delete Test Case
  cy.get('div[class*="dropDownWrapper"] > button')
    .invoke('show')
    .click({ force: true });
  cy.contains('Delete Test Case').click({ force: true });
  cy.contains('Are you sure you want to delete Test Case:', { timeout: 2000 });
  cy.get('i[class="fi-trash"]').click({ force: true });
  cy.contains('Test Case Deleted successfully', { timeout: 30000 });
  // cy.contains('OK', { timeout: 15000 }).click({ force: true });

  //Delete Test Case
  cy.get('div[class*="dropDownWrapper"] > button')
    .invoke('show')
    .click({ force: true });
  cy.contains('Delete Test Suite').click({ force: true });
  cy.contains('Are you sure you want to delete Test Suite:', { timeout: 2000 });
  cy.get('i[class="fi-trash"]').click({ force: true });
  cy.contains('Test Suite Deleted successfully', { timeout: 30000 });
  // cy.contains('OK', { timeout: 15000 }).click({ force: true });
});

When('user adds new teststep', () => {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get('div[class*="_wrapperMain"] button:nth-child(2)').click({
    force: true
  });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoSuite', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('button[type="submit"]').click({ force: true });

  //Adding test case
  cy.get('div[class*="justify-right p-3"] button:nth-child(1)', {
    timeout: 60000
  }).click({ force: true });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoTestCase', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('textarea[name="expectedResults"]').type('Pass', { force: true });
  cy.get('button[type="submit"]').click({ force: true });

  //search for test case
  cy.searchTestCase('DemoSuite', 'DemoTestCase');
  //Adding regular test step
  cy.addTestCase(
    'Step1',
    'Command',
    'BeforeStop_response',
    'MQTTConnection',
    '0',
    '1',
    1
  );

  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditTestCaseR(2);
  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditTestCaseR(3);
  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditTestCaseR(4);
  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
});
When('user adds new wait teststep', () => {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get('div[class*="_wrapperMain"] button:nth-child(2)').click({
    force: true
  });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoSuite', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('button[type="submit"]').click({ force: true });

  //Adding test case
  cy.get('div[class*="justify-right p-3"] button:nth-child(1)', {
    timeout: 60000
  }).click({ force: true });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoTestCase', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('textarea[name="expectedResults"]').type('Pass', { force: true });
  cy.get('button[type="submit"]').click({ force: true });

  //Adding regular test step
  cy.addTestCase(
    'Step1',
    'Command',
    'BeforeStop_response',
    'MQTTConnection',
    '0',
    '1',
    1
  );

  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditWaitTestCaseR(1);
  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditWaitTestCaseR(2);
  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditWaitTestCaseR(3);
});
When('user adds new sleep teststep', () => {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get('div[class*="_wrapperMain"] button:nth-child(2)').click({
    force: true
  });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoSuite', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  //cy.contains('Success', { timeout: 60000 });
  //cy.get('*[class="fi-check text-sm"]').click({ force: true });

  //Adding test case
  cy.get('div[class*="justify-right p-3"] button:nth-child(1)', {
    timeout: 60000
  }).click({ force: true });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoTestCase', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('textarea[name="expectedResults"]').type('Pass', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  //cy.contains('Success', { timeout: 60000 });
  //cy.get('*[class="fi-check text-sm"]').click({ force: true });

  //Adding regular test step
  cy.addTestCase(
    'Step1',
    'Command',
    'BeforeStop_response',
    'MQTTConnection',
    '0',
    '1',
    1
  );
  //Editing Test Step
  // cy.get('i[class*="fi-arrow-down _arrowIsClosed_"]').each($el => {
  //     // Click each element if it exists
  //     cy.wrap($el).click({ force: true });
  //   });
  //   cy.contains('Step1').click({ force: true });

  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditSleepTestCaseR(1);
  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditSleepTestCaseR(2);
});
When('user adds new snf teststep', () => {
  cy.get('[name="TestData"]').click({ force: true });
  cy.wait(2000);
  cy.get(':nth-child(1) > .title').click({ force: true });
  cy.wait(2000);
  const segmentFile = 'cypress\\support\\segLoad.csv';
  const segments = [
    { name: 'demoSeg1' },
    { name: 'demoSeg2' },
    { name: 'demoSeg3' },
    { name: 'demoSeg4' }
  ];
  cy.configureSegments(segmentFile, segments);
  cy.wait(3000);

  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get('div[class*="_wrapperMain"] button:nth-child(2)').click({
    force: true
  });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoSuite', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  //cy.contains('Success', { timeout: 60000 });
  //cy.get('*[class="fi-check text-sm"]').click({ force: true });

  //Adding test case
  cy.get('div[class*="justify-right p-3"] button:nth-child(1)', {
    timeout: 60000
  }).click({ force: true });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoTestCase', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('textarea[name="expectedResults"]').type('Pass', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  //cy.contains('Success', { timeout: 60000 });
  //cy.get('*[class="fi-check text-sm"]').click({ force: true });

  //Adding regular test step
  cy.addTestCase(
    'Step1',
    'Command',
    'BeforeStop_response',
    'MQTTConnection',
    '0',
    '1',
    1
  );
  //Editing Test Step
  // cy.get('i[class*="fi-arrow-down _arrowIsClosed_"]').each($el => {
  //     // Click each element if it exists
  //     cy.wrap($el).click({ force: true });
  //   });
  //   cy.contains('Step1').click({ force: true });

  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditSNFTestCaseR('Commands', 'MQTTConnection', 1);
  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditSNFTestCaseR('Commands', 'MQTTConnection', 2);
  // cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  // cy.EditSNFTestCaseR('Commands','MQTTConnection',3);
  cy.contains('Edit Test Step', { timeout: 60000 }).click({ force: true });
  cy.EditSNFTestCaseR('Commands', 'MQTTConnection', 4);
});
When('user disable test Suite', () => {
  //search for test suite
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.wait(5000);
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  // cy.get('.btn',{timeout:6000}).click({force:true});
  //three dots
  cy.get("div[class*='dropDownWrapper'] > button")
    .invoke('show')
    .click({ force: true });
  cy.contains('Lock TestSuite').click({ force: true });
  cy.get('textarea[name="remarks"]', { timeout: 6000 }).type('Locking', {
    force: true
  });
  cy.get('#edit-button > :nth-child(2)').click({ force: true });
  // cy.get('#button > :nth-child(2)',{timeout:6000}).click({ force: true });
  //checking disable or not
  cy.get(
    'div[class*="_pgItmHeader_"] div[class*="dropDownWrapper"] div[class*="_dropDownItem"] div'
  ).each(($el) => {
    // Check if the element contains the text 'Rename' or 'Edit'
    cy.wrap($el)
      .invoke('text')
      .then((text) => {
        if (text.includes('Rename') || text.includes('Delete')) {
          // If it contains 'Rename' or 'Edit', check if the class contains 'Disable'
          cy.wrap($el).invoke('attr', 'class').should('include', 'Disable'); // Assert that 'Disable' is part of the class
        } else {
          // If it doesn't contain 'Rename' or 'Edit', we can check other conditions or log it
          cy.wrap($el).invoke('attr', 'class').should('not.include', 'Disable'); // Optionally check that it doesn't have 'Disable'
        }
      });
  });
});
Then('user not able to edit anything', function () {
  //check disable in test case and test suite
  cy.wait(3000);
  cy.clickOnView();
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
    force: true
  });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(3000);
  cy.clickOnView();
  cy.get(
    'div[class*="_pgItmHeader_"] div[class*="dropDownWrapper"] div[class*="_dropDownItem"] div'
  ).each(($el) => {
    // Check if the element contains the text 'Rename' or 'Edit'
    cy.wrap($el)
      .invoke('text')
      .then((text) => {
        if (text.includes('Copy') || text.includes('Download')) {
          // If it contains 'Rename' or 'Edit', check if the class contains 'Disable'
          cy.wrap($el).invoke('attr', 'class').should('not.include', 'Disable'); // Assert that 'Disable' is part of the class
        } else {
          // If it doesn't contain 'Rename' or 'Edit', we can check other conditions or log it
          cy.wrap($el).invoke('attr', 'class').should('include', 'Disable'); // Optionally check that it doesn't have 'Disable'
        }
      });
  });
  //checking test step for disable
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
    force: true
  });
  cy.get('input[name="testStepName"]').type('verify-s1', { force: true });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(10000);
  cy.clickOnView();
  cy.get(
    'div[class*="_pgItmHeader_"] div[class*="dropDownWrapper"] div[class*="_dropDownItem"] div'
  ).each(($el) => {
    // Check if the element contains the text 'Rename' or 'Edit'
    cy.wrap($el)
      .invoke('text')
      .then((text) => {
        if (text.includes('Copy') || text.includes('Download')) {
          // If it contains 'Rename' or 'Edit', check if the class contains 'Disable'
          cy.wrap($el).invoke('attr', 'class').should('not.include', 'Disable'); // Assert that 'Disable' is part of the class
        } else {
          // If it doesn't contain 'Rename' or 'Edit', we can check other conditions or log it
          cy.wrap($el).invoke('attr', 'class').should('include', 'Disable'); // Optionally check that it doesn't have 'Disable'
        }
      });
  });
});
When('user enable test Suite', () => {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  //search for test suite
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(10000);
  cy.clickOnView();
  //three dots
  cy.get("div[class*='dropDownWrapper'] > button")
    .invoke('show')
    .click({ force: true });
  cy.contains('Unlock TestSuite').click({ force: true });
  cy.get('button[type="submit"]', { timeout: 6000 }).click({ force: true });
  // cy.get('#button > :nth-child(2)',{timeout:6000}).click({ force: true });
  //checking disable or not
  cy.get(
    'div[class*="_pgItmHeader_"] div[class*="dropDownWrapper"] div[class*="_dropDownItem"] div'
  ).each(($el) => {
    // Check if the element contains the text 'Rename' or 'Edit'
    cy.wrap($el)
      .invoke('text')
      .then((text) => {
        // If it contains 'Rename' or 'Edit', check if the class contains 'Disable'
        cy.wrap($el).invoke('attr', 'class').should('not.include', 'Disable'); // Assert that 'Disable' is part of the class
      });
  });
});

Then('user able to edit anything', function () {
  //check disable in test case and test suite
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
    force: true
  });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(10000);
  cy.clickOnView();
  cy.get(
    'div[class*="_pgItmHeader_"] div[class*="dropDownWrapper"] div[class*="_dropDownItem"] div'
  ).each(($el) => {
    // Check if the element contains the text 'Rename' or 'Edit'
    cy.wrap($el)
      .invoke('text')
      .then((text) => {
        // If it contains 'Rename' or 'Edit', check if the class contains 'Disable'
        cy.wrap($el).invoke('attr', 'class').should('not.include', 'Disable'); // Assert that 'Disable' is part of the class
      });
  });
  //checking test step for disable
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
    force: true
  });
  cy.get('input[name="testStepName"]').type('verify-s1', { force: true });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(10000);
  cy.clickOnView();
  cy.get(
    'div[class*="_pgItmHeader_"] div[class*="dropDownWrapper"] div[class*="_dropDownItem"] div'
  ).each(($el) => {
    // Check if the element contains the text 'Rename' or 'Edit'
    cy.wrap($el)
      .invoke('text')
      .then((text) => {
        // If it contains 'Rename' or 'Edit', check if the class contains 'Disable'
        cy.wrap($el).invoke('attr', 'class').should('not.include', 'Disable'); // Assert that 'Disable' is part of the class
      });
  });
});
When('user override data point in test step', function () {
  //clicking on test suite
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  //searching for verify-s1 test step
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
    force: true
  });
  cy.get('input[name="testStepName"]').type('verify-s1', { force: true });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(10000);
  cy.clickOnView();
  //selecting data points
  cy.get('.doppelDropDown div[class*="_dropDownWrapper"]')
    .invoke('show')
    .click({ force: true });
  cy.get('div[class*="_dropDownItemLeft"] div:nth-child(1)').click({
    force: true
  });
  //seach for 'Duration' data points
  cy.get('i[class="fi-search collapsingFormIcon"]').click({ force: true });
  cy.get('input[placeholder="Search by Name"]')
    .clear({ force: true })
    .type('Duration', { force: true });
  // edit data points
  cy.get('tbody[role="rowgroup"] tr:nth-child(1)').trigger('mouseover', {
    force: true
  });
  cy.get('button[title="Edit Data Point"]').click({ force: true });
  //cy.get('i[class="fi-trash"]', { timeout: 10000 }).click({ force: true });
  cy.wait(5000);
  cy.get('input[name="value"]')
    .clear({ force: true })
    .type('10', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  //  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(5000);
  cy.get('input[placeholder="Search by Name"]').type('Duration', {
    force: true
  });
  cy.get('label[class*="_toggleSwitch_"]').click({ force: true });
  cy.contains('(O)').should('exist');
  cy.wait(5000);
  //reset to default
  cy.get('input[placeholder="Search by Name"]')
    .clear({ force: true })
    .type('Duration', { force: true });
  cy.get('tbody[role="rowgroup"] tr:nth-child(1)').trigger('mouseover', {
    force: true
  });
  cy.get('button[title="Edit Data Point"]').click({ force: true });
  cy.get(
    'button[title="reset the data to the default value set in the Doppel Model"]'
  ).click({ force: true });
  cy.get('button[type="submit"]').click({ force: true });
  //  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(5000);
  //Reinitialize
  cy.get('input[placeholder="Search by Name"]')
    .clear({ force: true })
    .type('Duration', { force: true });
  cy.get('tbody[role="rowgroup"] tr:nth-child(1)').trigger('mouseover', {
    force: true
  });
  cy.get('button[title="Edit Data Point"]').click({ force: true });
  cy.get('div[class*="_inputWrapper"] input[placeholder="None"]').type(
    'Doppel Function',
    { force: true }
  );
  cy.get('div[class*="_optionList"] div:nth-child(1)').click({
    force: true
  });
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
    }
  });
  //reinialize check box
  cy.get(
    'div[class="form-group col-md-2 pb-1  pr-0  mt-5"] label[class*="_toggleSwitch_"]'
  ).click({ force: true });
  cy.get('input[name="value"]')
    .clear({ force: true })
    .type('10', { force: true });
  //get back to none df
  cy.get(
    'div[class*="_inputWrapper"] input[placeholder="Doppel Function"]'
  ).type('None', { force: true });
  cy.get('div[class*="_optionList"] div:nth-child(1)').click({
    force: true
  });
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
    }
  });
  cy.get('button[type="submit"]').click({ force: true });
  //  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(3000);
});
When('user able to create fault conditions in test step', function () {
  //clicking on test suite
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  //searching for verify-s1 test step
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
    force: true
  });
  cy.get('input[name="testStepName"]').type('verify-s1', { force: true });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(10000);
  cy.clickOnView();
  //selecting fault conditions
  cy.get('.doppelDropDown div[class*="_dropDownWrapper"]')
    .invoke('show')
    .click({ force: true });
  cy.get('div[class*="_dropDownItemLeft"] div:nth-child(7)').click({
    force: true
  });
  //click on Add Fault Condition
  cy.wait(2000);
  cy.get('div[title="Add Fault Condition"]').click({ force: true });
  cy.get('input[placeholder="Enter Constant Value or Select DP/ATTR"]').type(
    'AutoCount (DP)',
    { force: true }
  );
  cy.get('div[class*="_optionList"] div:nth-child(1)').click({
    force: true
  });
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
    }
  });
  cy.get('button[title="Verify details before saving"]').click({ force: true });
  cy.wait(2000);
  cy.contains('Verified').should('exist');
  cy.get('button[id="edit-button"]').click({ force: true });
  cy.wait(8000);

  const Fault_Condition = [
    { name: 'LinearDecrease' },
    { name: 'LinearIncrease' },
    { name: 'RandomValue' },
    { name: 'NoData' }
  ];

  //edit fault condition
  let fault = 'ConstantData ';
  Fault_Condition.forEach((condition) => {
    cy.log(`Testing ${condition.name}`);
    cy.get('tbody[class*="_tBody_"] tr:nth-child(1)').trigger('mouseover', {
      force: true
    });
    cy.get('button[title="Edit Fault"]').click({ force: true });
    cy.wait(2000);
    cy.get(`div[class*="_inputWrapper"] input[placeholder*="${fault}"]`).type(
      condition.name,
      { force: true }
    );
    fault = condition.name;
    cy.get('div[class*="_optionList"] div:nth-child(1)').click({
      force: true
    });
    cy.get('body').then(($body) => {
      if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
        cy.get('div[class*="_optionList"] div:nth-child(1)').click({
          force: true
        });
      }
    });
    if (fault !== 'NoData') {
      cy.get('form[name="faultForm"] div:nth-child(4) input:nth-child(1)').type(
        'AutoCount (DP)',
        { force: true }
      );
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
      cy.get('body').then(($body) => {
        if (
          $body.find('div[class*="_optionList"] div:nth-child(1)').length > 0
        ) {
          cy.get('div[class*="_optionList"] div:nth-child(1)').click({
            force: true
          });
        }
      });
      cy.get('form[name="faultForm"] div:nth-child(5) input:nth-child(1)').type(
        'Duration (DP)',
        { force: true }
      );
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
      cy.get('body').then(($body) => {
        if (
          $body.find('div[class*="_optionList"] div:nth-child(1)').length > 0
        ) {
          cy.get('div[class*="_optionList"] div:nth-child(1)').click({
            force: true
          });
        }
      });
    }

    cy.get('button[title="Verify details before saving"]').click({
      force: true
    });
    cy.wait(2000);
    cy.contains('Verified').should('exist');
    cy.get('button[id="edit-button"]').click({ force: true });
    cy.wait(2000);
  });

  cy.get('tbody[class*="_tBody_"] tr:nth-child(1)').trigger('mouseover', {
    force: true
  });
  cy.get('button[title="Delete Fault"]').click({ force: true });
  cy.wait(2000);
  cy.get('#save-button > :nth-child(2)').click({ force: true });
  cy.wait(2000);
});
When('user disable one test step from right tree', function () {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
    force: true
  });
  cy.get('input[name="testStepName"]').type('verify-s1', { force: true });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(10000);
  cy.clickOnView();
  //three dots
  cy.get("div[class*='dropDownWrapper'] > button")
    .invoke('show')
    .click({ force: true });
  cy.contains('Disable Test Step').click({ force: true });
  cy.get('button[title="Confirm"]', { timeout: 6000 }).click({ force: true });
  cy.wait(2000);
});
When('user disable one test step from left tree', function () {
  cy.get(`div[title="verify-s1"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="verify-s1"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true });
  cy.contains('Disable Test Step').click({ force: true });
  cy.get('button[title="Confirm"]', { timeout: 6000 }).click({ force: true });
  cy.wait(2000);
});
Then('user see test step is disabled and enabled from right tree', function () {
  cy.contains('Disabled');
  cy.get("div[class*='dropDownWrapper'] > button")
    .invoke('show')
    .click({ force: true });
  cy.contains('Enable Test Step').click({ force: true });
  cy.get('button[title="Confirm"]', { timeout: 6000 }).click({ force: true });
});
Then('user see test step is disabled and enabled from left tree', function () {
  cy.get(`div[title="verify-s1"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="verify-s1"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true });
  cy.contains('Enable Test Step').click({ force: true });
  cy.get('button[title="Confirm"]', { timeout: 6000 }).click({ force: true });
  cy.wait(2000);
});
When('user edit,copy,rename,download test suite from left tree', function () {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
    force: true
  });
  cy.get('input[name="testStepName"]').type('verify-s1', { force: true });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(10000);
  cy.clickOnView();
  //three dots
  cy.get(`div[title="DemoSuite"] div[class*="_treeNode"]`)
    .first()
    .find(`span[class*="_actions"]`)
    .first()
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true })
    .wait(500);
  cy.contains('Edit Test Suite').click({ force: true });
  cy.get('textarea[name="description"]', { timeout: 6000 })
    .clear({ force: true })
    .type('test edited', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  // cy.get('button[id="button"]',{timeout:6000}).click({force:true});
  cy.wait(2000);
  //copy test suite -Copy Test Suite
  cy.get(`div[title="DemoSuite"] div[class*="_treeNode"]`)
    .first()
    .find(`span[class*="_actions"]`)
    .first()
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true })
    .wait(500);
  cy.contains('Copy Test Suite').click({ force: true });
  cy.get('input[placeholder="Name of the Test Suite"]', { timeout: 6000 })
    .clear({ force: true })
    .type('DemoSuiteCopy', { force: true });
  cy.get('form[name="CopyForm"] input[type="checkbox"]').click({ force: true });
  cy.get('button[type="submit"]').click({ force: true });
  // cy.get('button[id="button"]',{timeout:6000}).click({force:true});
  cy.wait(2000);

  cy.log('//delete copied demo suite from left tree - Delete Test Suite');

  cy.get(`div[title="DemoSuiteCopy"] div[class*="_treeNode"]`)
    .first()
    .find(`span[class*="_actions"]`)
    .first()
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true })
    .wait(500);
  cy.contains('Delete Test Suite').click({ force: true });
  cy.contains('Yes').click({ force: true });
  // cy.get('button[title="Confirm"]',{timeout:6000}).click({force:true});
  cy.wait(2000);

  //rename demo test suite from
});
When('user edit,copy,rename,download test suite from right tree', function () {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
  cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
  cy.wait(10000);
  cy.clickOnView();
  //three dots
  cy.contains('Edit Test Suite').click({ force: true });
  cy.get('textarea[name="description"]', { timeout: 6000 })
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  // cy.get('button[id="button"]',{timeout:6000}).click({force:true});
  cy.wait(2000);
  cy.log('//copy test suite -Copy Test Suite');
  //three dots
  cy.get("div[class*='dropDownWrapper'] > button")
    .invoke('show')
    .click({ force: true });
  cy.contains('Copy Test Suite').click({ force: true });
  cy.get('input[placeholder="Name of the Test Suite"]', { timeout: 6000 })
    .clear({ force: true })
    .type('DemoSuiteCopy', { force: true });
  cy.get('form[name="CopyForm"] input[type="checkbox"]').click({ force: true });
  cy.get('button[type="submit"]').click({ force: true });
  // cy.get('button[id="button"]',{timeout:6000}).click({force:true});
  cy.wait(2000);

  cy.log('delete copied demo suite from left tree - Delete Test Suite');

  cy.get(`div[title="DemoSuiteCopy"] div[class*="_treeNode"]`)
    .first()
    .find(`span[class*="_actions"]`)
    .first()
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true })
    .wait(500);
  cy.contains('Delete Test Suite').click({ force: true });
  cy.contains('Yes').click({ force: true });
  // cy.get('button[title="Confirm"]',{timeout:6000}).click({force:true});
  cy.wait(2000);
});

When(
  'user edit,copy,move,download,delete test case from left tree',
  function () {
    cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
    cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
    cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
    cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
      force: true
    });
    cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
    cy.wait(10000);
    cy.clickOnView();
    //three dots
    cy.get(`div[title="Auto_test2-DPoveride"] div[class*="_treeNode"]`)
      .first()
      .find(`span[class*="_actions"]`)
      .first()
      .click({ force: true })
      .invoke('show')
      .trigger('mouseover', { force: true })
      .wait(500);
    cy.contains('Edit Test Case').click({ force: true });
    cy.get('textarea[name="description"]', { timeout: 6000 })
      .clear({ force: true })
      .type('case edited', { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    // cy.get('button[id="button"]',{timeout:6000}).click({force:true});
    cy.wait(2000);

    cy.log('//move demo case from left tree - Move Test Case');

    cy.get(`div[title="Auto_test2-DPoveride"] div[class*="_treeNode"]`)
      .first()
      .find(`span[class*="_actions"]`)
      .first()
      .click({ force: true })
      .invoke('show')
      .trigger('mouseover', { force: true })
      .wait(500);
    cy.contains('Move Test Case').click({ force: true });
    cy.get('input[placeholder="Select Test Suite"]', { timeout: 6000 })
      .clear({ force: true })
      .type('S_and_F_suite', { force: true });
    cy.get('input[placeholder="Select Test Suite"]', { timeout: 6000 })
      .clear({ force: true })
      .type('S_and_F_suite', { force: true });
    cy.wait(2000);
    cy.get('div[class*="_optionList"] div:nth-child(1)').click({ force: true });
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
        cy.get('div[class*="_optionList"] div:nth-child(1)').click({
          force: true
        });
      }
    });
    cy.get('button[type="submit"]').click({ force: true });
    // cy.get('button[id="button"]',{timeout:6000}).click({force:true});
    cy.wait(2000);
    cy.log('//move demo case from right tree - Move Test Case');
    cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
    cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
    cy.get('input[name="testSuiteName"]').type('S_and_F_suite', {
      force: true
    });
    cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
      force: true
    });
    cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
    cy.wait(10000);
    cy.clickOnView();
    cy.wait(2000);
    cy.get("div[class*='dropDownWrapper'] > button")
      .invoke('show')
      .click({ force: true });
    cy.contains('Move Test Case').click({ force: true });
    cy.wait(2000);
    cy.get('input[placeholder="Select Test Suite"]', { timeout: 6000 })
      .clear({ force: true })
      .type('DemoSuite', { force: true });
    cy.get('div[class*="_optionList"] div:nth-child(1)').click({ force: true });
    cy.wait(1000);
    cy.get('body').then(($body) => {
      if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
        cy.get('div[class*="_optionList"] div:nth-child(1)').click({
          force: true
        });
      }
    });

    cy.get('button[type="submit"]').click({ force: true });
    // cy.get('button[id="button"]',{timeout:6000}).click({force:true});
    cy.wait(2000);

    //  cy.log('//copy test case -Copy Test case - left tree')
    cy.get(`div[title="Auto_test2-DPoveride"] div[class*="_treeNode"]`)
      .first()
      .find(`span[class*="_actions"]`)
      .first()
      .click({ force: true })
      .invoke('show')
      .trigger('mouseover', { force: true })
      .wait(500);
    cy.contains('Copy Test Case').click({ force: true });
    cy.get('input[placeholder="Name of the destination Test case"]', {
      timeout: 6000
    })
      .clear({ force: true })
      .type('Auto_test2-DPoverideCopy', { force: true });
    cy.get('form[name="CopyForm"] input[type="checkbox"]').click({
      force: true
    });
    cy.get('button[type="submit"]').click({ force: true });
    // cy.get('button[id="button"]',{timeout:6000}).click({force:true});
    cy.wait(2000);

    cy.log('// Delete test case from left tree');

    cy.get(`div[title="Auto_test2-DPoverideCopy"] div[class*="_treeNode"]`)
      .first()
      .find(`span[class*="_actions"]`)
      .first()
      .click({ force: true })
      .invoke('show')
      .trigger('mouseover', { force: true })
      .wait(500);
    cy.contains('Delete Test Case').click({ force: true });
    cy.wait(2000);
    cy.contains('Yes').click({ force: true });
    cy.wait(2000);

    cy.log('//copy test case -Copy Test case - right tree');

    cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
    cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
    cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
    cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
      force: true
    });
    cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
    cy.wait(10000);
    cy.clickOnView();
    //three dots
    cy.get("div[class*='dropDownWrapper'] > button")
      .invoke('show')
      .click({ force: true });
    cy.contains('Copy Test Case').click({ force: true });
    cy.get('input[placeholder="Name of the destination Test case"]', {
      timeout: 6000
    })
      .clear({ force: true })
      .type('Auto_test2-DPoverideCopy', { force: true });
    cy.get('form[name="CopyForm"] input[type="checkbox"]').click({
      force: true
    });
    cy.get('button[type="submit"]').click({ force: true });
    // cy.get('button[id="button"]',{timeout:6000}).click({force:true});
    cy.wait(2000);
    // //Auto_test2-DPoverideCopy

    cy.log('// Delete test case from right tree');
    cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
    cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
    cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
    cy.get('input[name="testCaseName"]').type('Auto_test2-DPoverideCopy', {
      force: true
    });
    cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
    cy.wait(10000);
    cy.clickOnView();
    cy.wait(2000);
    cy.get("div[class*='dropDownWrapper'] > button")
      .invoke('show')
      .click({ force: true });
    cy.contains('Delete Test Case').click({ force: true });
    cy.wait(2000);
    cy.get('#save-button > :nth-child(2)').click({ force: true });
    cy.wait(2000);

    cy.log('download from left tree');

    cy.get(`div[title="Auto_test2-DPoveride"] div[class*="_treeNode"]`)
      .first()
      .find(`span[class*="_actions"]`)
      .first()
      .click({ force: true })
      .invoke('show')
      .trigger('mouseover', { force: true })
      .wait(500);
    cy.contains('Download Test Case').click({ force: true });
    cy.wait(2000);
    cy.get('#edit-button > :nth-child(2)').click({ force: true });
    cy.wait(2000);

    cy.log('download from right tree');
    cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
    cy.get("i[class='fi-search']", { timeout: 6000 }).click({ force: true });
    cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
    cy.get('input[name="testCaseName"]').type('Auto_test2-DPoveride', {
      force: true
    });
    cy.get('button[id="button"]', { timeout: 6000 }).click({ force: true });
    cy.wait(10000);
    cy.clickOnView();
    cy.wait(2000);
    cy.get("div[class*='dropDownWrapper'] > button")
      .invoke('show')
      .click({ force: true });
    cy.contains('Download Test Case').click({ force: true });
    cy.wait(2000);
    cy.get('#edit-button > :nth-child(2)').click({ force: true });
    cy.wait(2000);

    cy.log('Rename from right tree');
    cy.get("div[class*='dropDownWrapper'] > button")
      .invoke('show')
      .click({ force: true });

    cy.contains('Rename Test Case').click({ force: true });
    cy.get('#dest')
      .clear({ force: true })
      .type('Auto_test2-DPoverideRename', { force: true });
    cy.wait(2000);
    cy.get('#edit-button > :nth-child(2)').click({ force: true });
    cy.wait(2000);
    cy.wait(2000);
    cy.get("div[class*='dropDownWrapper'] > button")
      .invoke('show')
      .click({ force: true });

    cy.contains('Rename Test Case').click({ force: true });
    cy.get('#dest')
      .clear({ force: true })
      .type('Auto_test2-DPoveride', { force: true });
    cy.wait(2000);
    cy.get('#edit-button > :nth-child(2)').click({ force: true });
    cy.wait(2000);
  }
);

//-----------------------------------------------------------

When('user adds new non_time_series_teststep', () => {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get('div[class*="_wrapperMain"] button:nth-child(2)').click({
    force: true
  });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoSuite', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  //cy.contains('Success', { timeout: 60000 });
  //cy.get('*[class="fi-check text-sm"]').click({ force: true });

  //Adding test case
  cy.get('div[class*="justify-right p-3"] button:nth-child(1)', {
    timeout: 60000
  }).click({ force: true });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoTestCase', {
    force: true
  });
  cy.get('textarea[name="description"]')
    .clear({ force: true })
    .type('test', { force: true });
  cy.get('textarea[name="expectedResults"]').type('Pass', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  //cy.contains('Success', { timeout: 60000 });
  //cy.get('*[class="fi-check text-sm"]').click({ force: true });

  cy.wait(7000);
  //Adding test step
  cy.get('div[class*="justify-right p-3"] button:nth-child(2)', {
    timeout: 60000
  }).click({ force: true });
  cy.wait(7000);

  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoTestStep', {
    force: true
  });
  cy.get('input[placeholder="Select Doppel Model"]').type('DATAPOINTS', {
    force: true
  });
  cy.wait(7000);
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
    }
  });
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
    }
  }); //Add Payload format
  cy.get(
    '#modal-root > div div > form > div:nth-child(1) > ' +
      'div:nth-child(2) > div > div:nth-child(1) > ' +
      'div.col-sm-6 > div > div > div:nth-child(1) > input'
  ).type('All_DP_JSON', { force: true });

  cy.wait(7000);
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
    }
  });
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
    }
  }); //Add Connection
  cy.get(
    '#modal-root > div div > div > form > div:nth-child(1) > ' +
      'div:nth-child(2) > div > div:nth-child(1) > div.col-md-6 > ' +
      'div  div:nth-child(1) > input'
  ).type('demoMQTTConn', { force: true });
  cy.wait(7000);
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
    }
  });
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true
      });
    }
  });
  //Add Publish interval
  cy.get('input[value="5"]').clear({ force: true }).type('10', { force: true });
  cy.get('input[max="50"]').clear({ force: true }).type('3', { force: true });
  cy.get(' input[id="radioA"]').click({ force: true });
  const csv = 'cypress\\support\\SportsSet.csv';
  cy.EditnonTimeSeries(csv);
});
