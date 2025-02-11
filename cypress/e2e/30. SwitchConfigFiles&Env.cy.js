//Import Utility from support folder
import { Utility } from "../support/Utility"

//Call getBaseUrl() to get environment specific url value
const url = new Utility().getBaseUrl();

describe('Switch Config Files & Envs', () => {

  //   npx cypress run --config baseUrl="https://www.staging-website.com/" --spec "cypress\e2e\30. SwitchConfigFiles&Env.cy.js" -b "chrome" --headed --env ENV=qa
  it('Get Env from Config File & Run from Cmd Line', () => {

    cy.log(Cypress.env("baseUrl"))                //This is coming from cypress.env.json
    let cmdLineurl = Cypress.config().baseUrl;    ////This is coming from cypress.config.js
    cy.log(cmdLineurl);                           // This is coming from baseUrl in Line 9

    cy.log(url)           
    cy.visit(url)                                 // This is coming from ENV in Line 9
    cy.pause();
  })
})