export class OrangeHRMHP {

    lbl_Recruitment = "body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > aside:nth-child(1) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1) > span:nth-child(2)";
    img_arrow = ".oxd-userdropdown-tab > .oxd-icon"
    btn_logout = ':nth-child(4) > .oxd-userdropdown-link';

    verifyLabel(lblname) {

        cy.get(this.lbl_Recruitment).contains(lblname)
        cy.get(this.lbl_Recruitment).should('contain', lblname)
   
    }

    clickLogout(){
        cy.get(this.img_arrow).click()
        cy.wait(1000)
        cy.get(this.btn_logout).click()
    }
}   

export default OrangeHRMHP;