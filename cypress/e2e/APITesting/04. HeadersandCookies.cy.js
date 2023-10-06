describe('Headers and Cookies - Passing in Cypress', () => {

    let authToken = null;
    before("Get Access Token", ()=> {
        cy.request({
                        method: "POST",
                        url:    "https://simple-books-api.glitch.me/api-clients/",
                        body: {
                            clientName: "Test",
	                        clientEmail: Math.random().toString(5).substring(2)+"@gmail.com"
                        },
                        headers: {"Content-Type":  "application/json",}
                    })
                    .then( (response) => {
                        expect(response.statusText).to.be.eq("Created")
                        authToken = response.body.accessToken
                        cy.log(authToken)
                    })
    })

    before("Submit an Order", ()=> {
        cy.request({
                        method: "POST",
                        url:    "https://simple-books-api.glitech.me/orders",
                        body: {
                            bookId: 1,
	                        customerName:	"xyzabc"
                        },
                        headers:    {"Content-Type":    "application/json",
                                     "Authorization":   "Bearer "+ authToken
                                    }
                    })
                    .then( (response) => {
                        expect(response.status).to.be.eq(200);
                        expect(response.statusText).to.be.eq("OK");
                    })
    })

    it("Fetching the Orders", ()=> {
        cy.request({
                        method:     "GET",
                        url:        "https://simple-books-api.glitech.me/orders",
                        headers:    {"Content-Type":  "application/json",
                                     "Authorization": "Bearer "+ authToken,
                                    },
                        cookies:    {"cookieName": "mycookie"}
                    })
                    .then( (response) => {
                        expect(response.status).to.be.eq(200);
                        expect(response.statusText).to.be.eq("OK");
                    })
    })
})