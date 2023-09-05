/// <reference types="cypress" />

describe('CheckBoxes in Cypress', function() {
    
    it('Check all the CheckBoxes', function() {
        
        //Open the Application
        cy.visit("https://demo.automationtesting.in/Register.html")
        
        //cy.visit("https://www.amazon.com/")
        //Check Title
        cy.wait(2000)
        cy.get(".active > a").click()
        //cy.title().should('contain', "Amazon.com. Spend less. Smile more.")

        //Search for an Item
        //cy.get("#twotabsearchtextbox").type("Apple Watch")

        // //Click on Search Button
        // cy.get("input[type='radio'][value='Male']").should('be.visible')
        // cy.get("[type='radio'][value='Male']").should('not.be.checked')

        // cy.get("[type='radio'][value='FeMale']").should('be.visible')
        // cy.get("[type='radio'][value='FeMale']").should('not.be.checked').click()
        

        // //Check for Check Boxes
        // cy.get("input[type='checkbox'][value='Cricket']").should('be.visible').click()
        // cy.get("input[type='checkbox'][value='Movies']").should('be.visible').click()
        // cy.get("input[type='checkbox'][value='Hockey']").should('be.visible').click()

    })
})