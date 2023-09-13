const { defineConfig} = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");

//import { defineConfig } from 'cypress'      //This is NOT Working
// load the environment variables from the local .env file
require('dotenv').config();

module.exports =  defineConfig({
  projectId: 'ttij5a',

  env: {
    google_url:       "https://google.com",
    ORANGEHRM_URL:    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    BASE_URL:         "https://www.base.cominconfigjs",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", { downloadFile });
      // on("task", { isFileExist, findFiles });
      // on("task", verifyDownloadTasks);
      config.env = {
          ...process.env,
          ...config.env,
      };
      return config;
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: false,
      json: true,
    },
    screenshotOnRunFailure: false,
    video: false,
    retries: {
      runMode: 2,
      openMode: 2,
    },
    pageLoadTimeout: 2 * 60 * 1000,
    defaultCommandTimeout: 30 * 1000,
    requestTimeout: 5 * 60 * 1000,
    responseTimeout: 5 * 60 * 1000,
  },
  
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});