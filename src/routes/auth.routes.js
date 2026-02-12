const router = require("express").Router();
const { sendOtp, verifyOtp } = require("../controllers/auth.controller");
const { otpLimiter, loginLimiter } = require("../middleware/rateLimiter");

router.post("/send-otp", otpLimiter, sendOtp);
router.post("/verify-otp", loginLimiter, verifyOtp);

module.exports = router;
