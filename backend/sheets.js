const ss = SpreadsheetApp.getActiveSpreadsheet();

// all data except the timestamp
var fakeAppointmentData = {
    email: "nibeshkhadka@gmail.com",
    name: "Nibesh Khadka",
    address: "Helsinki",
    company: "Himali Coders",
    date: "2023-10-19",
    time: "10:00",
    message: "Hell",
    purpose: "Add-On",
}


function updateSheets(appointmentData = fakeAppointmentData) {
    try {
        const sheet = ss.getSheetByName("Appointments");
        const data = sheet.getDataRange().getValues();
        const currentTimeStamp = getReadableDate();

        if (data.length === 1) {
            data.push([currentTimeStamp, appointmentData.name, appointmentData.email, appointmentData.address, appointmentData.company, appointmentData.purpose, appointmentData.date, appointmentData.time, appointmentData.message])
        } else {

            for (let i = 1; i < data.length; i++) {
                // if name, email and time-stamp 
                if (data[i][0].slice(0, 10) === currentTimeStamp.slice(0, 10) && data[i][1] === appointmentData.name && data[i][2] === appointmentData.email) {
                    data[i][0] = currentTimeStamp;
                    data[i][3] = appointmentData.address;
                    data[i][4] = appointmentData.company;
                    data[i][5] = appointmentData.purpose;
                    data[i][6] = appointmentData.date;
                    data[i][7] = appointmentData.time;
                    data[i][8] = appointmentData.message;
                    // if there's a match  then break the loop
                    break;
                } else {
                    // if none match than append to new row
                    if (i === data.length - 1) {
                        console.log("Not match")
                        data.push([currentTimeStamp, appointmentData.name, appointmentData.email, appointmentData.address, appointmentData.company, appointmentData.purpose, appointmentData.date, appointmentData.time, appointmentData.message])
                    }
                }
            }
        }


        console.log(data);
        // set new values
        sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
    }
    catch (e) {
        return {
            status: 400,
            message: "Error",
            data: String(e),
        }
    }
    return {
        status: 200,
        message: "Appointment Sheets has been successfully updated",
        data: appointmentData,
    }
}

function getReadableDate(date = Date.now()) {
    const dt = new Date(date);
    return `${dt.getDate().toString().padStart(2, "0")}/${dt.getUTCMonth().toString().padStart(2, "0")}/${dt.getFullYear()},${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`
}   