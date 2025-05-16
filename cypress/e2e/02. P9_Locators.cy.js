/// <reference types="cypress" />

describe('Locators in Cypress', () => {
    
    it('Check Product in nopCommerce and see the Unit Price', () => {
        /* 
        ID          = #
        Class       = .
        Attribute   = [attribute = attributevalue]
        Tag         = Is Optional(tag#ID, tag.class, tag[attribute=value])  
        */
        //Open the Application
        cy.visit("https://demo.nopcommerce.com");
        //Check Title
        cy.title().should('eq', 'nopCommerce demo store')

        //Enter value in Search TextBox
        cy.get("#small-searchterms").type("Apple MacBook Pro 13-inch")

        //Click on Search Button
        cy.get('#small-search-box-form > .button-1.search-box-button').should('be.enabled')
        cy.get("[type='submit']").click();   //Dont forget to give Parenthesis beside a function

        //Click on Add to Cart Button
        cy.get(".product-box-add-to-cart-button").click()
        
        //Give Quantity & Click on Add to Cart Button
        cy.wait(5000)
        cy.get("#product_enteredQuantity_4").clear().type("2")
        cy.get(".button-1.add-to-cart-button").click()
        cy.wait(5000)

        //Click on Shopping Cart
        // > means Select elements that are direct children of the previous element
        cy.get("#topcartlink > a > span.cart-label").click()
        cy.wait(5000)
        //Check Unit Price
        cy.get(".product-unit-price").contains("$1,800.00")

    })
/*cy.get("#topcartlink a span.cart-label")
This would match any span.cart-label that is a descendant (not necessarily a direct child) 
of any a element under #topcartlink.  
*/
})

////npx cypress run --spec "cypress\e2e\02. P9_Locators.cy.js" --headed -b chrome