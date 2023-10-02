export class OrangeHRMLP {

    txt_username = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
    txt_password = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'
    btn_login = '.oxd-button'

    enterUsername(username){
        cy.get(this.txt_username).clear().type(username)
    }

    //We have to use this keyword here
    enterPassword(password){
        cy.get(this.txt_password).type(password)
    }

    clickLoginButton(){
        cy.get(this.btn_login).click()
    }
}

export default OrangeHRMLP;