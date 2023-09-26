describe('Frames in Cypress', () => {
    
    it('iFrames', () => {
        
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/iframe")
        
        let frame = cy.get("#mce_0_ifr").its('0.contentDocument.body').
        should('be.visible').then(cy.wrap)
       
        frame.clear().type("Welcome Shalini {ctrl+a}");

        cy.xpath("//button[@title='Bold']").click()
        cy.wait(5000)
        cy.get("button[title='Italic']").click()
     })

    it('iFrames in Custom Commands', () => {
        
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/iframe")
        
        let frame = cy.getIFrame("#mce_0_ifr");
       
        frame.clear().type("Welcome Shalini {ctrl+a}");

        cy.xpath("//button[@title='Bold']").click()
        cy.wait(5000)
        cy.get("button[title='Italic']").click()
    })


    it('Cypress-iFrame Plugin', () => {
        
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/iframe")
        
        // After installing Cypress-iFrame plugin, you get these options
        cy.frameLoaded("#mce_0_ifr")
        cy.iframe("#mce_0_ifr").clear().type("Welcome Shalini {ctrl+a}");

        cy.xpath("//button[@title='Bold']").click()
        cy.wait(5000)
        cy.get("button[title='Italic']").click()
    })
})