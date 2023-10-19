describe('Authentications in Cypress', () => {
    
    it("Basic Auth - GET", ()=> {
        cy.request({
                    method:     "GET",
                    url:        "https://postman-echo.com/basic-auth",
                    auth:       {
                                    user:       'postman',
                                    pass:       'password'
                    }
        })
        .then( (response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body.authenticated).to.be.equal(true);
            expect(response.body).have.property("authenticated", true);

            assert.equal(response.status, 200)
            assert.equal(response.body.authenticated, true);
        })     
    })

    it("Digest Auth - GET", ()=> {
        cy.request({
                    method:     "GET",
                    url:        "https://postman-echo.com/basic-auth",
                    auth:       {
                                    username:       'postman',
                                    password:       'password',
                                    method:         "digest"
                    }
        })
        .then( (response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body.authenticated).to.be.equal(true);
            expect(response.body).have.property("authenticated", true);
        })     
    })

    it("Bearer Token - GET", ()=> {
        let authToken = "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"
        cy.request({
                    method:     "GET",
                    url:        "https://api.github.com/user/repos",
                    headers:    {
                                    "Authorization":   "Bearer "+ authToken
                                },
                    })
        .then( (response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body[0].name).to.be.equal("API-Automation");
            expect(response.body).have.length(13);
        })     
    })

    // it("API Key - GET", ()=> {
        
    //     cy.request({
    //                 method:     "GET",
    //                 url:        "https://api.openweathermap.org/data/2.5/forecast/daily?q=Delhi",
    //                 qs:         {
    //                                 appid:   "e43304c7dd187fb661ab1e90c98fc799"
    //                             },
    //                 })
    //     .then( (response) => {
    //         expect(response.status).to.be.equal(200);
    //     })     
    // })
})