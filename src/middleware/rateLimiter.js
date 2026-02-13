const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many requests from this IP.",
  },
  skip: (req) => req.path === "/" || req.path.includes("/api-docs"),
});

exports.otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5, 
  message: {
    message: "Too many OTP requests. Please try again after 10 minutes.",
  },
});

exports.loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts. Try again later.",
  },
});

exports.apiLimiter = apiLimiter;
