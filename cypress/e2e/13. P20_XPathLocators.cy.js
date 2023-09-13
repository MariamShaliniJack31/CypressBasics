describe('XPath Locators in Cypress', () => {
    
    it('Get the count of Products', () => {
        
        //Open the Application
        cy.visit("https://automationexercise.com/")
        
        //Check Count
        cy.xpath("//ul[@class='nav nav-pills nav-stacked']/li").should('have.length', 8)

        //Chained XPath
        cy.xpath("//ul[@class='nav nav-pills nav-stacked']").xpath("./li").should('have.length', 8)
    })
})