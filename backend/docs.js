function createNewDocFromTemplate() {

  const formHandlerSheet = ss.getSheetByName("Form_Responses_Handler");
  const formHandlerData = formHandlerSheet.getDataRange().getValues();
  
  const calEventSheet = ss.getSheetByName("Cal_Events_Handler");
  const calEventdata = calEventSheet.getDataRange().getValues();

  const calEventIdFinder = (formId) => calEventdata.map(row => row[1] === formId ? row[0] : "").filter(String)[0] ?? "";

  for (let i = 1; i < formHandlerData.length; i++) {
    // if doc has been created already then skip
    if (formHandlerData[i][1] === "Yes") continue;

    // else
    // get from first
    const form = FormApp.openById(formHandlerData[i][0]);
    const formResponse = form.getResponses();

    // get event id
    if (formResponse.length === 0) continue;
    // get only latest response
    let response = formResponse[formResponse.length - 1].getItemResponses();

    // skip this row if there's no response
    if (!response) continue;
    const eventId = calEventIdFinder(formHandlerData[i][0]);
    // else
    let docLink = createDocument(response, DriveApp.getFileById(formHandlerData[i][0]).getName(), eventId);
    // if succeeded change doc crated to "Yes"
    if (docLink) {
      formHandlerData[i][1] = "Yes";
      formHandlerData[i][2] = docLink
    }

  }

  formHandlerSheet.getRange(1, 1, formHandlerData.length, formHandlerData[0].length).setValues(formHandlerData);

}


function createDocument(responses, formName, eventId) {
  const docFolder = DriveApp.getFolderById(DOCS_FOLDER_ID);
  const docTemplate = DriveApp.getFileById(TEMPLATE_ID);

  const clientDetails = formName.split("_");
  const [clientName, clientEmail] = clientDetails.slice(0, 2);
  const appointmentDate = clientDetails[2].slice(3).trim();
  const appointmentTime = clientDetails[3].slice(3).trim();


  // make copy of template
  const templateCopy = docTemplate.makeCopy(formName, docFolder);
  // open file 
  const doc = DocumentApp.openById(templateCopy.getId())

  // get body of document
  const body = doc.getBody();

  const docReviewStatusUpdateUrl = `${SCRIPT_URL}?reqType=markDocAsReviewed&eventId=${eventId}`

  try {

    // replace client details first
    body.replaceText("{{client_name}}", clientName);
    body.replaceText("{{client_email}}", clientEmail);
    // replace appointment info
    body.replaceText("{{appointment_date}}", appointmentDate);
    body.replaceText("{{appointment_time}}", appointmentTime);

    // repalce questions and responses
    body.replaceText("{{Question_1}}", responses[0].getItem().getTitle());
    body.replaceText("{{Response_Question_1}}", responses[0].getResponse());

    body.replaceText("{{Question_2}}", responses[1].getItem().getTitle());
    body.replaceText("{{Response_Question_2}}", responses[1].getResponse());

    body.replaceText("{{Question_3}}", responses[2].getItem().getTitle());
    body.replaceText("{{Response_Question_3}}", responses[2].getResponse());

    body.replaceText("{{Question_4}}", responses[3].getItem().getTitle());
    body.replaceText("{{Response_Question_4}}", responses[3].getResponse());

    body.replaceText("{{Question_5}}", responses[4].getItem().getTitle());
    body.replaceText("{{Response_Question_5}}", responses[4].getResponse());

    body.replaceText("{{Question_6}}", responses[5].getItem().getTitle());
    body.replaceText("{{Response_Question_6}}", responses[5].getResponse());

    body.replaceText("{{Question_7}}", responses[6].getItem().getTitle());
    body.replaceText("{{Response_Question_7}}", responses[6].getResponse());

    body.replaceText("{{Question_8}}", responses[7].getItem().getTitle());
    body.replaceText("{{Response_Question_8}}", responses[7].getResponse());

    body.replaceText("{{Question_9}}", responses[8].getItem().getTitle());
    body.replaceText("{{Response_Question_9}}", responses[8].getResponse());

    body.replaceText("{{Question_10}}", responses[9].getItem().getTitle());
    body.replaceText("{{Response_Question_10}}", responses[9].getResponse());

    insertImageLink(body, docReviewStatusUpdateUrl)

    return DriveApp.getFileById(templateCopy.getId()).getUrl();

  } catch (e) {
    console.log(e);
    //  delete the duplicate file since filling data it was interrupted
    DriveApp.getFileById(templateCopy.getId()).setTrashed(true);
    return;
  }
}

function insertImageLink(body, link) {
  // insert rest api link
  const imageLinkText = body.findText("{{mark_as_reviewed_button}}");
  let image = DriveApp.getFileById(MARK_REVIEWED_IMAGE_LINK_ID).getBlob();

  if (!imageLinkText) return;

  let textElement = imageLinkText.getElement();

  textElement.setText("");

  let img = textElement.getParent().asParagraph().insertInlineImage(0, image)

  img.setWidth(200);
  img.setHeight(200);
  img.setLinkUrl(link)
}

