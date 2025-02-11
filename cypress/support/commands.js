/// <reference types='cypress' />
/// <reference types='cypress-xpath' />

import 'cypress-file-upload';
import 'cypress-iframe'       //This is Deprecated
import '@4tw/cypress-drag-drop'
import { verifyDownloadTasks } from 'cy-verify-downloads';  // Importing the verifyDownloadTasks object from its module
const mammoth = require('mammoth');
require('@4tw/cypress-drag-drop');
require('cypress-downloadfile/lib/downloadFileCommand');
require('ajv');
require('cy-verify-downloads').addCustomCommand();
//const fs = require('fs-extra')
//const path = require('path')

export default function addCustomCommands() {
  // all the Cypress.Commands.add calls
  Cypress.Commands.add('login', (email,password))
  Cypress.Commands.add("selectHomePageItem",(ITEM,ITEM_LIST))
  
}

import DataDios_LoginPage from "../../cypress/e2e/DataDios_PageObjects/DataDios_LoginPage.cy"
import DataDios_HomePage from "../../cypress/e2e/DataDios_PageObjects/DataDios_HomePage.cy"
import DataDios_DataSourcePage from "../../cypress/e2e/DataDios_PageObjects/DataDios_DataSourcePage.cy"
import DataDios_SmartDiffPage from "../../cypress/e2e/DataDios_PageObjects/DataDios_SmartDiffPage.cy"
import userdata from "../fixtures/userdata.json"
import smartdiffdata from "../fixtures/smartdiffdata.json"

const loginpage = new DataDios_LoginPage();
const homepage = new DataDios_HomePage();
const sourcepage = new DataDios_DataSourcePage();

Cypress.Commands.add('docxtoHtml', (docxFilePathinCypress) => {
  console.log(docxFilePathinCypress);
  return new Promise((resolve, reject) => {
    // Convert DOCX to HTML
    mammoth.convertToHtml({ path: docxFilePathinCypress }).then((result) => {
      // Resolve with the HTML content
      console.log("PASS");
      resolve(result.value);
    }) .catch((error) => {
      // Reject with the error
      console.log("FAIL");
      reject(error);
    });
  });
})

// Cypress.Commands.add('findFiles', (path, filename) => {
//   // Defining the custom command 'findFiles'
//   cy.pause();
//   cy.log(path);
//   cy.log(filename);
//   cy.wrap(
//     new Cypress.Promise((resolve, reject) => {
//       verifyDownloadTasks.findFiles({ path, filename })
//         .then(result => {
//           // Assuming findFiles resolves with an array of files or null
//           console.log(filename + "EXISTS IN PATH : " + path );
//           resolve(result);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     })
//   ).as('foundFiles');

  
// });

//login with email and passowrd
Cypress.Commands.add('login', (email,password) => {

  loginpage.getURL();
  loginpage.getUserAPI().as("getUserInfo");
  loginpage.getEmail().type(email);
  loginpage.getLoginAPI().as("login");
  loginpage.getPassword().type(password);
  loginpage.getLoginButton().click();
  cy.wait("@login");
  cy.wait("@getUserInfo");
  Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.once("uncaught:exception", () => false);
    cy.viewport(1280, 720);
})

//selecting Home Page Items - data sources -> sources
Cypress.Commands.add("selectHomePageItem",(ITEM,ITEM_LIST) => {
homepage.getHomePageItems().each(function($e1,index,$list){
  if($e1.text()==ITEM)
    {
      cy.wrap($e1).within(()=>{  
      homepage.getItemsArrow().click()
      //Items - subsection - ex: workflows  
      homepage.getItemsSubsectionEle().each(function($e1,index,$list) {
      if($e1.text().includes(ITEM_LIST))
      {
       cy.wrap($e1).click({force:true})
      }
      })   
      })
    }  
    })
})


//smartdiff - select source tables
Cypress.Commands.add("selectSourceTables",(test)=>{

cy.xpath("(//div[@class='p-card-body'])[1]").then((e)=>{
  cy.wrap(e).within(()=>{
      cy.xpath("(//div[@class='p-card-body'])[1]//li").then((e)=>{
      if((e.text()==test.DATABASE_SRC)||(e.text()==test.DATABASE_TRGT))
      {
          cy.wrap(e).find("button").click({ force: true })
      } 
      else{
          cy.xpath("(//div[@class='p-card-body'])[1]//li//button").click({ force: true })
          cy.xpath("(//div[@class='p-card-body'])[1]//li//ol//li").each((e,index,list)=>{
              if((e.text()==test.DATABASE_SRC)||(e.text()==test.DATABASE_TRGT))
              {
                  cy.wrap(e).find("button").click({ force: true })
              }
              else{
                  cy.wrap(e).find("button").click()
                  cy.xpath("(//div[@class='p-card-body'])[1]//li//ol/li/ol").then((e)=>{
                  if((e.text()==test.DATABASE_SRC)||(e.text()==test.DATABASE_TRGT))
                   {
                        cy.wrap(e).find("button").click({ force: true })
                   }       
                  })
              }
          })             
      }
      })
  })
})

})

//smartdiff - select Target tables
Cypress.Commands.add("selectTargetTables",(test)=>{

cy.xpath("(//div[@class='p-card-body'])[2]").then((e)=>{
  cy.wrap(e).within(()=>{
     cy.xpath("(//div[@class='p-card-body'])[2]//li").then((e)=>{
     if((e.text()==test.DATABASE_SRC)||(e.text()==test.DATABASE_TRGT))
     {
          cy.wrap(e).find("button").click({ force: true })
         //cy.xpath("(//div[@class='p-card-body'])[2]//li//button").click({ force: true })
     }
     else{
      cy.xpath("(//div[@class='p-card-body'])[2]//li//button").click({ force: true })
      cy.xpath("(//div[@class='p-card-body'])[2]//li//ol/li").then((e)=>{
      if((e.text()==test.DATABASE_SRC)||(e.text()==test.DATABASE_TRGT))
          {
          cy.wrap(e).find("button").click({ force: true })
             // cy.xpath("(//div[@class='p-card-body'])[2]//li//ol//button").click({ force: true })
          }
          else{
              cy.wrap(e).find("button").click()
              cy.xpath("(//div[@class='p-card-body'])[2]//li//ol/li/ol").then((e)=>{
              if((e.text()==test.DATABASE_SRC)||(e.text()==test.DATABASE_TRGT))
               {
                    cy.wrap(e).find("button").click({ force: true })                  
               }
              })
          }
      })                          
  }
      })
  })
})

})

//      I created the below Custom Commands
Cypress.Commands.add('logintonopCommerce', (email, password) => { 
    
    cy.visit('https://admin-demo.nopcommerce.com/login?')
    cy.get('input[name=Email]').clear().type(email)
    cy.get('input[name=Password]').clear().type(password)
    cy.get('button[type=submit]').click()

})

Cypress.Commands.add('getIFrame', (iframeLocator) => {
    return cy.get(iframeLocator).its('0.contentDocument.body').
        should('be.visible').then(cy.wrap);
})    

Cypress.Commands.overwriteQuery("contains", function (contains, filter, text, userOptions = {}) {
  
  // This is parameter resolution from Cypress v12.7.0 source
  if (Cypress._.isRegExp(text)) {
    // .contains(filter, text)
    // Do nothing
  } else if (Cypress._.isObject(text)) {
    // .contains(text, userOptions)
    userOptions = text
    text = filter
    filter = ''
  } else if (Cypress._.isUndefined(text)) {
    // .contains(text)
    text = filter
    filter = ''
  }

  userOptions.matchCase = false;

  let contains0 = contains.bind(this)    // this line fixes the error

  return contains0(filter, text, userOptions)
})