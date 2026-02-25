describe("Practising on 19th Nov and 22nd Jan 2025 and 29 Oct 2025", () => {

    it("My First Test Case", () => {
        cy.visit("https://www.google.com");
        cy.title().should('eq', 'Google')
        cy.url().should('contain', 'google');

        //cy.log(Cypress.env("CYPRESS_PG"));        //This is working using --env
        //cy.log(Cypress.env(PG));                  //This is working $env:CYPRESS_PG="IAMFROMCLI WINDOWS POWERSHELL"; npx cypress run --spec "cypress/e2e/01. Google.cy.js" --headed -b chrome
        cy.log(Cypress.env("CYPRESS_PG_HOST"));              
        cy.wait(2000);
    })
})

//npx cypress run --spec "cypress\e2e\01. Google.cy.js" --headed -b chrome
//npx cypress run --spec "cypress\e2e\01. Google.cy.js" --headed -b chrome --env CYPRESS_PG="IAMFROMCLI"

//On Windows (using PowerShell) to CypressBasics Folder:
//$env:CYPRESS_PG="IAMFROMCLI WINDOWS POWERSHELL"; npx cypress run --spec "cypress/e2e/01. Google.cy.js" --headed -b chrome
//$env:CYPRESS_PG="IAMFROMCLI WINDOWS POWERSHELL"; $env:CYPRESS_HOST="91.24.78.53"; npx cypress run --spec "cypress/e2e/01. Google.cy.js" --headed -b chrome