
function sendEmail(name, clientEmail, formURl) {
    const emailTemplate = `
    Hi ${name}],
    
    Thank you for reaching out to us about scheduling an appointment.
    
    To get started, please fill out our preliminary questions form at the following link:
    
    ${formURl}
    
    Your answers will help us better understand your needs and prepare for your appointment.
    
    Once you have submitted the form, we will be in touch to schedule a time to speak.
    
    We look forward to hearing from you soon!
    
    Best regards,
    Nibesh Khadka`;
  
    // Send the email.
    MailApp.sendEmail(
      clientEmail,
      "Preliminary questions form for your appointment",
      emailTemplate
    );
  }