export class OrangeHRMLP {

    username_txt = ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'
    password_txt = ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input'
    login_btn = '.oxd-button'

    enterUsername(username){
        cy.get(this.username_txt).clear().type(username)
    }

    //We have to use this keyword here
    enterPassword(password){
        cy.get(this.password_txt).type(password)
    }

    clickLoginButton(){
        cy.get(this.login_btn).click()
    }
}