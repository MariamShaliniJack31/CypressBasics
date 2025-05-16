/// <reference types="cypress" />

describe('DropDowns in Cypress', function() {
    
    //Use it.skip if you do not wish to run the below it code
    it('DropDowns with Select Tag', () => {
        
        //Open the Application
        cy.visit("https://demo.automationtesting.in/Register.html")

        //Select Tag - use select method
        cy.get("#Skills").select('Android')
        cy.xpath("//select[@id='Skills']").select("C")
        cy.get("select#Skills").select("CSS")
    })

    it('DropDowns with Select Tag', () => {
        
        //Open the Application
        cy.visit("https://www.zoho.com/commerce/free-demo.html")

        //Select Tag - use select method
        //HTML having select tag… we can use should(‘have.value’ , ‘’)
        cy.xpath("//select[@id='zcf_address_country']").select("Italy").should('have.value', "Italy")
        //have.text is giving all countries...so changed to have.value
    })
    
    it.only('DropDowns with span/div Tag or BootStrap DD', () => {
        
        //Open the Application
        cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")
        cy.wait(1000)
        
        //span/div Tag - use click method
        cy.xpath("//span[@id='select2-billing_country-container']").click()
        cy.xpath("//input[@role='combobox']").clear().type("Italy").type("{enter}")
        
        //Using Implicit Assert to check if right value is Displayed
        cy.xpath("//span[@id='select2-billing_country-container']").should('have.text' , 'Italy')
    })

    it('Dynamic DD and Auto-suggestions', () => {
        
        //Open the Application
        cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/")
        cy.wait(1000)
        
        //span/div Tag - use click method
        cy.xpath("//span[@id='select2-billing_country-container']").click()
        cy.xpath("//input[@role='combobox']").clear().type("United")
        cy.xpath("//ul[@id='select2-billing_country-results']/li").each( ($el, index, $list) => {
            
            if($el.text() == 'United States (US)')
            {
                cy.wrap($el).click()
            }
        })
        cy.xpath("//span[@id='select2-billing_country-container']").should('have.text' , 'United States (US)')
    })
})