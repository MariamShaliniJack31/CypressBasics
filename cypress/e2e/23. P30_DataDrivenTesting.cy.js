/// <reference types="cypress" />

describe('Data Driven Testing using Fixtures folder files in Cypress', () => {
    
    it('Data Driven - Login to application', () => {
        
        cy.fixture("DataDriven.json").then( (data) => {
            data.forEach( (logindata) => {

                cy.log(logindata.username)
                cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
                cy.get("input[placeholder='Username']").type(logindata.username);
                cy.get("input[placeholder='Password']").type(logindata.password);
                cy.get("button[type='submit']").click();

                cy.wait(2000);

                if (logindata.username == "Admin" && logindata.password == "admin123") 
                {
                    cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should('be.visible');
                    cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module").should('have.text',logindata.Expected );  

                    cy.get(".oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon").click();
                    cy.xpath("//a[normalize-space()='Logout']").click();
                }
                else    
                {
                    cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").contains(logindata.Expected)
                }
            });
        })
    })    
})