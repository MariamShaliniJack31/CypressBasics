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
                    headers:    {"Content-Type":    "application/json",
                                     "Authorization":   "Bearer "+ authToken
                                    }
        })
        .then( (response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body[0].name).to.be.equal("API-Automation");
            expect(response.body).have.length(13);
        })     
    })
})