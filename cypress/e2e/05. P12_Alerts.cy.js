/// <reference types="cypress" />

describe('Alerts in Cypress', () => {
    
    it('Alert Text', () => {
        
        //Open the Application
        cy.visit('https://mail.rediff.com/cgi-bin/login.cgi')
        cy.get('input[type=submit]').click()
        //Alert Handling
        cy.on('window:alert', (str) =>
            expect(str).to.equal("Please enter a valid user name")
        )

    })

    it('Confirmation Alert Text', () => {
        
        //Open the Application
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get('[onclick="myFunctionConfirm()"]').click()
        //Alert Handling
        cy.on('window:confirm', (str) =>
            expect(str).to.contains("button")
        )

    })
})