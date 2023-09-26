/// <reference types="cypress" />

describe('CheckBoxes in Cypress', function() {
    
    it('Check all the CheckBoxes', function() {
        
        //Open the Application
        //cy.visit("https://demo.automationtesting.in/Register.html")
        
        cy.visit("https://cosmocode.io/automation-practice/")
        
        //Check Java & Python Checkboxes
        cy.xpath("//input[@name='language_java']").check().should('be.checked')
        cy.xpath("//input[@name='language_python']").check().should('be.checked')

        cy.xpath("//input[@name='language_c#']").should('not.be.checked')
        cy.xpath("//input[@name='language_c']").should('not.be.checked')
        cy.xpath("//input[@name='language_vbs']").check().should('be.checked')

        cy.xpath("//input[@name='language_java']").uncheck().should('not.be.checked')

        //Unselect all the Checkboxes
        cy.get("input[type=Checkbox]").uncheck()   
        cy.wait(1000)
        cy.get("input[type=Checkbox]").check()   

        cy.get("input[type=Checkbox]").uncheck() 
        cy.get("input[type=Checkbox]").first().check() 
        cy.get("input[type=Checkbox]").last().check() 
       
        
        //This is NOT WORKING
        // cy.get("input[type=Checkbox]").then ( (x) => {
        //     let checkboxcount = x.length()
        //     assert(checkboxcount).to.be(checkboxcount)
            

        // })


        //cy.title().should('contain', "Amazon.com. Spend less. Smile more.")

        //Search for an Item
        //cy.get("#twotabsearchtextbox").type("Apple Watch")

        // //Click on Search Button
        // cy.get("input[type='radio'][value='Male']").should('be.visible')
        // cy.get("[type='radio'][value='Male']").should('not.be.checked')

        // cy.get("[type='radio'][value='FeMale']").should('be.visible')
        // cy.get("[type='radio'][value='FeMale']").should('not.be.checked').click()
        

        // //Check for Check Boxes
        // cy.get("input[type='checkbox'][value='Cricket']").should('be.visible').click()
        // cy.get("input[type='checkbox'][value='Movies']").should('be.visible').click()
        // cy.get("input[type='checkbox'][value='Hockey']").should('be.visible').click()

    })
})