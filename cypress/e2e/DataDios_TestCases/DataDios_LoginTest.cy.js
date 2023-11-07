require('cypress-xpath')
/// <reference types="cypress-xpath" />

//Login page - user logs in with username and password
//go to home page and validates the url and uername
//logout

//fixture file - userdata.json, Login_Data.json and constants.js file

import {
    BASE_URL,
    USER_EMAIL,
    USER_PASSWORD,
    USER_TENANT_ID,
    USER_ORG_NAME,
} from "../constants.js"

import DataDios_LoginPage from "../DataDios_PageObjects/DataDios_LoginPage.cy.js"
import DataDios_HomePage from "../DataDios_PageObjects/DataDios_HomePage.cy.js"
import DataDios_DataSourcePage from "../DataDios_PageObjects/DataDios_DataSourcePage.cy.js"

import userdata from "../../fixtures/userdata.json"
import Login_Data from "../../fixtures/Login_Data.json"
import command from "../../support/commands.js"

const loginpage = new DataDios_LoginPage();
const homepage = new DataDios_HomePage();
const sourcepage = new DataDios_DataSourcePage()

describe("DataDios Login DataDriven Test", ()=>{

    beforeEach(function(){

        const loginpage = new DataDios_LoginPage();
        const homepage = new DataDios_HomePage();
        const sourcepage = new DataDios_DataSourcePage()

        cy.fixture('userdata').then((data)=>{        
            this.data = data            
        })  
    })

    //Data driven Test 
    it('LoginDataDrivenTest',function(){
    
        cy.fixture("Login_Data").then(function(user) {
            user.forEach((user) => {
                
                cy.login(user.EMAIL,user.PASSWORD)

                //correct credentials
                if(user.EMAIL==USER_EMAIL && user.PASSWORD==USER_PASSWORD){

                    cy.url().should('eq', this.data.HOMEPAGE_URL)                             
                    homepage.getLogout().invoke("show")
                    cy.contains("Logout").click({force:true})                           
                } 
                //wrong credentials               
                if(user.EMAIL==USER_EMAIL && user.PASSWORD!=USER_PASSWORD){

                    cy.url().should('eq',this.data.LOGIN_URL)
                    cy.log(user.EXPECTED)
                    loginpage.getMessage().should('have.text',user.EXPECTED)
                }
                
                if(user.EMAIL!=USER_EMAIL && user.PASSWORD==USER_PASSWORD){

                    cy.url().should('eq',this.data.LOGIN_URL)
                    cy.log(user.EXPECTED)        
                    loginpage.getMessage().should('have.text',user.EXPECTED)                     
                }
                if(user.EMAIL!==USER_EMAIL && user.PASSWORD!=USER_PASSWORD){

                    cy.url().should('eq',this.data.LOGIN_URL)
                    cy.log(user.EXPECTED)       
                    loginpage.getMessage().should('have.text',user.EXPECTED)                     
                }                 
            })
        })
    })
})