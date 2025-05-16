describe("ARROW FUNCTION - NO THIS", ()=>{

    it.only("USED NORMAL FUNCTION", function() {
        cy.log(this.test.title)             // CAN retrieve the Title of the Test = USED NORMAL FUNCTION
        cy.log(this.test.parent.title)      // CAN retrieve the Title of the Test = ARROW FUNCTION - NO THIS
        cy.pause();
    })

    it("USED FAT ARROW FUNCTION", () => {
        //cy.log(this.test.title)           // CAN retrieve the Title of the Test
        //cy.log(this.test.parent.title)    // CAN retrieve the Title of the Test

        cy.log("Above Log Msgs not working");
        cy.pause();
    })
    //TypeError
    //Cannot read properties of undefined (reading 'test')
})