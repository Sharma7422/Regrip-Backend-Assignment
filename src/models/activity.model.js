module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Activity", {
    userId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    ip: DataTypes.STRING,
  });
};
