it('File Upload', function() {
    cy.visit('https://trytestingthis.netlify.app/')
    cy.get('#myfile').attachFile('example.json').document();
})

it('File Upload Using selectFile method()' , function() {
    cy.visit('https://trytestingthis.netlify.app/')
    //type="file" Thats why we used selectFile method
    cy.get('#myfile').selectFile('cypress/fixtures/EXAMPLE2.json', { force: true }, { action: "drag-drop" });
})

it.only('File Download', function() {
    cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','cypress/downloads','example.jpg').document();
    //cy.findFiles("cypress/downloads",'example.jpg');
    //cy.verifyDownload("example.jpg")

    // Wait for a reasonable amount of time for the download to complete
    // Adjust the timeout according to your expected download time
    cy.wait(5000); // Wait for 5 seconds

    cy.verifyDownload('example.jpg', { timeout: 25000 }).then( ($there)=> {
        cy.log($there);
    })
    // Check if the file exists in the default download directory
    // Change the path if the download directory is different
    cy.log("*************************************************")
    const fileName = 'example.jpg'; // Replace with your expected file name
    //cy.log(Cypress.config("downloadsFolder"));
    cy.task('listFiles', "./cypress/downloads").then((files) => {
        cy.log(files);
        expect(files).to.include(fileName);
    });
    cy.verifyDownload('Sh.docx', { timeout: 25000 })
})

it('File Download using cy-verify-downloads', function() {
    cy.task("findFiles", Cypress.config("downloadsFolder"), 'example.jpg' ).then((files) => {
        cy.log(files)
    });
    cy.verifyDownload('Sh.docx', { timeout: 25000 });
})