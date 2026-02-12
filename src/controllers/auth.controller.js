const jwt = require("jsonwebtoken");
const { User, Activity } = require("../models");
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");


exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

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

    await sendEmail(email, otp);

    await Activity.create({
      userId: user.id,
      action: "OTP Sent",
      ip: req.ip,
    });

    res.json({ status: "success", message: "OTP sent successfully" });
    
  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};



exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(400).json({ status: "failure", message: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ status: "failure", message: "Invalid OTP" });

    if (new Date() > user.otpExpires)
      return res.status(400).json({ status: "failure", message: "OTP expired" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    await Activity.create({
      userId: user.id,
      action: "Login Success",
      ip: req.ip,
    });

    res.json({
      status: "success",
      message: "Login successful",  
      token,
    });

  } catch (err) {
    res.status(500).json({ status: "failure", message: err.message });
  }
};
