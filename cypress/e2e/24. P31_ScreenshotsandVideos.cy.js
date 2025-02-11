describe('Capture Screenshots & videos in Cypress', () => {
    
    it.only('Intentionally capture screenhsots', () => {
        
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.wait(2500)
        cy.screenshot("HomePage");
        cy.wait(2500)
        cy.get("img[alt='company-branding']").screenshot("Logo");
    })    

    it('Run through CMD PROMPT or CLI to capture screenhsots & Videos on Failure', () => {
        
        //When you execute the Cypress test using command prompt or CI tool, then screenshots/videos 
        //will be captured at failed steps. 
        //If you execute through Test Runner, it will not capture screenshots on failure
        //Run this through cmd > npx cypress run --spec "cypress\e2e\24. P31_ScreenshotsandVideos.cy.js"
        cy.visit("https://demo.opencart.com/");
        
        //Click Cameras
        cy.get("li:nth-child(7) a:nth-child(1)").click();

        //Check H2
        cy.get("div[id='content'] h2").should('have.text', "Tablets")

        //https://github.com/LironEr/cypress-mochawesome-reporter/tree/master
        //Run npx cypress run --reporter mochawesome
        //Run npx cypress run --reporter mochawesome
        //see the html Report in D:/Shalini/Cypress/CypressBasics/cypress/reports/html/index.html
    })  
})