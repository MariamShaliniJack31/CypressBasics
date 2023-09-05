

describe('template spec', () => {

  it('Data Driven from Cypress.Config.js', () => {
//    cy.visit('https://example.cypress.io')
    cy.log(Cypress.env('google_url'))
    cy.log(Cypress.env('ORANGEHRM_URL'))
  })

  it('Data Driven from .env File', () => {
    cy.log(Cypress.env("cypressgoogleurl"))
    
  })


  it('Test Case 1', function() 
  {
    cy.visit('https://demo.nopcommerce.com/')
    cy.title().should('eq', 'nopCommerce demo store')
  })

})