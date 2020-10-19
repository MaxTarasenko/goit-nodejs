require('dotenv').config();
const nodemailer = require('nodemailer');
const { sender } = require('./config');

const main = async () => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  const mailOptions = {
    from: sender, // sender address
    to: 'yirepih627@ngo1.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  };

  await transporter.sendMail(mailOptions);
};

main();
