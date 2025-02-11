//page object file for Loginpage

import {
    BASE_URL,
    USER_EMAIL,
    USER_PASSWORD,
    USER_TENANT_ID,
    USER_ORG_NAME,
} from "../constants";

class DataDios_LoginPage{
        
    getURL(){
        return cy.visit(BASE_URL);
    }    

    getMessage(){
        return cy.get("div.notification.is-danger.is-light.mb-4")
    }

    getEmail(){
        return cy.get("#email", { timeout: 100000 });
    }

    getPassword(){
        return cy.get("#password")
    }

    getLoginButton(){
        return cy.get("button[type='submit']")
    }

    getUserAPI(){
        return cy.intercept("GET", "/get_user_info");
    }

    getLoginAPI(){
        return cy.intercept("POST", "/login");
    }
}

export default DataDios_LoginPage;