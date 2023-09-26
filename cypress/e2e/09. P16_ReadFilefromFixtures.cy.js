/// <reference types="cypress" />

describe('Read Data from Fixtures files in Cypress', () => {
    
    let d;
    it('Read File from Fixtures Folder', function(){
        cy.fixture('example.json').then((data) => {
            d = data;
            cy.log("Data.Name :  "+data.name)
            cy.log(data.email)
            cy.log(data.body)

            cy.log("d.name :  "+d.name)
            cy.log(d.email)
            cy.log(d.body)

            this.data = data;
            cy.log("This.d.name :  "+this.data.name)
            cy.log(this.data.email)
            cy.log(this.data.body)
        })  
    })

    it('Read File from Folder different than Fixtures', function(){
        cy.readFile('./cypress/ReadandWriteFile.txt').then((data) => {
            cy.log(data)
        })  
    })

    it('Write content File from Folder different than Fixtures', function(){
        cy.writeFile('./cypress/ReadandWriteFile.txt', '\nI am appending', {flag:'a+'})
        cy.readFile('./cypress/ReadandWriteFile.txt').then((data) => {
            cy.log(data)
        })    
    })
})