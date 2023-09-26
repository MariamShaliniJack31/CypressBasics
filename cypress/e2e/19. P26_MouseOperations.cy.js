describe('Mouse Operations in Cypress', () => {

    it('Mouseover', () => {
        
        cy.visit("https://demo.opencart.com/");
        cy.xpath("//a[normalize-space()='Mac (1)']").should('not.be.visible');

        cy.xpath("//a[normalize-space()='Desktops']").trigger('mouseover').click();
        cy.xpath("//a[normalize-space()='Mac (1)']").should('be.visible');

    })

    it('Right Click', () => {
        
        cy.visit("http://swisnl.github.io/jQuery-contextMenu/demo.html");
        
        cy.get(".context-menu-one.btn.btn-neutral").rightclick();
        //cy.get(".context-menu-one.btn.btn-neutral").trigger('contextmenu');
        cy.get("li[class='context-menu-item context-menu-icon context-menu-icon-copy']>span").should('be.visible');

        cy.xpath("//span[normalize-space()='Quit']").should('be.visible');
    })

    it('Double Click using Frames', () => {
        
        cy.visit("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_ev_ondblclick3");

        cy.frameLoaded("#iframeResult");
        cy.iframe("#iframeResult").find("button[ondblclick='myFunction()']").trigger('dblclick');
        
        //This line also works
        //cy.iframe("#iframeResult").find("button[ondblclick='myFunction()']").dblclick();
        
        cy.iframe("#iframeResult").find("#field2").should('have.value', "Hello World!");
    })

    it('Drag and Drop', () => {
        
        cy.visit("http://dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html");
        cy.xpath("//div[@id='box3']").should('be.visible')
        cy.get(".dragableBoxRight#box103").should('be.visible');

        cy.xpath("//div[@id='box3']").drag(".dragableBoxRight#box103", {force:true});
    })

    it.only('Scrolling', () => {
        
        cy.visit("https://www.countries-ofthe-world.com/flags-of-the-world.html");
        
        cy.xpath("//td[normalize-space()='India']").scrollIntoView().should('be.visible')
        cy.xpath("//td[normalize-space()='Uzbekistan']").should('be.visible');

        cy.xpath("//td[normalize-space()='Luxembourg']").scrollIntoView({duration:3000}).should('be.visible');
        cy.xpath("//td[normalize-space()='Algeria']").scrollIntoView({duration:3000}).should('be.visible');

        cy.get("#footer").scrollIntoView().should('be.visible');
        cy.get("#footer>ul>li:nth-child(1)").scrollIntoView().should('be.visible');
    })
    
})