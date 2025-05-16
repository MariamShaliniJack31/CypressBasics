describe("Practising on 19th Nov and 22nd Jan 2025", () => {

    it("My First Test Case", () => {
        cy.visit("https://www.google.com");
        cy.title().should('eq', 'Google')
        
        //cy.log(Cypress.env("CYPRESS_PG"));    //This is working using --env
        
        cy.log(Cypress.env("PG"));              //This is working $env:CYPRESS_PG="IAMFROMCLI WINDOWS POWERSHELL"; npx cypress run --spec "cypress/e2e/01. Google.cy.js" --headed -b chrome
        cy.wait(20000);
    })
})

//npx cypress run --spec "cypress\e2e\01. Google.cy.js" --headed -b chrome

//npx cypress run --spec "cypress\e2e\01. Google.cy.js" --headed -b chrome --env CYPRESS_PG="IAMFROMCLI"

//On Windows (using PowerShell) to CypressBasics Folder:
//$env:CYPRESS_PG="IAMFROMCLI WINDOWS POWERSHELL"; npx cypress run --spec "cypress/e2e/01. Google.cy.js" --headed -b chrome