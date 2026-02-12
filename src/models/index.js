const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = require("./user.model")(sequelize, DataTypes);
const Activity = require("./activity.model")(sequelize, DataTypes);
const Task = require("./task.model")(sequelize, DataTypes);


Task.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Task, { foreignKey: "userId" });

sequelize.sync();

module.exports = { sequelize, User, Activity, Task };
