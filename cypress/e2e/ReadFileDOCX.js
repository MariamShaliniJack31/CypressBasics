// Import the mammoth library
const mammoth = require('mammoth');

// Function to convert DOCX to HTML
function convertDocxToHtml(docxFilePathinCypress , options) {
    console.log(docxFilePath);
    return new Promise((resolve, reject) => {
        // Convert DOCX to HTML
        mammoth.convertToHtml({ path: docxFilePathinCypress , options: options})
            .then((result) => {
                // Resolve with the HTML content
                console.log("PASS");
                resolve(result.value);
            })
            .catch((error) => {
                // Reject with the error
                console.log("FAIL");
                reject(error);
            });
    });
}

// Example usage
var docxFilePath = './cypress/Downloads/New Microsoft Word Document.docx';
var options = {
    styleMap: [
        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Subsection Title'] => h2:fresh"
    ]
};
convertDocxToHtml(docxFilePath, options).then((html) => {
    console.log(html); // Log the HTML content
}).catch((error) => {
    console.error('Error converting DOCX to HTML:', error);
});