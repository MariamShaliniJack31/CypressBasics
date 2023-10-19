export class dd_ds_sourcesclass {

    btn_import_ds = "input[type=file]";

    clickImportButton(filefromsys) {
        cy.get(this.btn_import_ds).selectFile(
            filefromsys, { force: true }, { action: "drag-drop" }
        )
    }   
}
export default dd_ds_sourcesclass;