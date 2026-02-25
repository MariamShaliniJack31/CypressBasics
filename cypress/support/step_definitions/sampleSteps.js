import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the Google page", () => {
  cy.visit("https://www.google.com");
});

When("I search for {string}", (searchTerm) => {
  cy.get("#APjFqb").type(`${searchTerm}{enter}`);
});

Then("I see {string} in the results", (expected) => {
  cy.contains(expected).should("be.visible");
});
