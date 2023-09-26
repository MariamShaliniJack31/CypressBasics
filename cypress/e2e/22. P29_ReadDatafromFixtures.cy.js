/// <reference types="cypress" />

describe('Data Driven Testing using Fixtures folder files in Cypress', () => {
    
    let testdata;
    before("Read Data from Fixtures Folder", () =>{
        cy.fixture('example.json').then((data) => {
            testdata = data
        })  
    })
    it('Login to application', function(){
        
        cy.log(testdata.username)
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.get("input[placeholder='Username']").type(testdata.username);
        cy.get("input[placeholder='Password']").type(testdata.password);
        cy.get("button[type='submit']").click();

        cy.wait(2000);
        cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should('be.visible');
        cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should('have.text',testdata.Expected );
    })
})