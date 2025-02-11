describe('Cypress-Mochawesome-Reporter', () => {
    
    it('HTML Reports under reports Folder : index.html', () => {
        
        //npx cypress open > Test Runner > cypress\e2e\25. P32_MochawesomeHTMLReports.cy.js > 
        //screenshots folder is created under cypress folder automatically and screenshots saved
        //HomePage and Logooooo are screenshots name
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.wait(2500)
        cy.screenshot("HomePage");
        cy.wait(2500)
        cy.get("img[alt='company-branding']").screenshot("Logooooo");
        //Mochawesome > cypress\results\mochawesome.json is also getting created. Need to comment cypress-mochawesome-reporter
    })    

    it('Videos under reports > videos', () => {
        
        //reports folder gets created automatically under cypress
        //When you execute the Cypress test using command prompt or CI tool, then screenshots/videos 
        //will be captured at failed steps. 
        //If you execute through Test Runner, it will not capture screenshots on failure
        //Run this through cmd > npx cypress run --spec "cypress\e2e\25. P32_MochawesomeHTMLReports.cy.js" --browser chrome --headed
        //cy.visit("https://demo.opencart.com/");
        
        //Click Cameras
        //cy.get("li:nth-child(7) a:nth-child(1)").click();

        //Check H2
        //cy.get("div[id='content'] h2").should('have.text', "Tablets")

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.wait(2500)

        //https://github.com/LironEr/cypress-mochawesome-reporter/tree/master
        //Run npx cypress run --reporter mochawesome --spec "cypress\e2e\25. P32_MochawesomeHTMLReports.cy.js" --browser chrome --headed
        //Run npx cypress run --reporter mochawesome
        //see the html Report in D:/Shalini/Cypress/CypressBasics/cypress/reports/html/index.html
        //this is cypress-mochawesome-reporter
    })  
})