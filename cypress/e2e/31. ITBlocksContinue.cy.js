describe("IT Blocks continue", ()=>{

    it("Last Step of 1st Block is start of 2nd IT Block", ()=>{

        cy.visit("https://www.google.com")
        cy.log("I am in Last Step of 1st IT Block")
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
    })

    it("2nd IT Block", ()=>{
        cy.visit("https://www.google.com")
        cy.log("I am in First Step of 2nd IT Block")
        cy.get('#APjFqb').type('Automation Step by Step{enter}')
        cy.wait(1000)

        cy.contains('Images')
            .should('have.text', 'Images' )
            .should('contain', 'Images' )
    })
})


//2nd IT Block started from start , we have to use Cypress.Cookies.preserveOnce('session_id', 'remember_token')

// cy.session('unique_identifier', cy.login, {
//     validate () {
//         cy.getCookies().should('have.length', 2)
//     },
// })