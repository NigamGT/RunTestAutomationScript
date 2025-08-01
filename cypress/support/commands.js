// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('deleteDataStream', (streamName) => {
  cy.get('body').then(($body) => {
    if ($body.find('.dropDownWrapper > div').length > 0) {
      cy.log(`The element '.dropDownWrapper > div' is present.`);
      cy.get('.dropDownWrapper > div').invoke('show').click({ force: true });
      cy.contains('Delete Data Stream').click({ force: true });
      cy.contains('Are you sure you want to Delete', { timeout: 2000 });
      cy.contains('Yes').click({ force: true });
      cy.contains('Data Stream Deleted successfully', { timeout: 20000 });
      // cy.contains('OK').click({ force: true });
    } else {
      cy.get(`div[title="${streamName}"] div[class*="_treeNode"]`).invoke(
        'show'
      );
      cy.get(
        `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
      )
        .click({ force: true })
        .invoke('show');
      cy.get(
        `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
      ).trigger('mouseover', { force: true });
      cy.contains('Delete Data Stream').click({ force: true });
      cy.wait(3000);
      cy.contains('Yes').click({ force: true });
      //cy.contains('Data Stream Deleted successfully', { timeout: 8000 });
    }
  });
});

Cypress.Commands.add('addDataStream_M', (streamName) => {
  cy.get('i[class="fi-plus-button"]').click({ force: true });
  cy.contains('Add Stream', { timeout: 2000 });
  cy.get('input[name="name"]').type(streamName, { force: true });
  cy.get('button[type="submit"]', { timeout: 3000 }).click({ force: true });
  cy.contains('Data Stream Added successfully', { timeout: 6000 });
  // cy.get('i[class="fi-check text-sm"]').click({ force: true });
  cy.wait(2000);
});
Cypress.Commands.add('addDataStream_O', (streamName) => {
  cy.get('i[class="fi-plus-button"]').click({ force: true });
  cy.contains('Add Stream', { timeout: 2000 });
  cy.get('input[name="name"]').type(streamName, { force: true });
  cy.get('textarea[name="desc"]').type('test', { force: true });
  // cy.get('input[name="sourceOfData"]').type('Source of test', { force: true });
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
  cy.contains('Data Stream Added successfully', { timeout: 6000 });
  // cy.get('i[class="fi-check text-sm"]').click({ force: true });
  cy.wait(2000);
});
Cypress.Commands.add('addDataStream_Non_Time', (streamName, csv) => {
  cy.get('i[class="fi-plus-button"]').click({ force: true });
  cy.contains('Add Stream', { timeout: 2000 });
  cy.get('input[name="name"]').type(streamName, { force: true });
  cy.get('textarea[name="desc"]').type('test', { force: true });
  // cy.get('input[name="sourceOfData"]').type('Source of test', { force: true });
  cy.get('label[class="pointer ml-5"] input[type="radio"]').click({
    force: true
  });
  cy.get('input[placeholder="Select Column Separator"]').type('Comma', {
    force: true
  });
  cy.selectFirstOptionFromDropDown();
  cy.get('input[placeholder="CSV/zip file name"]').selectFile(csv, {
    force: true
  });
  cy.wait(3000);
  cy.contains('label', 'Key Column Name') // finds the label
    .closest('div.col-md-12') // go to the container
    .find('input') // then find the input inside
    .clear({ force: true })
    .type('Age', { force: true });
  cy.selectFirstOptionFromDropDown();
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
  cy.contains('Data Stream Added successfully', { timeout: 6000 });
  // cy.get('i[class="fi-check text-sm"]').click({ force: true });
  cy.wait(2000);
});
Cypress.Commands.add('editDataStream_Non_Time', (streamName, csv) => {
  cy.get(`div[title="${streamName}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  ).trigger('mouseover', { force: true });
  cy.contains('Edit Data Stream').click({ force: true });
  cy.get('textarea[name="desc"]')
    .clear({ force: true })
    .type(' test edited', { force: true });
  cy.get('label[class="pointer ml-5"] input[type="radio"]').click({
    force: true
  });
  cy.get('input[placeholder="Select Column Separator"]').type('Comma', {
    force: true
  });
  cy.selectFirstOptionFromDropDown();
  cy.get('input[placeholder="CSV/zip file name"]').selectFile(csv, {
    force: true
  });
  cy.wait(3000);
  cy.contains('label', 'Key Column Name') // finds the label
    .closest('div.col-md-12') // go to the container
    .find('input') // then find the input inside
    .clear({ force: true })
    .type('Age', { force: true });
  cy.selectFirstOptionFromDropDown();
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
  // cy.contains('Data Stream Added successfully', { timeout: 6000 });
});
Cypress.Commands.add('deleteDataStream_Non_Time', (streamName) => {
  cy.get(`div[title="${streamName}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  ).trigger('mouseover', { force: true });
  cy.contains('Delete Data Stream').click({ force: true });
  cy.contains('Yes', { timeout: 10000 }).click({ force: true });
  cy.contains('Data Stream Deleted successfully', { timeout: 20000 });
});
Cypress.Commands.add('editDataStream_L', (streamName) => {
  cy.get(`div[title="${streamName}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  ).trigger('mouseover', { force: true });
  cy.contains('Edit Data Stream').click({ force: true });
  cy.get('textarea[name="desc"]').type('test', { force: true });
  // cy.get('input[name="sourceOfData"]').type('Source of test', { force: true });
  cy.wait(3000);
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
  cy.wait(3000);
  // cy.get('button[id="button"]').click({ force: true });
});
Cypress.Commands.add('copyDataStream_L', (streamName) => {
  cy.get(`div[title="${streamName}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  ).trigger('mouseover', { force: true });
  cy.contains('Copy Data Stream').click({ force: true });
  cy.get('input[name="dest"]').type('copyStream', { force: true });
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
  cy.wait(6000);
  // cy.get('button[id="button"]').click({ force: true });
});
Cypress.Commands.add('deleteDataStream_L', (streamName) => {
  cy.get(`div[title="${streamName}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show');
  cy.get(
    `div[title="${streamName}"] div[class*="_treeNode"] span[class*="_actions"]`
  ).trigger('mouseover', { force: true });
  cy.contains('Delete Data Stream').click({ force: true });
  cy.contains('Yes', { timeout: 8000 }).click({ force: true });
  cy.contains('Data Stream Deleted successfully', { timeout: 20000 });
});
Cypress.Commands.add('editDataStream_R', (streamName) => {
  // cy.get('i[class="fi-edit"]').click({ force: true });
  cy.contains('Edit').click({ force: true });
  cy.get('textarea[name="desc"]').type('test', { force: true });
  // cy.get('input[name="sourceOfData"]').type('Source of test', { force: true });
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
  cy.wait(3000);
  // cy.get('button[id="button"]').click({ force: true });
});
Cypress.Commands.add('copyDataStream_R', (streamName) => {
  cy.get('.dropDownWrapper > div').invoke('show').click({ force: true });
  cy.contains('Copy Data Stream').click({ force: true });
  cy.get('input[name="dest"]').type('copyStream2', { force: true });
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
  cy.wait(6000);
  // cy.get('button[id="button"]').click({ force: true });
});
Cypress.Commands.add('deleteDataStream_R', (streamName) => {
  cy.log(`The element '.dropDownWrapper > div' is present.`);
  cy.get('.dropDownWrapper > div').invoke('show').click({ force: true });
  cy.contains('Delete Data Stream').click({ force: true });
  cy.contains('Are you sure you want to Delete', { timeout: 2000 });
  cy.contains('Yes').click({ force: true });
  cy.contains('Data Stream Deleted successfully', { timeout: 20000 });
  // cy.contains('OK').click({ force: true });
});
Cypress.Commands.add('configureSegments', (segmentFile, segments) => {
  cy.addDataStream_M('demoStream');
  cy.log('1st');
  cy.contains('Add Segments').click({ force: true });

  // Upload segment file
  cy.get('input[name="segmentFile"]').selectFile(segmentFile, { force: true });
  cy.wait(2000);

  // Configure the select boxes
  cy.get(
    'div.row div:nth-child(3) div:nth-child(1) div:nth-child(1) input[class*="_selectInputBox_"]'
  ).type('dp1', { force: true });
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
  cy.get(
    'div.row div:nth-child(4) div:nth-child(1) div:nth-child(1) input[class*="_selectInputBox_"]'
  ).type('dp2', { force: true });
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
  cy.get(
    'div.row div:nth-child(5) div:nth-child(1) div:nth-child(1) input[class*="_selectInputBox_"]'
  ).type('enum1', { force: true });
  cy.wait(1000);
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
  // Configure all segments dynamically
  segments.forEach((segment, index) => {
    if (index > 0) {
      cy.contains('Add Row').click({ force: true }); // Add a new row for additional segments
    }

    const rowSelector = `tbody tr[class*="_tr_"]:nth-child(${index + 1})`;
    cy.get(`${rowSelector} td:nth-child(1) input`).type(segment.name, {
      force: true
    });

    if (index === 0) {
      // choose forward fill
      cy.contains('Forward Fill').click({ force: true });
    }
    if (index === 1) {
      // choose backward fill
      cy.log('i was here');
      cy.get(
        `#modal-root > div > div div > form > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(4) > div:nth-child(3) > div > label`
      ).click({ force: true });
    }

    // Optional: Add special logic for specific rows (e.g., startRow/endRow for segment 4)
    if (index === 3) {
      // Assuming the 4th segment has special logic
      cy.get(
        '#modal-root > div > div div > form > div:nth-child(3) > table > tbody > tr:nth-child(4) > td:nth-child(3) > div:nth-child(2) > div > label'
      ).click({ force: true });
      cy.get('input[name="startRow"]').type('4', { force: true });
      cy.get('input[name="endRow"]').type('8', { force: true });
    }
  });
  // Submit the form
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });

  // Verify success message
  cy.contains(
    `Data Stream File Uploaded. ${segments.length} Segments will be created`,
    { timeout: 10000 }
  );

  // Close the modal
  // cy.deleteDataStream_L('demoStream');
});
Cypress.Commands.add('configureSegments_M', (segmentFile, segments) => {
  cy.addDataStream_M('demoStream');
  cy.log('2nd');
  cy.contains('Add Segments').click({ force: true });

  // Upload segment file
  cy.get('input[name="segmentFile"]').selectFile(segmentFile, { force: true });
  cy.wait(4000);
  cy.get('input[name="segmentFile"]').selectFile(segmentFile, { force: true });
  cy.wait(4000);
  // Configure the select boxes
  cy.get(
    'div.row div:nth-child(3) div:nth-child(1) div:nth-child(1) input[class*="_selectInputBox_"]'
  ).type('dp1', { force: true });
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

  // Configure all segments dynamically
  segments.forEach((segment, index) => {
    if (index > 0) {
      cy.contains('Add Row').click({ force: true }); // Add a new row for additional segments
    }

    const rowSelector = `tbody tr[class*="_tr_"]:nth-child(${index + 1})`;
    cy.get(`${rowSelector} td:nth-child(1) input`).type(segment.name, {
      force: true
    });

    if (index === 0) {
      // choose forward fill
      cy.contains('Forward Fill').click({ force: true });
    }
    if (index === 1) {
      // choose backward fill
      cy.log('i was here');
      cy.get(
        `#modal-root > div > div div > form > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(4) > div:nth-child(3) > div > label`
      ).click({ force: true });
    }

    // Optional: Add special logic for specific rows (e.g., startRow/endRow for segment 4)
    if (index === 3) {
      // Assuming the 4th segment has special logic
      cy.get(
        '#modal-root > div > div div > form > div:nth-child(3) > table > tbody > tr:nth-child(4) > td:nth-child(3) > div:nth-child(2) > div > label'
      ).click({ force: true });
      cy.get('input[name="startRow"]').type('4', { force: true });
      cy.get('input[name="endRow"]').type('8', { force: true });
    }
  });
  // Submit the form
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });

  // Verify success message
  cy.contains(
    `Data Stream File Uploaded. ${segments.length} Segments will be created`,
    { timeout: 10000 }
  );

  // Close the modal
  // cy.deleteDataStream_L('demoStream');
});
Cypress.Commands.add('configureSegments_O', (segmentFile, segments) => {
  cy.addDataStream_M('demoStream');
  cy.log('3rd');
  cy.contains('Add Segments').click({ force: true });

  // Upload segment file
  cy.get('input[name="segmentFile"]').selectFile(segmentFile, { force: true });
  cy.wait(2000);

  // Configure the select boxes

  cy.get(
    'div.row div:nth-child(4) div:nth-child(1) div:nth-child(1) input[class*="_selectInputBox_"]'
  ).type('dp2', { force: true });
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

  cy.get(
    'div.row div:nth-child(5) div:nth-child(1) div:nth-child(1) input[class*="_selectInputBox_"]'
  ).type('enum1', { force: true });
  cy.wait(1000);
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

  // Configure all segments dynamically
  segments.forEach((segment, index) => {
    if (index > 0) {
      cy.contains('Add Row').click({ force: true }); // Add a new row for additional segments
    }

    const rowSelector = `tbody tr[class*="_tr_"]:nth-child(${index + 1})`;
    cy.get(`${rowSelector} td:nth-child(1) input`).type(segment.name, {
      force: true
    });

    if (index === 0) {
      // choose forward fill
      cy.contains('Forward Fill').click({ force: true });
    }
    if (index === 1) {
      // choose backward fill
      cy.log('i was here');
      cy.get(
        `#modal-root > div > div div > form > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(4) > div:nth-child(3) > div > label`
      ).click({ force: true });
    }

    // Optional: Add special logic for specific rows (e.g., startRow/endRow for segment 4)
    if (index === 3) {
      // Assuming the 4th segment has special logic
      cy.get(
        '#modal-root > div > div div > form > div:nth-child(3) > table > tbody > tr:nth-child(4) > td:nth-child(3) > div:nth-child(2) > div > label'
      ).click({ force: true });
      cy.get('input[name="startRow"]').type('4', { force: true });
      cy.get('input[name="endRow"]').type('8', { force: true });
    }
  });
  // Submit the form
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });

  cy.get('i[class="fi-times"]').click({ force: true });
  // cy.deleteDataStream_L('demoStream');
});
Cypress.Commands.add('testDoppelImageCombinationsForOS', (osType, zipFile) => {
  const configurations = ['Large', 'Micro', 'Mini', 'Nano'];
  const cpuArchitectures = ['arm64', 'intel64'];

  configurations.forEach((configuration) => {
    cpuArchitectures.forEach((cpuArch) => {
      const uniqueName = `Image_${osType}_${configuration}_${cpuArch}_${Date.now()}`;

      cy.contains('VM Doppel Images').click({ force: true });
      cy.get('i[class="fi-plus-button"]').click({ force: true });
      cy.get('input[name="ImageName"]').type(uniqueName, { force: true });
      cy.get('input[placeholder="zip file name"]').selectFile(zipFile, {
        force: true
      });
      cy.get('textarea[data-label="Description"]').type('test', {
        force: true
      });
      cy.get('textarea[name="ExposedPorts"]').type('test', { force: true });

      // Input dynamic values
      cy.get('input[placeholder="Select Os Type"]').type(osType, {
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
      cy.get('body').then(($body) => {
        if (
          $body.find('div[class*="_optionList"] div:nth-child(1)').length > 0
        ) {
          cy.get('div[class*="_optionList"] div:nth-child(1)').click({
            force: true
          });
        }
      });
      cy.get('input[placeholder="Select CPU Architecture"]').type(cpuArch, {
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
      cy.get('body').then(($body) => {
        if (
          $body.find('div[class*="_optionList"] div:nth-child(1)').length > 0
        ) {
          cy.get('div[class*="_optionList"] div:nth-child(1)').click({
            force: true
          });
        }
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
      cy.get('input[placeholder="Select Your Configuration"]').type(
        configuration,
        { force: true }
      );
      cy.get('body').then(($body) => {
        if (
          $body.find('div[class*="_optionList"] div:nth-child(1)').length > 0
        ) {
          cy.get('div[class*="_optionList"] div:nth-child(1)').click({
            force: true
          });
        }
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

      // Submit the form
      cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
      cy.wait(4000);
      // Validate success
      //cy.contains('Upload in progress.', { timeout: 8000 });
      // cy.get('#button > :nth-child(2)').click({ force: true });
    });
  });
});
Cypress.Commands.add('deleteVmImages', () => {
  cy.get('[name="TestData"]').click({ force: true });
  cy.wait(2000);
  cy.contains('VM Doppel Images').click({ force: true });
  cy.wait(5000);

  let doppelTitles = [];
  cy.get("div[class*='_treeWrapper_']")
    .children('div') // Select only direct child div elements
    .then(($doppel) => {
      cy.wrap($doppel).each(($dop, index) => {
        if (index > 0) {
          const titleValue = $dop.attr('title'); // Get the title attribute
          if (titleValue) {
            doppelTitles.push(titleValue);
          }
        }
      });
    })
    .then(() => {
      cy.wrap(doppelTitles).each((title) => {
        // Open and refresh the image
        cy.get(`a[title="${title}"] div`).click({ force: true });
        cy.wait(2000);
        cy.get('i[class="fi-refresh"]').click({ force: true });
        cy.wait(2000);

        // Check if status is "Pending" and take a screenshot
        cy.get('i.fi-information')
          .parent('div')
          .invoke('text')
          .then((text) => {
            if (text.trim() === 'InProgress') {
              cy.screenshot(title); // Capture a screenshot with the specific name
            }
          });

        // Delete the image
        cy.get(`div[title="${title}"] div[class*="_treeNode"]`).invoke('show');
        cy.get(
          `div[title="${title}"] div[class*="_treeNode"] span[class*="_actions"]`
        )
          .click({ force: true })
          .invoke('show')
          .trigger('mouseover', { force: true });
        cy.contains('Delete VM Doppel Image').click({ force: true });
        cy.get('button[title="Confirm"]').click({ force: true });
        cy.contains('Image deleted', { timeout: 30000 });
        cy.wait(3000);
      });
    });
});
Cypress.Commands.add('deleteVmImages_R', () => {
  cy.get('[name="TestData"]').click({ force: true });
  cy.wait(2000);
  cy.contains('VM Doppel Images').click({ force: true });
  cy.wait(5000);

  let doppelTitles = [];
  cy.get("div[class*='_treeWrapper_']")
    .children('div') // Select only direct child div elements
    .then(($doppel) => {
      cy.wrap($doppel).each(($dop, index) => {
        if (index > 0) {
          const titleValue = $dop.attr('title'); // Get the title attribute
          if (titleValue) {
            doppelTitles.push(titleValue);
          }
        }
      });
    })
    .then(() => {
      cy.wrap(doppelTitles).each((title) => {
        // Open and refresh the image
        cy.get(`a[title="${title}"] div`).click({ force: true });
        cy.wait(2000);
        cy.get('i[class="fi-refresh"]').click({ force: true });
        cy.wait(2000);

        // Check if status is "Pending" and take a screenshot
        cy.get('i.fi-information')
          .parent('div')
          .invoke('text')
          .then((text) => {
            if (text.trim() === 'Delete VM Doppel Image') {
              cy.screenshot(title); // Capture a screenshot with the specific name
            }
          });

        // Delete the image
        cy.get('i[class="fi-trash"]').click({ force: true });
        cy.get('button[title="Confirm"]').click({ force: true });
        //cy.contains('Image deleted', { timeout: 30000 });
        cy.wait(3000);
      });
    });
});
Cypress.Commands.add('uploadProtoFile', (protoFile, version) => {
  cy.get('[name="TestData"]').click({ force: true });
  cy.wait(2000);
  cy.contains('Protobuf Spec').click({ force: true });
  cy.get('i[class="fi-plus-button"]').click({ force: true });
  cy.contains('Upload Proto(Single) File').click({ force: true });
  cy.get('input[placeholder="proto file name"]').selectFile(protoFile, {
    force: true
  });
  cy.get('input[name="versionNumber"]').type(version, { force: true });
});
Cypress.Commands.add('deleteProtoSpec', (title) => {
  cy.get(`div[title="${title}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${title}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true });
  cy.contains('Delete ProtoBuf Spec').click({ force: true });
  cy.get('button[title="Confirm"]').click({ force: true });
  cy.contains('Protobuf Spec deleted', { timeout: 30000 });
  cy.contains('Protobuf Spec').click({ force: true });
});
Cypress.Commands.add('deleteProtoSpec_R', (title) => {
  cy.get('i[class="fi-trash"]').click({ force: true });
  cy.get('button[title="Confirm"]').click({ force: true });
  cy.contains('Protobuf Spec').click({ force: true });
});
Cypress.Commands.add('uploadUDFScript', (udfFile, udfName, udfDescription) => {
  cy.get('i[class="fi-plus-button"]').click({ force: true });
  cy.get('input[name="UDFScriptName"]').type(udfName, { force: true });
  cy.get('input[placeholder="zip file name"]').selectFile(udfFile, {
    force: true
  });
  cy.get('textarea[name="UDFDesc"]').type(udfDescription, { force: true });
  cy.wait(7000);
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
});
Cypress.Commands.add('edit_L', (title, udfFile) => {
  cy.get(`div[title="${title}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${title}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true });
  cy.contains('Edit Script').click({ force: true });
  cy.get('textarea[name="UDFDesc"]').type(' edited', { force: true });
  cy.wait(2000);

  cy.readFile(udfFile, 'utf-8').then((content) => {
    // Update content by replacing 'multiplyByTwo_1' with 'multiplyByTwo_1_Edited'
    const updatedContent = content.replace(
      /multiplyByTwo_1/g,
      'multiplyByTwo_1_Edited'
    );

    // Write the updated content back to the file
    cy.writeFile(udfFile, updatedContent);
  });
  cy.wait(2000);

  cy.get('input[placeholder="zip file name"]').selectFile(udfFile, {
    force: true
  });
  cy.get('input[placeholder="zip file name"]').selectFile(udfFile, {
    force: true
  });
  cy.wait(2000);
  cy.get('#edit-button > :nth-child(2)').click({ force: true });
  cy.contains('Yes', { timeout: 2000 }).click({ force: true });
  //  cy.get('#button > :nth-child(2)', { timeout: 2000 }).click({ force: true });

  cy.readFile(udfFile, 'utf-8').then((content) => {
    // Revert the edited content by replacing 'multiplyByTwo_1_Edited' with 'multiplyByTwo_1'
    const revertedContent = content.replace(
      /multiplyByTwo_1_Edited/g,
      'multiplyByTwo_1'
    );

    // Write the reverted content back to the file
    cy.writeFile(udfFile, revertedContent);
  });
});
Cypress.Commands.add('delete_L', (title) => {
  cy.get(`div[title="${title}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${title}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true });
  cy.contains('Delete Script').click({ force: true });
  cy.get('button[title="Confirm"]').click({ force: true });
  cy.contains('Script Deleted Successfully', { timeout: 30000 });
  // cy.contains('Protobuf Spec').click({ force: true });
});
Cypress.Commands.add('edit_R', (title, udfFile) => {
  // cy.get('i[class="fi-edit"]').click({ force: true });
  cy.contains('Edit').click({ force: true });
  cy.get('textarea[name="UDFDesc"]')
    .clear({ force: true })
    .type(' edited', { force: true });
  cy.wait(2000);

  cy.readFile(udfFile, 'utf-8').then((content) => {
    // Update content by replacing 'multiplyByTwo_1' with 'multiplyByTwo_1_Edited'
    const updatedContent = content.replace(
      /multiplyByTwo_1/g,
      'multiplyByTwo_1_Edited'
    );

    // Write the updated content back to the file
    cy.writeFile(udfFile, updatedContent);
  });
  cy.wait(2000);

  cy.get('input[placeholder="zip file name"]').selectFile(udfFile, {
    force: true
  });
  cy.get('input[placeholder="zip file name"]').selectFile(udfFile, {
    force: true
  });
  cy.wait(2000);
  cy.get('#edit-button > :nth-child(2)').click({ force: true });
  cy.contains('Yes', { timeout: 2000 }).click({ force: true });
  //  cy.get('#button > :nth-child(2)', { timeout: 2000 }).click({ force: true });

  cy.readFile(udfFile, 'utf-8').then((content) => {
    // Revert the edited content by replacing 'multiplyByTwo_1_Edited' with 'multiplyByTwo_1'
    const revertedContent = content.replace(
      /multiplyByTwo_1_Edited/g,
      'multiplyByTwo_1'
    );

    // Write the reverted content back to the file
    cy.writeFile(udfFile, revertedContent);
  });
});
Cypress.Commands.add('delete_R', (title) => {
  cy.get('i[class="fi-trash"]').click({ force: true });
  cy.get('button[title="Confirm"]').click({ force: true });
  cy.contains('Script Deleted Successfully', { timeout: 30000 });
});
Cypress.Commands.add('downloadVMImage_L', (vm_image) => {
  // Navigate to the left-side section
  cy.get(`div[title="${vm_image}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${vm_image}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true });

  // Trigger the secondary download action
  cy.contains('Download Image').click({ force: true });
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
  cy.contains('The File You Have Requested has Started Downloading', {
    timeout: 4000
  });
  // cy.get('i[class="fi-check text-sm"]').click({ force: true });
  cy.wait(10000);
});
Cypress.Commands.add('downloadProtobuf_L', (protobuf) => {
  // Navigate to the left-side section
  cy.get(`div[title="${protobuf}"] div[class*="_treeNode"]`).invoke('show');
  cy.get(
    `div[title="${protobuf}"] div[class*="_treeNode"] span[class*="_actions"]`
  )
    .click({ force: true })
    .invoke('show')
    .trigger('mouseover', { force: true });

  // Trigger the secondary download action
  cy.contains('Download ProtoBuf').click({ force: true });
  cy.get('button[type="submit"]', { timeout: 4000 }).click({ force: true });
  cy.contains('The File You Have Requested has Started Downloading', {
    timeout: 4000
  });
  // cy.get('i[class="fi-check text-sm"]').click({ force: true });
  cy.wait(2000);
});
Cypress.Commands.add('getDoppelTitles', () => {
  const doppelTitles = [];

  // Wait for any necessary load or delay (if needed)
  cy.wait(5000);

  // Start selecting the elements
  cy.get("div[class*='_treeWrapper_']")
    .children('div') // Select only direct child div elements
    .each(($div) => {
      cy.wrap($div)
        .children('div') // Look for child divs under each main div
        .each(($doppel) => {
          // Skip the first child, process others
          if ($doppel.index() !== 0) {
            const titleValue = $doppel.attr('title'); // Get the title attribute
            if (titleValue) {
              doppelTitles.push(titleValue);
            }
          }
        });
    });

  // Return the doppelTitles array as a promise (Cypress command chainable)
  cy.wrap(doppelTitles).as('doppelTitles');
});
Cypress.Commands.add('getEnvTitles', () => {
  const EnvTitles = [];

  // Wait for any necessary load or delay (if needed)
  cy.wait(5000);

  // Start selecting the elements
  cy.get("div[class*='_treeWrapper_']")
    .children('div') // Select only direct child div elements
    // Look for child divs under each main div
    .each(($env) => {
      // Skip the first child, process others
      if ($env.index() !== 0) {
        const titleValue = $env.attr('title'); // Get the title attribute
        if (titleValue) {
          EnvTitles.push(titleValue);
        }
      }
    });
  cy.wrap(EnvTitles).as('EnvTitles');
});
Cypress.Commands.add('searchTestCase', (TestSuiteName, TestCaseName) => {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get('i[class="fi-search"]', { timeout: 20000 }).click({ force: true });
  cy.get('input[name="testSuiteName"]', { timeout: 20000 }).type(
    TestSuiteName,
    { force: true }
  );
  cy.get('input[name="testCaseName"]', { timeout: 20000 }).type(TestCaseName, {
    force: true
  });
  //button[type="submit"]
  cy.get('button[type="submit"]').click({ force: true });
  cy.wait(5000);
  cy.get("label[for='0']", { timeout: 20000 }).click({ force: true });
});
Cypress.Commands.add(
  'addTestStep',
  (
    stepName,
    doppelModel,
    payloadFormat,
    connection,
    publishInterval,
    maxNo,
    longToRun
  ) => {
    // Click the button to open the test case modal
    // cy.get('div[class*="justify-right p-3"] button:nth-child(2)', { timeout: 60000 }).click({ force: true });

    cy.wait(3000);
    cy.contains('Add Test Step', { timeout: 60000 }).click({ force: true });
    // Type the test case name
    cy.get('input[name="name"]', { timeout: 60000 }).type(stepName, {
      force: true
    });
    
    // Select the Doppel Model
    cy.get('input[placeholder="Select Doppel Model"]').type(doppelModel, {
      force: true
    });
    cy.get('input[placeholder="Select Doppel Model"]',{timeout:10000}).clear({force:true}).type(doppelModel, { delay: 100 , force: true});
    cy.wait(5000);
    cy.selectFirstOptionFromDropDown();

    // Add Payload Format
    cy.get(
      '#modal-root > div div > form > div:nth-child(1) > ' +
        'div:nth-child(2) > div > div:nth-child(1) > ' +
        'div.col-sm-6 > div > div > div:nth-child(1) > input'
    ).type(payloadFormat, { force: true });
    cy.get('#modal-root > div div > form > div:nth-child(1) > ' +
        'div:nth-child(2) > div > div:nth-child(1) > ' +
        'div.col-sm-6 > div > div > div:nth-child(1) > input',{timeout:10000}).clear({force:true}).type(payloadFormat, { delay: 100 , force: true});
    cy.wait(5000);
    cy.selectFirstOptionFromDropDown();

    // Add Connection
    cy.get(
      '#modal-root > div div > div > form > div:nth-child(1) > ' +
        'div:nth-child(2) > div > div:nth-child(1) > div.col-md-6 > ' +
        'div  div:nth-child(1) > input'
    ).type(connection, { force: true });
    cy.get('#modal-root > div div > div > form > div:nth-child(1) > ' +
        'div:nth-child(2) > div > div:nth-child(1) > div.col-md-6 > ' +
        'div  div:nth-child(1) > input',{timeout:10000}).clear({force:true}).type(connection, { delay: 100 , force: true});
    cy.wait(5000);
    cy.selectFirstOptionFromDropDown();

    // Add Publish Interval
    cy.get('input[value="5"]')
      .clear({ force: true })
      .type(publishInterval, { force: true });

    // Add Max No
    cy.get('input[max="50"]')
      .clear({ force: true })
      .type(maxNo, { force: true });

    // Conditional logic for `longToRun`
    switch (longToRun) {
      case 1:
        cy.log('longToRun is 1, performing specific action');
        // Example action for longToRun == 1
        // Select a radio button
        cy.get('input[id="radioA"]').click({ force: true });
        cy.get('input[name="durationMins"]').clear({force:true}).type('60',{force:true});
        break;

      case 2:
        cy.log('longToRun is 2, performing another action');
        // Example action for longToRun == 2
        cy.get('input[name="anotherField"]').type('Another Value', {
          force: true
        });
        break;

      case 3:
        cy.log('longToRun is 3, performing another action');
        // Example action for longToRun == 3
        cy.get('button[class="third-action-button"]').click({ force: true });
        break;

      case 4:
        cy.log('longToRun is 4, performing yet another action');
        // Example action for longToRun == 4
        cy.get('input[name="fourthField"]').type('Fourth Value', {
          force: true
        });
        break;

      case 5:
        cy.log('longToRun is 5, performing another action');
        // Example action for longToRun == 5
        cy.get('button[class="fifth-action-button"]').click({ force: true });
        break;

      default:
        cy.log('longToRun is not between 1 and 5');
        break;
    }

    // Submit the form
    cy.get('div[class="justify-right mb-2"] button[type="submit"]').click({
      force: true
    });
    cy.get('body').then(($body) => {
      if ($body.text().includes('View')) {
        cy.get("label[for='0']").click({ force: true });
        cy.wait(6000);
      }
    });
    }
);
Cypress.Commands.add('EditTestCaseR', (longToRun) => {
  // Click the button to open the test case modal

  // Conditional logic for `longToRun`
  switch (longToRun) {
    case 1:
      cy.log('longToRun is 1, performing specific action');
      // Example action for longToRun == 1
      // Select a radio button
      cy.get('input[id="radioA"]').click({ force: true });
      break;

    case 2:
      cy.log('longToRun is 2, performing another action');
      // Example action for longToRun == 2
      cy.get('input[id="radioR"]').click({ force: true });
      cy.get('input[name="iterations"]').type('1', { force: true });
      break;

    case 3:
      cy.log('longToRun is 3, performing another action');
      // Example action for longToRun == 3
      //radioRun
      cy.get('input[id="radioRun"]').click({ force: true });
      cy.wait(1000);
      cy.get('input[placeholder="Select Datapoint"]').type('Array', {
        force: true
      });
      cy.wait(1000);
      cy.selectFirstOptionFromDropDown();

      break;

    case 4:
      cy.log('longToRun is 4, performing yet another action');
      // Example action for longToRun == 4
      //radioOnce
      cy.get('input[id="radioOnce"]').click({ force: true });
      // cy.get('input[name="fourthField"]').type('Fourth Value', { force: true });
      break;

    default:
      cy.log('longToRun is not between 1 and 5');
      break;
  }

  // Submit the form
  cy.get('div[class="justify-right mb-2"] button[type="submit"]').click({
    force: true
  });
  cy.wait(6000);

  // Wait for the success confirmation
  //cy.get('#button > :nth-child(2)').click({ force: true });
});
Cypress.Commands.add('EditWaitTestCaseR', (longToRun) => {
  // Click the button to open the test case modal
  cy.get('input[id="wait"]').click({ force: true });
  cy.wait(1000);
  // Conditional logic for `longToRun`
  switch (longToRun) {
    case 1:
      cy.log('DonotCompute 1, performing specific action');
      cy.get('input[id="checkbox_noComputeMode"]').click({ force: true });
      cy.get('input[name="durationMinsWait"]')
        .clear({ force: true })
        .type('1000', { force: true });
      break;

    case 2:
      cy.log('longToRun is 2, performing another action');
      cy.get('input[name="publishInterval"]')
        .clear({ force: true })
        .type('1000', { force: true });
      cy.get('input[id="stopByCommandMode"]').click({ force: true });
      break;

    case 3:
      cy.log('longToRun is 3, performing another action');
      //uncheck
      cy.get('input[id="stopByCommandMode"]').click({ force: true });
      // cy.get('input[name="durationMinsWait"]').clear({ force: true }).type('1000',{force:true});
      cy.get('input[name="selectVariable"]').click({ force: true });
      //MemberMatch input[placeholder="Select Attribute/Data Point"]
      cy.get('input[placeholder="Select Attribute/Data Point"]')
        .clear({ force: true })
        .type('1000', { force: true });
      cy.wait(1000);
      cy.selectFirstOptionFromDropDown();

      break;

    default:
      cy.log('longToRun is not between 1 and 5');
      break;
  }

  // Submit the form
  cy.get('i[class="fi-save"]').click({ force: true });
  cy.contains('Wait Test Step Details modified successfully', {
    timeout: 60000
  });
  // Wait for the success confirmation
  //cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(5000);
});
Cypress.Commands.add('EditSleepTestCaseR', (longToRun) => {
  // Click the button to open the test case modal
  cy.get('input[id="sleep"]').click({ force: true });
  cy.wait(1000);
  // Conditional logic for `longToRun`
  switch (longToRun) {
    case 1:
      cy.log('DonotCompute 1, performing specific action');
      cy.get('input[name="durationMinsWait"]')
        .clear({ force: true })
        .type('43200', { force: true });
      break;

    case 2:
      cy.log('longToRun is 2, performing another action');
      cy.get('input[name="selectVariable"]').click({ force: true });
      //MemberMatch input[placeholder="Select Attribute/Data Point"]
      cy.get('input[placeholder="Select Attribute/Data Point"]')
        .clear({ force: true })
        .type('MemberMatch', { force: true });
      cy.wait(1000);
      cy.selectFirstOptionFromDropDown();
      break;
    default:
      cy.log('longToRun is not between 1 and 5');
      break;
  }

  // Submit the form
  cy.get('i[class="fi-save"]').click({ force: true });
  cy.contains('Wait Test Step Details modified successfully', {
    timeout: 60000
  });
  // Wait for the success confirmation
  // cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(5000);
});
Cypress.Commands.add(
  'EditSNFTestCaseR',
  (payloadformat, connection, longToRun) => {
    // Click the button to open the test case modal
    cy.get('input[id="snf"]').click({ force: true });
    cy.wait(1000);
    cy.get(
      '#modal-root > div div > form > div:nth-child(1) > ' +
        'div:nth-child(2) > div > div:nth-child(1) > ' +
        'div.col-sm-6 > div > div > div:nth-child(1) > input'
    ).type(payloadformat, { force: true });
    cy.get('div[class*="_optionList"] div:nth-child(1)').click({ force: true });
    cy.wait(3000);
    cy.get('body').then(($body) => {
      if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
        cy.get('div[class*="_optionList"] div:nth-child(1)').click({
          force: true
        });
      }
    });

    // Add Connection
    cy.get(
      '#modal-root > div div > div > form > div:nth-child(1) > ' +
        'div:nth-child(2) > div > div:nth-child(1) > div.col-md-6 > ' +
        'div  div:nth-child(1) > input'
    ).type(connection, { force: true });
    cy.get('div[class*="_optionList"] div:nth-child(1)').click({ force: true });
    cy.wait(3000);
    cy.get('body').then(($body) => {
      if ($body.find('div[class*="_optionList"] div:nth-child(1)').length > 0) {
        cy.get('div[class*="_optionList"] div:nth-child(1)').click({
          force: true
        });
      }
    });

    // Conditional logic for `longToRun`
    switch (longToRun) {
      case 1:
        cy.log('DonotCompute 1, performing specific action');
        //BeforeStep

        // Add Publish Interval
        cy.get('input[name="publishInterval"]')
          .clear({ force: true })
          .type('86400', { force: true });

        // Add Max No
        cy.get('input[max="50"]')
          .clear({ force: true })
          .type('1', { force: true });
        cy.get('input[id="radioA"]').click({ force: true });
        cy.get('input[max="43200"]')
          .clear({ force: true })
          .type('0.01', { force: true });
        cy.get('input[max="3"]')
          .clear({ force: true })
          .type('2', { force: true });
        cy.get('input[max="24"]')
          .clear({ force: true })
          .type('23', { force: true });
        // cy.get('input[max="60"]').clear({ force: true }).type('40',{force:true});
        break;

      case 2:
        cy.log('longToRun is 2, performing another action');
        //86400=>0
        cy.get('input[name="publishInterval"]')
          .clear({ force: true })
          .type('0', { force: true });
        // 1 => 5
        cy.get('input[max="50"]')
          .clear({ force: true })
          .type('5', { force: true });
        // 0.01=>43200//uncheck till start of the test = > 20
        cy.get('input[max="43200"]')
          .clear({ force: true })
          .type('43200', { force: true });
        //now

        cy.get('div[class="col-md-2"] input').each(($el, index) => {
          if (index === 0) {
            // Check if it's the first element
            cy.wrap($el).click({ force: true }); // Click the first element
            return false; // This will break the loop after the first click
          }
        });

        //buffer ti e 30=>60
        cy.get('input[max="21600"]')
          .clear({ force: true })
          .type('60', { force: true });

      case 3:
        cy.log('longToRun is 3, performing another action');
        //publish stored data publishInSFStep
        cy.get('input[id="publishInSFStep"]').click({ force: true });
        //from stream
        cy.get('div[class="form-group col-md-6"] input').each(($el, index) => {
          if (index === 1) {
            // Check if it's the first element
            cy.wrap($el).click({ force: true }); // Click the first element
            return false; // This will break the loop after the first click
          }
        });
        cy.get('input[placeholder="Select Data Stream"]')
          .clear({ force: true })
          .type('demoStream', { force: true });
        cy.get('body').then(($body) => {
          if (
            $body.find('div[class*="_optionList"] div:nth-child(1)').length > 0
          ) {
            cy.get('div[class*="_optionList"] div:nth-child(1)').click({
              force: true
            });
          }
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

        cy.get('input[placeholder="Select Segment of Interest"]')
          .clear({ force: true })
          .type('demoSeg1', { force: true });
        cy.get('div[class*="_optionList"] div:nth-child(1)').click({
          force: true
        });
        cy.wait(3000);
        cy.get('body').then(($body) => {
          if (
            $body.find('div[class*="_optionList"] div:nth-child(1)').length > 0
          ) {
            cy.get('div[class*="_optionList"] div:nth-child(1)').click({
              force: true
            });
          }
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

        //full segment checked FullSegment
        cy.get('input[id="FullSegment"]').click({ force: true });
        //iteration radioR
        cy.get('input[id="radioR"]').click({ force: true });
        cy.get('input[name="iterations"]')
          .clear({ force: true })
          .type('2', { force: true });
      case 4:
        cy.log('longToRun is 4, performing another action');
        //Use Time Interval between Rows in Segment
        cy.get('input[id="ignoreTimeDifferenceInStream"]').click({
          force: true
        });
        cy.get('input[id="radioRun"]').click({ force: true });
        //Run Till Completion
        //full segment Unchecked FullSegment
        cy.get('input[id="FullSegment"]') // Select the checkbox input
          .parent('label') // Traverse to its immediate parent (the <label>)
          .find('div') // Find the child <div> inside the <label>
          .click({ force: true });

        break;
      default:
        cy.log('longToRun is not between 1 and 5');
        break;
    }

    // Submit the form
    cy.get('i[class="fi-save"]').click({ force: true });
    cy.contains('Test Step Details modified successfully', { timeout: 60000 });
    cy.wait(5000);
    // Wait for the success confirmation
    //cy.get('#button > :nth-child(2)').click({ force: true });
  }
);
Cypress.Commands.add('editGAttribute', (dataType, value) => {
  cy.get('tbody[role="rowgroup"] tr:nth-child(1)').trigger('mouseover', {
    force: true
  });
  cy.get('button[title="Edit Global Attribute"]').click({ force: true });
  dataType;
  if (
    dataType === 'String' ||
    dataType === 'String Array' ||
    dataType === 'Geo Array'
  ) {
    cy.get('textarea[id="edit-desc"]').click({ force: true });
    cy.get('textarea[id="edit-desc"]')
      .clear({ force: true })
      .type(value, { force: true });
  } else if (value === 'true') {
    cy.contains('false').click({ force: true });
  } else if (value === 'false') {
    cy.contains('true').click({ force: true });
  } else if (
    dataType === 'Geo' ||
    dataType === 'Integer Array' ||
    dataType === 'accel' ||
    dataType === 'Byte Array'
  ) {
    cy.get('input[id="edit-desc"]').click({ force: true });
    cy.get('input[id="edit-desc"]')
      .clear({ force: true })
      .clear({ force: true })
      .type(value, { force: true });
  } else if (dataType === 'Enum') {
    cy.get('textarea[id="range"]').click({ force: true });
    cy.get('textarea[id="range"]')
      .clear({ force: true })
      .type(value, { force: true });
    cy.wait(1000);
    // cy.get('div[class="form-group col-md-7"] input[class*="_selectInputBox_"]').type('A',{force:true});
    // cy.get('div[class*="_optionList"] div:nth-child(1)').click({force:true})
  } else {
    cy.get('input[placeholder="Enter value"]').click({ force: true });
    cy.get('input[placeholder="Enter value"]')
      .clear({ force: true })
      .type(value, { force: true });
  }
  cy.get('.fi-save').click({ force: true });
  cy.wait(5000);
});
Cypress.Commands.add('processMessageTypes', (messageType) => {
  messageType.forEach((item) => {
    // Here you can perform your desired action with each item's 'name' (and other properties if needed)
    console.log(`Processing message type: ${item.name}`);

    // If you need to run some specific logic based on the 'connector', you can check that as well
    if (item.connector) {
      console.log(`Connector used: ${item.connector}`);
    }
  });
});
Cypress.Commands.add('EditnonTimeSeries', (csv) => {
  // Click the button to open the test case modal
  cy.get('input[name="radioStream"]').click({ force: true });
  cy.wait(1000);
  cy.get('input[name="streamFromUpload"]').click({ force: true });
  cy.wait(1000);
  cy.get(
    ".form-group > :nth-child(2) > div[class*='_selectWrapper_'] > div[class*='_inputWrapper'] > :nth-child(1) > input[class*='_selectInputBox_']"
  ).type('Comma', { force: true });
  cy.selectFirstOptionFromDropDown();

  cy.get('input[placeholder="csv file name"]').selectFile(csv, { force: true });
  cy.get(
    'input[placeholder="Publish Interval Column(Time or Interval(secs))"]'
  ).type('Age', { force: true });
  cy.selectFirstOptionFromDropDown();
  // Submit the form
  cy.get('#edit-button > :nth-child(2)').click({ force: true });
  cy.contains('Test Step Added successfully', { timeout: 60000 });
  // Wait for the success confirmation
  //cy.get('#button > :nth-child(2)').click({ force: true });
});

Cypress.Commands.add('addAttributefromBulkDoppel', (doppelModel) => {
  
});
Cypress.Commands.add('checkDoppelModel', (doppelModel) => {
  cy.get('[name="Doppel Models"]', { timeout: 120000 }).click({ force: true });
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });

  cy.get('input[name="doppelModelName"]', { timeout: 10000 })
    .clear({ force: true })
    .type(doppelModel, { force: true });

  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000); // Ideally replace with intercept-based wait

  cy.get('body').then(($body) => {
    const bodyText = $body.text();

    if (bodyText.includes('Doppel Model not found')) {
      cy.get('p.text-center.wordBreak')
        .invoke('text')
        .then((msg) => cy.log('Popup message: ' + msg));

      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });

      cy.wrap(true).as('modelMissing'); // model not found
    } else {
      cy.get('.btn', { timeout: 10000 }).click({ force: true });

      cy.wait(6000); // Consider intercept instead of fixed wait

      cy.wrap(false).as('modelMissing'); // model found
    }
  });
});
Cypress.Commands.add('checkdoppelcategory', (category) => {
  cy.get('body').then(($body) => {
    const exactMatchFound = $body
      .find('*')
      .toArray()
      .some((el) => el.textContent.trim() === category);
    if (exactMatchFound) {
      // exact match found
    } else {
      //create category
      cy.contains('Add Category').click({ force: true });
      cy.get('#name').type(category, { force: true });
      cy.get(
        "div[class*='d-flex justify-content-end pull-right'] button[type='submit']"
      ).click({ force: true });
    }
  });
});
Cypress.Commands.add('validatedoppelcategory', (category) => {
  cy.get('body').then(($body) => {
    const exactMatchFound = $body
      .find('*')
      .toArray()
      .some((el) => el.textContent.trim() === category);
    if (exactMatchFound) {
      // exact match found
      cy.wrap(true).as('categoryFound');
    } else {
      cy.wrap(false).as('categoryFound');
    }
  });
});
Cypress.Commands.add('addDoppelModel', (DoppelModel, category) => {
  cy.contains('Add').click({ force: true });
  cy.get('input[name="name"]').type(DoppelModel);
  cy.get('input[placeholder="General"]', { timeout: 190000 }).click({
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.contains('Doppel Model added', { timeout: 190000 });
});
Cypress.Commands.add('checkAttribute', (DoppelModel, attribute) => {
  //go to attribute table
  cy.get('.doppelDropDown div[class*="_dropDownWrapper"]')
    .invoke('show')
    .click({ force: true });
  cy.get('div[class*="_dropDownItemLeft"] div:nth-child(4)').click({
    force: true
  });

  //search for the attribute
  cy.get('.justify-right > .fi-search', { timeout: 10000 }).click({
    force: true
  });

  cy.wait(2000);
  cy.get('div[class="card-light"]').then(($body) => {
    const exactMatchFound = $body
      .find('*')
      .toArray()
      .some((el) => el.textContent.trim() === attribute);
    if (exactMatchFound) {
      cy.wrap(true).as('attributeFound');
    } else {
      cy.wrap(false).as('attributeFound');
    }
  });
});
Cypress.Commands.add('checkDoppel', (Doppel) => {
  cy.get('[name="Doppels"]', { timeout: 120000 }).click({ force: true });
  cy.get('[title="Search Doppel"] > .fi-search').click({ force: true });

  cy.get('input[name="doppelName"]', { timeout: 10000 })
    .clear({ force: true })
    .type(Doppel, { force: true });

  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000); // Ideally replace with intercept-based wait

  cy.get('body').then(($body) => {
    const bodyText = $body.text();

    if (bodyText.includes('Doppel not found')) {
      cy.get('.fi-times').click({ force: true });

      cy.wrap(false).as('doppelFound'); // model not found
    } else {
      cy.get(
        'tbody tr:nth-child(1) td:nth-child(1) u',
        { timeout: 10000 },
        { timeout: 10000 }
      ).click({ force: true });

      cy.wait(6000); // Consider intercept instead of fixed wait

      cy.wrap(true).as('doppelFound'); // model found
    }
  });
});
Cypress.Commands.add(
  'addAttributefromConstant',
  (doppelName, DoppelModel, attribute) => {
    //click on doppels
    cy.get('[name="Doppels"]', { timeout: 120000 }).click({ force: true });
    cy.contains('Add (Bulk)', { timeout: 120000 }).click({ force: true });
    const doppelFile = 'cypress\\support\\20Devices 1.csv';
    cy.get('input[name="bulkLoadCsv"]', { timeout: 120000 }).selectFile(
      doppelFile,
      { force: true }
    );
    cy.get('input[name="doppelName"]', { timeout: 120000 }).type(doppelName, {
      force: true
    });
    cy.wait(5000);
    cy.get('input[placeholder="Select Doppel Model"]', {
      timeout: 120000
    }).type(DoppelModel, { force: true });
    cy.get('input[placeholder="Select Doppel Model"]', { timeout: 120000 })
      .clear({ force: true })
      .type(DoppelModel, { force: true });
    cy.wait(1000);
    cy.selectFirstOptionFromDropDown();
    cy.get('input[placeholder="Select DeviceId from uploaded CSV"]')
      .clear({ force: true })
      .type('device_id', { force: true });
    cy.wait(1000);
    cy.selectFirstOptionFromDropDown();
    cy.get(
      ':nth-child(2) >>  > :nth-child(1) > input[class*="_selectInputBox"]'
    )
      .clear({ force: true })
      .type('default', { force: true });
    cy.selectFirstOptionFromDropDown();
    cy.get('[class*="flaot-right"]')
      .find('span')
      .contains('Add Attribute')
      .click({ force: true });

    cy.get('input[placeholder="Select Attribute Name"]', {
      timeout: 10000
    }).click({ force: true });
    cy.wait(2000);
    cy.get('input[placeholder="Select Attribute Name"]', { timeout: 10000 })
      .clear({ force: true })
      .type(attribute, { force: true });
    cy.wait(2000);
    cy.selectFirstOptionFromDropDown();
    //add Value to constant
    cy.get('input[id="edit-desc"]').type('10.01', { force: true });
    cy.get('div.justify-right button[type="submit"]')
      .eq(1)
      .click({ force: true });
    cy.contains('Add Doppel (Bulk)', { timeout: 20000 });
    cy.get('#button > :nth-child(1) > .fi-plus').eq(0).click({ force: true });
    cy.contains('Doppel Added', { timeout: 20000 });
  }
);
Cypress.Commands.add('addPayloadFormat',(payloadFile)=>{
  cy.fixture(payloadFile).then((value) => {
    
  })
    
    
})
Cypress.Commands.add('addDataPointFromJson',(dataPointFile)=>{
  cy.get('.doppelDropDown div[class*="_dropDownWrapper"]')
    .invoke("show")
    .click({ force: true });
  cy.get('div[class*="_dropDownItemLeft"] div:nth-child(3)').click({
    force: true,
  });
   cy.fixture(dataPointFile).then((value) => {
    value.AddDataPointsTest.forEach((element) => {
      cy.log(element.DataPointName);
      cy.get('div[title="Add Data Point"]').click({ force: true });
      cy.get("#name").type(element.DataPointName, { force: true });
      //cy.get('.fi-times').click({force:true})
      cy.get("#desc").type(element.Description, { force: true });
      cy.get('div[class*="_inputWrapper"] input[placeholder="Double"]').type(
        element.DataType,
        { force: true }
      );
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true,
      });
      cy.wait(3000);
      cy.get('div[class*="_optionList"] div:nth-child(1)').click({
        force: true,
      });
      // cy.log(element.Value);
      if (
        element.DataType === "String" ||
        element.DataType === "String Array" ||
        element.DataType === "Geo Array"
      ) {
        cy.get('textarea[id="edit-desc"]').click({ force: true });
        cy.get('textarea[id="edit-desc"]')
          .clear({ force: true })
          .type(element.Value, { force: true });
      } else if (element.Value === "true") {
        cy.contains("true").click({ force: true });
      } else if (element.Value === "false") {
        cy.contains("false").click({ force: true });
      } else if (
        element.DataType === "Geo" ||
        element.DataType === "Integer Array" ||
        element.DataType === "accel" ||
        element.DataType === "Byte Array"
      ) {
        cy.get('input[id="edit-desc"]').click({ force: true });
        cy.get('input[id="edit-desc"]')
          .clear({ force: true })
          .type(element.Value, { force: true });
      } else if (element.DataType === "Enum") {
        cy.get('textarea[id="range"]').click({ force: true });
        cy.get('textarea[id="range"]')
          .clear({ force: true })
          .type(element.Value, { force: true });
        cy.wait(1000);
        cy.get(
          'div[class="form-group col-md-7"] input[class*="_selectInputBox_"]'
        ).type("A", { force: true });
        cy.get('div[class*="_optionList"] div:nth-child(1)').click({
          force: true,
        });
        cy.wait(3000);
        cy.get('div[class*="_optionList"] div:nth-child(1)').click({
          force: true,
        });
      } else {
        cy.get('input[placeholder="Enter value"]').click({ force: true });
        cy.get('input[placeholder="Enter value"]')
        .clear({ force: true })
          .type(element.Value, { force: true });
      }
      cy.get("div[class='justify-right mb-8'] button[type='submit']").click({ force: true });
      // cy.get("#button", { timeout: 5000 }).click({ force: true });
      cy.contains("Datapoint Added/Inserted to Doppel Model",{timeout:120000});
      cy.wait(4000)
    });
  });
})
Cypress.Commands.add('selectFirstOptionFromDropDown', () => {
  cy.get('div[class*="_optionList_"] div').first().click({ force: true });
  cy.wait(1000);
  cy.get('body').then(($body) => {
    if ($body.find('div[class*="_optionList_"] div').length > 0) {
      cy.get('div[class*="_optionList_"] div').first().click({ force: true });
    } else {
      cy.log('Option list not found, skipping click');
    }
  });
});
Cypress.Commands.add('clickOnView', () => {
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']").click({ force: true });
      cy.wait(2000);
    }
  });
});
Cypress.Commands.add(
  'addAttributefromfunction',
  (doppelName, DoppelModel, attribute) => {
    //click on doppels
    cy.get('[name="Doppels"]', { timeout: 120000 }).click({ force: true });
    cy.contains('Add (Bulk)', { timeout: 120000 }).click({ force: true });
    const doppelFile = 'cypress\\support\\20Devices 1.csv';
    cy.get('input[name="bulkLoadCsv"]', { timeout: 120000 }).selectFile(
      doppelFile,
      { force: true }
    );
    cy.get('input[name="bulkLoadCsv"]', { timeout: 120000 }).selectFile(
      doppelFile,
      { force: true }
    );
    cy.get('input[name="bulkLoadCsv"]', { timeout: 120000 }).selectFile(
      doppelFile,
      { force: true }
    );
    cy.get('input[name="doppelName"]', { timeout: 120000 })
      .clear({ force: true })
      .type(doppelName, { force: true });
    cy.wait(1000);
    cy.get('input[name="doppelName"]', { timeout: 120000 })
      .clear({ force: true })
      .type(doppelName, { force: true });

    cy.get('input[placeholder="Select Doppel Model"]', {
      timeout: 120000
    }).type(DoppelModel, { force: true });
    cy.get('input[placeholder="Select Doppel Model"]', { timeout: 120000 })
      .clear({ force: true })
      .type(DoppelModel, { force: true });
    cy.wait(1000);
    cy.selectFirstOptionFromDropDown();
    cy.get('input[placeholder="Select DeviceId from uploaded CSV"]')
      .clear({ force: true })
      .type('device_id', { force: true });
    cy.wait(1000);
    cy.selectFirstOptionFromDropDown();
    cy.get(
      ':nth-child(2) >>  > :nth-child(1) > input[class*="_selectInputBox"]'
    )
      .clear({ force: true })
      .type('default', { force: true });
    cy.selectFirstOptionFromDropDown();
    cy.get('[class*="flaot-right"]')
      .find('span')
      .contains('Add Attribute')
      .click({ force: true });

    cy.get('input[placeholder="Select Attribute Name"]', {
      timeout: 10000
    }).click({ force: true });
    cy.wait(2000);
    cy.get('input[placeholder="Select Attribute Name"]', { timeout: 10000 })
      .clear({ force: true })
      .type('int', { force: true });
    cy.wait(2000);
    cy.selectFirstOptionFromDropDown();
    //select doppel function radio option
    cy.get('input[value="doppelFunction"]').click({ force: true });
    cy.get('input[placeholder="Select Doppel Function"]').click({
      force: true
    });
    cy.wait(4000);
    const element =
      'div:has(> div > div > input[placeholder="Select Doppel Function"]) div[class*="_optionList"][class*="select-option-list"] div span';
    cy.getAllTextfromelement(element).as('doppelFunctions');
    cy.get('@doppelFunctions').then((texts) => {
      texts.forEach((fn, index) => {
        cy.log(index + '  -  ' + fn);

        if (index === 0) {
          cy.get('input[placeholder="Select Doppel Function"]').click({
            force: true
          });
          cy.selectFirstOptionFromDropDown();
          cy.get('button[type="submit"]').eq(1).click({ force: true });
        }
        cy.get('[class*="flaot-right"]')
          .find('span')
          .contains('Add Attribute')
          .click({ force: true });

        cy.get('input[placeholder="Select Attribute Name"]', {
          timeout: 10000
        }).click({ force: true });
        cy.wait(2000);
        cy.get('input[placeholder="Select Attribute Name"]', { timeout: 10000 })
          .clear({ force: true })
          .type('int', { force: true });
        cy.wait(2000);
        cy.selectFirstOptionFromDropDown();
        //select doppel function radio option
        cy.get('input[value="doppelFunction"]').click({ force: true });
        cy.get('input[placeholder="Select Doppel Function"]').click({
          force: true
        });
        cy.get('input[placeholder="Select Doppel Function"]').type(fn, {
          force: true
        });
        cy.wait(3000);
        cy.selectFirstOptionFromDropDown();
        cy.get('button[type="submit"]').eq(1).click({ force: true });
      });
    });
    // cy.scrollTo('bottom',{ensureScrollable: false, force: true });
    // cy.get('#button > :nth-child(1) > .fi-plus').eq(0).click({ force: true });
    cy.wait(10000);
    cy.contains('Doppel Added', { timeout: 20000 });
  }
);
Cypress.Commands.add('getAllTextfromelement', (selector) => {
  return cy
    .get(selector)
    .then(($els) => Array.from($els, (el) => el.innerText));
});
Cypress.Commands.add('deleteUser',(userName)=>{
      cy.get('input[name="searchUser"]').type(userName);
        cy.get('button[type="submit"]').click({force:true});
        //cy.contains('User not found ',{timeout:10000});
        //if found then delete 
      cy.get(`tr[class*="highlightedTable"]`,{timeout:5000})
      .trigger('mouseover', { force: true });
      cy.get('tr[class*="highlightedTable"] button[title="Delete User"]').click({ force: true });
      cy.wait(3000);
      cy.contains('Yes').click({ force: true });

})
Cypress.Commands.add('createUser',(numberOfUser)=>{
  for (let i = 1; i <= numberOfUser; i++) {
  console.log("Iteration number: " + i);
  cy.get('div[class="justify-right g-10 px-3"] button[type="button"] span i').click({force:true});
  cy.get('#userNameId',{timeout:10000}).clear({force:true}).type('Test_User_'+i, { delay: 100, force: true });
  cy.get('#userNameId',{timeout:10000}).clear({force:true}).type('Test_User_'+i, { delay: 100 , force: true});
  cy.get('body').then(($body) => {
    if ($body.find('input[placeholder="Select Project Name"]').length > 0) {
      cy.get('input[placeholder="Select Project Name"]').clear({force:true}).type('DeleteProject', { delay: 100 , force: true });
      cy.selectFirstOptionFromDropDown();
    } else {
      cy.log('Selecting Project already happend, skipping it');
    }
  });
  
  cy.get('button[type="submit"] span').eq(1).click({force:true});
  cy.contains('Copy Credentials',{timeout:10000}).click({force:true});
  cy.wait(5000);
  
  cy.task("saveClipboardEntry").then((entry) => {
  expect(entry).to.have.property("url").and.include("https://");
  expect(entry).to.have.property("username");
  expect(entry).to.have.property("password");
  cy.wait(2000);
});
}
})
Cypress.Commands.add('logOut',()=>{
   cy.get('div[class="mainHeaderRight"] i[class*="_toggleButton_"]',{ timeout: 70000 }).click({force:true});
     cy.contains('Logout',{ timeout: 70000 }).click({force:true});
     cy.get('button[title="Confirm"]',{ timeout: 70000 }).click({force:true});
     cy.contains("Doppelio",{ timeout: 70000 });
})
Cypress.Commands.add('addTestSuite',(test_suite_name)=>{
cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
    cy.get('div[class*="_wrapperMain"] button:nth-child(2)').click({ force: true });
    cy.get('input[name="name"]', { timeout: 60000 }).type(test_suite_name, { force: true });
    cy.get('textarea[name="description"]').clear({force:true}).type('test', { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.contains('Success', { timeout: 60000 });
})
Cypress.Commands.add('addTestCase',(test_case_name)=>{
  cy.get('div[class*="justify-right p-3"] button:nth-child(1)', { timeout: 60000 }).click({ force: true });
    cy.get('input[name="name"]', { timeout: 60000 }).type(test_case_name, { force: true });
    cy.get('textarea[name="description"]').clear({force:true}).type('test', { force: true });
    cy.get('textarea[name="expectedResults"]').type('Pass', { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.contains('Test Case Added successfully', { timeout: 60000 });
    cy.wait(3000);
   })
Cypress.Commands.add('findTestSuite',(test_suite_name)=>{
cy.get('[name="Test Suite"]').click({ force: true });
 cy.get('[title="Search Test Suite/Case/Step"] > .fi-search',{timeout:180000}).click({
 force: true,
 });
 cy.get('input[name="testSuiteName"]',{timeout:180000}).type(test_suite_name,{ force: true });
 cy.get("#button > :nth-child(2)",{timeout:180000}).click({ force: true });
 cy.get("label[for='0']",{timeout:180000}).click({ force: true });
 cy.wait(2000);
 cy.log("found");
})
Cypress.Commands.add('addDoppel',(doppelName,doppelFile)=>{
       cy.get('div[class*="_wrapperMain_"] button:nth-child(3) span:nth-child(2)').click({ force: true });
        
        cy.log(doppelFile);
        cy.wait(2000);
        cy.get('input[name="bulkLoadCsv"]').selectFile(doppelFile, { force: true });
        cy.get('input[name="doppelName"]',{timeout:100000}).type(doppelName, { force: true });
        cy.wait(1000)
        cy.get('input[placeholder="Select Doppel Model"]').type('AutomationDoppelModel',{force:true})
        cy.get('input[placeholder="Select Doppel Model"]').clear({force:true}).type('AutomationDoppelModel',{force:true})
        cy.wait(1000)
        cy.selectFirstOptionFromDropDown(); 
        cy.get('input[placeholder="Select DeviceId from uploaded CSV"]').clear({force:true}).type('device_id',{force:true})
        cy.wait(1000)
        cy.selectFirstOptionFromDropDown();
        cy.wait(3000);
        cy.get('div[class="form-group col-md-6"]:nth-child(2) input').then(($input) => {
          if ($input.length>0) {
            // If the first input is available, clear and type in it
            cy.wrap($input).clear({ force: true }).type('Default', { force: true });
          } else {
            // If the first input is not available, try the second one
            cy.get('input[placeholder="Default"]').clear({ force: true }).type('Default', { force: true });
          }
        }); cy.wait(1000) 
        cy.selectFirstOptionFromDropDown();
        cy.get('#button').click({ force: true });
        cy.wait(3000);
      });
    


