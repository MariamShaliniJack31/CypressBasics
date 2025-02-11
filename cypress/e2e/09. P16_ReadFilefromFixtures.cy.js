/// <reference types="cypress" />

describe('Read Data from Fixtures files in Cypress', () => {
    
    let d;
    it.only('Read File from Fixtures Folder', function(){
        //example.json is in Fixtures Folder, so we used cy.fixture
        cy.fixture('example.json').then(function (data)  {
            this.data = data;
            cy.log("Data.Name :  "+data.name)
            cy.log(data.email)
            cy.log(data.body)
            cy.log(data.arr[0].Expected);

            cy.log("This.d.name :  " +this.name)        //undefined
            cy.log(this.data.email)
            cy.log(this.data.body)
        })  
    })

    it('Read CSV File from Folder different than Fixtures', function(){
        cy.readFile('C:/Users/mrufu/Downloads/Employee.csv').then((data) => {
            cy.log(data);
        })   
    })

    it('Read File from Folder different than Fixtures', function(){
        cy.readFile('./cypress/ReadandWriteFile.txt').then((data) => {
            expect(data).contains("2023")
            cy.log(data)
        })  
    })

    it('Write content File from Folder different than Fixtures', function(){
        cy.writeFile('./cypress/ReadandWriteFile.txt', '\nI am appending', {flag:'a'})
        cy.readFile('./cypress/ReadandWriteFile.txt').then((data) => {
            cy.log(data)
        })    
    })
})