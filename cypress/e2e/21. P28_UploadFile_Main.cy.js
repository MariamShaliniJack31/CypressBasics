describe('File Uploads in Cypress', () => {

  it('Single File Upload', function() {
      cy.visit("https://the-internet.herokuapp.com/upload");

      //This element Choose File is of type=file, so we can use attachFile method for uploading 
      //And also select the file present in fixtures folder
      cy.get("#file-upload").attachFile("example.json").document();
      
      //A fixture file could not be found at any of the following paths: > cypress\fixtures\D:\Ricky\Sophomore\1K679765710_Doc.pdf
      //cy.get("#file-upload").attachFile("D:/Ricky/Sophomore/1K679765710_Doc.pdf").document();

      cy.get("#file-submit").click();
      cy.wait(2000);
      cy.get("div[class='example'] h3").should('have.text', "File Uploaded!")

    })

    it('File Upload - Rename the File', () => {
      cy.visit("https://the-internet.herokuapp.com/upload");

      //This element Choose File is of type=file, so we can use attachFile method for uploading 
      //And also select the file present in fixtures folder
      cy.get("#file-upload").attachFile({filePath:"example.json" , fileName:"fixturesDataFile.json"}).document();
      
      cy.get("#file-submit").click();
      cy.wait(2000);
      cy.get("div[class='example'] h3").should('have.text', "File Uploaded!")

    })

  it('File Download', function() {
      cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','mydownloads','example.jpg').document()

  })
})