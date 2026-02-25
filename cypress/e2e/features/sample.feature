Feature: Google Search

  Scenario: Search for Cypress
    Given I open the Google page
    When I search for "Cypress"
    Then I see "Cypress.io" in the results