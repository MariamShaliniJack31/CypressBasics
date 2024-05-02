it.skip('File Upload', function() {
    cy.visit('https://trytestingthis.netlify.app/')
    cy.get('#myfile').attachFile('example.json').document()
})

it('File Download', function() {
    cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','cypress/downloads','example.jpg').document()
    //cy.findFiles("cypress/downloads",'example.jpg');
    //cy.verifyDownload("example.jpg")
})

it('File Download using cy-verify-downloads', function() {
    //cy.findFiles('cypress/downloads', 'example.jpg' );
    cy.verifyDownload('cypress/downloads', { timeout: 25000 });
})