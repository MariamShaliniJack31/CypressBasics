
/// <reference types="cypress" />

describe('Custom Commands in Cypress', () => {
    
    it('Login to nopCommerce', function(){

        cy.logintonopCommerce("admin@yourstore.com" , "admin")
        
        //Check Title
        cy.title().should('eq', 'Dashboard / nopCommerce administration')

        cy.get('.navbar-nav > :nth-child(3) > .nav-link').click()
    })

    it('Read File from Folder different than Fixtures', function(){
        cy.readFile('./cypress/ReadandWriteFile.txt').then((data) => {
            cy.log(data)
        })  
    })

    it('Write content File from Folder different than Fixtures', function(){
        cy.writeFile('./cypress/ReadandWriteFile.txt', '\nI am appending', {flag:'a+'})
        cy.readFile('./cypress/ReadandWriteFile.txt').then((data) => {
            cy.log(data)
        })    
    })
})