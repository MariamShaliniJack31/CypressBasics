const mammoth = require('mammoth');

// Function to convert DOCX to HTML
export function convertDocxToHtml(buffer, options) {
    return new Promise((resolve, reject) => {
        if (!buffer) {
            reject(new Error("Buffer is required"));
            return;
        }

        // Convert DOCX to HTML with options
        mammoth.convertToHtml({ arrayBuffer: buffer, ...options })
            .then((result) => {
                resolve(result.value);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Export the function
//module.exports = convertDocxToHtml;