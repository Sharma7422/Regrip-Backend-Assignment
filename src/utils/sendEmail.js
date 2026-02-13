const nodemailer = require("nodemailer");

module.exports = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 5000,
      socketTimeout: 5000,
      pool: {
        maxConnections: 1,
        maxMessages: Infinity,
        rateDelta: 20000,
        rateLimit: 5,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
      html: `<h2>OTP Verification</h2><p>Your OTP is: <strong>${otp}</strong></p><p>This OTP will expire in 5 minutes.</p>`,
    });
  } catch (error) {
    console.error("Email sending error:", error.message);
    // Don't throw - OTP is generated even if email fails
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

