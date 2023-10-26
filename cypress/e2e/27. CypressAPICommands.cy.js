describe("Action Commands", ()=>{

    it("Version Command", ()=>{

        cy.log(Cypress.version)             //13.1.0
        cy.log(Cypress.arch)                //x64
        cy.log(Cypress.platform)            //win32
        cy.log(Cypress.browser.name)        //chrome
        cy.log(Cypress.env("testUser"))     //Defined in cypress.env.json
    })
})