describe("ARROW FUNCTION - NO THIS", ()=>{

    it("USED NORMAL FUNCTION", function() {
        cy.log(this.test.title)             // CAN retrieve the Title of the Test
        cy.log(this.test.parent.title)      // CAN retrieve the Title of the Test
    })

    it("USED FAT ARROW FUNCTION", () => {
        //cy.log(this.test.title)           // CAN retrieve the Title of the Test
        //cy.log(this.test.parent.title)    // CAN retrieve the Title of the Test

        cy.log("Above Log Msgs not working");
    })
    //TypeError
    //Cannot read properties of undefined (reading 'test')
    
})