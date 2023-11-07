import { BASE_URL, USER_EMAIL, USER_PASSWORD, USER_TENANT_ID, IMPORTDSFROMSYSTEMFILE, } from "./constants";

import { dd_loginclass } from "./Pages/DD_LoginPage";
var ddlogin = new dd_loginclass();

import { dd_ds_sourcesclass } from "./Pages/DD_Data-Source-Sources";
var dd_dss = new dd_ds_sourcesclass();

import { dd_MDS_CreateWFclass } from "./Pages/DD_MetaDataSync_CreateWF";
var dd_mdscwf = new dd_MDS_CreateWFclass();

import { dd_HomePageclass } from "./Pages/DD_HomePage";
var dd_hp = new dd_HomePageclass();

describe("Redshift_To_PG", () => {

    beforeEach(() => {
    
        //Intercept Network Requests
        cy.intercept("GET", "/get_user_info", "Success").as("getUserInfo");
        cy.intercept("POST", "/login").as("login");

        // LOGIN SECTION
        cy.visit(BASE_URL);
                
        //Enter E-MailID
        ddlogin.enterEMailID(USER_EMAIL)
                
        //Enter Password
        ddlogin.enterPassword(USER_PASSWORD)
        
        //Click on Login Button and intercept Network Requests
        ddlogin.clickLoginButton()
        cy.wait("@login").its("response.statusCode").should("equal", 200);
       
        Cypress.on("uncaught:exception", (err, runnable) => {
            return false;
        });
        cy.once("uncaught:exception", () => false);
        cy.viewport(1280, 720);
    });

    it("Add DSJson", () => {

        //Navigate to Data Source > Sources
        dd_hp.ClickontheElement("Data Source");
        dd_hp.ClickontheElement("Sources")
        cy.wait(5000)
        //Import File from System
        dd_dss.clickImportButton(IMPORTDSFROMSYSTEMFILE);
        cy.wait(5000)
    });

    //Test Meta Data Difference (Numeric and Date)
    it.skip("Redshift_TargetImport", () => {
    
        //Intercepting Network Request
        cy.intercept("GET", "/ds/test_connection/Redshift_syncmetadata").as("DS_src");
        cy.intercept("GET", "/ds/test_connection/postgres_syncmeta").as("DS_trgt");
        cy.intercept("POST", "/wf/extra_fields").as("ex_fields");
        cy.intercept("POST", "/wf/create").as("create");
        cy.intercept("POST", "/wf/start").as("start");
        cy.intercept("POST", "/wf/end").as("end");

        //Navigate to Metadata Sync > Workflows
        dd_hp.ClickontheElement("Metadata Sync");
        dd_hp.ClickontheElement("Workflows")
        cy.wait(5000)

        //Click on Create WorkFlow
        dd_mdscwf.ClickontheElement("CREATE WORKFLOW")
        
        //Select Source DS
        dd_mdscwf.CheckifDBPresentandClick("Redshift_syncmetadata");
        cy.wait("@DS_src").its("response.statusCode").should("equal", 200);

        //Select target DS
        dd_mdscwf.CheckifDBPresentandClick("postgres_syncmeta");
        cy.wait("@DS_trgt").its("response.statusCode").should("equal", 200);

        //Click Next in Create Workflow
        dd_mdscwf.ClickontheElement("NEXT");
        cy.wait("@create").its("response.statusCode").should("equal", 200);
        cy.wait("@start").its("response.statusCode").should("equal", 200);

        //Click Next in Sync Meta Data page
        dd_mdscwf.ClickontheElement("NEXT");

        //Click Next in Delta Finding page
        dd_mdscwf.ClickontheElement("NEXT");

        //Click Next in Delta to Target Conversion page
        dd_mdscwf.ClickontheElement("NEXT");
        
        //click Reset in Target Import Page to go back to workflows
        dd_mdscwf.ClickontheElement("RESET");
    });

    it("Redshift_metadata", () => {
        
        //Navigate to Data Source > Sources
        dd_hp.ClickontheElement("Data Source");
        dd_hp.ClickontheElement("Sources")

        //Click in Database
        dd_dss.ClickontheElement("Database");
        cy.wait(1000);

        cy.get("table.p-treetable-scrollable-body-table tr")
        .contains("Redshift_syncmetadata")
        .parentsUntil("tbody")
        .children()
        .eq(2)
        .click();
        cy.get("div[role='presentation'] button")
        .contains("PROCEED")
        .click({ force: true });

        cy.contains("table.p-treetable-scrollable-body-table tr", "test")
        .children()
        .first()
        .children()
        .first()
        .click();
        cy.contains("table.p-treetable-scrollable-body-table tr", "rs_metadatasync")
        .children()
        .first()
        .children()
        .first()
        .click();
        cy.get("table.p-treetable-scrollable-body-table tr")
        .contains("cust_contacts")
        .click();
        cy.get("section").should("be.visible");
        cy.get('span[class="p-button-icon p-c pi pi-pencil"]').click();
        cy.get("section").should("be.visible");
        cy.get('input[name="AlterTable"]')
        .clear()
        .type("rs_metadatasync.cust_contacts rename to contacts");
        cy.xpath("//span[normalize-space()='Submit']").click();
        cy.get("section").should("be.visible");
        cy.xpath("//button[normalize-space()='UPDATE']").click();
        cy.wait(3000);
        cy.xpath("//span[@class='p-button-icon p-c pi pi-times']").click();

        cy.get("table.p-treetable-scrollable-body-table tr")
        .contains("personsdata")
        .click();
        cy.get("section").should("be.visible");
        cy.get('span[class="p-button-icon p-c pi pi-pencil"]').click();
        cy.get("section").should("be.visible");
        cy.get('input[name="AlterTable"]')
        .clear()
        .type("rs_metadatasync.personsdata rename column cust_no to Cust_ID");
        cy.xpath("//span[normalize-space()='Submit']").click();
        cy.get("section").should("be.visible");
        cy.xpath("//button[normalize-space()='UPDATE']").click();
        cy.wait(3000);
        cy.xpath("//span[@class='p-button-icon p-c pi pi-times']").click();

        cy.get("table.p-treetable-scrollable-body-table tr")
        .contains("customers_new")
        .click();
        cy.get("section").should("be.visible");
        cy.get('span[class="p-button-icon p-c pi pi-pencil"]').click();
        cy.get("section").should("be.visible");
        cy.get('input[name="AlterTable"]')
        .clear()
        .type("rs_metadatasync.customers_new add column salary varchar(50)");
        cy.xpath("//span[normalize-space()='Submit']").click();
        cy.get("section").should("be.visible");
        cy.xpath("//button[normalize-space()='UPDATE']").click();
        cy.wait(3000);
        cy.xpath("//span[@class='p-button-icon p-c pi pi-times']").click();

        cy.get("table.p-treetable-scrollable-body-table tr")
        .contains("employee_new")
        .click();
        cy.get("section").should("be.visible");
        cy.get('span[class="p-button-icon p-c pi pi-pencil"]').click();
        cy.get("section").should("be.visible");
        cy.get('input[name="AlterTable"]').type(
        "rs_metadatasync.employee_new drop column sno"
        );
        cy.xpath("//span[normalize-space()='Submit']").click();
        cy.get("section").should("be.visible");
        cy.xpath("//button[normalize-space()='UPDATE']").click();
        cy.wait(3000);
        cy.xpath("//span[@class='p-button-icon p-c pi pi-times']").click();

        cy.get(
        'button[class="p-button p-component p-button-text p-button undefined p-button-icon-only"]'
        )
        .eq(1)
        .click();
    });

  it.skip("Redshift_syncworkflow", () => {
    // cy.visit(`${BASE_URL}/metadata-sync`);
    //cy.get('div[aria-label="Metadata Sync"]').click();
    //cy.get('div[aria-label="Workflows"]').click();
    cy.get("div").contains("Metadata Sync").click({ force: true });
    cy.get("div").contains("Workflows").click({ force: true });

    //cy.contains("tbody.p-datatable-tbody tr", "WF_DS2DS_20231017_132837").children().eq(2).click();
    cy.wait(3000);
    cy.get('input[class="p-inputtext p-component"]').type(
      "WF_DS2DS_20231017_132837"
    );
    cy.get("tbody tr:nth-child(1) td:nth-child(2)").each(($e, index, $list) => {
      const WF_DES = $e.text();

      if (WF_DES == "WF_DS2DS_20231017_132837") {
        cy.log("wfdes");
        cy.get("tbody tr:nth-child(1) td:nth-child(3)")
          .eq(index)
          .then(function (syncwf) {
            cy.get("tbody tr:nth-child(1) td:nth-child(3) div").click();
            cy.wait(5000);
          });
        cy.get(".custom-btn")
          .contains(" CREATE SYNC WORKFLOW")
          .click({ force: true });
      }
      cy.get("div.p-card-content").should("be.visible").and("not.be.empty");
      // cy.log("prev sync data visible");
    });
    // cy.xpath("//button[normalize-space()='NEXT']").click();
    dd_mdscwf.ClickontheElement("NEXT");
    cy.wait(5000);

    cy.get('label[class="ml-2 mt-1"]')
      .contains("test:rs_metadatasync:contacts")
      .should("have.css", "color", "rgb(0, 128, 0)");
    cy.log("green color assertion passed");
    cy.get('label[class="ml-2 mt-1"]')
      .contains("test:rs_metadatasync:cust_contacts")
      .should("have.css", "color", "rgb(255, 0, 0)");
    cy.get('label[class="ml-2 mt-1"]')
      .contains("test:rs_metadatasync:personsdata")
      .should("have.css", "color", "rgb(255, 165, 0)");
    cy.get('label[class="ml-2 mt-1"]')
      .contains("test:rs_metadatasync:employee_new")
      .should("have.css", "color", "rgb(255, 165, 0)");
    cy.get('label[class="ml-2 mt-1"]')
      .contains("test:rs_metadatasync:customers_new")
      .should("have.css", "color", "rgb(255, 165, 0)");

    dd_mdscwf.ClickontheElement("NEXT");
    dd_mdscwf.ClickontheElement("contacts");
    //cy.contains("tbody.p-treetable-tbody", "contacts").children().last().click();
    cy.get("section").should("be.visible").and("not.be.empty");

    cy.contains("tbody.p-treetable-tbody", "personsdata")
      .children()
      .last()
      .click();
    cy.get("section").should("be.visible").and("not.be.empty");

    cy.contains("tbody.p-treetable-tbody", "customers_new")
      .children()
      .last()
      .click();
    cy.get("section").should("be.visible").and("not.be.empty");

    cy.contains("tbody.p-treetable-tbody", "employee_new")
      .children()
      .last()
      .click();
    cy.get("section").should("be.visible").and("not.be.empty");

    cy.contains("tbody.p-treetable-tbody", "cust_contacts")
      .children()
      .last()
      .click();
    cy.get("section").should("be.visible").and("not.be.empty");

    dd_mdscwf.ClickontheElement("NEXT");

    //Assertions in Target Import page

    cy.contains("tbody.p-treetable-tbody", "contacts")
      .children()
      .first()
      .children()
      .eq(2)
      .should("contain", "INSERT");

    cy.log("import passed");
    cy.contains("tbody.p-treetable-tbody", "contacts")
      .children()
      .eq(1)
      .children()
      .eq(2)
      .should("contain", "INSERT");
    cy.contains("tbody.p-treetable-tbody", "personsdata")
      .children()
      .eq(2)
      .children()
      .eq(2)
      .should("contain", "UPDATE");
    cy.contains("tbody.p-treetable-tbody", "customers_new")
      .children()
      .eq(3)
      .children()
      .eq(2)
      .should("contain", "UPDATE");
    cy.contains("tbody.p-treetable-tbody", "employee_new")
      .children()
      .eq(4)
      .children()
      .eq(2)
      .should("contain", "UPDATE");

    cy.contains("tbody.p-treetable-tbody", "cust_contacts")
      .children()
      .eq(5)
      .children()
      .eq(2)
      .should("contain", "DELETE");
  });
});
