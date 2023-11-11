var ss = SpreadsheetApp.getActiveSpreadsheet();

// all data except the timestamp
var fakeAppointmentData = {
  email: "art@gmail.com",
  name: "Arttu Karjalainen",
  address: "Helsinki",
  company: "Himali Coders",
  date: "2023-10-19",
  time: "10:00",
  message: "An issue with the script needs fixing. It was working fine, but then I changed ownership of some google folders  (since I'm using the later for work typically so it's more convenient to have everything owned by that account). Now we're seeing attached error 'access denied driveapp' on execute population.",
  purpose: "Review Code",
}


function updateAppointmentDataInSheets(appointmentData = fakeAppointmentData) {
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



function updateSheetsWithGptQuestions() {
  const lastRowIndexOfPrevIteration = Number(LastUsedRowByGPTProperty.get()) ?? 1;
  let lastRowUsedInCurrentIteration = lastRowIndexOfPrevIteration;
  const startTime = Date.now();

  const sheet = ss.getSheetByName("Appointments");
  const data = sheet.getDataRange().getValues();
  // if nothings changed and data is called somehow then return
  if (lastRowIndexOfPrevIteration >= data.length) return;
  // set for loops index position
  // match sheet row index value that start from 1 wth index in arrays that start from 0. 
  //We'll also skip first row and start from second that that is index 1 in data
  const indexPos = lastRowIndexOfPrevIteration > 1 ? lastRowIndexOfPrevIteration - 1 : 1;

  console.log(`Last Row index of last iteration ${lastRowIndexOfPrevIteration}`)

  for (let i = indexPos; i < data.length; i++) {
    console.log(`Starting from index ${i}`)
    if (isFiveMinOver(startTime)) break;
    console.log(data[i]);
    // skip loop if somehow gpt question is already filled
    if (data[i][9] != "") continue;

    // else 
    const gptQuestions = fetchDataFromGPT({
      name: data[i][1],
      email: data[i][2],
      address: data[i][3],
      purpose: data[i][5],
      message: data[i][8]
    })
    // save all ten question as a cell value 
    data[i][9] = gptQuestions;
    // update the last row being used 
    lastRowUsedInCurrentIteration = i;
  }

  // set value
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  // update sheet last used row index + 1 
  LastUsedRowByGPTProperty.set(lastRowUsedInCurrentIteration + 1)

}

function populateFormWithQuestions() {
  const lastRowIndexOfPrevIteration = Number(LastUsedRowByFormProperty.get()) ?? 1;
  let lastRowUsedInCurrentIteration = lastRowIndexOfPrevIteration;
  const startTime = Date.now();

  const sheet = ss.getSheetByName("Appointments");
  const data = sheet.getDataRange().getDisplayValues();// not getValues(); we don't want long time stamp values as form name 

  // if nothings changed and data is called somehow then return
  if (lastRowIndexOfPrevIteration >= data.length) return;
  const indexPos = lastRowIndexOfPrevIteration > 1 ? lastRowIndexOfPrevIteration - 1 : 1;

  console.log(`Last Row index of last iteration ${lastRowIndexOfPrevIteration}`)
  // create form link variable
  let formLink, formId;

  for (let i = indexPos; i < data.length; i++) {
    console.log(`Starting from index ${i}`)
    if (isFiveMinOver(startTime)) break;
    console.log(data[i]);
    // skip loop if form created? 
    if (data[i][10] === "Yes") continue;

    // create form is the form hasn't been already created
    if (data[i][10] != "Yes") {
      [formLink, formId] = createForm(data[i]);
      data[i][10] = "Yes";// set values for form creation to Yes
      data[i][11] = formLink; //set form link
      data[i][12] = formId; //set form ID

    }

    // update the last row being used 
    lastRowUsedInCurrentIteration = i;
  }

  // set new value with form created and gmail sent checked as well as form link
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  // update sheet last used row index + 1 
  LastUsedRowByFormProperty.set(lastRowUsedInCurrentIteration + 1)

}


function emailFormLinkToUser() {
  const lastRowIndexOfPrevIteration = Number(LastUsedRowByGmailProperty.get()) ?? 1;
  let lastRowUsedInCurrentIteration = lastRowIndexOfPrevIteration;
  const startTime = Date.now();

  const sheet = ss.getSheetByName("Appointments");
  const data = sheet.getDataRange().getDisplayValues();// not getValues(); we don't want long time stamp values as form name 

  // if nothings changed and data is called somehow then return
  if (lastRowIndexOfPrevIteration >= data.length) return;
  const indexPos = lastRowIndexOfPrevIteration > 1 ? lastRowIndexOfPrevIteration - 1 : 1;

  console.log(`Last Row index of last iteration ${lastRowIndexOfPrevIteration}`)

  for (let i = indexPos; i < data.length; i++) {
    console.log(`Starting from index ${i}`)
    if (isFiveMinOver(startTime)) break;
    console.log(data[i]);
    // skip if no form link or if Email has been already sent
    if (data[i][11] === "" || data[i][13] === "Yes") continue;

    // send email if not already
    sendEmail(data[i][1], data[i][2], data[i][11])// if somehow the form was created but gmail was not sent then get link from data;
    data[i][13] = "Yes";  // set checkbox for gmail sent to Yes

    // update the last row being used 
    lastRowUsedInCurrentIteration = i;
  }

  // set new value with form created and gmail sent checked as well as form link
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  // update sheet last used row index + 1 
  LastUsedRowByGmailProperty.set(lastRowUsedInCurrentIteration + 1)

}




var isFiveMinOver = (startTime) => 300000 <= Date.now() - startTime;