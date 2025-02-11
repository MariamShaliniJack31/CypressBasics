const DocxtoHtml = require("./DocxtoHTMLOptions");

// Describe your test
describe('DOCX to HTML conversion', () => {
    // Test case
    it('should convert DOCX to HTML', () => {
        // Path to your DOCX file
        const docxFilePath = 'C:/Users/mrufu/Downloads/New Microsoft Word Document.docx';

        // Read the DOCX file using cy.readFile() with 'binary' encoding
        cy.readFile(docxFilePath, 'utf-8').then((fileContent) => {
            // Convert the binary content to a buffer
            cy.log(fileContent);
            const buffer = Buffer.from(fileContent, 'utf-8');
            cy.log(buffer);
            // Options for conversion
            const options = {
                // Add your options here
                // For example:
                styleMap: [
                    "p[style-name='Section Title'] => h1:fresh",
                    "p[style-name='Subsection Title'] => h2:fresh"
                ]
            };

            // Call the conversion function with options
            DocxtoHtml.convertDocxToHtml(buffer, options).then((html) => {
                    console.log(html); // Log the HTML content
                    cy.log(html);
                })
                .catch((error) => {
                    console.error('Error converting DOCX to HTML:', error);
                    cy.log(error);
                });
        });
    });
});