/// <reference types='cypress' />
/// <reference types='cypress-xpath' />

import 'cypress-file-upload';
import 'cypress-iframe'
import '@4tw/cypress-drag-drop'

require('@4tw/cypress-drag-drop')
require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add('logintonopCommerce', (email, password) => { 
    
    cy.visit('https://admin-demo.nopcommerce.com/login?')
    cy.get('input[name=Email]').clear().type(email)
    cy.get('input[name=Password]').clear().type(password)
    cy.get('button[type=submit]').click()

})

Cypress.Commands.add('getIFrame', (iframeLocator) => {
    return cy.get(iframeLocator).its('0.contentDocument.body').
        should('be.visible').then(cy.wrap);
})        