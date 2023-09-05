export class OrangeHRMHP {
 

    clickLogout(){
        cy.get('.oxd-userdropdown-tab > .oxd-icon').click()
        cy.wait(1000)
        cy.get(':nth-child(4) > .oxd-userdropdown-link').click()
    }
}    