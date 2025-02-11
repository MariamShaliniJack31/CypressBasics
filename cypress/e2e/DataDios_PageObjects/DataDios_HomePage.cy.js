import {
    BASE_URL,
    USER_EMAIL,
    USER_PASSWORD,
    USER_TENANT_ID,
    USER_ORG_NAME,
} from "../constants";

import DataDios_LoginPage from "./DataDios_DataSourcePage.cy"

class DataDios_HomePage{
    
    getLogout(){
        return  cy.get("div[class$='dropdown is-hoverable is-right']")
    }

    getUserName()
    {
        return cy.get("span.ml-3.mr-3.is-size-6")
    }

    //9 elements
    getHomePageItems(){
        return cy.get("div.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-button")
    }

    //Home,S2P,P2P,Data Sources... 
    getHomePageItemNames(){
        return cy.get("div.MuiListItemText-root")
    }

    // >
    getItemsArrow(){
        return cy.get("svg.MuiSvgIcon-root")
    }

    //ex: dataSource - sources and Types
    getItemsSubSection(){
        return cy.get("div.MuiCollapse-wrapper")
    }

    //same as above
    getItemsSubsectionEle(){
        return cy.xpath("//div[@class='MuiCollapse-wrapper']//div[@class='MuiListItemText-root']")    
    }
}

export default DataDios_HomePage;