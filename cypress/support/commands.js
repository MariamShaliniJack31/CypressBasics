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

Cypress.Commands.overwriteQuery("contains", function (contains, filter, text, userOptions = {}) {
  
      // This is parameter resolution from Cypress v12.7.0 source
      if (Cypress._.isRegExp(text)) {
        // .contains(filter, text)
        // Do nothing
      } else if (Cypress._.isObject(text)) {
        // .contains(text, userOptions)
        userOptions = text
        text = filter
        filter = ''
      } else if (Cypress._.isUndefined(text)) {
        // .contains(text)
        text = filter
        filter = ''
      }
  
      userOptions.matchCase = false;
  
      let contains0 = contains.bind(this)    // this line fixes the error
  
      return contains0(filter, text, userOptions)
    }
  )