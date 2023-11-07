import {
    BASE_URL,
    USER_EMAIL,
    USER_PASSWORD,
    USER_TENANT_ID,
    USER_ORG_NAME,
  } from "../constants";

class DataDios_SmartDiffPage{

    getCreateDiff(){
        return cy.get("button[class$='p-button p-component']")
    }
    
    getSourceInput(){
        return  cy.get('#clear-on-escape')
    }

    getTargetInput(){
        return cy.xpath("//input[@id='Selected Target DS']")
    }

    getSourceTargetSection(){
        return cy.xpath("//div[@class='columns is-multiline scrollable-selection']")
    }

    getSourceTargetElements(){
        return cy.xpath("//div[@class='column is-3']//label")
    }

    getNextButton(){
        return cy.xpath("//span[normalize-space()='Next']")
    }

    getSourceList(){
        return cy.xpath("(//div[@class='p-card p-component data-compare-card'])[1]//li[@class='rct-node rct-node-leaf']//span[@class='rct-title']",{ timeout: 10000 })
    }

    getTargetList(){
        return cy.xpath("(//div[@class='p-card p-component data-compare-card'])[2]//li[@class='rct-node rct-node-leaf']//span[@class='rct-title']",{ timeout: 10000 })
    }

    getSourceMappings(){
        return cy.xpath("(//div[@class='p-card-body'])[3]//div[@class='column is-6'][1]//div[@class='MuiChip-root']//span")
    }

    getTargetMappings(){
        return cy.xpath("(//div[@class='p-card-body'])[3]//div[@class='column is-6'][2]//div[@class='MuiChip-root']//span")
    }

    getClickOnNext(){
        return cy.get("button[aria-label='Next']");
    }
    
    //data diff
    getSection(){
        return cy.get("section", { timeout: 100000 })
    }

    getCheckBox(){
        //multiple checkboxes
        return cy.get("input[type='checkbox']")
    }

    getProceed(){
        return cy.get(".custom-btn.undefined", { timeout: 10000 })
    }
        
    getSearchBox(){
        return cy.get("input[placeholder='Search Table']",{ timeout: 10000 })
    }

    getViewDiff(){
        return cy.xpath("//button[contains(.,'VIEW DIFF')]")
    }

    getDiffStats(){
        return cy.xpath("//div[@class='d-flex flex-column justify-content-center']//div[@class='diff-stats mt-4 mb-4 text-center row']")
    }

    getStartOver(){
        return cy.get("button[aria-label='Start over']",{ timeout: 10000 })
    }

    getBackButton(){
        return cy.xpath("//button[@class='p-button p-component p-button-icon-only']",{ timeout: 10000 })
    }
    
    getPcardBody(){
        //return cy.get(".p-card-body")
        return cy.xpath("//div[@class='d-flex flex-column justify-content-center']",{ timeout: 10000 })
    }
    
    getElements(){
        return cy.get(".MuiButtonBase-root", { timeout: 10000 })
    }
}

export default DataDios_SmartDiffPage;