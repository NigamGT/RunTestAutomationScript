/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('user selects doppelmodel module from home page', () => {
  cy.fixture('AddDoppelModel').then((value) => {
    cy.visit(value.dev2);
  });
  // cy.wait(6000);
  cy.fixture('creds').then((value) => {
    cy.get('input[placeholder="Username"]', { timeout: 120000 }).type(
      value.email,
      { force: true }
    );
  });
  cy.get('#verify-button', { timeout: 10000 }).click({ force: true });
  cy.wait(2000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('Session Already Active')) {
      cy.contains('Yes', { timeout: 10000 }).click({ force: true });
      cy.fixture('creds').then((value) => {
        // cy.get('input[placeholder="Username"]', { timeout: 120000 }).clear({ force: true }).type(value.email, { force: true });
      });
      cy.wait(7000);
      cy.get('#verify-button', { timeout: 10000 }).click({ force: true });
      cy.fixture('creds', { timeout: 10000 }).then((value) => {
        cy.wait(2000);
        cy.get('input[placeholder="Password"]', { timeout: 10000 }).type(
          value.password,
          {
            force: true
          }
        );
      });
    } else {
      cy.fixture('creds').then((value) => {
        cy.wait(2000);
        cy.get('input[placeholder="Password"]', { timeout: 10000 }).type(
          value.password,
          {
            force: true
          }
        );
      });
    }
  });

  cy.contains('Login').click({ force: true });
});
//------------------------------------------------------------------------------------

Then('user should see doppelmodel module page', () => {
  cy.get('[name="Doppel Models"]', { timeout: 120000 }).click({ force: true });
});
//------------------------------------------------------------------------------------

When('user adds new doppelmodel', () => {
  cy.getDoppelTitles();

  // Optionally log the titles to verify
  cy.get('@doppelTitles').then((titles) => {
    cy.log('Doppel Titles:', titles);

    // Loop through each title and type them one by one
    cy.get('[name="Doppel Models"]', { timeout: 120000 }).click({
      force: true
    });

    // Use a Cypress chainable to type each title individually
    titles.forEach((title, index) => {
      cy.get('[title="Search Doppel Model"] > .fi-search').click({
        force: true
      });
      cy.get('input[name="doppelModelName"]').clear({ force: true }); // Clear the input field before typing
      cy.get('input[name="doppelModelName"]').type(title, { force: true }); // Type the current title
      cy.wait(1000); // Optional: Add a delay between each type operation

      // Optionally log or assert during each iteration to track progress
      cy.log(`Typed title ${index + 1}: ${title}`);
      cy.get('#button > :nth-child(2)').click({ force: true });
      cy.wait(2000);
      cy.get("label[for='0']").click({ force: true });
      cy.wait(2000);
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });

      cy.contains('Delete Doppel Model').click({ force: true });
      cy.get('i[class="fi-trash"]').click({ force: true });
      cy.contains('Doppel Model Deleted', { timeout: 120000 }).should('exist');
    });
  });

  // cy.get('div[title="demo"]>div').invoke('show').click({force:true})
  // cy.get('div[title="demo"]>div>span+span>i').invoke('show').click({force:true})
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('DeleteDoppelModel', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('Doppel Model not found')) {
      cy.get('.text-center').invoke('text');
      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });
    } else {
      // nope not here
      cy.get("label[for='0']").click({ force: true });
      cy.wait(6000);
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Delete Doppel Model').click({ force: true });
      // cy.contains("Delete").click({ force: true });

      cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
        .then(($body) => {
          if ($body.text().includes('Yes')) {
            // Do something if 'View' is found in the body text
            cy.contains('Yes').click({ force: true });
          } else {
            // Handle case where 'View' is not found
            cy.get('#save-button > :nth-child(2)').click({ force: true });
          }
        });
      // cy.contains("Doppel Model Deleted", { timeout: 120000 }).should("exist");

      cy.log('found');
    }
  });
  cy.contains('Add').click({ force: true });
  cy.get('input[name="name"]').type('DeleteDoppelModel');
  cy.get('input[placeholder="General"]').click({ force: true });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.contains('Doppel Model added', { timeout: 190000 });
  // cy.get(".d-flex > #button").click({ force: true }, { multiple: true });
});

Then('user should see the doppelmodel', () => {
  cy.log('I am here 1');
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('DeleteDoppelModel', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']").click({ force: true });
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Delete Doppel Model').click({ force: true });
      cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
        .then(($body) => {
          if ($body.text().includes('Yes')) {
            // Do something if 'View' is found in the body text
            cy.contains('Yes').click({ force: true });
          } else {
            // Handle case where 'View' is not found
            cy.get('#save-button > :nth-child(2)').click({ force: true });
          }
        });
      cy.contains('Doppel Model Deleted', { timeout: 120000 }).should('exist');
    } else {
      // nope not here
      cy.get('.text-center').should('not.exist');
    }
  });
});

// ------------------------------------------------------------------------------
When('user deletes the new doppelmodel', () => {
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('DeleteDoppelModel', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('Doppel Model not found')) {
      cy.get('.text-center').invoke('text');
      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });
    } else {
      // nope not here
      cy.get("label[for='0']").click({ force: true });
      cy.wait(6000);
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Delete Doppel Model').click({ force: true });
      cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
        .then(($body) => {
          if ($body.text().includes('Yes')) {
            // Do something if 'View' is found in the body text
            cy.contains('Yes').click({ force: true });
          } else {
            // Handle case where 'View' is not found
            cy.get('#save-button > :nth-child(2)').click({ force: true });
          }
        });
      cy.contains('Doppel Model Deleted', { timeout: 120000 }).should('exist');
      cy.log('found');
    }
  });
});

Then('user should not see the new doppelmodel', () => {
  //cy. reload();
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('DeleteDoppelModel');
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('.text-center').should('exist');
  cy.contains('OK').click({ force: true });
  cy.get('.fi-times').click({ force: true });
});
// ---------------------------------------------------------

When('user adds new category', () => {
  cy.wait(3000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('AutomationCategory')) {
      cy.log('found');
      //check AutomationDoppel Model Present or not ?
      cy.get('[title="Search Doppel Model"] > .fi-search').click({
        force: true
      });
      cy.get('input[name="doppelModelName"]').type('AutomationDoppelModel');
      cy.get('#button > :nth-child(2)').click({ force: true });
      cy.wait(4000);
      cy.get('body').then(($body) => {
        if ($body.text().includes('Doppel Model not found')) {
          cy.get('.text-center').invoke('text');
          cy.contains('OK').click({ force: true });
          cy.get('.fi-times').click({ force: true });
        } else {
          // nope not here
          cy.get("label[for='0']").click({ force: true });
          cy.wait(6000);
          cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
          cy.contains('Delete Doppel Model').click({ force: true });
          // cy.contains("Delete").click({ force: true });
          cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
            .then(($body) => {
              if ($body.text().includes('Yes')) {
                // Do something if 'View' is found in the body text
                cy.contains('Yes').click({ force: true });
              } else {
                // Handle case where 'View' is not found
                cy.get('#save-button > :nth-child(2)').click({ force: true });
                cy.contains('Doppel Model Deleted', { timeout: 10000 });
              }
            });
        }
      });
      cy.get('div[title="AutomationCategory"] div[class*="_treeNode"]').invoke(
        'show'
      );
      cy.get(
        'div[title="AutomationCategory"] div[class*="_treeNode"] span[class*="_actions"]'
      )
        .click({ force: true })
        .invoke('show');
      cy.get(
        'div[title="AutomationCategory"] div[class*="_treeNode"] span[class*="_actions"]'
      ).trigger('mouseover', { force: true });
      // cy.get('div[class*="_treeWrapper"]').invoke('show').get('div[id="context-menu"] div:nth-child(3) i').click({force:true});
      //cy.get('i[class="fi-trash"]').trigger('mouseenter',{force:true}).click({force:true},);
      cy.contains('Delete Category').click({ force: true });
      cy.wait(3000);
      cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
        .then(($body) => {
          if ($body.text().includes('Yes')) {
            // Do something if 'View' is found in the body text
            cy.contains('Yes').click({ force: true });
          } else {
            // Handle case where 'View' is not found
            cy.get('#save-button > :nth-child(2)').click({ force: true });
            cy.wait(5000);
          }
        });
      cy.contains('Doppel Category deleted successfully', {
        timeout: 120000
      }).should('exist');
    } else {
      // nope not here
      cy.log('not found');
    }
  });
  cy.contains('Add Category').click({ force: true });
  cy.get('#name').type('AutomationCategory', { force: true });
  cy.get(
    "div[class*='d-flex justify-content-end pull-right'] button[type='submit']"
  ).click({ force: true });
  //cy.get("#button").click({ force: true });

  cy.wait(1000);
});

//----------------------------------------------------------------------------
When('user adds doppelmodel to new Category', () => {
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]')
    .clear({ force: true }) // Clear the input field with force option
    .type('DeleteDoppelModel', { force: true });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('Doppel Model not found')) {
      cy.get('.text-center').invoke('text');
      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });
    } else {
      // nope not here
      cy.get("label[for='0']").click({ force: true });
      cy.wait(6000);
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Delete Doppel Model').click({ force: true });
      //cy.contains("Delete").click({ force: true });

      cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
        .then(($body) => {
          if ($body.text().includes('Yes')) {
            // Do something if 'View' is found in the body text
            cy.contains('Yes').click({ force: true });
          } else {
            // Handle case where 'View' is not found
            cy.get('#save-button > :nth-child(2)').click({ force: true });
          }
        });
      //cy.contains('Yes').click({ force: true });
      cy.contains('Doppel Model Deleted', { timeout: 120000 }).should('exist');
      cy.log('found');
    }
  });
  cy.wait(4000);
  cy.contains('Add').click({ force: true });
  cy.get('input[name="name"]').type('DeleteDoppelModel');
  cy.get('input[placeholder="General"]').click({ force: true });
  cy.get('#button > :nth-child(2)').click({ force: true });
  // cy.get(".d-flex > #button").click({ force: true }, { multiple: true });
  cy.wait(4000);
  cy.contains('Edit').click({ force: true });
  cy.wait(2000);
  cy.get(
    'div[class="row"] div[class*="form-group col-md-6"]:nth-child(2) input'
  ).type('AutomationCategory', { force: true });
  //cy.get('span[class*="_selectArrowIcon"]').click({force:true})
  cy.get('div[class*="_optionList"] div:nth-child(1)').click({ force: true });
  cy.wait(3000);
  cy.get('div[class*="_optionList"] div:nth-child(1)').click({ force: true });

  cy.contains('Save').click({ force: true });
  cy.contains('Doppel Model Generic Details Updated', { timeout: 20000 });
});

//----------------------------------------------------------------

When('user edits doppelmodel', () => {
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('DeleteDoppelModel');
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']", { timeout: 100000 }).click({ force: true });
    } else {
      // nope not here
      cy.log('not found');
      cy.get('.text-center').invoke('text');
      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });
      cy.contains('sorry,something went wrong');
    }
  });
  cy.contains('Edit').click({ force: true });
  cy.get(
    'div[class="row"] div[class*="form-group col-md-6"]:nth-child(2) input'
  ).type('AutomationCategory', { force: true });
  //cy.get('span[class*="_selectArrowIcon"]').click({force:true})
  cy.get('div[class*="_optionList"]').click({ force: true });
  cy.contains('Save').click({ force: true });
  cy.wait(2000);
  cy.contains('Doppel Model Generic Details Updated');
  //cy.get('#button[title*="Close"]').click({force:true})
});

//----------------------------------------------------------------------------------------------

Then('user should see the new doppelmodel Category', () => {
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('DeleteDoppelModel');
  cy.get('div[class="justify-right"] button[type="submit"]').click({
    force: true
  });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get('div[id="modal-root"] table tbody tr').then(($table) => {
        // cy.contains('General').should('exist');
        if ($table.text().includes('AutomationCategory')) {
          cy.log('Pass');
        }
        cy.get("label[for='0']").click({ force: true });
      });
    } else {
      // nope not here
      cy.log('not found');
      cy.get('.text-center').invoke('text');
      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });
    }
  });
});

//------------------------------------------------------------------------------------
Then('user deletes the category', () => {
  cy.wait(20000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('AutomationCategory')) {
      cy.log('found');
      cy.get('div[title="AutomationCategory"] div[class*="_treeNode"]').invoke(
        'show'
      );
      cy.get(
        'div[title="AutomationCategory"] div[class*="_treeNode"] span[class*="_actions"]'
      )
        .click({ force: true })
        .invoke('show');
      cy.get(
        'div[title="AutomationCategory"] div[class*="_treeNode"] span[class*="_actions"]'
      ).trigger('mouseover', { force: true });
      // cy.get('div[class*="_treeWrapper"]').invoke('show').get('div[id="context-menu"] div:nth-child(3) i').click({force:true});
      //cy.get('i[class="fi-trash"]').trigger('mouseenter',{force:true}).click({force:true},);
      cy.contains('Delete Category').click({ force: true });
      cy.wait(3000);
      cy.contains('Yes').click({ force: true });
      cy.contains('Doppel Category deleted successfully');
    } else {
      // nope not here
      cy.contains('Sorry, something went wrong.');
    }
  });
});
//-------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
Then('user should not see the new category', () => {
  cy.wait(3000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('AutomationCategory')) {
      cy.contains('Sorry, something went wrong.');
    } else {
      // nope not here
      cy.log('Pass');
    }
  });
});

When('user add new doppel model using json file', () => {
  cy.wait(2000);
  cy.log('checking Commands Model present or not ');
  cy.get('body').then(($body) => {
    if ($body.text().includes('COMMANDS_MODEL')) {
      cy.log('found');
      cy.get('[title="Search Doppel Model"] > .fi-search').click({
        force: true
      });
      cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL');
      cy.get('#button > :nth-child(2)').click({ force: true });
      cy.wait(4000);
      cy.get('body').then(($body) => {
        if ($body.text().includes('View')) {
          cy.get("label[for='0']").click({ force: true });
          cy.wait(6000);
          cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
          cy.contains('Delete Doppel Model').click({ force: true });
          cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
            .then(($body) => {
              if ($body.text().includes('Yes')) {
                // Do something if 'View' is found in the body text
                cy.contains('Yes').click({ force: true });
              } else {
                // Handle case where 'View' is not found
                cy.get('#save-button > :nth-child(2)').click({ force: true });
              }
            });
          cy.contains('Doppel Model Deleted', { timeout: 120000 }).should(
            'exist'
          );
          cy.wait(5000);
        } else {
          cy.log('not found');
          cy.get('.text-center').invoke('text');
          cy.contains('OK').click({ force: true });
          cy.get('.fi-times').click({ force: true });
        }
      });
    } else {
      // nope not here
    }
  });
  cy.log('checking TEST-AUTOMATION Category present or not ');
  cy.get('div[class*="_treeWrapper"]').then(($body) => {
    if ($body.text().includes('TEST-AUTOMATION')) {
      cy.log('found');
      cy.log('Command Model is present or not');
      cy.get('div[class*="_treeWrapper"]').then(($body) => {
        if ($body.text().includes('COMMANDS_MODEL')) {
          cy.get('div[title="COMMANDS_MODEL"] div[class*="_treeNode"]').invoke(
            'show'
          );
          cy.get(
            'div[title="COMMANDS_MODEL"] div[class*="_treeNode"] span[class*="_actions"]'
          )
            .click({ force: true })
            .invoke('show');
          cy.get(
            'div[title="COMMANDS_MODEL"] div[class*="_treeNode"] span[class*="_actions"]'
          ).trigger('mouseover', { force: true });
          // cy.get('div[class*="_treeWrapper"]').invoke('show').get('div[id="context-menu"] div:nth-child(3) i').click({force:true});
          //cy.get('i[class="fi-trash"]').trigger('mouseenter',{force:true}).click({force:true},);
          cy.get('div[id="context-menu"] .fi-trash').click({ force: true });
          cy.contains('Yes').click({ force: true });
        } else {
          cy.log('not found command_model');
        }
      });
      cy.get('div[title="TEST-AUTOMATION"] div[class*="_treeNode"]').invoke(
        'show'
      );
      cy.get(
        'div[title="TEST-AUTOMATION"] div[class*="_treeNode"] span[class*="_actions"]'
      )
        .click({ force: true })
        .invoke('show');
      cy.get(
        'div[title="TEST-AUTOMATION"] div[class*="_treeNode"] span[class*="_actions"]'
      ).trigger('mouseover', { force: true });
      // cy.get('div[class*="_treeWrapper"]').invoke('show').get('div[id="context-menu"] div:nth-child(3) i').click({force:true});
      //cy.get('i[class="fi-trash"]').trigger('mouseenter',{force:true}).click({force:true},);
      cy.contains('Delete Category').click({ force: true });
      cy.wait(3000);
      cy.contains('Yes').click({ force: true });
    } else {
      // nope not here
      cy.log('not found');
    }
  });
  cy.contains('Add Category').click({ force: true });
  cy.get('#name').type('TEST-AUTOMATION', { force: true });
  cy.get(
    "div[class*='d-flex justify-content-end pull-right'] button[type='submit']"
  ).click({ force: true });
  // cy.get("#button").click({ force: true });

  cy.contains('Add/Update (JSON)').click({ force: true });
  cy.wait(6000);
  cy.contains('Clear', { timeout: 120000 }).click({ force: true });
  cy.get('input[name="JSON file name"]').selectFile(
    'cypress\\support\\COMMANDS_MODEL.json',
    { force: true }
  );
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.get('#button > :nth-child(2)').click({ force: true });
  // cy.get(".d-flex > #button > :nth-child(2)").click({ force: true });
  cy.contains('Doppel Model Added/Updated', { timeout: 180000 });
});
Then('user should see the json doppelmodel', () => {
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']").click({ force: true });
      cy.log('Scenario Passed');
    } else {
      // nope not here
      cy.contains('Something Went wrong').should('exist');
      cy.get('.text-center').should('not.exist');
    }
  });
});

When('user download doppel model in txt', () => {
  cy.get('[name="Doppel Models"]', { timeout: 120000 }).click({ force: true });
  cy.contains('Add/Update (JSON)').click({ force: true });
  cy.wait(7000);
  cy.contains('Clear', { timeout: 120000 }).click({ force: true });
  cy.get('input[name="JSON file name"]').selectFile(
    'cypress\\support\\COMMANDS_MODEL.json',
    { force: true }
  );
  cy.wait(5000);
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.get('#button > :nth-child(2)').click({ force: true });
  // cy.get(".d-flex > #button > :nth-child(2)").click({ force: true });

  cy.wait(4000);

  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL');
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']").click({ force: true });
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Download Doppel Model').click({ force: true });
      cy.contains('COMMANDS_MODEL').should('exist');
      cy.get('input[value=".txt"]').click({ force: true });
      cy.contains('Download').click({ force: true });
    } else {
      // nope not here
      cy.contains('Something Went wrong').should('exist');
      //cy.get('.text-center').should('not.exist');
    }
  });
});
When('user download doppel model in json', () => {
  cy.get('[name="Doppel Models"]', { timeout: 120000 }).click({ force: true });

  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL');
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']").click({ force: true });
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Download Doppel Model').click({ force: true });
      cy.contains('COMMANDS_MODEL').should('exist');
      cy.get('input[value=".json"]').click({ force: true });
      cy.contains('Download').click({ force: true });
    } else {
      // nope not here
      cy.contains('Something Went wrong').should('exist');
      //cy.get('.text-center').should('not.exist');
    }
  });
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('Doppel Model not found')) {
      cy.get('.text-center').invoke('text');
      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });
    } else {
      // nope not here
      cy.get("label[for='0']").click({ force: true });
      cy.wait(6000);
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Delete Doppel Model').click({ force: true });
      cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
        .then(($body) => {
          if ($body.text().includes('Yes')) {
            // Do something if 'View' is found in the body text
            cy.contains('Yes').click({ force: true });
          } else {
            // Handle case where 'View' is not found
            cy.get('#save-button > :nth-child(2)').click({ force: true });
          }
        });
      cy.contains('Doppel Model Deleted', { timeout: 120000 }).should('exist');
      cy.log('found');
    }
  });
  cy.wait(1000);
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL_COPY', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('Doppel Model not found')) {
      cy.get('.text-center').invoke('text');
      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });
    } else {
      // nope not here
      cy.get("label[for='0']").click({ force: true });
      cy.wait(6000);
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Delete Doppel Model').click({ force: true });
      cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
        .then(($body) => {
          if ($body.text().includes('Yes')) {
            // Do something if 'View' is found in the body text
            cy.contains('Yes').click({ force: true });
          } else {
            // Handle case where 'View' is not found
            cy.get('#save-button > :nth-child(2)').click({ force: true });
          }
        });
      cy.contains('Doppel Model Deleted', { timeout: 120000 }).should('exist');
      cy.log('found');
    }
  });
});

When('user able to view doppel model references', () => {
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']").click({ force: true });
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('View Doppel Model References').click({ force: true });
      // cy.contains('default/COMMANDS_MODEL-DEV-1').should('exist');
      // cy.contains('default/COMMANDS_MODEL-DEV-1').click({force:true})
    } else {
      // nope not here
      cy.contains('Something Went wrong').should('exist');
      //cy.get('.text-center').should('not.exist');
    }
  });
});

Then('user should see the dopel model references', () => {
  cy.wait(2000);
  cy.get('.fi-times').click({ force: true });
  // cy.contains('Device Id').should('exist');
  // cy.contains('Edit Doppel').should('exist');
});

When('user copy old doppel model into new doppel model', () => {
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL_COPY', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('Doppel Model not found')) {
      cy.get('.text-center').invoke('text');
      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });
    } else {
      // nope not here
      cy.get("label[for='0']").click({ force: true });
      cy.wait(6000);
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Delete Doppel Model').click({ force: true });
      cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
        .then(($body) => {
          if ($body.text().includes('Yes')) {
            // Do something if 'View' is found in the body text
            cy.contains('Yes').click({ force: true });
          } else {
            // Handle case where 'View' is not found
            cy.get('#save-button > :nth-child(2)').click({ force: true });
          }
        });
      cy.contains('Doppel Model Deleted', { timeout: 120000 }).should('exist');
      cy.log('found');
    }
  });

  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL');
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']").click({ force: true });
      cy.wait(6000);
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Copy Doppel Model').click({ force: true });
      cy.get('input[id="dest"]').type('_COPY', { force: true });
      cy.get('#edit-button > :nth-child(2)').click({ force: true });
      cy.wait(1000);
      cy.contains('Success').should('exist');
      cy.contains('Doppel Model Copied').should('exist');
      // cy.contains("OK").click({ force: true });
      // cy.get('#save-button').click({force:true});
      // cy.contains("Doppel Model Deleted", { timeout: 120000 }).should("exist"); // cy.get('.d-flex > #button').click({force:true},{ multiple: true })
    } else {
      // nope not here
      cy.log('not found');
      cy.contains('OK').click({ force: true });
      cy.get('.fi-times').click({ force: true });
      // cy.contains('Something Went Wrong').should('exist');
    }
  });
});
Then('user able to see copied doppel model', () => {
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL_COPY', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']").click({ force: true });
    } else {
      cy.contains('Something Went Wrong').should('exist');
    }
  });
});

When('user should able to change doppel model category', () => {
  cy.get('[title="Search Doppel Model"] > .fi-search').click({ force: true });
  cy.get('input[name="doppelModelName"]').type('COMMANDS_MODEL_COPY', {
    force: true
  });
  cy.get('#button > :nth-child(2)').click({ force: true });
  cy.wait(4000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('View')) {
      cy.get("label[for='0']").click({ force: true });
      cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
      cy.contains('Move Doppel Model').click({ force: true });
      cy.get(
        'div[class*="_modalBody"] div[class="row"]:nth-child(3) div[class*="form-group col-md-12"]:nth-child(1) input'
      ).type('General', { force: true });
      //cy.get('span[class*="_selectArrowIcon"]').click({force:true})
      cy.get('div[class*="_optionList"]').click({ force: true });
      cy.wait(1000);
      cy.get('button[title="Move Doppel Model to different Category"]').click({
        force: true
      });
      cy.contains('Success').should('exist');
      cy.contains(
        'Succesfully changed the category for this doppel model'
      ).should('exist');
      // cy.contains("OK").click({ force: true });
    } else {
      cy.contains('Something Went Wrong').should('exist');
    }
  });
  cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
  cy.contains('Delete Doppel Model').click({ force: true });
  //cy.contains("Delete").click({ force: true });
  cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
    .then(($body) => {
      if ($body.text().includes('Yes')) {
        // Do something if 'View' is found in the body text
        cy.contains('Yes').click({ force: true });
      } else {
        // Handle case where 'View' is not found
        cy.get('#save-button > :nth-child(2)').click({ force: true });
      }
    });
  // cy.get("#save-button").click({ force: true });
  // cy.contains("Doppel Model Deleted", { timeout: 120000 }).should("exist");
});

Then('user able to see chnaged category of doppel model', () => {});
When('user add different doppel model using json file', () => {
  cy.fixture('DoppelModel').then((value) => {
    value.Model.forEach((element) => {
      var temp = element.ModelName;
      cy.log(temp);
      cy.get('[title="Search Doppel Model"] > .fi-search').click({
        force: true
      });
      cy.get('input[name="doppelModelName"]').type(element.ModelName);
      cy.get('#button > :nth-child(2)').click({ force: true });
      cy.wait(10000);
      cy.get('body').then(($body) => {
        if ($body.text().includes('Doppel Model not found')) {
          cy.get('.text-center').invoke('text');
          cy.contains('OK').click({ force: true });
          cy.get('.fi-times').click({ force: true });
        } else {
          // nope not here
          cy.get("label[for='0']").click({ force: true });
          cy.wait(2000);
          cy.get('.dropDownWrapper>div').invoke('show').click({ force: true });
          cy.contains('Delete Doppel Model').click({ force: true });
          cy.get('body', { timeout: 10000 }) // Wait up to 10 seconds for the 'body' element
            .then(($body) => {
              if ($body.text().includes('Yes')) {
                // Do something if 'View' is found in the body text
                cy.contains('Yes').click({ force: true });
              } else {
                // Handle case where 'View' is not found
                cy.get('#save-button > :nth-child(2)').click({ force: true });
              }
            });
          cy.contains('Doppel Model Deleted', { timeout: 120000 }).should(
            'exist'
          );
          cy.log('found');
        }
      });
      //checking the category
      cy.get('body').then(($body) => {
        if ($body.text().includes(element.Category)) {
          cy.log('found');
        } else {
          // nope not here
          cy.log('not found');
          cy.contains('Add Category').click({ force: true });
          cy.get('#name').type(element.Category, { force: true });
          cy.get(
            "div[class*='d-flex justify-content-end pull-right'] button[type='submit']"
          ).click({ force: true });
          // cy.get("#button").click({ force: true });
          cy.contains('Doppel Category added successfully', {
            timeout: 180000
          });
        }
      });
      //Adding doppel Model
      cy.get('[name="Doppel Models"]', { timeout: 120000 }).click({
        force: true
      });
      cy.contains('Add/Update (JSON)').click({ force: true });
      cy.wait(7000);
      cy.contains('Clear', { timeout: 120000 }).click({ force: true });
      cy.get('input[name="JSON file name"]').selectFile(
        'cypress\\support\\' + element.ModelName + '.json',
        { force: true }
      );
      cy.wait(2000);
      cy.get('#button > :nth-child(2)').click({ force: true });
      cy.get('#button > :nth-child(2)').click({ force: true });
      cy.contains('Doppel Model Added/Updated', { timeout: 180000 });
      //-------------------------------------------------------------
    });
  });
});
Then('user should see the created json doppelmodel', () => {});
When('user add different test suite using json file', () => {
  cy.fixture('TestSuites').then((value) => {
    value.TestSuites.forEach((element) => {
      var temp = element.testsuite;
      cy.log(temp);
      cy.get('[name="Test Suite"]').click({ force: true });
      cy.get('[title="Search Test Suite/Case/Step"] > .fi-search').click({
        force: true
      });
      cy.get('input[name="testSuiteName"]').type(element.testsuite);
      cy.get('#button > :nth-child(2)').click({ force: true });

      cy.get('body').then(($body) => {
        if ($body.text().includes('View')) {
          cy.get("label[for='0']").click({ force: true });
          cy.wait(2000);
          cy.get("div[class*='_dropDownWrapper']>button")
            .invoke('show')
            .click({ force: true });
          cy.contains('Delete Test Suite').click({ force: true });
          cy.contains('Delete').click({ force: true });
          cy.get('#save-button > :nth-child(2)').click({ force: true });
          cy.log('found');
          // cy.contains("OK").click({ force: true });
        } else {
          // nope not here
          cy.contains('Not Found', { timeout: 180000 }).should('exist');
          // cy.get('.text-center').invoke('text')
          // cy.contains('OK').click({force:true})
          cy.get('.fi-times').click({ force: true });
        }
      });

      //Adding test Suite
      cy.get('[name="Test Suite"]', { timeout: 120000 }).click({ force: true });
      cy.contains('Add Test Suite (JSON)').click({ force: true });
      cy.wait(2000);
      cy.contains('Clear').click({ force: true });
      cy.get(
        'body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > label:nth-child(1)'
      ).selectFile('cypress\\support\\' + element.testsuite + '.json', {
        force: true
      });
      cy.wait(2000);
      cy.get(
        'body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(2) > button:nth-child(3) > span:nth-child(2)'
      ).click({ force: true });
      cy.get(
        'body > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > div:nth-child(2) > button:nth-child(3) > span:nth-child(2)'
      ).click({ force: true });
      cy.wait(4000);
      // cy.get('div[id="modal-root"] div:nth-child(2) div[class*="_modalContent_"] div span span span').then($el => {
      //   cy.softAssert($el.text(), 'Success', 'The text should be "Success"');
      // });
    });
  });
});

Then('user should see the created json testsuites', () => {});
When('user add different test case using json file', () => {
  cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
  cy.get('div[class*="_wrapperMain"] button:nth-child(2)').click({
    force: true
  });
  cy.get('input[name="name"]', { timeout: 60000 }).type('DemoSuite', {
    force: true
  });
  cy.get('textarea[name="description"]').type('test', { force: true });
  cy.get('button[type="submit"]').click({ force: true });
  cy.contains('Success', { timeout: 60000 });
  // cy.get('*[class="fi-check text-sm"]').click({ force: true });

  cy.fixture('TestCase').then((value) => {
    value.TestCases.forEach((element) => {
      var temp = element.TestCase;
      cy.log(temp);
      cy.get('[name="Test Suite"]', { timeout: 120000 }).click({ force: true });
      cy.get('[title="Search Test Suite/Case/Step"] > .fi-search').click({
        force: true
      });
      cy.get('input[name="testSuiteName"]').type('DemoSuite', { force: true });
      cy.get('button[type="submit"] span:nth-child(1)').click({ force: true });
      cy.get("label[for='0']").click({ force: true });
      cy.wait(2000);
      cy.get('[title="Search Test Suite/Case/Step"] > .fi-search').click({
        force: true
      });
      cy.get('input[name="testCaseName"]').type(element.TestCase, {
        force: true
      });
      cy.get('#button > :nth-child(2)').click({ force: true });
      cy.wait(3000);
      cy.get('body').then(($body) => {
        if ($body.text().includes('View')) {
          cy.get("label[for='0']").click({ force: true });
          cy.wait(2000);
          cy.get("div[class*='_dropDownWrapper']>button")
            .invoke('show')
            .click({ force: true });
          cy.contains('Delete Test Case').click({ force: true });
          cy.contains('Delete').click({ force: true });
          cy.wait(7000);
          //  cy.get('#save-button > >').click({ force: true });
          cy.log('found');
          // cy.contains("OK").click({ force: true });
          cy.get('[title="Search Test Suite/Case/Step"] > .fi-search').click({
            force: true
          });
          cy.get('input[name="testSuiteName"]').type('DemoSuite', {
            force: true
          });
          cy.get('button[type="submit"] span:nth-child(1)').click({
            force: true
          });
          cy.get("label[for='0']").click({ force: true });
          cy.wait(2000);
        } else {
          // nope not here
          cy.contains('Not Found', { timeout: 180000 }).should('exist');
          cy.get('.fi-times').click({ force: true });
        }
      });

      //Adding test Case
      cy.contains('Add Test Case (JSON)', { timeout: 10000 }).click({
        force: true
      });
      cy.wait(2000);
      cy.contains('Clear').click({ force: true });
      cy.get('input[name="JSON file name"]').selectFile(
        'cypress\\support\\' + element.TestCase + '.json',
        { force: true }
      );
      cy.wait(2000);
      cy.get('button[type="submit"]').click({ force: true });
      cy.get('button[type="submit"]').click({ force: true });
      cy.wait(4000);
      // cy.get('div[id="modal-root"] div:nth-child(2) div[class*="_modalContent_"] div span span span').then($el => {
      //   cy.softAssert($el.text(), 'Success', 'The text should be "Success"');
      // });
    });
  });
});
Then('user should see the created json testcases', () => {});
When('user add General Category', () => {
  cy.contains('Add Category').click({ force: true });
  cy.get('input[name="category"]').type('General', { force: true });
  cy.get('button[type="submit"] i[class="fi-plus"]').click({ force: true });
  cy.contains('Doppel Category updated successfully');
});
