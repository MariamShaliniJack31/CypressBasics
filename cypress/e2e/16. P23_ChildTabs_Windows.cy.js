describe('Child Tab in Cypress', () => {
    
    it('Child Tabs', () => {
        
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/windows")

        //Get Click Here properties
        //Here we are removing target attribute so that clicking on the Link opens new page in same browser
        //Browser User Preference settings will open in same Window or Tab
        cy.xpath("//a[normalize-space()='Click Here']").invoke('removeAttr', 'target').click()
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new' );
        //Do operations

        cy.go('back');
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows' );
     })

    it.only('Child Tabs 2', () => {
        
        //Open the Application
        cy.visit("https://the-internet.herokuapp.com/windows")

        //Get Click Here properties
        cy.xpath("//a[normalize-space()='Click Here']").then( (e) => {

            let newurl = e.prop('href');
            let newwurl = e.attr('href');

            //ATTR USED FOR HREF : https://the-internet.herokuapp.com/windows/new
            cy.log("ATTR USED FOR HREF : "+ newurl);

            //PROP USED FOR HREF : /windows/new
            cy.log("PROP USED FOR HREF : "+ newwurl);       //target=blank, href=windows/new (endpoint is given)
            cy.visit(newurl);                               //Here target=blank, so opening in another Window
        })
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new' );
        //Do operations

        cy.go('back');
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows' );
    })
})