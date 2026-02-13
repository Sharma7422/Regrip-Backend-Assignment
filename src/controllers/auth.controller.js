const jwt = require("jsonwebtoken");
const { User, Activity } = require("../models");
const logActivity = require("../utils/logActivity");
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("../utils/asyncHandler");


exports.sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    const error = new Error("Email is required");
    error.status = 400;
    throw error;
  }

  let user = await User.findOne({ where: { email } });

  const otp = generateOtp();
  const expires = new Date(Date.now() + 5 * 60 * 1000);

  if (!user) {
    user = await User.create({
      email,
      otp,
      otpExpires: expires,
    });
  } else {
    user.otp = otp;
    user.otpExpires = expires;
    await user.save();
  }

  // Send email in background (don't await)
  sendEmail(email, otp).catch(err => {
    console.error("Failed to send email:", err.message);
  });
  
  // Log activity in background
  logActivity(user.id, "OTP Sent", req.ip).catch(err => {
    console.error("Failed to log activity:", err.message);
  });

  res.json({ status: "success", message: "OTP sent successfully" });
});



exports.verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    const error = new Error("Email and OTP are required");
    error.status = 400;
    throw error;
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error("User not found");
    error.status = 400;
    throw error;
  }

  if (user.otp !== otp) {
    await logActivity(user.id, "Login Failed - Invalid OTP", req.ip);
    const error = new Error("Invalid OTP");
    error.status = 400;
    throw error;
  }

  if (new Date() > user.otpExpires) {
    await logActivity(user.id, "Login Failed - OTP Expired", req.ip);
    const error = new Error("OTP expired");
    error.status = 400;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  await logActivity(user.id, "Login Success", req.ip);

  res.json({
    status: "success",
    message: "Login successful",
    token,
  });
});
