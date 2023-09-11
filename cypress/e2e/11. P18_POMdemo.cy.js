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

    orangehrmhp.clickLogout()

})