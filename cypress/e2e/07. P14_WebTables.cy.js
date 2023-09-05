/// <reference types="cypress" />

describe('Web Tables in Cypress', () => {
    
    it('Find a value anywhere in Table', () => {
        
        //Open the Application
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get("table[name='BookTable']").contains('td', "Learn Selenium").should('be.visible')
        cy.get("table[name='BookTable']").contains("1000").should('be.visible')
    })

    it('Find a value in Particular Row & Column', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get("table[name='BookTable'] > tbody:nth-child(1) tr:nth-child(3) > td:nth-child(3)").contains("Java").should('be.visible')
        cy.get("table[name='BookTable'] > tbody:nth-child(1) tr:nth-child(3) > td:nth-child(4)").contains("500").should('be.visible')
    })

    it('Looping Find a value in Particular Row & Column', () => {
        cy.visit('https://testautomationpractice.blogspot.com/')

        cy.get("table[name='BookTable'] > tbody > tr td:nth-child(2)").each(( $e, index, $list) => {

            const author = $e.text()
            //if(author.includes('Amod'))           //Working
            if(author == 'Amod')
            {
                cy.get("table[name='BookTable'] > tbody > tr td:nth-child(1)").eq(index).then(function(bname) 
                {
                    expect(bname.text()).to.includes("Master In Java")
                })
            }
        })
    })
})