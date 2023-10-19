export class dd_loginclass {

    txtBox_email = "#email";
    txtBox_pwd = "#password"
    btn_login = "button[type='submit']";

    enterEMailID(email){
        cy.get(this.txtBox_email).clear().type(email)
    }

    //We have to use this keyword here
    enterPassword(password){
        cy.get(this.txtBox_pwd).type(password)
    }

    clickLoginButton(){
        cy.get(this.btn_login).click()
    }
}   

export default dd_loginclass;