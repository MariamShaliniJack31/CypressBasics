describe('Parsing JSON Response in Cypress', () => {

    it("Parsing JSON Response", ()=> {
        cy.request({
                        method: "GET",
                        url:    "https://fakestoreapi.com/products",
                    })
                    .then( (response) => {
                        expect(response.status).to.be.eq(200)
                        expect(response.statusText).to.be.eq("OK")

                        //  //////Use https://jsonpathfinder.com/ for easy tracking of values
                        expect(response.body[0].title).to.be.equal("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
                        expect(response.body[0].price).to.be.equal(109.95)
                        expect(response.body[0].description).to.be.equal("Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday")
                        expect(response.body[0].category).to.be.equal("men's clothing")
                        expect(response.body[0].rating.rate).to.be.equal(3.9)
                        expect(response.body[0].rating.count).to.be.equal(120)

                        expect(response.body[19].title).to.be.equal("DANVOUY Womens T Shirt Casual Cotton Short")
                        expect(response.body[19].price).to.be.equal(12.99)
                        expect(response.body[19].description).to.be.equal("95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.")
                        expect(response.body[19].category).to.be.equal("women's clothing")
                        expect(response.body[19].rating.rate).to.be.equal(3.6)
                        expect(response.body[19].rating.count).to.be.equal(145)

                        expect(response.body).have.length(20)
                    })
    })

    it("Get all Prices and TotalParsing JSON Response", ()=> {
        let totalprice = 0;
        cy.request({
                        method: "GET",
                        url:    "https://fakestoreapi.com/products",
                        qs:     {limit:5},
                    })
                    .then( (response) => {
                        expect(response.status).to.be.eq(200)
                        expect(response.statusText).to.be.eq("OK")

                        response.body.forEach( (element) => {
                            totalprice = totalprice + element.price
                        });
                        expect(totalprice).to.be.equal(899.23)
                        expect(response.body).have.length(5)
                    })
    })
})