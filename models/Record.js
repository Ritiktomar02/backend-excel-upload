const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Record = sequelize.define("Record", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  education: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Record;
