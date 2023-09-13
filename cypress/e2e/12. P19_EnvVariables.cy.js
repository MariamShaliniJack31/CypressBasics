/// <reference types="cypress" />

// const cypress = require("cypress") This is not Working. Instead of this we gave reference types in commands.js

import { BASE_URL, HOST, XXX, ping, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from "./constants"

describe('Environment Variables SPEC', () => {

  it('Data Driven from cypress.config.js', () => {
    
    cy.log(Cypress.env('google_url'))
    cy.log(Cypress.env('ORANGEHRM_URL'))
    cy.log(Cypress.env('BASE_URL'))

  })

  it('Data Driven from cypress.env.json File', () => {
    
    cy.log(Cypress.env('google_url'))   //'www.google.com'
    cy.log(Cypress.env('host')) // 'veronica.dev.local'
    cy.log(Cypress.env('api_server')) // 'http://localhost:8888/api/v1/'
    cy.log(Cypress.env('testUser'))
    
  })

  it('Data Driven from .env File', function() {
    cy.log(BASE_URL);
    cy.log(ping);
    cy.log(HOST);
    cy.log(XXX);
    cy.log(VIEWPORT_WIDTH); 
    cy.log(VIEWPORT_HEIGHT);
    cy.log(Cypress.env("CYPRESS_BASE_URL"));
    
  })

  it('Test Case 1', function() 
  {
    cy.visit('https://demo.nopcommerce.com/')
    cy.title().should('eq', 'nopCommerce demo store')
  })

})


describe('Environment Variables SPEC2', () => {

  it('Data Driven from cypress.config.js', () => {
    
    cy.log(Cypress.env('google_url'))
    cy.log(Cypress.env('ORANGEHRM_URL'))
    cy.log(Cypress.env('BASE_URL'))

  })
})