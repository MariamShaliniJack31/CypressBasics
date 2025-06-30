describe("Action Commands", ()=>{

    it("Version Command", ()=>{

        cy.log(Cypress.version)                     //13.1.0
        cy.log(Cypress.arch)                        //x64
        cy.log(Cypress.platform)                    //win32
        cy.log(Cypress.browser.name)                //chrome
        cy.log(Cypress.env("testUser"))             //Defined in cypress.env.json

        cy.window().then((win) => {
            cy.log(win.navigator.userAgent);        //Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36
            cy.log(win.innerWidth);                 //1000
            cy.log(win.innerHeight);                //660
        });

        cy.log(`Viewport Width: ${Cypress.config('viewportWidth')}`)        //Viewport Width: 1000
        cy.log(`Viewport Height: ${Cypress.config('viewportHeight')}`)      //Viewport Height: 660
        
    })

    it('logs browser details', () => {
        cy.log(`Browser name: ${Cypress.browser.name}`)                 //Browser name: chrome
        cy.log(`Browser family: ${Cypress.browser.family}`)             //Browser family: chromium
        cy.log(`Browser version: ${Cypress.browser.version}`)           //Browser version: 137.0.7151.69
        cy.log(`Is headless: ${Cypress.browser.isHeadless}`)            //false
        cy.log(`Is headed: ${Cypress.browser.isHeaded}`)                //true

        cy.viewport(1280, 720);
        cy.log(Cypress.config("viewportWidth"));
        cy.log(Cypress.config("viewportHeight"));

        cy.window().then( (win) => {
            cy.log(win.innerWidth);
            cy.log(win.innerHeight);
        })
    })
})