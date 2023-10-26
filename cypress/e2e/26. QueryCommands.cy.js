// 1	.as()				Assign an alias for later use. Reference the alias later using cy.wait() or cy.get()		.as() yields the same subject it was given.
// 2	.children()			Get the children of each element within a set of DOM elements.					            .children() yields the new DOM element(s) it found
// 3	.closest()			Get the first ancestral element that matches a selector.							        .closest() yields the new DOM element(s) it found.		Find the closest element of the .error with the class 'banner'  cy.get('p.error').closest('.banner')
// 4	.contains()		    Select a DOM element by text content.										                .contains() yields the new DOM element it found.		cy.get(".product-unit-price").contains("$1,800.00")
// 5	.document()		    Get the window.document of the page that is currently active.
// 6	.eq()				Select a DOM element by index from a collection.
// 7	.filter()			Filter elements with a selector.
// 8	.find()			    Find descendent elements with a selector.
// 9	.first()			Select the first item in a collection.
// 10	.focused()			Get the DOM element that is currently focused.
// 11	.get()			    Find DOM elements by selector, or read an alias previously created with the .as() command.
// 12	.hash()			    Get the URL hash of the active page.
// 13	.invoke()			Invoke a function on the previously yielded subject.
// 14	.its()				Get a property's value on the previously yielded subject.
// 15	.last()			    Select the last item in a collection.
// 16	.location()			Get the window.location object of the active page.
// 17	.next()			    Get the next sibling element.
// 18	.nextAll()			Get all following sibling elements.
// 19	.nextUntil()		Get all following sibling elements until reaching a selector.
// 20	.not()			    Filter selected elements with a selector.
// 21	.parent()			Get the parent of a DOM element.
// 22	.parents()			Get all parent elements of a DOM element.
// 23	.parentsUntil()		Get all parent elements up to a selector.
// 24	.prev()			    Get the previous sibling element.
// 25	.prevAll()			Get all previous sibling elements.
// 26	.prevUntil()		Get all following previous sibling elements until reaching a selector.
// 27	.root()			    Get the root DOM element.
// 28	.shadow()			Traverse into the shadow DOM of an element.
// 29	.siblings()			Get all sibling elements.
// 30	.title()			Get the document.title property of the active page.
// 31	.url()				Get the URL of the active page.
// 32	.window()			Get the window object of the active page.


describe("Query Commands", ()=>{

    const fnsub = (a, b) => {
        return a - b
    }
    const getName = ()=> {
        return "Mary Jane"
    }

    it("Invoke Command", ()=>{

        const fnadd = (a, b, c) => {
            return a + b + c
        }
        //Invoke a function on the previously yielded subject.
        cy.wrap({ sum: fnadd })
            .invoke('sum', 2, 4, 6)
            .should('be.gt', 10) // true
            .and('be.lt', 20) // true
        
        cy.wrap({ sum: fnadd })
            .invoke('sum', 12, 14, 16)
            .should('be.gt', 10) // true
        
        cy.wrap({ diff: fnsub })
            .invoke('diff', 13, 4)
            .should('be.lt', 10) // true
            .and('be.gt', 5) // true
        
        cy.wrap({name: getName})
            .invoke('name')
            .should('eq', 'Mary Jane')

        cy.log(Cypress.version)
        })
    
})