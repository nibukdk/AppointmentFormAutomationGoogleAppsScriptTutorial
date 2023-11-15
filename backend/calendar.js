function createCalendarEvent(title, date, strtTime) {
    try {
        const cal = CalendarApp.getCalendarById(APPOINTMENT_CALENDAR_ID);
        // Logger.log('The calendar is named "%s".', cal.getName());

        // create event
        const event = cal.createEvent(title,
            new Date(`${date} ${strtTime}`),
            new Date(`${date}  ${Number(strtTime.slice(0, 2)) + 1}:00`),
        )
        event.setColor(CalendarApp.EventColor.PALE_RED);
        // console.log('Event ID: ' + event.getId());}
        return event.getId();
    }

    catch (e) {
        console.log(e);
        //  delete the duplicate file since filling data it was interrupted
        return;
    }

}

function addDocLinkToCalendarEvent(eventId, docLink) {
    try {
        const cal = CalendarApp.getCalendarById(APPOINTMENT_CALENDAR_ID);
        const calEvent = cal.getEventById(eventId);

        if (calEvent) {
            calEvent.setDescription(`Link to the preleminary questions & responses: ${docLink}`);
        }
        return 200;
    } catch (e) {
        return;
    }
}

function updateDocReviewStatusInCalendarEvent(eventId) {
    try {
        const cal = CalendarApp.getCalendarById(APPOINTMENT_CALENDAR_ID);
        const calEvent = cal.getEventById(eventId);

        if (calEvent) {
            calEvent.setColor(CalendarApp.EventColor.PALE_GREEN)
        }
        return 200;
    } catch (e) {
        return;
    }
}

function updateDocLinkStatusToCalendarSheets(eventId) {
    const calSheet = ss.getSheetByName("Cal_Events_Handler");
    const calData = calSheet.getDataRange().getDisplayValues();

    for (let i = 1; i < calData.length; i++) {
        if (calData[i][0] === eventId) {
            calData[i][2] = "Yes"
        }
    }

    // set new value
    calSheet.getRange(1, 1, calData.length, calData[0].length).setValues(calData);

}

function updateDocReviewStatusToCalendarSheets(eventId) {
    const calSheet = ss.getSheetByName("Cal_Events_Handler");
    const calData = calSheet.getDataRange().getDisplayValues();

    for (let i = 1; i < calData.length; i++) {
        if (calData[i][0] === eventId) {
            calData[i][3] = "Yes"// set reviewd to true
        }
    }

    // set new value
    calSheet.getRange(1, 1, calData.length, calData[0].length).setValues(calData);

}

function docLinkCalendarEventHandler() {

    const calSheet = ss.getSheetByName("Cal_Events_Handler");
    const calData = calSheet.getDataRange().getDisplayValues();

    

    const formHandlerSheet = ss.getSheetByName("Form_Responses_Handler");
    const formHandlerData = formHandlerSheet.getDataRange().getValues();

    for (let i = 1; i < calData.length; i++) {
        if (calData[i][2] != "Yes") {

            let docLink = formHandlerData.map(row => row[0] === calData[i][1] ? row[2] : "").filter(String)[0];

            if (!docLink) continue;//if doc link is empty then skip the loop

            let status = addDocLinkToCalendarEvent(calData[i][0], docLink);
            if (status) {
                updateDocLinkStatusToCalendarSheets(calData[i][0]);
            }
        }
    }
}

function docReviewStatusEventHandler(eventId = "u3vakv5hnf2c5dgq16uigmvjrg@google.com") {
    try {
        let status = updateDocReviewStatusInCalendarEvent(eventId);
        if (status) {
            updateDocReviewStatusToCalendarSheets(eventId);
            return {
                status: 200,
                Message: "Successfull!, You can close this tab."
            }
        } else { throw "Error" }
    } catch (e) {
        return {
            status: 400,
            Message: "Some error occured, plesae try agian!"
        }
    }
}

function initalCalendarAppointmentEventHandler() {
    const appointmentSheet = ss.getSheetByName("Appointments");
    const appointmentData = appointmentSheet.getDataRange().getDisplayValues();

    const calSheet = ss.getSheetByName("Cal_Events_Handler");
    const calData = calSheet.getDataRange().getDisplayValues();

    for (let i = 1; i < appointmentData.length; i++) {
        if (appointmentData[i][14] != "Yes") {
            let eventId = createCalendarEvent(`Name: ${appointmentData[i][1]}, For: ${appointmentData[i][5]}`, appointmentData[i][6], appointmentData[i][7]);
            if (eventId) {
                calData.push([eventId, appointmentData[i][12], "", ""])// push new calendar event to sheet
                appointmentData[i][14] = "Yes" // update creation status to appointment status
            }
        }
    }
    // set new values
    appointmentSheet.getRange(1, 1, appointmentData.length, appointmentData[0].length).setValues(appointmentData);
    calSheet.getRange(1, 1, calData.length, calData[0].length).setValues(calData);
    // title --> "Name: Nibesh Khadka, For: Create Add-On "
}