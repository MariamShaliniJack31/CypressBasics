/// <reference types="cypress" />

//const { should } = require("chai")

import { OrangeHRMLP } from "./Pages/OrangeHRM_LoginPage"
import { OrangeHRMHP } from "./Pages/OrangeHRM_HomePage"

var orangehrmlp = new OrangeHRMLP()
var orangehrmhp = new OrangeHRMHP()


it('POM Demo', () => {
    
    cy.log(Cypress.env('ORANGEHRM_URL'))
    cy.visit(Cypress.env('ORANGEHRM_URL'))
       
    orangehrmlp.enterUsername("Admin")
    orangehrmlp.enterPassword("admin123")
    orangehrmlp.clickLoginButton()

    cy.get("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > aside:nth-child(1) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1) > span:nth-child(2)").contains("Recruitment")

    cy.get("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > aside:nth-child(1) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1) > span:nth-child(2)").should('contain', 'Recruitment')
    orangehrmhp.clickLogout()

})