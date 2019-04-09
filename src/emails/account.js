const sgMail = require('@sendgrid/mail')
const dotenv=require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const sendWelcomeEmail = (email,name) =>  {

  sgMail.send({
  to : email,
  from : 'rahul.pillai93@gmail.com',
  subject: 'Welcome to my new App!',
  text: `Hello ${name}! Welcome to my new task manager app. I am always open to feedback so do let me know how I can make this app better to suit your personal needs. `

  })


}

const sendDelEmail = (email,name) =>  {

  sgMail.send({
  to : email,
  from : 'rahul.pillai93@gmail.com',
  subject: 'We are sorry you are leaving!',
  text: `Hello ${name}! We hope you had a great time using our app. Please leave us a reply on how we can improve our app. `

  })


}

module.exports = { sendWelcomeEmail, sendDelEmail}
