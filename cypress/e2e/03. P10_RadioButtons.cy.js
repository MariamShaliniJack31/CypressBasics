/// <reference types="cypress" />

describe('Radio Buttons in Cypress', () => {
    
    it('Check what value of Radio Button is checked', () => {
        
        //Open the Application
        cy.visit('https://www.mercurytravels.co.in/flights')
        //Check Title
        cy.wait(2000)
        cy.title().should('contain', "Flight Ticket Online at Mercury Travels")

        //Click on Search Button
        cy.get("[type='radio'][value='R']").should('be.visible')
        cy.get("[type='radio'][value='R']").should('be.checked')

        cy.get("[type='radio'][value='S']").should('be.visible')
        cy.get("[type='radio'][value='S']").should('not.be.checked')
        cy.get("input[type='radio'][value='S']").click()

        
    })
})