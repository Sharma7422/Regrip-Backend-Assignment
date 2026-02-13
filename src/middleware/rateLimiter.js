const rateLimit = require("express-rate-limit");

exports.otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: {
    message: "Too many OTP requests. Please try again after 10 minutes.",
  },
  skip: () => true, // Disable for now due to proxy validation issues
});

exports.loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts. Try again later.",
  },
  skip: () => true, // Disable for now due to proxy validation issues
});

exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests from this IP.",
  },
  skip: () => true, // Disable for now due to proxy validation issues
});
