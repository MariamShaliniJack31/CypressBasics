import { BASE_URL, USER_EMAIL, USER_PASSWORD, USER_TENANT_ID , IMPORTDSFROMSYSTEMFILE}  from "./constants";
  
import { dd_loginclass } from "./Pages/DD_LoginPage";
var ddlogin = new dd_loginclass()

import { dd_ds_sourcesclass } from "./Pages/DD_Data-Source-Sources";
var dd_dss = new dd_ds_sourcesclass()

import { dd_MDS_CreateWFclass } from "./Pages/DD_MetaDataSync_CreateWF";
var dd_mdscwf = new dd_MDS_CreateWFclass()

import { dd_HomePageclass } from "./Pages/DD_HomePage";
var dd_hp = new dd_HomePageclass();

describe("MetaDataSync_Redshift", () => {
    beforeEach("Login to the Application", ()=> {
        
        // Writing the 3rd argument is Stubbing
        //cy.intercept("GET", "/get_user_info",  { statusCode: 401 }).as("getUserInfoLP");
        //cy.wait("@getUserInfo")   //Stubbing is not Working

        //Intercept Network Requests
        cy.intercept("GET", "/get_user_info").as("getUserInfo");
        cy.intercept("POST", "/login").as("login");

        // LOGIN SECTION
        cy.visit(BASE_URL);
        cy.wait("@getUserInfo").its("response.statusCode").should("equal", 401);
        
        //Enter E-MailID
        ddlogin.enterEMailID(USER_EMAIL)
                
        //Enter Password
        ddlogin.enterPassword(USER_PASSWORD)
        
        //Click on Login Button and intercept Network Requests
        ddlogin.clickLoginButton()
        cy.wait("@login").its("response.statusCode").should("equal", 200);

        // returning false here prevents Cypress from failing the test
        Cypress.on("uncaught:exception", (err, runnable) => {
            return false;
        });
        
        cy.once("uncaught:exception", () => false);
        cy.viewport(1280, 720);

        cy.visit(`${BASE_URL}/data-source/sources`);
        cy.wait("@getUserInfo").its("response.statusCode").should("equal", 200);
    });
  
    it.skip("Add DSJson", () => {
        //Import File from System
        dd_dss.clickImportButton(IMPORTDSFROMSYSTEMFILE);
    });

    it.skip("Click WF", () => {
    
        cy.visit(`${BASE_URL}/metadata-sync`);
        cy.get("tbody tr:nth-child(1) td:nth-child(2)").each(( $e, index, $list) => {

            const author = $e.text()
            //if(author.includes('Amod'))           //Working
            if(author == 'WF_DS2DS_20231017_132837')
            {
                cy.log(author)
                cy.get("tbody tr:nth-child(1) td:nth-child(3)").eq(index).then(function(bname) 
                {
                    //expect(bname.text()).to.includes("3")
                    cy.get("tbody tr:nth-child(1) td:nth-child(3) div").click()
                })
            }
        })
    });
  
    //Test Meta Data Difference (Numeric and Date)
    it.only("Redshift_DeltaFinding", () => {
      
        // cy.visit(`${BASE_URL}/metadata-sync/create-workflow`);
        // cy.visit(`${BASE_URL}/metadata-sync/create-workflow`);
        //Navigate to Metadata Sync > Workflows
        dd_hp.ClickontheElement("Metadata Sync");
        dd_hp.ClickontheElement("Workflows");
        cy.wait(5000);

        //Intercept Network Requests
        cy.intercept("GET", "ds/test_connection/Redshift_metadata").as("DS_src");
        cy.intercept("POST", "/wf/extra_fields").as("ex_fields");
        cy.intercept("POST", "/wf/create").as("create");
        cy.intercept("POST", "/wf/start").as("start");
        cy.intercept("POST", "/wf/end").as("end");

        //Click on Create WorkFlow Button
        dd_mdscwf.ClickontheElement("CREATE WORKFLOW");

        //Select Source DS : Redshift
        dd_mdscwf.CheckifDBPresentandClick("Redshift_metadata");
        cy.wait("@DS_src").its("response.statusCode").should("equal", 200);

        //Select target DS
        dd_mdscwf.CheckifDBPresentandClick("postgres_meta");

        //Click Next to syncmetadatapage
        dd_mdscwf.ClickontheElement("NEXT");
        cy.wait("@create").its("response.statusCode").should("equal", 200);
        cy.wait("@start").its("response.statusCode").should("equal", 200);

        //Check if Summary is Present
        dd_mdscwf.CheckifLabelPresent("Summary");

        //Check if List Items is Present
        dd_mdscwf.CheckifLabelPresent("List Items");

        //Click on the List Items
        dd_mdscwf.ClickontheElement("List Items");

        //Click on Toggler beside Test
        dd_mdscwf.ClickontheElement("Toggler Button");
        cy.wait(500);

        //Click on Toggler beside rs_meta
        dd_mdscwf.ClickontheSimilarElements("Toggler Button", 1);

        //Click on Lineage Graphs
        dd_mdscwf.ClickontheElement("Lineage graphs");
        cy.wait(500);

        //DropDown TriangleIcon
        dd_mdscwf.ClickontheSimilarElements("DropDown TriangleIcon", 0);
        cy.wait(1000)
        
        //Click rs_meta schema
        dd_mdscwf.ClickontheElement("test:rs_meta");
        
        //Click on Search Button
        dd_mdscwf.ClickontheSimilarElements("Search", 0);
        cy.get("canvas").should("be.visible");
        
        dd_mdscwf.ClickontheElement("rs_meta_delete");
        cy.wait(1000)

        //Click on NEXT
        dd_mdscwf.ClickontheElement("NEXT");
        //cy.wait("@end").its("response.statusCode").should("equal", 200);              //NOT WORKING

        //Check if test:rs_meta and test:rs_meta:product Labels are present
        dd_mdscwf.CheckifLabelPresent("test:rs_meta");
        dd_mdscwf.CheckifLabelPresent("test:rs_meta:product");

        //    test:rs_meta:product > SNO
        dd_mdscwf.GetCellvalueinTable(1, 0, 0, "SNO");

        //ATTR_SNO
        dd_mdscwf.GetCellvalueinTable(1, 1, 1, "ATTR_SNO");

        //1 Under Source Value
        dd_mdscwf.GetCellvalueinTable(1, 1, 2, 1);

        //DATA_TYPE
        dd_mdscwf.GetCellvalueinTable(1, 2, 1, "DATA_TYPE");

        //INTEGER
        dd_mdscwf.GetCellvalueinTable(1, 2, 2, "INTEGER");

        //DATA_LENGTH
        dd_mdscwf.GetCellvalueinTable(1, 3, 1, "DATA_LENGTH");

        //32
        dd_mdscwf.GetCellvalueinTable(1, 3, 2, 32);

        //DATA_SCALE
        dd_mdscwf.GetCellvalueinTable(1, 4, 1, "DATA_SCALE");

        //No Value under Source Value
        dd_mdscwf.GetCellvalueinTable(1, 4, 2, "");

        //NULLABLE
        dd_mdscwf.GetCellvalueinTable(1, 5, 1, "NULLABLE");

        //Y
        dd_mdscwf.GetCellvalueinTable(1, 5, 2, "Y");

        //GENERIC_TYPE
        dd_mdscwf.GetCellvalueinTable(1, 6, 1, "GENERIC_TYPE");

        //NUMBER
        dd_mdscwf.GetCellvalueinTable(1, 6, 2, "NUMBER");

        //CAT and Expand CAT
        dd_mdscwf.GetCellvalueinTable(1, 7, 0, "CAT");
        dd_mdscwf.ClickonTableToggler(1, "CAT", 0, 0);

        //DATE and Expand DATE
        dd_mdscwf.GetCellvalueinTable(1, 14, 0, "DATE");
        dd_mdscwf.ClickonTableToggler(1, "DATE", 0, 0);

        //COMPANY and Expand COMPANY
        dd_mdscwf.GetCellvalueinTable(1, 21, 0, "COMPANY");
        dd_mdscwf.ClickonTableToggler(1, "COMPANY", 0, 0);

        //CITY and Expand CITY
        dd_mdscwf.GetCellvalueinTable(1, 28, 0, "CITY");
        dd_mdscwf.ClickonTableToggler(1, "CITY", 0, 0);

        //PHONE and Expand PHONE
        dd_mdscwf.GetCellvalueinTable(1, 35, 0, "PHONE");
        dd_mdscwf.ClickonTableToggler(1, "PHONE", 0, 0);

        //DEVICE and Expand DEVICE
        dd_mdscwf.GetCellvalueinTable(1, 42, 0, "DEVICE");
        dd_mdscwf.ClickonTableToggler(1, "DEVICE", 0, 0);

        //Enter Employee Value in Search Table
        dd_mdscwf.EnterText("Search Table", "employee");
        dd_mdscwf.CheckifLabelPresent("test:rs_meta:employee");

        //Click on test:rs_meta:employee
        dd_mdscwf.ClickontheElement("test:rs_meta:employee");

        //Check for ENAME Heading
        dd_mdscwf.GetCellvalueinTable(1, 0, 0, "ENAME");
        //Check for SNO Heading
        dd_mdscwf.GetCellvalueinTable(1, 7, 0, "SNO");
        //Check for ENO Heading
        dd_mdscwf.GetCellvalueinTable(1, 8, 0, "ENO");
        //Check for SALARY Heading
        dd_mdscwf.GetCellvalueinTable(1, 9, 0, "SALARY");

        //Click on NEXT Button
        dd_mdscwf.ClickontheElement("NEXT");

        //Assert the  table names - contacts
        dd_mdscwf.ClickonObjectMetaDatainDTC("contacts", 1, 2)
        dd_mdscwf.ClickontheElement("CLOSE");
        
        //customerdata
        dd_mdscwf.ClickonObjectMetaDatainDTC("customerdata", 2, 2)
        dd_mdscwf.ClickontheElement("CLOSE");

        //employee
        dd_mdscwf.ClickonObjectMetaDatainDTC("employee", 3, 2)
        dd_mdscwf.ClickontheElement("CLOSE");
        
        //product
        dd_mdscwf.ClickonObjectMetaDatainDTC("product", 4, 2)
        dd_mdscwf.ClickontheElement("CLOSE");
        
        //sampledata
        dd_mdscwf.ClickonObjectMetaDatainDTC("sampledata", 5, 2)
        dd_mdscwf.ClickontheElement("CLOSE");
        
        //customers
        dd_mdscwf.ClickonObjectMetaDatainDTC("customers", 6, 2)
        dd_mdscwf.ClickontheElement("CLOSE");
        
        //Click on NEXT Button
        dd_mdscwf.ClickontheElement("NEXT");
        

        //assert all schemas and tables have import type "INSERT"
        dd_mdscwf.CheckifLabelPresent("Import Type");
        
        //Check if Import Type is INSERT for all the Tables
        dd_mdscwf.GetImportType("TableinTargetImport", "rs_meta", 0, 2, "INSERT")

        dd_mdscwf.GetImportType("TableinTargetImport", "contacts", 1, 2, "INSERT")

        dd_mdscwf.GetImportType("TableinTargetImport", "customerdata", 2, 2, "INSERT")

        dd_mdscwf.GetImportType("TableinTargetImport", "employee", 3, 2, "INSERT")
        
        dd_mdscwf.GetImportType("TableinTargetImport", "product", 4, 2, "INSERT")

        dd_mdscwf.GetImportType("TableinTargetImport", "sampledata", 5, 2, "INSERT")

        dd_mdscwf.GetImportType("TableinTargetImport", "customers", 6, 2, "INSERT")
        
        
    });
});
