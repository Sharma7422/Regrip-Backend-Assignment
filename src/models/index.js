const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = require("./user.model")(sequelize, DataTypes);
const Activity = require("./activity.model")(sequelize, DataTypes);

sequelize.sync();

module.exports = { sequelize, User, Activity };
