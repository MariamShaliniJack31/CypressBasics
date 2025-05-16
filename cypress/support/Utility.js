export class Utility {
    getBaseUrl() {
        
        //  npm run cy:run:stg
        //  npx cypress run --env ENVIRON="qa" --browser "chrome" --headed --spec "cypress\e2e\30. SwitchConfigFiles&Env.cy.js"
        let envi = Cypress.env('ENVIRON'); //Get the value of evnironment variable i.e ENV, 
        // you can specify any name here not only ENV

        
        if (envi == 'production') //Check the value
            return "https://www.facebook.com"; //return desired url
        else if (envi == 'staging')
            return "https://staging-website.com";
        else if (envi == 'qa')
            return "https://chatgpt.com/";
    }
}