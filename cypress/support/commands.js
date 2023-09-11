/// <reference types='cypress' />

//import 'cypress-file-upload';

require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add('logintonopCommerce', (email, password) => { 
    
    cy.visit('https://admin-demo.nopcommerce.com/login?')
    cy.get('input[name=Email]').clear().type(email)
    cy.get('input[name=Password]').clear().type(password)
    cy.get('button[type=submit]').click()

})