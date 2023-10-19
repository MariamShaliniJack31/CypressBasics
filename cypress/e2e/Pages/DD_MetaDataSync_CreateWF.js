export class dd_MDS_CreateWFclass {

    lbl_Source                  =   ".p-checkbox-label";
    btn_Next                    =   "//button[normalize-space()='NEXT']";
    lbl_ListItems               =   "span.MuiTab-wrapper";
    btn_Toggler                 =   "button[class='p-treetable-toggler p-link p-unselectable-text']";
    btn_Togglers_Child          =   "svg[class='p-icon p-treetable-toggler-icon']";
    btn_DropDown_Triangle       =   "button[class='MuiButtonBase-root MuiIconButton-root MuiAutocomplete-popupIndicator']"   
    lst_Schema_rsmeta           =   "#tags-standard-option-0"
    lst_Schema_rsmeta_Customer  =   "#tags-standard-option-1"
    btn_Search                  =   ".custom-btn"
    btn_rsmeta_delete           =   "svg[class='MuiSvgIcon-root MuiChip-deleteIcon']"
    lbl_Tables_test             =   "label[class='ml-2 mt-1']>span"
    tbl_Table                   =   "tbody.p-treetable-tbody"
    tbl_TableToggler            =   "table.p-treetable-table tr"
    txtBox_SearchTable          =   "//input[@placeholder='Search Table']"
    lst_Tables_rs_meta_employee =   "//span[normalize-space()='test:rs_meta:employee']";

    CheckifLabelPresent(labelName){
        
        switch (labelName) {
            
            case "List Items":
                cy.get(this.lbl_ListItems)
                .should("contain", labelName).and("not.be.empty");
                break;
            
            case "Summary":
                cy.get(this.lbl_ListItems)
                .should("contain", labelName).and("not.be.empty");
                break;

            case "test:rs_meta":
                cy.get(this.lbl_Tables_test).should("contain", labelName);
                break;
            
            case "test:rs_meta:product":
                cy.get(this.lbl_Tables_test).should("contain", labelName);
                break;

            case "test:rs_meta:employee":
                cy.xpath(this.lst_Tables_rs_meta_employee).should("contain", labelName);
                break;

            default:
                break;
        }
    }
    
    ClickontheElement(element){
        switch (element) {
            case "NEXT":
                cy.xpath(this.btn_Next).click({ force: true });
                break;
            
            case "List Items":
                cy.get(this.lbl_ListItems).contains("List Items").click({ force: true });
                break;
            
            case "Lineage graphs":
                cy.get(this.lbl_ListItems).contains("Lineage graphs").click({ force: true });
                break;
            
            case "Toggler Button":
                cy.get(this.btn_Toggler).click({ force: true });
                break;
            
            case "rs_meta":
                cy.get(this.lst_Schema_rsmeta).click({ force: true });
                break;
            
            case "rs_meta_delete":
                cy.get(this.btn_rsmeta_delete).click({ force: true });
                break;
            
            case "rs_meta_customer":
                cy.get(this.lst_Schema_rsmeta_Customer).click({ force: true });
                break;

            case "test:rs_meta:employee":
                cy.xpath(this.lst_Tables_rs_meta_employee).click({ force: true });
                break;

            default:
                break;
        }
    }

    ClickontheSimilarElements(element, no){
        switch (element) {
                      
            case "Toggler Button":
                cy.get(this.btn_Togglers_Child).eq(no).click({ force: true });
                break;
            
            case "DropDown TriangleIcon":
                cy.get(this.btn_DropDown_Triangle).eq(no).click({ force: true });
                break;

            case "Search":
                cy.get(this.btn_Search).eq(no).click({ force: true });
                break; 

            default:
                break;
        }
    }

    CheckifDBPresentandClick(DBName){
        cy.get(this.lbl_Source,  { timeout: 10000 }).contains(DBName).click({force:true})
    }

    GetCellvalueinTable(TableNo, RowNo, ColNo , expectedValue){
        cy.get(this.tbl_Table)
        .eq(TableNo)
        .children()
        .eq(RowNo)
        .children()
        .eq(ColNo)
        .should("contain", expectedValue);
    }

    ClickonTableToggler(TableNo, HeadingName, RowNo, ColNo){
    
        cy.contains(this.tbl_TableToggler , HeadingName)
        .children()
        .eq(RowNo)
        .children()
        .eq(ColNo)
        .click({ force: true });
    }

    EnterText(txtBoxName, value){

        switch (txtBoxName) {
            case "Search Table":
                cy.xpath(this.txtBox_SearchTable).type(value+ '{enter}')
                break;
        }
    }
}   

export default dd_MDS_CreateWFclass;