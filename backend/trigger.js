function triggerHandler() {
  switchFunctionsToTrigger(LastUsedTriggerProperty.get())(); // call the funciton
}

function switchFunctionsToTrigger(previousTriggerProp) {
  console.log("Last Trigger Prop was" + previousTriggerProp);
  switch (previousTriggerProp) {
    case FUNC_TO_TRIGGER_ENUM.UPDATE_CLAENDAR_EVENT_WITH_DOC_LINK:
      LastUsedTriggerProperty.set(FUNC_TO_TRIGGER_ENUM.CREATE_GPT_QUESIOTNS);
      initalCalendarAppointmentEventHandler();//create event here; no need for trigger to a simulatenous event
      return updateSheetsWithGptQuestions; // create questions from gpt

    case FUNC_TO_TRIGGER_ENUM.CREATE_GPT_QUESIOTNS:
      LastUsedTriggerProperty.set(FUNC_TO_TRIGGER_ENUM.CREATE_NEW_FORM);
      return populateFormWithQuestions;// create form from questoins

    case FUNC_TO_TRIGGER_ENUM.CREATE_NEW_FORM:
      LastUsedTriggerProperty.set(FUNC_TO_TRIGGER_ENUM.SEND_EMAIL);
      addNewFormsDetailsToResponsedHandlerSheets(); // also handle form spreadsheet operations
      return emailFormLinkToUser;

    case FUNC_TO_TRIGGER_ENUM.SEND_EMAIL:
      LastUsedTriggerProperty.set(FUNC_TO_TRIGGER_ENUM.CREATE_DOCS);
      return createNewDocFromTemplate; // create new doc if response exists

    case FUNC_TO_TRIGGER_ENUM.CREATE_DOCS:
      LastUsedTriggerProperty.set(FUNC_TO_TRIGGER_ENUM.UPDATE_CLAENDAR_EVENT_WITH_DOC_LINK);
      return docLinkCalendarEventHandler;// update cal event with doc link

    default:
      LastUsedTriggerProperty.set(FUNC_TO_TRIGGER_ENUM.CREATE_GPT_QUESIOTNS);
      initalCalendarAppointmentEventHandler();//create event here;
      return updateSheetsWithGptQuestions; // create questions from gpt
  }
}

const FUNC_TO_TRIGGER_ENUM = {
  CREATE_GPT_QUESIOTNS: "CREATE_GPT_QUESIOTNS",
  CREATE_NEW_FORM: "CREATE_NEW_FORM",
  SEND_EMAIL: "SEND_EMAIL",
  CREATE_DOCS: "CREATE_DOCS",
  UPDATE_CLAENDAR_EVENT_WITH_DOC_LINK: "UPDATE_CLAENDAR_EVENT_WITH_DOC_LINK",
}