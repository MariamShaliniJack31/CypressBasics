describe("Can Be Deleted", function() {

    it("Fixtures Test Data", function(){
        cy.fixture("example.json").then((data) =>{
            cy.log(data.name);                      //On 15th June, Using fixtures to represent data
            cy.log(data.arr[0].username);           //Admin555
        })
    })

    it("Test Data outside of Fixtures", ()=>{
        cy.readFile("./cypress/ReadandWriteFile.txt").then( (data)=>{
            cy.log(data);
        })
    })

    it("Test Data outside of Fixtures", ()=>{
        const d = new Date();
        let s = `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}`;
        cy.log(s);
        cy.writeFile("./cypress/ReadandWriteFile.txt", `\ntoday is ${s}`, {flag : 'a'});
        cy.readFile("./cypress/ReadandWriteFile.txt").then( (data)=>{
            cy.log(data);
        })
    })

    it("Enviroment and Config Variables", function(){
        cy.log(Cypress.env("google_url"));
        cy.log(Cypress.config("supportFile"));
        cy.log(Cypress.config("screenshotsFolder"));
        cy.log(Cypress.config("videosFolder"));
        cy.log(Cypress.config("baseUrl"));          //Declared under e2e so use config
        cy.log(Cypress.env("baseUrl"));             //Declared in env.json so use env
    })
})