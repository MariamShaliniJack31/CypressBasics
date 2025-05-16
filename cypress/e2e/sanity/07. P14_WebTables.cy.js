/// <reference types="cypress" />

describe('Web Tables in Cypress', () => {
    
    it.only('Find a value anywhere in Table', () => {
        
        //Open the Application
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get("table[name='BookTable']").contains('td', "Learn Selenium").should('be.visible')
        cy.get("table[name='BookTable']").contains("1000").should('be.visible')
        
        
        cy.log("********************* II way ************************")
        cy.get("table[name='BookTable']").each(($row, index, $rowlist) => {
            cy.wrap($row).within( () =>{
                cy.log("I AM IN ROW WITHIN");
                cy.get("td").each( ($col, index, $collist) => {
                    cy.log("I AM IN TD" + index);
                    let txt = $col.text();
                    if(txt.includes("Master In Selenium")) {
                        cy.log(txt);
                        return false;
                    }
                })
            }) 
        })
        
        // NOT WORKING
        var found = false;
        cy.log("******************** III WAY ******************")
        cy.get("table[name='BookTable'] > tbody > tr").each(($row, index, $rowlist) => {
            cy.wrap($row).each( ($col, indexx, $collist) => {
                let txt = $col.text();
                if(txt.includes("Master In Selenium")) {
                    cy.log("*****************************" +txt);
                    found = true;
                    return false;
                }
                if (found == true) return false;
            })
            if (found == true) return false;
            
        })

        cy.log("&&&&&&&&&&&&&&&&&&CHATGPT&&&&&&&&&&&&&&&&&&&&&")
        cy.contains("table[name='BookTable'] > tbody > tr", "Master In Selenium").then(($row) => {
            cy.log($row.text());
            if ($row.length > 0) {
                cy.log("Row with 'Master In Selenium' found.");
            } else {
                cy.log("Row with 'Master In Selenium' not found.");
            }
        });
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