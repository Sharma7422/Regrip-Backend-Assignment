module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
    },
    otpExpires: {
      type: DataTypes.DATE,
    },
  });
};

