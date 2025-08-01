// Import commands.js using ES2015 syntax:
// cypress/support/e2e.ts or support.ts
import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('Uncaught exception:', err.message);
  return false; // prevents test from failing
});

// Alternatively you can use CommonJS syntax:
// require('./commands')