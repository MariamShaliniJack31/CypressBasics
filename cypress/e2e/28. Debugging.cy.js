describe("Debugger", ()=>{

    it("Debuggability", ()=>{

        cy.visit('https://google.com')
        
        cy.get('#APjFqb').then( ($selectedElement) => {
            // Debugger is hit after the cy.visit and cy.get commands have completed
            debugger
            cy.get('#APjFqb').type("Automation Cypress")
        })

        //cy.get('#APjFqb').debug()                 //This Line is also working
        cy.pause()
    })
})