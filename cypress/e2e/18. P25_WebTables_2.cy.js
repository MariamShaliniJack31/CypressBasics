/// <reference types="cypress" />

describe('Web Tables in Cypress', () => {

    beforeEach("Login to application", () =>{
        
        //Open the Application
        cy.visit('https://demo.opencart.com/admin/')
        
        //Login
        cy.get("#input-username").clear().type("demo")
        cy.get("#input-password").clear().type("demo")
        cy.get("button[type='submit']").click()

        cy.get(".btn-close").click();

        //Click on Customers > Customers
        cy.get("#menu-customer>a").click();
        cy.get("#menu-customer>ul>li:first-child").click();

    })

    it('Find No of Rows and Columns', () => {
        
        cy.get(".table.table-bordered.table-hover>tbody>tr").should('have.length' , '10');
        cy.get(".table.table-bordered.table-hover>thead>tr>td").should('have.length' , '7');

    })

    it('Find specific Cell Value', () => {
        
        cy.get(".table.table-bordered.table-hover>tbody>tr:nth-child(4)>td:nth-child(3)").should('have.text' , 'gorankrezic90@gmail.com');
        cy.get(".table.table-bordered.table-hover>tbody>tr:nth-child(4)>td:nth-child(3)").should('not.have.text' , 'Shalini@gmail.com');
    })

    it('Read each value in Row & Column', () => {
        
        cy.get(".table.table-bordered.table-hover>tbody>tr").each( ($rowvalue, index, $rows) => {
            cy.wrap($rowvalue).within( ()=> {
                cy.get("td").each( ($colvalue, index, $cols) =>{
                    cy.log($colvalue.text())
                })
            })
        })
    })

    it('Pagination', () => {
        
        cy.get(".col-sm-6.text-end").then( (x) =>{
            let strvalue = x.text();
            cy.log(strvalue)        //Showing 1 to 10 of 15389 (1539 Pages)

            let totalpages = strvalue.substring( strvalue.indexOf("(")+1, strvalue.indexOf("Pages")-1)
            //cy.log(strvalue.split(" "));
            cy.log(totalpages);
            let tot = 5;
            for(let p=1; p <= tot; p++) {
                if (p > 1) {
                    cy.get("div.col-sm-6.text-start>ul>li:nth-child(" +p+ ")").click();
                    if (p == 2 || p == 7) {
                        cy.wait(4000);
                        cy.get(".table.table-bordered.table-hover>tbody>tr").each( ($rowvalue, index, $rows) => {
                            cy.wrap($rowvalue).within( ()=> {
                                cy.get("td").each( ($colvalue, index, $cols) =>{
                                    cy.log($colvalue.text())
                                })
                            })
                        })
                        if (p == 2) {
                            p=p+2;
                            tot=tot+2;
                        }
                    }
                }
            }
        })
    })
})