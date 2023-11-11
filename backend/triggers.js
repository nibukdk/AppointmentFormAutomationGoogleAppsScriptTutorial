function onEdit(e) {
    const ss = e.source; // get eidted spreadsheet
    const sheet = ss.getActiveSheet(); // get edited/active worksheet/tab
    const range = e.range; // get edited range

    if (sheet.getName() === "Appointments") {
        const activeRow = range.getRow();
        if (activeRow > Number(LastUsedRowByGPTProperty.get())) { // first check to determine if chatgpt questions have already been added
            // console.log(activeRow)

            const activeRowData = sheet.getRange(activeRow, 1, 1, 16).getValues().flat();
            // console.log(activeRowData)
            // call gptquestion if empty
            if (activeRowData[9] === "") { // second check just incase if first check fails if the questions row is empty
                updateSheetsWithGptQuestions(); // create and fill row with gpt questions
            }
        }

        // also call initial cal event
        initalCalendarAppointmentEventHandler();
    }
}