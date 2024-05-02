import "./commands"
import 'cypress-mochawesome-reporter/register';

// Alternatively you can use CommonJS syntax:
require('./commands')
require('cypress-xpath')
require('cy-verify-downloads').addCustomCommand();

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})