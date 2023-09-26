

it('File Upload', function() {
    cy.visit('https://trytestingthis.netlify.app/')

    cy.get('#myfile').attachFile('example.json').document()
  })

it('File Download', function() {
    cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','mydownloads','example.jpg').document()

})