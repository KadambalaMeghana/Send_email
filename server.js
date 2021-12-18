require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'kadambalameghana1502@gmail.com', 
        pass: process.env.PASSWORD || '150202@M' 
    }
});

let mailOptions = {
    from: 'kadambalameghana1502@gmail.com', 
    to: 'meghanakadambala1502@gmail.com',
    subject: 'Task- Service to send email',
    text: 'Hi there...This is Kadambala Meghana.'
};

transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error message');
    }
    return log('Email sent succesfully');
});