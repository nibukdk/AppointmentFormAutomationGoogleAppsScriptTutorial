# Project Pre-Appointment Preliminary Questions

**Streamline Client Interactions and Gather Valuable Insights with Automated Questionnaires**

This project tutorial demonstrates the creation of a system that automatically sends questionnaires to potential clients who submit requests through an HTML form. The requests are stored in Google Sheets, and Google Apps Script automates various processes to facilitate the workflow.

**Effortless Automation Behind the Scenes:**

1. **ChatGPT Integration:** Upon receiving a client request, ChatGPT, seamlessly integrated into the system, generates 10 insightful questions to ask the client.

2. **Google Forms Creation:** Leveraging the power of Apps Script, a Google Form is swiftly created, embedding the 10 carefully crafted questions.

3. **Client Notification:** A personalized email is sent to the client, providing a link to the newly generated Google Form.

4. **Appointment Calendar Creation:** A dedicated Google Calendar event is automatically created, capturing the client's name, email, and appointment details. The event background color is set to pale red for easy identification.

5. **Form Response Processing:** A robust system periodically scans all submitted forms and their responses. Upon detecting a new form submission, the latest response is extracted and converted into a Google Doc using a simple template stored in the asset folder.

6. **Document Link Integration:** Once the Google Doc is generated, its link is automatically added to the corresponding calendar event, providing the admin/owner with convenient access to the client's responses.

**Manual Review Process:**

1. **Document Review Flag:** Upon document creation, an image from the asset folder is embedded with a link to an API call. This API call triggers an update in the "Cal_Events_Handler" spreadsheet tab, marking a column with the value "yes" to indicate that the document has been reviewed by the admin/owner.

2. **Calendar Event Update:** The calendar event associated with the document is also updated, changing its background color to pale green, further signifying that the document has been reviewed.

**Menu-Driven Manual Execution:**

All the aforementioned automated processes can also be initiated manually through a menu that appears upon loading the spreadsheet. It is crucial to execute the manual events in the order they appear in the menu, from top to bottom.

**YouTube Tutorial:**

For a comprehensive walkthrough of this project, please visit the following YouTube tutorial link:

[![Watch the Playlist From Here.](https://i.ytimg.com/vi/BQLA5McwmzY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAAXyDNscHfs5x5xOF-nwTfdr3NHw)]( https://youtube.com/playlist?list=PLP-52qZqWEvkj_riD9IecYtJtYPvDzUFd&si=Nu4LqawDs8v--D1l)


**Sharing and Recommendations:**

If you find this project valuable, please consider sharing it within your network and recommending me for relevant freelance opportunities. My name is Nibesh Khadka, a Google Apps Script Consultant.

**Thank you for your interest!**