describe("Stubbing & Spying", ()=>{

    it("Spying Only", ()=>{

        //  cy.intercept(url) Just url      ====  Specifying a method and url to match can also be acheived by passing the routeMatcher object into cy.intercept
        cy.intercept("/posts").as("postslink1");

        //  cy.intercept(method, url)
        cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts").as("postslink2");
        
        //  cy.intercept(routeMatcher)
        cy.intercept({path: "/posts"}).as("postslink3");

        cy.log("*****   Approach 1  *****")
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait("@postslink1").its("response.statusCode").should("equal", 200);
       
        cy.log("*****   Approach 2  *****")
        cy.wait("@postslink2").its("response.statusCode").should("equal", 200);
        
        cy.log("*****   Approach 3  *****")
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait("@postslink3").its("response.statusCode").should("equal", 200);
        cy.wait("@postslink3").then( (resp) =>{
            cy.log(JSON.stringify(resp))                            //resp is variable here holding
            console.log(JSON.stringify(resp))
            expect(resp.response.body).to.have.length(100)
            cy.log(resp.response.statusCode)
            cy.log(resp)                                            //Object{10}
            cy.log(resp.state)
        })
    })

    it("Spying and Response Stubbing with Static Response", ()=>{

        //  You can even stub and mock a request's response
        //  By passing in a StaticResponse as the last argument, you can statically define (stub) a response for matched requests. See StaticResponse object for the list of properties.
        //   cy.intercept(method, url, staticResponse)
        cy.intercept("GET", "/posts", {totalpost: "59**********&&&&&&&&&99", name: "Naveen"}).as("postslink");
        
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait("@postslink").its("response.statusCode").should("equal", 200);
    })

    it("Spying and Response Stubbing with Dynamic Fixture", ()=>{

        //Dynamic Response Stubbing takes more priority than static == we are getting Fixture Data in Response
        cy.intercept("GET", "/posts", {fixture: 'example.json', totalpost: "59**********&&&&&&&&&99", name: "Naveen", }).as("postslink");
        
        cy.visit("https://jsonplaceholder.typicode.com")
        cy.get("table:nth-of-type(1) a[href='/posts']").click()
        cy.wait("@postslink").its("response.statusCode").should("equal", 200);
    })
})