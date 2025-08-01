/// <reference types="cypress" />
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('user create one data doppel model', () => {
  cy.contains('Doppel Models',{timeout:50000}).click({force:true});
  cy.contains('Add Category',{timeout:50000});
  //check category exist or not 
  cy.checkdoppelcategory("General");
  //check dopel model exist
  cy.checkDoppelModel('AutomationDoppelModel');
  cy.get('@modelMissing').then((modelMissing) => {
    if (modelMissing) {
      //create doppel Model
      cy.addDoppelModel('AutomationDoppelModel');
    } else {
      
    }
  });
  //check for data points if not present then create it
  // cy.addDataPointFromJson('DataPoint');
  //check for each payload format from the json file are available or not . if 
  //not then add them
  // cy.addPayloadFormat('payload');
  //user delete for existing user
  // cy.deleteUser('Test_User_1');

});
When('User create test suite',()=>{
 cy.get('[name="Test Suite"]',{timeout:50000}).click({ force: true });
 cy.get('[title="Search Test Suite/Case/Step"] > .fi-search').click({
 force: true,
 });
 cy.get('input[name="testSuiteName"]').type("ParallelTestSuite");
 cy.get("#button > :nth-child(2)").click({ force: true });
 cy.wait(5000);   
 cy.get("body").then(($body) => {
    if ($body.text().includes("View")) {
        cy.get("label[for='0']").click({ force: true });
        cy.wait(2000);
        cy.log("found");
      //cy.contains("OK").click({ force: true });
    } else {
         cy.get(".fi-times").click({ force: true });
        cy.addTestSuite('ParallelTestSuite');
    }
      });
       
      
      
})
Then('User create test case',()=>{

 cy.get('[name="Test Suite"]',{timeout:50000}).click({ force: true });
 cy.get('[title="Search Test Suite/Case/Step"] > .fi-search').click({
 force: true,
 });
 cy.get('input[name="testCaseName"]').type("ParallelTestCase",{ force: true });
 cy.get("#button > :nth-child(2)").click({ force: true });
 cy.wait(5000);    
 cy.get("body").then(($body) => {
    if ($body.text().includes("View")) {
        cy.get("label[for='0']").click({ force: true });
        cy.wait(2000);
        cy.log("found");
      //cy.contains("OK").click({ force: true });
    } else {  
      cy.get(".fi-times").click({ force: true });
        cy.findTestSuite('ParallelTestSuite');
         cy.addTestCase('ParallelTestCase');
    }
});
        
 
})
Then('User create test step',()=>{
 cy.get('[name="Test Suite"]',{timeout:50000}).click({ force: true });
 cy.get('[title="Search Test Suite/Case/Step"] > .fi-search').click({
 force: true,
 });
 cy.get('input[name="testStepName"]').type("ParallelTestStep",{ force: true });
 cy.get("#button > :nth-child(2)").click({ force: true });
 cy.wait(5000);    
 cy.get("body").then(($body) => {
    if ($body.text().includes("View")) {
        cy.get("label[for='0']").click({ force: true });
        cy.wait(2000);
        cy.log("found");
      //cy.contains("OK").click({ force: true });
    } else {  
      cy.get(".fi-times").click({ force: true });
      
    }
});
  
      
})
When('create users {int} for parallel test run',(number)=>{
    cy.get('div[class="mainHeaderRight"] i[class*="_toggleButton_"]',{ timeout: 70000 }).click({force:true});
    cy.contains('My Account').should('exist');
    cy.contains('My Account').click({force:true})
    cy.contains('Users').should('exist');
    cy.contains('Projects').should('exist');
    cy.contains('Settings').should('exist');
    cy.contains('Workspace').should('exist');
    cy.contains('Long Duration API Token').should('exist');


    //create an user and copy those credentials
    cy.contains('Users').click({force:true});
    cy.wait(2000);
    cy.createUser(number);
})
