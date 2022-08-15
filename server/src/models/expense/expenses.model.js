const { default: mongoose } = require('mongoose')
const userDB = require('../users/users.mongo')
const expenseDB = require('./expenses.mongo')


async function addNewExpense(user){
    const {email , title, expense , category } = user
    try {
        const findUser = await userDB.findOne({email})
        console.log("User found in databse =====", findUser )
        const newData = new expenseDB({
            title:title, 
            expense:expense, 
            category: category,
            user:findUser._id
        })
        const result = await newData.save()
        return result
    } catch (error) {
        console.log('Error ==', error )
    }
}

async function getAllExpenses(email){
    try {
        console.log("check email", email)
        const findTheUser = await userDB.findOne({email})
        console.log("finding the user", findTheUser)
        const gettingUserId = findTheUser._id
        console.log("User Id found", gettingUserId)
        const expenses = await expenseDB.find({user: mongoose.Types.ObjectId(gettingUserId)});
        console.log("======== Data in expenses find function", expenses)
        return expenses
    } catch (error) {
        console.log("error in fetiching expenses data". error)
        return res.status(200).json({
            error: error
        })
    }
}

async function getUserExpense(user){
    try {
        const user = await userDB.find({user});
        const expenses = await expenseDB.find({user})
        console.log("========  Found the Data", expenses)
        return expenses
    } catch (error) {
        console.log("error in fetiching expenses data". error)
        return 
    }
}


module.exports = {
    addNewExpense, 
    getAllExpenses, 
    getUserExpense
}