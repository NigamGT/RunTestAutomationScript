/// <reference types="cypress" />
import { When } from '@badeball/cypress-cucumber-preprocessor';
//delete user
//delete doppel
//delete steps
When('I login with username {string} and password {string}', (username, password) => {
  cy.visit("https://trial.doppelio.com/login");
  cy.log(`Logging in as ${username}`);

  cy.get('input[placeholder="Username"]', { timeout: 120000 })
    .type(username, { force: true });
    cy.get('input[placeholder="Username"]',{timeout:10000}).clear({force:true}).type(username, { delay: 100 , force: true});
 

  cy.get('#verify-button', { timeout: 10000 }).click({ force: true });
  cy.wait(4000);

  cy.get('body').then(($body) => {
    if ($body.text().includes('Yes')) {
      cy.contains('Yes', { timeout: 10000 }).click({ force: true });
      cy.wait(3000);
      cy.get('#verify-button', { timeout: 10000 }).click({ force: true });
    }
  });

  cy.get('input[placeholder="Password"]', { timeout: 10000 })
    .type(password, { force: true });
 cy.get('input[placeholder="Password"]',{timeout:10000}).clear({force:true}).type(password, { delay: 100 , parseSpecialCharSequences: false,force: true});
  cy.contains('Login').click({ force: true });

  cy.get('input[name="rb1"]',{timeout:2000}).click({force:true});
  cy.get('input[name="rb2"]',{timeout:2000}).click({force:true});
   cy.get('button[title="Accept"]',{timeout:2000}).click({force:true});
  
  //Adding doppel
  // cy.contains('Doppel Models',{timeout:70000});
  //  cy.get('[name="Doppels"]',{ timeout: 120000 }).click({force:true})
  // cy.contains('Add (Bulk)').should('exist')
  // const doppelFile="cypress\\support\\500_Devices.csv";
  // //if doppel exits then continue
  // cy.get('[title="Search Doppel"] > .fi-search').click({force:true})
  // cy.get('input[name="doppelName"]').type("Doppel"+username,{force:true})
  // cy.get('#button > :nth-child(2)').click({force:true})
  // cy.wait(4000)
  // cy.get('body').then(($body) => {
  //   if ($body.text().includes('Doppel not found')) {
  //     cy.log('i m here')
  //     cy.get('.fi-times').click({force:true});
  //     cy.addDoppel("Doppel"+username,doppelFile);
  //     } else {
  //     }
  //   })
    
    //end of adding doppel
  //run Test
  
//search test step
 cy.get('a[name="Test Suite"]', { timeout: 60000 }).click({ force: true });
cy.get('i[class="fi-search"]',{timeout:20000}).click({force:true});
cy.get('input[name="testSuiteName"]',{timeout:20000}).type("ParallelTestStep"+username, { force: true });
cy.get('button[type="submit"]').click({force:true});
 cy.wait(5000);    
 cy.get("body").then(($body) => {
    if ($body.text().includes("View")) {
        cy.get("label[for='0']").click({ force: true });
        cy.wait(2000);
        cy.log("found");
      
    } else {  
      cy.get(".fi-times").click({ force: true });
      cy.searchTestCase('ParallelTestSuite','ParallelTestCase');
      cy.addTestStep('ParallelTestStep'+username,'AutomationDoppelModel','Payload_1','MQTTConnection','5','1',1);
    }
});
 
 cy.wait(2000);
 cy.searchTestCase('ParallelTestSuite','ParallelTestCase');
cy.contains('Run Test Case').click({force:true});
//div[class="col-sm-12"] div:nth-child(1) div:nth-child(2) div:nth-child(2) button span:nth-child(2)
// cy.get('form[name="runForm"] div[class="card-light my-3"]:nth-child(3) div[class*="_collapseHeader_"]',{timeout:50000}).click({force:true});

cy.wait(1000);
cy.get('input[name="loadFactor"]',{timeout:50000}).clear({force:true}).type('1',{force:true});
cy.get('input[name="loadFactor"]',{timeout:50000}).clear({force:true}).type('1',{delay: 100 ,force:true});
// cy.get('div[class="row"] div[class="form-group col-md-4"]:nth-child(3) input[class*="_select"]')
// .clear({force:true}).type("Def", { delay: 100 ,force: true});
// cy.selectFirstOptionFromDropDown();
cy.get('div[classname="row"] table td div[class*="_selectWrapper"] input')
.clear({force:true}).type(username, { delay: 100 ,force: true});
cy.selectFirstOptionFromDropDown();
cy.get('button[type="submit"]').click({force:true});
cy.contains('See in Dashboard',{timeout:50000}).click({force:true});
cy.wait(3600000);
//log out 
//cy.logOut();

    });




