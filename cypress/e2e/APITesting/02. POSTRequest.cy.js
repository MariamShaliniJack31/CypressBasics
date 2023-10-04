describe('POST Request in Cypress', () => {

    it("Approach 1 : POST Request", ()=> {
        cy.request({
                        method:"POST",
                        url: "http://restapi.adequateshop.com/api/Tourist/",
                        body: {
                            "tourist_name": "Pooja3335",
                            "tourist_email": "Pooja3335@gmail.com",
                            "tourist_location": "USA",
                        }
                    })
                    .its("statusText")
                    .should('contain', "Created")
    })

    it("Approach 2 : POST Request", ()=> {
        const requestBody = {
                                tourist_name: "Pooja403927",
                                tourist_email: "jadhaoshilp403927@gmail.com",
                                tourist_location: "USA"
                            }
        cy.request({
                        method:"POST",
                        url: "http://restapi.adequateshop.com/api/Tourist/",
                        body: requestBody
                    }).then ( (response) => {
                        cy.log(response.status);
                        cy.log(response.statusText);
                        expect(response.status).to.eq(201)
                        expect(response.statusText).to.eq("Created")
                        expect(response.body.tourist_name).to.eq("Pooja403927")
                        expect(response.body.tourist_email).to.eq("jadhaoshilp403927@gmail.com")
                        expect(response.body.tourist_location).to.eq("USA")
                    })
    })

    it("Approach 3 : POST Request", ()=> {
        const requestBody = {
                                tourist_name: Math.random().toString(6).substring(2),
                                tourist_email: Math.random().toString(6).substring(2)+"@gmail.com",
                                tourist_location: "USA"
                            }
        cy.request({
                        method:"POST",
                        url: "http://restapi.adequateshop.com/api/Tourist/",
                        body: requestBody
                    }).then ( (response) => {
                        cy.log(response.status);
                        cy.log(response.statusText);
                        expect(response.status).to.eq(201)
                        expect(response.statusText).to.eq("Created")
                        expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                        expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                        expect(response.body.tourist_location).to.eq("USA")
                    })
    })

    it.only("Approach 4 : POST Request", ()=> {
        
        cy.fixture("APITesting-POST.json").then( (requestBody)=> {
            cy.request({
                method:"POST",
                url: "http://restapi.adequateshop.com/api/Tourist/",
                body: requestBody
            }).then ((response) => {
                cy.log(response.status);
                cy.log(response.statusText);
                expect(response.status).to.eq(201)
                expect(response.statusText).to.eq("Created")
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location)

                expect(response.body).to.have.property("id");
                expect(response.body).to.have.property("createdat").contains("2023-10-03");

            })
        })
    })

    // it.only("Approach 5 : POST Request", ()=> {
    
    //     cy.fixture("APITesting-POST-DataDriven.json").then( (requestBodyfull) => {
    //         requestBodyfull.forEach( (requestBody) => {
    //             cy.request({
    //                 method:"POST",
    //                 url: "http://restapi.adequateshop.com/api/Tourist/",
    //                 body: requestBody
    //             }).then ((response) => {
    //                 cy.log(response.status);
    //                 cy.log(response.statusText);
    //                 expect(response.status).to.eq(201)
    //                 expect(response.statusText).to.eq("Created")
    //                 expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
    //                 expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
    //                 expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
    //             })    
    //         })
    //     })
    // })
})