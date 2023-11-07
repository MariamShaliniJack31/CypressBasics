require('cypress-xpath')
/// <reference types="cypress-xpath" />

//smartdiff workflow - selects multiple tables at a time in source and target
//fixtures - userdata, 

import {
    BASE_URL,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    USER_EMAIL,
    USER_PASSWORD,
    USER_TENANT_ID,
    USER_ORG_NAME,
} from "../constants";

import command from "../../support/commands.js"

//class import
import DataDios_LoginPage from "../DataDios_PageObjects/DataDios_LoginPage.cy"
import DataDios_HomePage from "../DataDios_PageObjects/DataDios_HomePage.cy"
import DataDios_DataSourcePage from "../DataDios_PageObjects/DataDios_DataSourcePage.cy"
import DataDios_SmartDiffPage from "../DataDios_PageObjects/DataDios_SmartDiffPage.cy"
import userdata from "../../fixtures/userdata.json"
import diff_SameDB_Test1 from "../../fixtures/diff_SameDB_Test1.json"
import diff_DifferentDB_Test1 from "../../fixtures/diff_DifferentDB_Test1.json"

//import smartdiffdata from "../../fixtures/smartdiffdata.json"

const loginpage = new DataDios_LoginPage();
const homepage = new DataDios_HomePage();
const sourcepage = new DataDios_DataSourcePage();
const diffpage = new DataDios_SmartDiffPage();

describe("SmartDiff BigQuery workflow",()=>{

    beforeEach(function () {
        const loginpage = new DataDios_LoginPage();
        const homepage = new DataDios_HomePage();
        const sourcepage = new DataDios_DataSourcePage();
        const diffpage = new DataDios_SmartDiffPage();
      
        cy.fixture('userdata').then(function(data){        
            this.data = data          
        })
        cy.login(USER_EMAIL,USER_PASSWORD)    
    })      
      
    //validates same dbs - bigquery vs bigquery
    it.skip("SmartDiff_Same_DataBases_Test", function() {       
        cy.fixture("diff_SameDB_Test1.json").then(function(test) {
            test.forEach((test) => {      
                cy.fixture('userdata').then(function(data){        
                    this.data = data          
                })
                cy.selectHomePageItem(this.data.ITEM_SMARTDIFF,this.data.ITEM_SMARTDIFF_LIST1)
                cy.url().should('eq',this.data.SMARTDIFF_URL)
                diffpage.getCreateDiff().click()

                cy.intercept('GET', '/ds/test_connection/'+test.DS_SRC).as('DS_src');
                cy.intercept("GET", '/ds/test_connection/'+test.DS_TRGT).as("DS_trgt");
                cy.intercept("POST", '/ds/list_items/'+test.DS_SRC).as("list_src");
                cy.intercept("POST", '/ds/list_items/'+test.DS_TRGT).as("list_trgt");
                cy.intercept("POST", "/diff/diff_metadata").as("diff_metadata");
                cy.intercept("POST", "/diff/get_diff_summary").as("diff_sum");

                //source DS
                diffpage.getSourceTargetSection().within(()=>{
                    diffpage.getSourceTargetElements().each(($e1,index,list)=>{
                        if($e1.text()==test.DS_SRC)
                        {
                            cy.wrap($e1).click({ force: true })
                        }
                    })
                })

                // diffpage.getClickOnNext().should("not.be.visible")
                //target DS
                diffpage.getSourceTargetSection().within(()=>{
                    diffpage.getSourceTargetElements().each(($e1,index,list)=>{
                        if($e1.text()==test.DS_TRGT)
                        {
                            cy.wrap($e1).click({ force: true })
                        }
                    })
                })   
                //assertions
                diffpage.getSourceInput().invoke('val').then(val=>{
                    const inVal = val
                    expect(inVal).to.equal(test.DS_SRC);
                })
                diffpage.getTargetInput().invoke('val').then(val=>{
                    const inVal = val
                    expect(inVal).to.equal(test.DS_TRGT);
                })
                diffpage.getClickOnNext().should("be.enabled")
                diffpage.getNextButton().click({ force: true })
                cy.wait("@list_src").its("response.statusCode").should("equal", 200);
                cy.wait("@list_trgt").its("response.statusCode").should("equal", 200);

                //custom method in commands.js
                cy.selectSourceTables(test)
                cy.selectTargetTables(test)          
                //clicking on tables in source
                test.DS_SRC_TABLE.forEach((table)=>{
                diffpage.getSourceList().each(($e1,index,list)=>{
                    if($e1.text()==table)
                    {
                        cy.wrap($e1).click()
                    }
                })
            })
            
            //clicking on tables in target
            test.DS_TRGT_TABLE.forEach((table)=>{
                diffpage.getTargetList().each(($e1,index,list)=>{
                    if($e1.text()==table)
                    {
                        cy.wrap($e1).click()
                    }
                })
            })

            //assertions on Mappings - source
            diffpage.getSourceMappings().each((table,index,list1)=>{
                expect(list1).to.have.length(test.DS_SRC_TABLE.length)
                expect(Cypress.$(table).text()).to.eq(test.DS_SRC_TABLE[index]);
            })

            //assertions on Mappings - target
            diffpage.getTargetMappings().each((table,index,list2)=>{
                expect(list2).to.have.length(test.DS_TRGT_TABLE.length)
                expect(Cypress.$(table).text()).to.eq(test.DS_TRGT_TABLE[index]);
            })

            diffpage.getNextButton().click({ force: true })
            cy.wait("@diff_metadata").its("response.statusCode").should("equal", 200);
            cy.url().should('eq',this.data.CREATEDIFF_URL)

            //diffpage.getSection().should('be.visible')
            //table 1 - div 1 //table 2 - div 2 // table 3 - div 3
            diffpage.getSection().then((e)=>{
                for(let i=0;i<test.PK.length;i++){   
                    cy.xpath("//div[@style='display: flex; flex-wrap: wrap;']").eq(i).within(($e1)=>{
                        if(Array.isArray(test.PK[i])){
                            test.PK[i].forEach(function(pk){
                                diffpage.getCheckBox().each(($e1,index,$list)=>{                    
                                    if(($e1.prop("name")==pk)){
                                        cy.wrap($e1).click({ force: true })
                                    }
                                })
                            })
                        }
                    })
                }
            }) //section

            //click on proceed
            diffpage.getProceed().click({ force: true });
            cy.url().should('eq',this.data.CREATEDIFF_URL)
            cy.wait("@diff_sum").its("response.statusCode").should("equal", 200);

            for(let i=0;i<test.DS_SRC_TABLE.length;i++){
                diffpage.getSearchBox().clear().type(test.DS_SRC_TABLE[i])
                cy.wait(2000)
                diffpage.getViewDiff().click()
                cy.wait(2000)
                diffpage.getPcardBody().should('be.visible')
                diffpage.getElements().contains("DataDiff").click({ force: true })
                cy.wait(2000)
                //diff stats page
                //diff rows
                diffpage.getDiffStats().children().first().children().should("contain",test.diffStats[i].DIFF_ROW)
                //Same Rows
                diffpage.getDiffStats().children().eq(1).children().should('contain',test.diffStats[i].SAME_ROW)
                //Rows in Source
                diffpage.getDiffStats().children().eq(2).children().should("contain", test.diffStats[i].ROWS_IN_SOURCE);
                //Rows in Target
                diffpage.getDiffStats().children().eq(3).children().should("contain", test.diffStats[i].ROWS_IN_TARGET);
                //Missing Rows in Target
                diffpage.getDiffStats().children().eq(4).children().should("contain", test.diffStats[i].MISSING_ROWS_IN_TARGET);
                //New Rows in Target
                diffpage.getDiffStats().children().eq(5).children().should("contain", test.diffStats[i].NEW_ROWS_IN_TARGET);
                                    
                //back button
                diffpage.getBackButton().click({ force: true })               
            }
            diffpage.getStartOver().click({ force: true })  
            })// data ends   
        })               
    })
   
    // validates different DBs - bigquery vs mysql   
    it("SmartDiff_Different_DataBases_Test", function() {       
        cy.fixture("diff_DifferentDB_Test1.json").then(function(test) {
            test.forEach((test) => {      
                cy.fixture('userdata').then(function(data){        
                    this.data = data          
                })
  
                cy.selectHomePageItem(this.data.ITEM_SMARTDIFF,this.data.ITEM_SMARTDIFF_LIST1)
                cy.url().should('eq',this.data.SMARTDIFF_URL)
                diffpage.getCreateDiff().click()
  
                cy.intercept('GET', '/ds/test_connection/'+test.DS_SRC).as('DS_src');
                cy.intercept("GET", '/ds/test_connection/'+test.DS_TRGT).as("DS_trgt");
                cy.intercept("POST", '/ds/list_items/'+test.DS_SRC).as("list_src");
                cy.intercept("POST", '/ds/list_items/'+test.DS_TRGT).as("list_trgt");
                cy.intercept("POST", "/diff/diff_metadata").as("diff_metadata");
                cy.intercept("POST", "/diff/get_diff_summary").as("diff_sum");
  
                //source DS
                diffpage.getSourceTargetSection().within(()=>{
                    diffpage.getSourceTargetElements().each(($e1,index,list)=>{
                        if($e1.text()==test.DS_SRC)
                        {
                            cy.wrap($e1).click({ force: true })
                        }
                    })
                })
  
                //target DS
                diffpage.getSourceTargetSection().within(()=>{
                    diffpage.getSourceTargetElements().each(($e1,index,list)=>{
                        if($e1.text()==test.DS_TRGT)
                        {
                            cy.wrap($e1).click({ force: true })
                        }
                    })
                })   
         
                //assertions
                diffpage.getSourceInput().invoke('val').then(val=>{
                    const inVal = val
                    expect(inVal).to.equal(test.DS_SRC);
                })
                
                diffpage.getTargetInput().invoke('val').then(val=>{
                    const inVal = val
                    expect(inVal).to.equal(test.DS_TRGT);
                })
    
                diffpage.getNextButton().click({ force: true })
                cy.wait("@list_src").its("response.statusCode").should("equal", 200);
                cy.wait("@list_trgt").its("response.statusCode").should("equal", 200);
    
                //custon methods
                cy.selectSourceTables(test)
                cy.selectTargetTables(test)          
    
                //clicking on tables in source
                test.DS_SRC_TABLE.forEach((table)=>{
                    diffpage.getSourceList().each(($e1,index,list)=>{
                        if($e1.text()==table)
                        {
                            cy.wrap($e1).click()
                        }
                    })
                })
    
                //clicking on tables in target
                test.DS_TRGT_TABLE.forEach((table)=>{
                    diffpage.getTargetList().each(($e1,index,list)=>{
                        if($e1.text()==table)
                        {
                            cy.wrap($e1).click()
                        }
                    })
                })
    
                //assertions on Mappings - source
                diffpage.getSourceMappings().each((table,index,list1)=>{
                    expect(list1).to.have.length(test.DS_SRC_TABLE.length)
                    expect(Cypress.$(table).text()).to.eq(test.DS_SRC_TABLE[index]);
                })
    
                //assertions on Mappings - target
                diffpage.getTargetMappings().each((table,index,list2)=>{
                    expect(list2).to.have.length(test.DS_TRGT_TABLE.length)
                    expect(Cypress.$(table).text()).to.eq(test.DS_TRGT_TABLE[index]);
                })
    
                diffpage.getNextButton().click({ force: true })
                cy.wait("@diff_metadata").its("response.statusCode").should("equal", 200);
                cy.url().should('eq',this.data.CREATEDIFF_URL)
    
                //diffpage.getSection().should('be.visible')
                //table 1 - div 1 //table 2 - div 2 // table 3 - div 3
                diffpage.getSection().then((e)=>{
                    cy.log(test.PK.length)
                    for(let i=0;i<test.PK.length;i++){   
                        cy.xpath("//div[@style='display: flex; flex-wrap: wrap;']").eq(i).within(($e1)=>{
                            if(Array.isArray(test.PK[i])){
                                test.PK[i].forEach(function(pk){
                                    diffpage.getCheckBox().each(($e1,index,$list)=>{                    
                                        if(($e1.prop("name")==pk)){
                                            cy.wrap($e1).click({ force: true })
                                        }
                                    })
                                })
                            }
                        })       
                    }
                }) //section
    
                //click on proceed
                diffpage.getProceed() .click({ force: true });
                cy.url().should('eq',this.data.CREATEDIFF_URL)
                cy.wait("@diff_sum").its("response.statusCode").should("equal", 200);
    
                for(let i=0;i<test.DS_SRC_TABLE.length;i++){
                    diffpage.getSearchBox().clear().type(test.DS_SRC_TABLE[i])
                    cy.wait(2000)
                    diffpage.getViewDiff().click()
                    cy.wait(2000)
                    diffpage.getPcardBody().should('be.visible')
                    diffpage.getElements().contains("DataDiff").click({ force: true })
                    cy.wait(2000)
                    //diff stats page
                    //diff rows
                    diffpage.getDiffStats().children().first().children().should("contain",test.diffStats[i].DIFF_ROW)
                    //Same Rows
                    diffpage.getDiffStats().children().eq(1).children().should('contain',test.diffStats[i].SAME_ROW)
                    //Rows in Source
                    diffpage.getDiffStats().children().eq(2).children().should("contain", test.diffStats[i].ROWS_IN_SOURCE);
                    //Rows in Target
                    diffpage.getDiffStats().children().eq(3).children().should("contain", test.diffStats[i].ROWS_IN_TARGET);
                    //Missing Rows in Target
                    diffpage.getDiffStats().children().eq(4).children().should("contain", test.diffStats[i].MISSING_ROWS_IN_TARGET);
                    //New Rows in Target
                    diffpage.getDiffStats().children().eq(5).children().should("contain", test.diffStats[i].NEW_ROWS_IN_TARGET);
                                
                    //back button
                    diffpage.getBackButton().click({ force: true })               
                }
                diffpage.getStartOver().click({ force: true })  
            })// data ends   
        })               
    })
   
    after(()=>{
        cy.wait(3000);
    })
})                            