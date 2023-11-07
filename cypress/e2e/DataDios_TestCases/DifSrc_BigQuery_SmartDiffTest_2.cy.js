require('cypress-xpath')
/// <reference types="cypress-xpath" />

//smart diff workflow - selects one table at a time

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
import SmartDiffTestdata_1 from "../../fixtures/SmartDiffTestdata_1.json"

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
      
    //smartDiff workflow //same Database and different DB
    //selects one table at a time
    it("SmartDiff_Validation_Test",function(){

        cy.selectHomePageItem(this.data.ITEM_SMARTDIFF,this.data.ITEM_SMARTDIFF_LIST1)
        cy.url().should('eq',this.data.SMARTDIFF_URL)
        diffpage.getCreateDiff().click()
 
        cy.fixture('userdata').then(function(data){        
            this.data = data          
        })

        cy.fixture("SmartDiffTestdata_1.json").then(function(test) {
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

                diffpage.getClickOnNext().should("not.be.enabled")

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
                
                diffpage.getTargetInput().should('have.value',test.DS_TRGT)
                //next  
                diffpage.getClickOnNext().should("be.enabled")     
                diffpage.getNextButton().click({ force: true })
                cy.wait("@list_src").its("response.statusCode").should("equal", 200);
                cy.wait("@list_trgt").its("response.statusCode").should("equal", 200);

                //select source - works for DB/Schema/Tables or DB/Tables or DB/DB/Schema/Tables
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
                }) //source end   

                //select target
                //select source - works for DB/Schema/Tables or DB/Tables or DB/DB/Schema/Tables
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
                })//target ends

                diffpage.getSourceList().each(($e1,index,list)=>{
                    if($e1.text()==test.DS_SRC_TABLE)
                    {
                        cy.wrap($e1).click()
                    }
                })

                diffpage.getTargetList().each(($e1,index,list)=>{
                    if($e1.text()==test.DS_TRGT_TABLE)
                    {
                        cy.wrap($e1).click()
                    }
                })

                //assertions
                diffpage.getSourceMappings().then(object=>{
                    expect(object.text()).to.equal(test.DS_SRC_TABLE);
                })

                diffpage.getTargetMappings().then(object=>{
                    expect(object.text()).to.equal(test.DS_TRGT_TABLE);
                })
                
                //-------------
                diffpage.getNextButton().click({ force: true })
                cy.url().should('eq',this.data.CREATEDIFF_URL)

                //section - selecting one/multiple PK        
                diffpage.getSection().then((e)=>{
                    if(Array.isArray(test.PK)){
                        test.PK.forEach(function(pk){
                            diffpage.getCheckBox().each(($e1,index,$list)=>{                            
                                if(($e1.prop("name")==pk)){
                                    cy.wrap($e1).click({ force: true })
                                }
                            })
                        })
                    }
                    //pk is null value
                    else{   
                        cy.xpath("//section[@id='simple-modal-container']//button[normalize-space()='Skip']").click()
                    }
                    diffpage.getProceed() .click({ force: true });
                })

                //next url 
                cy.url().should('eq',this.data.CREATEDIFF_URL)
                cy.wait("@diff_metadata").its("response.statusCode").should("equal", 200);
                cy.wait("@diff_sum").its("response.statusCode").should("equal", 200);
                    
                //big-query-401013:bigquery_src:date_2 //---------
                cy.xpath("(//tbody)[1]//tr//td[2]").each(($e1,index,list)=>{ 
                    const table =$e1.text()
                    var t = table.split(":")
                    //var tab =t[2].trim()
                    if((t[1]==test.DS_SRC_TABLE)||(t[2]==test.DS_SRC_TABLE))
                    {
                        cy.wrap($e1).click()
                    }
                })
    
                cy.wait(2000)
                diffpage.getPcardBody().should('be.visible')
                diffpage.getElements().contains("DataDiff").click({ force: true })
                //diff rows
                diffpage.getDiffStats().children().first().children().should("contain", test.DIFF_ROW)
                //Same Rows
                diffpage.getDiffStats().children().eq(1).children().should('contain',test.SAME_ROW)
                //Rows in Source
                diffpage.getDiffStats().children().eq(2).children().should("contain", test.ROWS_IN_SOURCE);
                //Rows in Target
                diffpage.getDiffStats().children().eq(3).children().should("contain", test.ROWS_IN_TARGET);
                //Missing Rows in Target
                diffpage.getDiffStats().children().eq(4).children().should("contain", test.MISSING_ROWS_IN_TARGET);
                //New Rows in Target
                diffpage.getDiffStats().children().eq(5).children().should("contain", test.NEW_ROWS_IN_TARGET);

                //start over
                diffpage.getStartOver().click({ force: true })
            })
        }) // Data driven ends
    })//it block
}) // desc 