const { DataTypes } = require("sequelize");
const { db } = require("../database/db");


const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNum: false,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNum: false
  },
  accountNumber: {
    type: DataTypes.INTEGER,
    allowNum: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT(2),
    allowNull: false,
    defaultValue: 1000
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
})

module.exports = User