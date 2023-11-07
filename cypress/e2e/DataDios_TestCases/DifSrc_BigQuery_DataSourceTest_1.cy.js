require('cypress-xpath')
/// <reference types="cypress-xpath" />

//create Data Sources using Import(multiple DS at a time), validate whether DS exists, 
//then click on each DS and validate no. of tables

//fixtures - userdata,Databasetables.json

import {
    BASE_URL,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    USER_EMAIL,
    USER_PASSWORD,
    USER_TENANT_ID,
    USER_ORG_NAME,
    BIGQUERY_GROUP,
    BIGQUERY_KEY_DATA,
    BIGQUERY_DB,
    BIGQUERY_SCHEMA,
    BIGQUERY_OBJECT_TYPES,
} from "../constants.js"

import command from "../../support/commands.js"

  //class import
import DataDios_LoginPage from "../DataDios_PageObjects/DataDios_LoginPage.cy"
import DataDios_HomePage from "../DataDios_PageObjects/DataDios_HomePage.cy"
import DataDios_DataSourcePage from "../DataDios_PageObjects/DataDios_DataSourcePage.cy"
import userdata from "../../fixtures/userdata.json"
import ImportJson from "../../fixtures/ImportJson.json"
import Databasetables from "../../fixtures/Databasetables.json"

const loginpage = new DataDios_LoginPage();
const homepage = new DataDios_HomePage();
const sourcepage = new DataDios_DataSourcePage();

describe("DataSource Workflow", ()=> {

  //beforeEach
  beforeEach(function () {

    const loginpage = new DataDios_LoginPage();
    const homepage = new DataDios_HomePage();
    const sourcepage = new DataDios_DataSourcePage();
      
    cy.fixture('userdata').then(function(data){        
      this.data = data          
    })
    cy.login(USER_EMAIL,USER_PASSWORD)
  })
      
  //validation of Homepage URL and Username - then logout
  it.skip("LoginPage_validation_Test",function() {          
    cy.url().should('eq', this.data.HOMEPAGE_URL)
    homepage.getUserName().should('have.text',this.data.USERNAME)
    homepage.getLogout().invoke("show")
    cy.contains("Logout").click({force:true})            
  })
         
  //HomePage - selectHomePageItem() -Navigate to Home page Items and clicking on them (workflows/stages)
  //datasource page - import and validate
  it.skip("DataSource_validation_Test",function() {
    cy.selectHomePageItem(this.data.ITEM_DS,this.data.ITEM_DS_LIST1)
    cy.url().should('eq', this.data.DATASOURCE_URL) 
  
    sourcepage.getDSContents().each(($e1,index,$list)=>{
      if($e1.text()=="Database")
      {
        cy.wait(2000)
        cy.wrap($e1).within(()=>{
          sourcepage.getDbArrow().click()  //
        })
      }
    })//DS is open
        
    //Data driven loop - import and validate
    cy.fixture("ImportJson.json").then(function(user) {
      user.forEach((user) => {             
        //Add Json file
        sourcepage.getImportCreateDS().contains(/IMPORT/i).should("be.enabled");
        sourcepage.getImportJSON().selectFile(user.importJson,{ force: true },{ action: "drag-drop" })
        cy.wait(3000)
        // cy.on('window:alert', (str) => {
        //cy.log(str)
      })

      //get Database sources list - Db is already open 
      //validate whether DS exists after import
      sourcepage.getDataSources().each(($e1,index,$list)=>{
        if($e1.text()==(user.DS_SOURCE) || ($e1.text()==(user.DS_TARGET)))
        {
          cy.log($e1.text()+" exists")               
        }
      })            
    })
  })
  

  //create source work flow
  it("Create Source workflow", function() {
    //login
    //goto datasource - sources
    sourcepage.getSupportedTypesAPI().as("supportedTypes");
    sourcepage.getTestConnectionAPI().as("testConnection");
    sourcepage.getCreateDataSourceAPI().as("createDataSource");
    sourcepage.getCreateDataSourceAPI().as("getDataSources")
    sourcepage.getReadMetaDataAPI().as("readMetaData")
    sourcepage.getListItemsAPI().as("listItems")
    sourcepage.getDeleteDataSourcesAPI().as("deleteDataSource")
    sourcepage.getReadObjectAPI().as("readObject")

    cy.selectHomePageItem(this.data.ITEM_DS,this.data.ITEM_DS_LIST1)
    cy.url().should('eq', this.data.DATASOURCE_URL) 
    //assertions
    sourcepage.getImportCreateDS().contains(/IMPORT/i).should("be.enabled");
    sourcepage.getImportCreateDS().contains(/CREATE SOURCE/i).should("be.enabled");

    sourcepage.getCreateSource().click()
    cy.wait("@supportedTypes");

    sourcepage.getSelectDSType().click()
    sourcepage.getDSTypeList().each(($e1,index,list)=>{               
      if($e1.text()=="Database"){
        cy.wrap($e1).find("button").click()
      }
    })
    
    sourcepage.getDBTypeList().each(($e1,index,list)=>{               
      if($e1.text()=="BigQuery Database"){
        cy.wrap($e1).click()
      }
    })
    
    //assertion
    sourcepage.getSelectDSType().should("contain","BigQuery Database")
      
    cy.get("input[name='name']").type("bigquery_src1")
    cy.get("input[name='group']").type(BIGQUERY_GROUP) 
    cy.get("input[name='database']").type(BIGQUERY_DB)
    cy.get("input[name='schema']").type(BIGQUERY_SCHEMA)
    cy.get("input[name='object_types']").type(BIGQUERY_OBJECT_TYPES)

    cy.get("button[class$='custom-btn undefined']").contains("CREATE").should("not.be.enabled")
    cy.get("button[class$='custom-btn undefined']").contains("TEST CONNECTION").should("not.be.enabled")

    /*cy.get("input[name='key_data']").type(BIGQUERY_KEY_DATA,{
      delay: 0,
      parseSpecialCharSequences: false,
    })*/

    cy.get("input[name='key_data']").type("{\"type\": \"service_account\",\"project_id\":\"big-query-401013\",\"private_key_id\": \"e65d9d2d8ce4331ab10169db23e4f018c8370d81\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2Koqp82GV2N9a\\n6lnXfIdgOlmAUgZWa+J556KcqP1I6YZU8wIv37vXhm+rppMnARVcFfUefCJKySwQ\\nBCqdCC/vGJgmx+ebqJ6R271fvVfRICXM8IaNdHxbL/lo8ecUqSP7mRzLrDvT63X4\\ngm++vSh57cV9KQOK81oS6XWDckYowOCVzZ1au1QH1pNelnvyyErTcjQs3DuzGQu5\\nt22zc+POK5BkAXos5OQG/Xt1Rp4Idsdp1SrfT7fEEwCSgmKPuW5g5HYxSt8LQlVC\\nQ/et0XBmXk0fXYfKdQEHe+SneSvAWQoekksHyfOR1ZjjAgvi9D42ONgga9XsPRM6\\nL73y5fcJAgMBAAECggEACE9YQEC4ocbxCHMSml6FR+3dfZmwTZKyFATNsZcRZ9k0\\nTi2AOuoaRe6Na0+H3LKDVI4xXnzD7TSwYIIqJfv0wNPWxAUgQwTuB+IV6VdIOWNd\\nqhPKVYtb7WZ6uo93bsU4/Z4aVs2ydHxEJ0we+Bzlqus+dDNR5K2tfRmeiVqmCe+P\\n0rJjdmjrmLNsMqiahdMANtlV1hkPFMItnwqfA+YLESG1X3WwSe1AMn+K9npjlwZl\\n9v07kCfj9RyPhvfw6U6iYt+6ObU4JelK8XW3SDL+N8Ie28AbCkAzdMOn0NN8mmQR\\nH53w8ONgryA2etBS8pfNGX2kd5MqTeN0n7sDkeY8wQKBgQDbfF6a+gahzJ4q+TIY\\nlCY9RYAv5NzAqkTle2vePC/4RDEhwIVlvpfG0YnSq4XhqWGiapiA50Px+9RiM3en\\nUfBIZrHdYUb5IQYRK/5IwRfXJII+Qq6i3n3+KmCiV5gPTSZ6smUuSSEZT7P8S1Da\\nCa2A5TTVze4SCx8MJnUEmApXSQKBgQDUeMZOOwn2ElSkX19MkPhtqj3eWmVXyszR\\nJBUd2vRUl2NGPTziqNjUURmqhTKgvesRt/c0CNrQn/cQNpA0t7Udq6pqiQ32EPzh\\naNZl1iYWbRAUI6mSLxEp+lmfXxW0Uwdxz6aVW5dTD07uyKrpIpCGYa6WKhAVizrn\\ntcV3WkvhwQKBgBi4+5cNTq3u9Gn2w9PM7Dm+mF/MsajqBPSsYEwaD3UxiS86FkyN\\nmV8FvzaBp4TxpVO8Gg16/0ZEjXm6PmIUcrJVDvfWuz3YoGxSvkPHrD3JmPoWXMFv\\nulVkxJnEsBYZJJpxecAq8JV/StDCUwscR/Ta3IawuX5Czm557nhj/9YxAoGAGrKu\nYGgkwUneXuUpCWrx/H221njPYS+3etQo3x6DMxnuvIW3X9fNnygtrHKeQPp8Tjaq\\nllxCepKPLfddOXKYDIlkmYxtN608yWot/o/hK1I7AfzVMuw9IOQ3XMJK7OS9+7wW\\n94+RvTsgNPr8Ft1kAa7GjFHuwXZESZdan7u160ECgYEAgvJIHInf0aQ/wNQXuZPb\\n9lfPLAWRiDaKAo0QFCL/mnCYb3DWxAFN6Q4CQS857Uj2Jeke4/vk9q9/fF1YxHc/\\nEaOOQ7DZBVWU3mRTARF6dnbvipyMEczqQCleerbwTC7NCj6IONHxIElXDTEmt4e4\\n4DmSCRb+eoeC9y85aEkcZeU=\\n-----END PRIVATE KEY-----\\n\",\"client_email\": \"bigquery@big-query-401013.iam.gserviceaccount.com\",\"client_id\":\"102502238698493467639\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\", \"token_uri\": \"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/bigquery%40big-query-401013.iam.gserviceaccount.com\",\"universe_domain\": \"googleapis.com\"}",{
      delay: 0,
      parseSpecialCharSequences: false,
    })
    
    cy.get("button[class$='custom-btn undefined']").contains("CREATE").should("be.enabled")
    cy.get("button[class$='custom-btn undefined']").contains("TEST CONNECTION").should("be.enabled")

    cy.get("button[class$='custom-btn undefined']").contains("TEST CONNECTION").click()
    cy.get("div[class$='p-toast-message-text']").should("be.visible")
    
    //assertion
    cy.get("div[class$='p-toast-message-text']").then((e)=>{   
      expect(e.text()).contains("Successfully connected")
    })

    cy.get("button[class$='custom-btn undefined']").contains("CREATE").click()
    cy.get("div[class$='p-toast-message-text']").should("be.visible")
    
    //assertion
    cy.get("div[class$='p-toast-message-text']").then((e)=>{   
      expect(e.text()).contains("Successfully connected")
    })   
  })

  //tables validation in each Data source
  //works for DB/Schema/Tables or DB/Tables or DB/DB/Schema/Tables
  it.skip("DataSource_Table_Validation_Test",function() {
    cy.fixture("Databasetables.json").then(function(user) {
      user.forEach((user) => {
        cy.selectHomePageItem(this.data.ITEM_DS,this.data.ITEM_DS_LIST1)
        cy.url().should('eq', this.data.DATASOURCE_URL)
        
        sourcepage.getDSContents().each(($e1,index,$list)=>{
          if($e1.text()=="Database")
          {
            cy.wrap($e1).within(()=>{
              sourcepage.getDbArrow().click()
            })
          }
        }) // > DB open
        //read each DS, validate tables 
        sourcepage.getDataSources().each(($e1,index,$list)=>{
          if($e1.text()==user.DATASOURCE)
          {
            cy.wrap($e1).within(()=>{                  
              sourcepage.getDSNames().eq(index).click()
              cy.wait(2000)
            })
            sourcepage.getSection()
            sourcepage.getProceedButton().click()
            cy.wait(2000)
            cy.url().should('eq',user.URL)

            //tables validation
            sourcepage.getDSContents().each((e1,indes,list)=>{
              //let pos
              if(e1.text()==(user.DATABASE)){
                //pos= 1
                cy.wrap(e1).within(()=>{                        
                  sourcepage.getDSContents().find("button").click()                      
                  sourcepage.getDataSources1().should('have.length', user.TABLES)                     
                })
              }
              else{
                //let pos = 1
                sourcepage.getDSContents().find("button").click()                     
                sourcepage.getDataSources1().then((e)=>{
                  cy.log(e.text())
                  // pos =2
                  if(e.text()==user.DATABASE){   
                    pos =2                  
                    cy.wrap(e).find("button").click()   
                    sourcepage.getDataSources2().should('have.length', user.TABLES)                      
                  } 
                  else{
                    // pos = 1
                    sourcepage.getDataSources1().find("button").click()
                    //pos=2
                    sourcepage.getDataSources2().then((e)=>{                    
                      if(e.text()==user.DATABASE){  
                        //pos=3                   
                        cy.wrap(e).find("button").click()      
                        sourcepage.getDataSources3().should('have.length', user.TABLES)                              
                      }
                    })                 
                  }                                             
                })                
              }//else
            })                      
          } 
        })               
      })//data
    })//data
  })//it  
     
  after(()=>  {
    cy.wait(3000);
  })
})    