require('dotenv').config();
const nodemailer = require('nodemailer');
const { sender } = require('../config');

const toVerifyUser = async (email, token) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: sender, // Sender address
    to: `${email}`, // Recipient
    subject: 'Verify email', // Message subject
    text: '', // Plain text body
    html: `<a href=http://localhost:3000/api/auth/verify/${token}>Click to verify</a>`, // html body
  };

  await transporter.sendMail(mailOptions);
};

module.exports = toVerifyUser;
