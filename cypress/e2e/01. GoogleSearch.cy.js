//  /// <reference types="cypress" />

//const { should } = require("chai")

it('Google Search', () => {
    cy.intercept("POST", "/log?format=json&hasfast=true&authuser=0", "success").as("GoogleSearchScreen");

    cy.intercept('POST', '/log?format=json&hasfast=true&authuser=0', (req) => {
        req.headers['Content-Type:'] = 'text/plain; charset=UTF-8'
    }).as("GoogleSearchScreen2");

    cy.visit('https://google.com')
    
    cy.get('#APjFqb').type('Automation Step by Step{enter}')
    cy.wait(1000)

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
    
})