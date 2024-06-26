const { defineConfig} = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
//const fs = require('fs-extra')
//const path = require('path')
const { verifyDownloadTasks, isFileExist, findFiles} = require('cy-verify-downloads');

   

//import { defineConfig } from 'cypress'      //This is NOT Working.
// load the environment variables from the local .env file
require('dotenv').config();

module.exports =  defineConfig({
  projectId:  'ttij5a',
  env: {
    google_url:       "https://google.com",
    ORANGEHRM_URL:    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    BASE_URL:         "https://www.base.cominconfigjsllllllllllllllll",
  },

  e2e: {
    baseUrl:     "https://amazon.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", { downloadFile , verifyDownloadTasks, isFileExist, findFiles      
      });                   //Occurs in conjunction with the cy.task command

     
      
      require('cypress-mochawesome-reporter/plugin')(on);
      //config.defaultCommandTimeout = 10000          // This line takes priority than 59
      config.env = {
          ...process.env,
          ...config.env,
      };
      return config;                                //If you don't return an object, then configuration will not be modified.
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: false,
      json: true,
    },

    //npm i --save-dev cypress-mochawesome-reporter
    reporter: 'cypress-mochawesome-reporter',
      reporterOptions: {
      charts: true,
      reportPageTitle: 'Cypress Automation Testing',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      videoOnFailOnly:true,            //This must be true to get the Video
    },
    screenshotOnRunFailure: true,       //This must be true to get the SS
    video: false,                       //This must be true to get the Video - This is main
    retries: {
      runMode: 0,                       //  When running using Command Line CLI, run these many items
      openMode: 0,                      //  When running using Test Runner, run these many items
    },
    pageLoadTimeout: 2 * 60 * 1000,
    defaultCommandTimeout: 30 * 1000,
    requestTimeout: 5 * 60 * 1000,
    responseTimeout: 5 * 60 * 1000,
    downloadsFolder : "cypress/downloads",
  },
  
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});