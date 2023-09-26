describe('Child Tab in Cypress', () => {
    
    it('Child Tabs', () => {
        
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/windows")

        //Get Click Here properties
        cy.xpath("//a[normalize-space()='Click Here']").invoke('removeAttr', 'target').click()
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new' );
        //Do operations

        cy.go('back');
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows' );
     })

    it('Child Tabs 2', () => {
        
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/windows")

        //Get Click Here properties
        cy.xpath("//a[normalize-space()='Click Here']").then( (e) => {

            let newurl = e.prop('href');
            cy.visit(newurl);
        })
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new' );
        //Do operations

        cy.go('back');
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows' );
    })
})