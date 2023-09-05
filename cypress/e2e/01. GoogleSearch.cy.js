//  /// <reference types="cypress" />

//const { should } = require("chai")



it('Google Search', () => {
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

  })