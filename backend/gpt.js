const GPT_BASE_URL = "https://api.openai.com/v1/chat/completions";

function fetchDataFromGPT(appointmentData = fakeAppointmentData) {
    try {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GPT_SECRET_KEY}`
        };

        const options = {
            headers,
            method: "GET",
            muteHttpExceptions: true,
            payload: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{
                    "role": "system",
                    "content": "You're Appointment Scheduling Helper"
                },
                {
                    "role": "user",
                    "content": "I am a Google Apps Script Developer and Consultant. My clients often hire free me for a freelance projects."
                },
                {
                    "role": "user",
                    "content": `You'll create exactly 10 Pre-appointment questions for my clients to fill. The questions should consist of simple english as my clients can be non-native speakers. Questions are for me understand clearly what this client wants before meeting for the first time. 
                    Use the following details provided by clients to be more accurate, if/when applicable.
                    Client wants me to --> ${appointmentData.purpose}.
                    Message from Client --> ${appointmentData.message ?? "Not Provided"}.
                    Clients Location --> ${appointmentData.address}.
                    Clients Name --> ${appointmentData.name}.
                    Clients Email --> ${appointmentData.email}.
                    `
                },
                {
                    "role": "user",
                    "content": ` Instructions:
                    1. Respond in JavaScript Array Object format ONLY, !Important
                    2. All 10 questions should be individual items of that array, !Important. for instance:
                    [
                        "What specific functionality ...?",
                        "Are there any ...."
                    ] 
                    3. !Important, And don't add other supportive text like the following: 
                      Sure, here are 10 pre-appointment questions for your clients, 
                      I hope this helps,etc
                      `
                }
                ],
                "temperature": 0.7
            })
        };

        const response = JSON.parse(UrlFetchApp.fetch(GPT_BASE_URL, options));

        console.log(response)
        console.log(response.choices[0].message.content);

        return response.choices[0].message.content;
    } catch (e) {
        console.log(e);
        SpreadsheetApp.getActiveSpreadsheet().toast("Some Error Occured, please try again after some time.")

        return "Some Error Occured, please try again after some time.";
    }

}

// REDDIT POST on how to strictly define GPT Output: https://www.reddit.com/r/whoiskjl/comments/11brhqx/the_importance_of_the_initial_prompt_in_chatgpt/
