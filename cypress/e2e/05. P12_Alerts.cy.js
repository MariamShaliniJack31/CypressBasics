describe('Alerts in Cypress', () => {
    
    it.only('Alert Text can use Cypress also', () => {
        
        //Open the Application
        cy.visit('https://mail.rediff.com/cgi-bin/login.cgi');
        cy.get('input[type=submit]').click()
        //Alert Handling Cypress.on('window:alert', (str) =>
        cy.on('window:alert', (str) =>
            expect(str).to.equal("Please enter a valid user name")
        )
    })

    it('Confirmation Alert Text : OK Button', () => {
        
        //Open the Application
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get('[onclick="myFunctionConfirm()"]').click()
        //Alert Handling
        cy.on('window:confirm', (str) => {
            expect(str).to.contains("button")
        })
        cy.xpath("//p[@id='demo']").should('have.text', "You pressed OK!")
    })

    it('Confirmation Alert Text : Cancel Button', () => {
        
        //Open the Application
        cy.visit('https://testautomationpractice.blogspot.com/')
        cy.get('[onclick="myFunctionConfirm()"]').click()
        //Alert Handling
        cy.on('window:confirm', (str) =>
            expect(str).to.contains("button")
        )
        cy.on('window:confirm', () => false);
        cy.xpath("//p[@id='demo']").should('have.text', "You pressed Cancel!")    
    })

    it('Prompt Alert Text : OK Button', () => {
        
        //Open the Application
        cy.visit('https://testautomationpractice.blogspot.com/')
        
        //STUBS / SPIES
        cy.window().then( (win) => { 
            cy.stub(win, 'prompt').returns('SHALINI');
        })
        cy.xpath("//button[normalize-space()='Prompt']").click();
        
        cy.get("p#demo").should('contain', "How are you today?")    
    })

    ///////This is not Working DONT KNOW HOW TO CLICK ON CANCEL
    it.skip('Prompt Alert Text : Cancel Button', () => {
        
        //Open the Application
        cy.visit('https://testautomationpractice.blogspot.com/')
        
        //STUBS / SPIES
        cy.window().then( (win) => { 
            cy.stub(win, 'prompt').returns('JUTURU');
        })
        cy.xpath("//button[normalize-space()='Prompt']").click();
        
        cy.window().its('prompt').should('be.called')
        cy.on('window:confirm', () => false);

        cy.get("p#demo").should('have.text', "User cancelled the prompt.")    
    })

    it('Authenticated Alerts', () => {
        
        //Open the Application
        cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth")
        cy.get("div[class='example'] p").should('have.contain', "Congratulations! You must have the proper credentials.")    

        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/basic_auth", { auth:
                                                                        {
                                                                            username:"admin",
                                                                            password:"admin"
                                                                        }
                                                                    });
        cy.get("div[class='example'] p").should('have.contain', "Congratulations! You must have the proper credentials.")    
     })
})