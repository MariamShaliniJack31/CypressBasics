const xml2jsinst = require("xml2js");
const parser = new xml2jsinst.Parser({explicitArray: false});

describe('Parsing XML Request in Cypress', () => {
  let petID = null;
  let petName=null;

  // npm install xml2js
  before("Parsing XML Request - POST", ()=> {
    
    const xmlPayLoad = "<Pet>     <id>0</id>     <Category>         <id>0</id>         <name>Jimmy</name>     </Category>     <name>doggie</name>     <photoUrls>         <photoUrl>http://dog,com</photoUrl>     </photoUrls>     <tags>         <Tag>             <id>0</id>             <name>Hi</name>         </Tag>     </tags>     <status>available</status> </Pet>";
    cy.request({
                method:   "POST",
                url:      "https://petstore.swagger.io/v2/pet",
                body:     xmlPayLoad,
                headers:    {
                              "Content-Type":   "application/xml",
                              accept:           "application/xml"  
                }
    })
    .then( (response) => {
      expect(response.status).to.be.equal(200);
      parser.parseString(response.body,(err, result) => {
        petID = result.Pet.id
        cy.log(petID)
      })
    })
  })

  it("GET the Pet Data", ()=> {
    
    cy.request({
                method:   "GET",
                url:      "https://petstore.swagger.io/v2/pet/"+petID,
                headers:    {
                              accept:           "application/xml"  
                }
    })
    .then( (response) => {
      expect(response.status).to.be.equal(200);
      parser.parseString(response.body,(err, result) => {
        petName = result.Pet.name
        cy.log(petName)
      })
    })
  })
})