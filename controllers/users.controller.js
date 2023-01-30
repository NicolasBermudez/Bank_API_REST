const { Op } = require('sequelize');
const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');

exports.newUsers = async (req, res) => {
  try {
    const { name, password, status, amount } = req.body;

    const newUsers = await User.create({
      name,
      password,
      status,
      amount,
      accountNumber: Math.floor(Math.random() * 123456 + 100000),
    });

    res.status(200).json({
      status: 'success',
      message: 'New Users',
      newUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await User.findOne({
      where: {
        accountNumber,
        password,
        status: true,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Login user',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};

exports.historyUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    const allTransferUser = await Transfer.findAll({
      where: {
        [Op.or]: [
          { senderUserId: user.accountNumber },
          { receiverUserId: user.accountNumber },
        ],
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'All transfer User',
      allTransferUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server error',
    });
  }
};
