export class dd_HomePageclass {

    lbl_LeftSidePanel  = "//span[@class='MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock']"
    

    ClickontheElement(element){
        switch (element) {
            case "Data Source":
                cy.xpath(this.lbl_LeftSidePanel).contains("Data Source").click({ force: true });
                break;
            
            case "Sources":
                cy.xpath(this.lbl_LeftSidePanel).contains("Sources").click({ force: true });
                break;

            case "Metadata Sync":
                cy.xpath(this.lbl_LeftSidePanel).contains("Metadata Sync").click({ force: true });
                break;

            case "Workflows":
                cy.xpath(this.lbl_LeftSidePanel).contains("Workflows").click({ force: true });
                break;
            
            default:
                break;
        }
    }
}

export default dd_HomePageclass;