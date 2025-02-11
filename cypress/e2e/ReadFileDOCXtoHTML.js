// Import the mammoth library
const mammoth = require('mammoth');

// Function to convert DOCX to HTML
export function convertDocxToHtml(docxFilePath) {
    console.log(docxFilePath);
    return new Promise((resolve, reject) => {
        // Convert DOCX to HTML
        if (!docxFilePath) {
            console.log("NOT FOUND");
            reject(new Error("File path is required"));
            return;
        }
        mammoth.convertToHtml({ path: docxFilePath })
            .then((result) => {
                // Resolve with the HTML content
                console.log("PASS");
                resolve(result);
            })
            .catch((error) => {
                // Reject with the error
                console.log("FAIL");
                reject(error);
            });
    });
}


// // Example usage
// var docxFilePath = './cypress/Downloads/New Microsoft Word Document.docx';
// convertDocxToHtml(docxFilePath).then((html) => {
//         console.log(html); // Log the HTML content
// })  .catch((error) => {
//         console.error('Error converting DOCX to HTML:', error);
// });

// Export the function
//module.exports = convertDocxToHtml;
// Export the function
// module.exports = convertDocxToHtml;
//export default convertDocxToHtml;