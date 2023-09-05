const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const { defineConfig} = require('cypress')
//import { defineConfig } from 'cypress'      //This is NOT Working

module.exports = defineConfig({
  projectId: 'ttij5a',

  env: {
    google_url:       "https://google.com",
    ORANGEHRM_URL:    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", { downloadFile });
    },
  },
  

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },

  
});