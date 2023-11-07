import {
    BASE_URL,
    USER_EMAIL,
    USER_PASSWORD,
    USER_TENANT_ID,
    USER_ORG_NAME,
} from "../constants";

class DataDios_DataSourcePage{

  getImportJSON(){
    return cy.get("input[type=file]")
  }

  //search box
  getSearch(){
    return cy.get("input[type$='search']")
  }

  getCreateDataSourceAPI(){
    return  cy.intercept("POST", "/ds/create").as("createDataSource");
  }

  getSupportedTypesAPI(){
    return cy.intercept("GET", "/ds/supported_types").as("supportedTypes");
  }

  getTestConnectionAPI(){
    return  cy.intercept("POST", "/ds/test_new_connection").as("testConnection");
  }

  getDataSourcesAPI(){
    cy.intercept("GET", "/ds").as("getDataSources");
  }

  getDeleteDataSourcesAPI(){
    return  cy.intercept("POST", "/ds/delete?ds_name=*").as("deleteDataSource");
  }

  getListItemsAPI(){
    return cy.intercept("POST", "/ds/list_items/*").as("listItems");
  }

  getReadMetaDataAPI(){
    return cy.intercept("POST", "/ds/read_metadata").as("readMetaData");
  }

  getReadObjectAPI(){
    return cy.intercept("POST", "/ds/read_object").as("readObject");
  }
  /*
    cy.intercept("GET", "/ds/supported_types").as("supportedTypes");
    cy.intercept("POST", "/ds/test_new_connection").as("testConnection");
    cy.intercept("POST", "/ds/create").as("createDataSource");
    cy.intercept("GET", "/ds").as("getDataSources");
    cy.intercept("POST", "/ds/delete?ds_name=*").as("deleteDataSource");
    cy.intercept("POST", "/ds/list_items/*").as("listItems");
    cy.intercept("POST", "/ds/read_metadata").as("readMetaData");
    cy.intercept("POST", "/ds/read_object").as("readObject");
  */

  getImportCreateDS(){
    return cy.get("div.mb-2.mr-3")
  }

  getCreateSource(){
    return cy.xpath("//span[normalize-space()='CREATE SOURCE']")
  }

  getSelectDSType(){
    return cy.get("div[id='multiLevelSelectTree']")
  }
   
  getDSTypeList(){
    return cy.xpath("//ul[@class='p-tree-container']//li")
  }

  getDBTypeList(){
    return cy.xpath("//ul[@class='p-treenode-children']//li")
  }

  getSection(){
    return cy.xpath("//section[@id='simple-modal-container']")
  }

  getProceedButton(){
    return cy.xpath("//button[contains(normalize-space(),'PROCEED')]")
  }

  //DS - DATABASE, SERVICE, FOLDER
  getDSContents(){
    return cy.xpath("//tbody[@class='p-treetable-tbody']//tr/td[1]")
  }
  
  //Database arrow to list the DS - >
  getDbArrow(){
    return cy.get("button[class$='p-treetable-toggler p-link p-unselectable-text']")
    //svg.p-icon.p-treetable-toggler-icon
    //button.p-treetable-toggler.p-link.p-unselectable-text
  }

  //DS Elements- mysql_source,postgres_target....
  getDataSources(){
    return cy.xpath("//tbody[@class='p-treetable-tbody']//tr/td[1]")
  }

  //WITHIN THE DATABASE - DS element(mysql_source) - just get names to click()
  getDSNames(){
    return cy.xpath("//span[@style='cursor: pointer;']")
    // return cy.xpath("//tbody[@class='p-treetable-tbody']//tr[position()>1]/td[1]/span[3]")
  }
 
  getDataSources1(){
    return cy.xpath("//tbody[@class='p-treetable-tbody']//tr[position()>1]//td[1]")
  }

  getDataSources2(){
    return cy.xpath("//tbody[@class='p-treetable-tbody']//tr[position()>2]//td[1]")
  }

  getDataSources3(){
    return cy.xpath("//tbody[@class='p-treetable-tbody']//tr[position()>3]//td[1]")
  }
}

export default DataDios_DataSourcePage;