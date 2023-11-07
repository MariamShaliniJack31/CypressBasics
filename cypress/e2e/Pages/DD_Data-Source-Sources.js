export class dd_ds_sourcesclass {

    btn_import_ds   =   "input[type=file]";
    lbl_Database    =   "//span[normalize-space()='Database']"
    
    clickImportButton(filefromsys) {
        cy.get(this.btn_import_ds).selectFile(
            filefromsys, { force: true }, { action: "drag-drop" })
    }

    ClickontheElement(element){
        switch (element) {
            case "Database":
                cy.xpath(this.lbl_Database, {timeout: 100000}).click();
                break;

            default:
                break;
        }
    }
}

export default dd_ds_sourcesclass;