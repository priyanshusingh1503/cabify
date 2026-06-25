const nodemailer = require('nodemailer');

let transporter = null;

const createTransporter = () => {
  if (transporter) return transporter;
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    console.log('Email transporter configured with Gmail');
  } else {
    console.log('Gmail credentials not found — using mock mode');
    transporter = null;
  }
  return transporter;
};

const sendOtpEmail = async (email, otp) => {
  const tr = createTransporter();
  if (!tr) { console.log(`[MOCK] OTP ${otp} would be sent to ${email}`); return true; }
  try {
    await tr.sendMail({
      from: `"Cabify" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your Cabify OTP Code',
      html: `<div style="font-family:Arial;max-width:400px;margin:0 auto"><h2>Cabify</h2><p>Your verification code is:</p><h1 style="font-size:36px;letter-spacing:8px;text-align:center">${otp}</h1><p>This code expires in 5 minutes.</p></div>`,
    });
    return true;
  } catch (error) {
    console.error('Failed to send email:', error.message);
    console.log('Falling back to mock mode — OTP', otp);
    return true;
  }
};

module.exports = { sendOtpEmail };
