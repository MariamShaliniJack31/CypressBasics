// Example usage
// import { convertDocxToHtml } from "./ReadFileDOCXtoHTML";
const DocxtoHtml = require("./ReadFileDOCXtoHTML");
const mammoth = require('mammoth');

var options = {
    "styleMap": [
        {
            "p[style-name='Section Title']":  "h1:fresh"
        },
        {
            "p[style-name='Subsection Title']": "h2:fresh"

        }
    ]
};

describe("DOCX TO HTML", function() {
    
    it("DOCX TO HTML", function() {
        const FilePath = `C:/Users/mrufu/Downloads/New\.docx`;
       
        // // Read the DOCX file using cy.readFile()
        // cy.readFile(FilePath,  "binary", options).then((fileContent) => {
        //     // Convert the binary content to a buffer
        //     cy.log("FILECONTENT : "+fileContent);
        //     const buffer = Buffer.from(fileContent);
        //     cy.log("BUFFER : "+buffer);
        //     // Call the conversion function
        //     DocxtoHtml.convertDocxToHtml(buffer).then((html) => {
        //         console.log(html); // Log the HTML content
        //         cy.log(html);
        //     }).catch((error) => {
        //         console.error('Error converting DOCX to HTML:', error);
        //     });
        // });

        // cy.readFile(FilePath, "binary").then((binaryData) => {
        //     mammoth.extractRawText({ buffer: binaryData }) .then((result) => {
        //         const text = result.value; // Extracted text
        //         // Perform assertions or other actions based on the extracted text
        //         cy.log(text); // Log the extracted text to Cypress test runner
        //     })   .catch((error) => {
        //         // Handle error if any
        //         cy.log("Error reading .docx file:", error);
        //     });
        // });
        // DocxtoHtml.convertDocxToHtml(FilePath).then( function (html) {
            
        //     console.log(html); // Log the HTML content
        //     cy.log(html);
        // })
        // .catch((error) => {
        //     console.error('Error converting DOCX to HTML:'+ error);
        //     cy.log(error);
        // });
    
        cy.log(FilePath);
        cy.pause();
        cy.docxtoHtml(FilePath) ;
    })    
})
