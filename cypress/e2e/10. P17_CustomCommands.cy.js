
/// <reference types="cypress" />

describe('Custom Commands in Cypress', () => {
    
    it('Login to nopCommerce', function(){

        //We have added this logintonopCommerce function as Custom Command in commands.js
        cy.logintonopCommerce("admin@yourstore.com" , "admin")
        
        //Check Title
        cy.title().should('eq', 'Dashboard / nopCommerce administration')
        cy.title().should('include', 'Dashboard / nopCommerce administration');

        //We have overwritten contains Custom command in commands.js
        cy.get('.navbar-nav > :nth-child(3) > .nav-link').contains("LogOUT");
        cy.get('.navbar-nav > :nth-child(3) > .nav-link').click()
    })
})