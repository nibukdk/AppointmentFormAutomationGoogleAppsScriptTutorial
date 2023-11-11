function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Manual Operation Menu')
    .addItem('Populate With ChatGpt Questions', 'updateSheetsWithGptQuestions')
    .addSeparator()
    .addSubMenu(ui.createMenu('Form Related Events')
      .addItem('Create and Populate Forms', 'manualFormCreationHandler')
      .addItem('Update Form Infos In Sheets', 'addNewFormsDetailsToResponsedHandlerSheets'))
    .addSeparator()
    .addItem('Create New Calendar Event', 'initalCalendarAppointmentEventHandler')
    .addItem('Send Form Links To Customers', 'emailFormLinkToUser')
    .addItem('Create New Doc From Cusomter Responses', 'createNewDocFromTemplate')
    .addItem('Update Calendar Events With Document Links', 'docLinkCalendarEventHandler')
    .addToUi();
}


function manualFormCreationHandler() {
  populateFormWithQuestions();
  /*   Utilities.sleep(1000);
    addNewFormsDetailsToResponsedHandlerSheets(); */
}