require('dotenv').config();
const nodemailer = require('nodemailer');

const toVerifyUser = async (email, token) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: `Nodemailer  ${process.env.NODEMAILER_USER}`, // Sender address
    to: `${email}`, // Recipient
    subject: 'Verify email', // Message subject
    text: '', // Plain text body
    html: `<a href=http://localhost:3000/api/auth/verify/${token}>Click to verify</a>`, // html body
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    if (info) {
      console.log(`E-mail response status - ${info.response}`);
    }
  });
};

module.exports = toVerifyUser;
