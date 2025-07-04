/// <reference types="cypress" />

describe('Radio Buttons in Cypress', () => {
    
    it('Check what value of Radio Button is checked', () => {
        
        //Open the Application
        cy.visit('https://www.mercurytravels.co.in/flights')
        //Check Title
        cy.wait(2000)
        cy.title().should('contain', "Flight Ticket Online at Mercury Travels");
        cy.url().should("equal", "https://www.mercurytravels.co.in/flights");

        //Click on Search Button
        cy.get("input[type='radio'][value='R']").should('be.visible')
        cy.get("[type='radio'][value='R']").should('be.checked')

        cy.get("input[type='radio'][value='S']").should('be.visible')
        cy.get("[type='radio'][value='S']").should('not.be.checked')

        //Select the Radio Button, below both statements will work
        //cy.get("input[type='radio'][value='S']").click()
        cy.get("input[type='radio'][value='S']").check()

        cy.pause();
    })
})