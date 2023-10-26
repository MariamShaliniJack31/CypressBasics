export class Utility {
    getBaseUrl() {
        let envi = Cypress.env('ENV'); //Get the value of evnironment variable i.e ENV, 
        // you can specify any name here not only ENV
        if (envi == 'production') //Check the value
            return "https://www.facebook.com"; //return desired url
        else if (envi == 'staging')
            return "https://staging-website.com";
        else if (envi == 'qa')
            return "https://qa-website.com";
    }
}