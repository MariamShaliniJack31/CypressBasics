describe('API Automation in Cypress', () => {
    // Get a property's value on the previously yielded subject.
    it("GET Request", ()=> {
        cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1")
        .its("status")
        .should('eq', 200);
    })

    it("POST Request", ()=> {
        cy.request({
                        method:"POST",
                        url: "https://jsonplaceholder.typicode.com/posts/",
                        body: {
                            userId: "1",
                            title: "This is my 1st POST on 3-Oct-2023",
                            body: "This is my 1st BODY 3-Oct-2023"
                        }
                    })
                    .its("statusText")
                    .should('contain', "Created")
    })

    it.only("POST Request2", ()=> {
        cy.request("POST", "https://jsonplaceholder.typicode.com/posts/",
                    {
                        userId: "1",
                        title: "This is my 1st POST on 3-Oct-2023",
                        body: "This is my 1st BODY 3-Oct-2023"
                    })
                    .its("statusText")
                    .should('contain', "Created")
    })

    it("PUT Request", ()=> {
        cy.request({
                        method:"PUT",
                        url: "https://jsonplaceholder.typicode.com/posts/1",
                        body: {
                            userId: "1",
                            title: "This is my 1st PUT on 3-Oct-2023",
                            body: "This is my 1st PUT BODY 3-Oct-2023",
                            id: 1,
                        }
                    })
                    .its("status")
                    .should('eq', 200)
    })

    it("DELETE Request", ()=> {
        cy.request({
                        method:"DELETE",
                        url: "https://jsonplaceholder.typicode.com/posts/3",
                    })
                    .its("status")
                    .should('eq', 200)
    })
})