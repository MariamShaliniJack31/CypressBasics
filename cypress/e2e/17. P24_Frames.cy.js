describe('Frames in Cypress', () => {
    
    it('iFrames Using switchToIFrame - THIS IS NOT WORKING', () => {
        
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/iframe");
        cy.log("In Cypress, there isn't a direct cy.switchToIframe() command like in other testing frameworks. Instead, Cypress provides the .iframe() command to interact with iframes.")
        cy.get("#mce_0_ifr").iframe().then(($iframe) => {
            // Now you're inside the iframe
            // You can interact with its contents using standard Cypress commands
            
            cy.log ($iframe.contents().find('body#tinymce > p').contents());
            $iframe.find('#tinymce').clear;
        });
        
    })
    
    it('iFrames Using contentDocument', () => {
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/iframe")
        
        let frame = cy.get("#mce_0_ifr").its('0.contentDocument.body').
        should('be.visible').then(cy.wrap)
        cy.wait(2500)
        //its('0'): The its() command can take a string argument representing the property name or a numeric index. In this case, it's accessing the first item (index 0) of the previous subject.
        frame.clear().type("Welcome Shalini {ctrl+a}");

        cy.xpath("//button[@title='Bold']").click()
        cy.wait(2500)
        cy.get("button[title='Italic']").click()
     })

    it('iFrames in Custom Commands', () => {
        
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/iframe")
        
        let frame = cy.getIFrame("#mce_0_ifr");                 //getIFrame is in commands.js
       
        frame.clear().type("Welcome Shalini {ctrl+a}");
        cy.xpath("//button[@title='Bold']").click()
        cy.wait(5000)
        cy.get("button[title='Italic']").click()
    })


    it.only('Cypress-iFrame Plugin', () => {
        
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