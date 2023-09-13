/// <reference types="cypress" />

//const { should } = require("chai")

import { OrangeHRMLP } from "./Pages/OrangeHRM_LoginPage"
import { OrangeHRMHP } from "./Pages/OrangeHRM_HomePage"

var orangehrmlp = new OrangeHRMLP()
var orangehrmhp = new OrangeHRMHP()


it('Implicit Assertions', () => {
    
    cy.log(Cypress.env('ORANGEHRM_URL'))
    cy.visit(Cypress.env('ORANGEHRM_URL'))
       
    orangehrmlp.enterUsername("Admin")
    orangehrmlp.enterPassword("admin123")
    orangehrmlp.clickLoginButton()

    // Implicit Assertions Should and
    cy.xpath("//span[normalize-space()='Recruitment']").contains("Recruitment")
    cy.xpath("//span[normalize-space()='Recruitment']").should('contain', 'Recruitment')
    cy.xpath("//span[normalize-space()='Recruitment']").should('be.visible')

    //Chained Assertions
    cy.xpath("//span[normalize-space()='Recruitment']").should('be.visible').and('exist').and('have.text','Recruitment' )
    orangehrmhp.clickLogout()

})

it('Explicit Assertions', () => {
    
    cy.log(Cypress.env('ORANGEHRM_URL'))
    cy.visit(Cypress.env('ORANGEHRM_URL'))
       
    orangehrmlp.enterUsername("Admin")
    orangehrmlp.enterPassword("admin123")
    orangehrmlp.clickLoginButton()

    // Explicit Assertions expect & assert
    let expectedName = "Shalini"

    cy.get(".oxd-userdropdown-name").then( (x) => {

        let actualName = x.text()
        // BDD Style - we use expect
        expect(actualName).not.equal(expectedName)

        //TDD Style - we use assert
        assert.notEqual(actualName,expectedName)
    })
    
    orangehrmhp.clickLogout()

})