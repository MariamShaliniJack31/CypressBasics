export class GenericFuncsClass {

    interceptmethod(method, endpoint, varname, codeNumber){
        cy.intercept(method, endpoint).as(varname)
        cy.log("@"+varname)
        cy.wait("@"+varname).its("response.statusCode").should("equal", codeNumber);
    }

    checkStatuscode(varname, codeNumber){
        
    }
}   

export default GenericFuncsClass;