/// <reference types="cypress" />

import { OrangeHRMLP } from "./Pages/OrangeHRM_LoginPage"
import { OrangeHRMHP } from "./Pages/OrangeHRM_HomePage"

/*
./          means Siblings (P18_POMdemo.cy.js) Siblings
../         Parent i.e e2e and its siblings --- all under cypress
../../      cypress, package.json, cypress.config.js, .circleci, .vscode, node_modules
*/
var orangehrmlp = new OrangeHRMLP()
var orangehrmhp = new OrangeHRMHP()

it('POM Demo', () => {
    
    cy.log(Cypress.env('ORANGEHRM_URL'))
    cy.visit(Cypress.env('ORANGEHRM_URL'))                          //cypress.config.js
       
    orangehrmlp.enterUsername( Cypress.env('ohrm_username') )       //cypress.env.json
    orangehrmlp.enterPassword(Cypress.env('ohrm_password'))         //cypress.env.json
    orangehrmlp.clickLoginButton()

    orangehrmhp.verifyLabel(Cypress.env('ohrm_label'))              //cypress.env.json
    orangehrmhp.clickLogout();

//    expect(actualValue).to.equal(expectedValue);
})