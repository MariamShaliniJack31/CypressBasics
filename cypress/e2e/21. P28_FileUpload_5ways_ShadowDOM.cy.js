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

  it('File Upload - Drag and Drop', () => {
      
    cy.visit("https://the-internet.herokuapp.com/upload");
    
    // Make sure to keep the file path present in Fixtures Folder
    cy.get("#drag-drop-upload").attachFile('example.json', { subjectType: 'drag-n-drop' });
    cy.wait(2000)
    cy.get("div[class='dz-preview dz-file-preview dz-processing dz-success dz-complete'] div[class='dz-details'] span").should('have.text', "example.json")

    //A fixture file could not be found at any of the following paths: > cypress\fixtures\D:\Ricky\Sophomore\1K679765710_Doc.pdf > 
    //cy.get("#drag-drop-upload").attachFile("D:/Ricky/Sophomore/1K679765710_Doc.pdf", { subjectType: 'drag-n-drop' });
  })

  it('Upload Multiple Files', () => {
      
    cy.visit("https://the-internet.herokuapp.com/upload");
    
    // Make sure to keep the file path present in Fixtures Folder
    cy.get("#drag-drop-upload").attachFile(['example.json', 'EXAMPLE2.json'],  { subjectType: 'drag-n-drop' });

    cy.get('#drag-drop-upload > :nth-child(1) > .dz-details > .dz-filename > span').contains("example.json");
    cy.get(':nth-child(2) > .dz-details > .dz-filename > span').contains("EXAMPLE2.json");
  })
  
  it('Upload Multiple Files 2', () => {
      
    cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php");
    
    // Make sure to keep the file path present in Fixtures Folder
    cy.get("#filesToUpload").attachFile(['example.json', 'EXAMPLE2.json']);;
    cy.wait(2000)

    cy.get(':nth-child(6) > strong').should('contain.text', "Files You Selected:");
    cy.get("body > div:nth-child(7) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > ul:nth-child(7) > li:nth-child(1)").contains("example.json");
    cy.get("body > div:nth-child(7) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > ul:nth-child(7) > li:nth-child(2)").contains("EXAMPLE2.json");
  })
  
  it('Shadow DOM', () => {
      
    cy.visit("https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm");
    
    // Make sure to keep the file path present in Fixtures Folder
      //cy.get("#locator").shadow().find(".nb-btn").click()
    cy.get("input.smart-browse-input", {includeShadowDom:true}).attachFile("example.json").document();
    cy.wait(2000)
    cy.get(".smart-item-name" , {includeShadowDom:true}).contains("example.json");
    cy.get(".smart-item-name" , {includeShadowDom:true}).should('contain.text', "example.json");
    })

    it.only('Shadow DOM 2 - THIS IS NOT WORKING', () => {
      
      cy.visit("https://www.htmlelements.com/demos/fileupload/shadow-dom/index.htm");
      
      // Make sure to keep the file path present in Fixtures Folder
      cy.get(".smart-ui-component").shadow().find(".smart-browse-input").click();
      //cy.get("input.smart-browse-input", {includeShadowDom:true}).attachFile("example.json").document();
      cy.wait(2000)
      cy.get(".smart-item-name" , {includeShadowDom:true}).contains("example.json");
      cy.get(".smart-item-name" , {includeShadowDom:true}).should('contain.text', "example.json");
      })
  
  it('File Download', function() {
      cy.downloadFile('https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg','mydownloads','example.jpg').document()

  })
})