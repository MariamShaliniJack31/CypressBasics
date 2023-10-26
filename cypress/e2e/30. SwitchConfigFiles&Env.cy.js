//Import Utility from support folder
import { Utility } from "../support/Utility"

//Call getBaseUrl() to get environment specific url value
const url = new Utility().getBaseUrl();



describe('Switch Config Files & Envs', () => {

  it('Get Env from Config File & Run from Cmd Line', () => {
    cy.log(url)
    cy.visit(url)
  })
})