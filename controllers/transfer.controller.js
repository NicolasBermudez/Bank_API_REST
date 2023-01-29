const Transfer = require("../models/transfer.model")
const User = require("../models/user.model")

exports.transfer = async(req, res) => {
   
  try {
    
    const { senderUserId, receiverUserId, amount } = req.body

    const sender = await User.findOne({
      where:{
      accountNumber: senderUserId,
    }
    })
  
    const receiver = await User.findOne({
      where:{
        accountNumber: receiverUserId
    }
    })

    if (amount > sender.amount) {
      return res.status(400).json({
        status: 'fail',
        message: 'Transfer amount cannot be greater than the senderUserId balance'
      })
    }
    
    const newTransfer = await Transfer.create({
      receiverUserId: receiver.accountNumber,
      senderUserId: sender.accountNumber,
      amount
      })

    const amountReceiver = receiver.amount + amount

    const amountSender = sender.amount - amount
    
    await receiver.update({amount: amountReceiver})

    await sender.update({amount: amountSender})

    res.status(200).json({
      status: 'success',
      message: 'new transfer',
      newTransfer
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server error'
    })
  }
}