function createForm(row) {
  // create from name "Name_Email_AppointmentDate"
  const formName = `${row[1]}_${row[2]}_On: ${row[6]}_At: ${row[7]}`;

  const formFolder = DriveApp.getFolderById(FORM_FOLDER_ID)
  // create forms in specific folder
  const form = FormApp.create(formName);
  // set title of the form
  form.setTitle("Preleminary Appointment Questions")
  // add questions from sheets
  const questions = JSON.parse(row[9]);
  questions.forEach(item => form.addParagraphTextItem().setTitle(item));

  const file = DriveApp.getFileById(form.getId());

  file.moveTo(formFolder);
  console.log(form.getPublishedUrl())
  console.log(form.getId())

  // create shareable link to the form accessible for the  users gmail only with  getPublishedUrl()
  return [form.getPublishedUrl(), form.getId()];
}



function addNewFormsDetailsToResponsedHandlerSheets() {
  const appointmentSheet = ss.getSheetByName("Appointments");
  const appointmentData = appointmentSheet.getDataRange().getValues();

  // return if appointment sheet is empty
  if (appointmentData.length <= 1) return;

  const appointmentDataFormIds = appointmentSheet.getRange(2, 13, appointmentData.length - 1, 1).getValues().flat();
  console.log("appointmentDataFormIds: " + JSON.stringify(appointmentDataFormIds))


  const formHandlerSheet = ss.getSheetByName("Form_Responses_Handler");
  const formHandlerData = formHandlerSheet.getDataRange().getValues();

  // handle cases where sheet is empty and when filled with values

  if (formHandlerData.length <= 1) {
    console.log("Form handler data sheet is empty")
    appointmentData.slice(1).forEach(row => formHandlerData.push([row[12], "", ""]))

  } else {
    console.log("In else block, form handler sheet is not empty")
    const formHandlerFormIds = formHandlerSheet.getRange(2, 1, formHandlerData.length - 1, 1).getValues().flat();
    console.log("formHandlerFormIds: " + JSON.stringify(formHandlerFormIds))
    // only filter new ids from appointment sheet that are not present in form Handler sheets
    const newFormIndexes = appointmentDataFormIds.map((id, ind) => formHandlerFormIds.includes(id) ? "" : ind + 1).filter(String); // +1 because formHandlerFormIds has ireaton starting from row 2
    console.log("newFormIndexes are " + JSON.stringify(newFormIndexes))
    // return if there's no new form id to add
    if (newFormIndexes.length <= 0) return;
    newFormIndexes.forEach(ind => formHandlerData.push([appointmentData[ind][12], "", ""]))
  }
  // save new values
  formHandlerSheet.getRange(1, 1, formHandlerData.length, formHandlerData[0].length).setValues(formHandlerData);

  SpreadsheetApp.flush();// refresh sprdsheet
  Utilities.sleep(100);// sleep for .1 sec
}


function logResponses(formId = "1M0Ij3HXmnFtI1RHDc7vAgauyYeoIHcBLwOuOmuhBEVA") {
  const form = FormApp.openById(formId);
  // get only latest response
  let formResponses = form.getResponses()[0].getItemResponses();
  // Iterates over the item responses.
  for (const itemResponse of formResponses) {

    // Logs the items' questions and responses to the console.
    console.log(`Response to the question '${itemResponse.getItem().getTitle()}' was
      '${itemResponse.getResponse()}'`);
  }
}
