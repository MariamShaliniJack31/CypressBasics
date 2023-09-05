/// <reference types="cypress" />

describe('Browser History in Cypress', () => {
    
    it('Go Back & Forward', () => {
        
        //Open the Application
        cy.visit('https://www.mercurytravels.co.in/flights')
        cy.wait(1000)
        cy.title().should('contain' , 'Flight Booking - Book Airticket')

        cy.get("[title='Indian Holidays']").click()
        cy.title().should('contain' , 'India Tour Packages')

        cy.go(-1);
        cy.title().should('contain' , 'Flight Booking - Book Airticket')

        cy.go(1);
        cy.title().should('contain' , 'India Tour Packages')
    })

    
})