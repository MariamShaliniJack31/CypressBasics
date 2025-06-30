//  /// <reference types="cypress" />

//const { should } = require("chai")
Cypress.config("defaultCommandTimeout", 10000)


it('Google Search', {defaultCommandTimeout: 5000}, () => {

    //The third argument to cy.intercept() should be an object defining the mock response, not a string.
    cy.intercept("POST", "/log?format=json&hasfast=true&authuser=0", {
        statusCode: 200,
        body: "success",
    }).as("GoogleSearchScreen");

    cy.intercept('POST', '/log?format=json&hasfast=true&authuser=0', (req) => {
        req.headers['Content-Type:'] = 'text/plain; charset=UTF-8'
    }).as("GoogleSearchScreen2");                           //This is Response Headers

    cy.visit('https://google.com');
    
    cy.get('#APjFqb').type('Automation Step by Step{enter}');
    cy.wait(1000);

    cy.contains('Images')
        .should('have.text', 'Images' )
        .should('contain', 'Images' )
        //.should('have.class', 'zItAnd FOU1zf')
        //.and('be.enabled')
        //.should('be.enabled')
        //expect(true).to.be.true
    

    cy.wait("@GoogleSearchScreen").its("response.statusCode").should("equal", 200);
    cy.wait("@GoogleSearchScreen2").its("response.statusCode").should("equal", 200);

    cy.document().its('contentType').should('eq', 'text/html')
    cy.log(cy.root());

    cy.log(Cypress.env("baseUrl"))          // This is getting called from cypress.env.json
    cy.visit("/")                           //This is getting called from config.js, but if we give in CLI, CLI takes priority
    
    let cmdLineurl = Cypress.config().baseUrl;    
    cy.log(cmdLineurl);                     //This is coming from CMD Line

    cy.pause();
    cy.wait(25000);
    //npx cypress run --spec "cypress\e2e\01. GoogleSearch.cy.js" --headed --config baseUrl="https://facebook.com"
})