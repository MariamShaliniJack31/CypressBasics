import "./commands"
import 'cypress-mochawesome-reporter/register';
//const { merge } = require('mochawesome-merge');

// Alternatively you can use CommonJS syntax:
require('./commands')
require('cypress-xpath')
require('cy-verify-downloads').addCustomCommand();

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})

// merge({
//     files: ['cypress/reports/*.json']
// });

/*
The mochawesome-merge library uses Node.js APIs like fs and glob. These must only run in 
the Node context, not inside Cypress support files, e2e test files, or anything running in 
the browser.
*/