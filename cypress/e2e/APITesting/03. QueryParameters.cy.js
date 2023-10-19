describe('Passing Query Parameters in GET Request in Cypress', () => {

    const queryparam = {page:2};                // Dont keep inverted commas
    it("Pass Query Params in GET Request", ()=> {
        cy.request({
                        method:"GET",
                        url: "https://reqres.in/api/users",
                        qs: {page:2}
                    })
                    .its("statusText")
                    .should('contain', "OK")
    })

    it("Use const variable - Pass Query Params in GET Request", ()=> {

        cy.request({
                        method:"GET",
                        url: "https://reqres.in/api/users",
                        qs: queryparam
                    })
                    .then( (response) => {
                        expect(response.status).to.be.equal(200);
                        assert.equal(response.status, 200);
                        expect(response.statusText).to.be.eq("OK");
                        expect(response.body.data).have.length(6);
                        expect(response.body.data[0]).have.property("first_name", "Michael")
                        cy.log(response.body.data[0].first_name);
                        cy.log(response.body.data[0]);
                    })
    })
})