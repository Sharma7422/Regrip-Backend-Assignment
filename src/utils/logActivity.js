const { Activity } = require("../models");

const logActivity = async (userId, action, ip) => {
  try {
    await Activity.create({
      userId,
      action,
      ip,
    });
  } catch (error) {
    console.error("Activity Log Error:", error.message);
  }
};

module.exports = logActivity;
