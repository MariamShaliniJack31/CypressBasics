describe('Validate JSON Schema in Cypress', () => {

  const avj = require("ajv")
  const avjinstance = new avj()
  //          /////USe https://transform.tools/json-to-json-schema to find the schema of JSON Response
  //          See in PostMan how to keep Schema in Tests and validate Under CypressAPI
  //          npm install ajv

  it("Validate JSON Response Schema", ()=> {
    cy.request({
                method: "GET",
                url:    "https://fakestoreapi.com/products",
                })
                .then( (response) => {
                  expect(response.status).to.be.eq(200)
                  expect(response.statusText).to.be.eq("OK")

                  var schema = {
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Generated schema for Root",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number"
                          },
                          "title": {
                            "type": "string"
                          },
                          "price": {
                            "type": "number"
                          },
                          "description": {
                            "type": "string"
                          },
                          "category": {
                            "type": "string"
                          },
                          "image": {
                            "type": "string"
                          },
                          "rating": {
                            "type": "object",
                            "properties": {
                              "rate": {
                                "type": "number"
                              },
                              "count": {
                                "type": "number"
                              }
                            },
                            "required": [
                              "rate",
                              "count"
                            ]
                          }
                        },
                        "required": [
                          "id",
                          "title",
                          "price",
                          "description",
                          "category",
                          "image",
                          "rating"
                        ]
                      }
                    }
                    const validate = avjinstance.compile(schema)    
                    const isvalid = validate(response.body)
                    expect(isvalid).to.be.true
    })
  })
})