module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Activity", {
    userId: {
      type: DataTypes.INTEGER,
    },
    action: {
      type: DataTypes.STRING,
    },
    ip: {
      type: DataTypes.STRING,
    },
  });
};
