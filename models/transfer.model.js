const { DataTypes } = require("sequelize");
const { db } = require("../database/db");


const Transfer = db.define('transfer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNum: false,
    type: DataTypes.INTEGER
  },

  senderUserId: {
    type: DataTypes.INTEGER,
    allowNum: false
  },

  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = Transfer