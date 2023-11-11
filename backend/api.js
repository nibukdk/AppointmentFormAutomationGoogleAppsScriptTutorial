function doGet(e) {
    try {
        var reqType = e.parameter.reqType;
        var param = e.parameter;

        switch (reqType) {
            case "updateAppointment":
                const newAppointmentData = { ...fakeAppointmentData };
                newAppointmentData.name = param.name;
                newAppointmentData.email = param.email;
                newAppointmentData.address = param.address;
                newAppointmentData.company = param.company;
                newAppointmentData.purpose = param.purpose;
                newAppointmentData.date = param.date;
                newAppointmentData.time = param.time;
                newAppointmentData.message = param.message;

                return contentService(updateAppointmentDataInSheets(newAppointmentData));

            case "markDocAsReviewed":
                return contentService(docReviewStatusEventHandler(param.eventId));

            default:
                return contentService({
                    status: 200,
                    message: "Connection Successfull",
                    data: "",
                });
        }
    } catch (err) {
        contentService({
            status: 400,
            message: "Error",
            data: err,
        });
    }
}
function contentService(data) {
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
        ContentService.MimeType.JSON
    );
}