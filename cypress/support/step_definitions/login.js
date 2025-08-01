/// <reference types="cypress" />
import { When } from '@badeball/cypress-cucumber-preprocessor';

When('user login into the application', () => {
  const env = Cypress.env('env') || 'dev'; // <-- 👈 fallback here; // Get "dev", "qa", etc. from CLI
  if (!env) {
    throw new Error("❌ Missing 'env' argument. Run with --env env=dev");
  }

  const fixtureFile = `Creds_${env.charAt(0).toUpperCase() + env.slice(1)}`; // e.g., Creds_Dev
  cy.fixture(fixtureFile).then((value) => {
    cy.visit(value.url);
  });

  cy.fixture(fixtureFile).then((value) => {
    cy.get('input[placeholder="Username"]', { timeout: 120000 }).type(
      value.Non_System_User.username,
      { force: true }
    );
  });
  cy.get('#verify-button', { timeout: 10000 }).click({ force: true });
  
cy.wait(4000);
 
 cy.get('body', { timeout: 10000 }).then($body => {
  const hasSessionText = $body.text().includes('Yes');
  if (hasSessionText) {
    cy.contains('Yes', { timeout: 10000 }).click({ force: true });
    cy.wait(2000);
    cy.get('#verify-button', { timeout: 10000 }).click({ force: true });
   cy.fixture(fixtureFile, { timeout: 10000 }).then((value) => {
        
        cy.get('input[placeholder="Password"]', { timeout: 10000 }).type(
          value.Non_System_User.password,
          {
            force: true
          }
        );
      });
    } else {
      cy.fixture(fixtureFile).then((value) => {
        cy.get('input[placeholder="Password"]', { timeout: 10000 }).type(
          value.Non_System_User.password,
          {
            force: true
          }
        );
      });
    }
  });

  cy.contains('Login', { timeout: 10000 }).click({ force: true });
});
