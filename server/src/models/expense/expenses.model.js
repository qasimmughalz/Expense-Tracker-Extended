const { default: mongoose } = require('mongoose')
const pizza = require('../pizzas/pizza')
const { insertMany } = require('../users/users.mongo')
const userDB = require('../users/users.mongo')
const { db } = require('./expenses.mongo')
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
            date: '2022-08-28T08:26:09.713Z',
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


async function DeleteExpense(id){
    try {
        const findId = await expenseDB.deleteOne({_id:id})
        return findId
    } catch (error) {
        console.log("error in deleting expenses data". error)
        return 
    }
}


async function updateExpense(data , email){
    try {
        const {} = data
        const userFind = await userDB.findOne({email: email})

        const result = await expenseDB.updateOne({user: mongoose.Types.ObjectId(userFind._id)})
        return findId
    } catch (error) {
        console.log("error in deleting expenses data". error)
        return 
    }
}








// ---------------- Aggregation Practise ------------------



async function InserAllPizzas(){
    const result = await pizza.insertMany([
        { _id: 0, name: "Pepperoni", size: "small", price: 19,
          quantity: 10, date: "2021-03-13T08:14:30Z" },
        { _id: 1, name: "Pepperoni", size: "medium", price: 20,
          quantity: 20, date :  "2021-03-13T09:13:24Z"  },
        { _id: 2, name: "Pepperoni", size: "large", price: 21,
          quantity: 30, date :  "2021-03-17T09:22:12Z"  },
        { _id: 3, name: "Cheese", size: "small", price: 12,
          quantity: 15, date :  "2021-03-13T11:21:39.736Z" },
        { _id: 4, name: "Cheese", size: "medium", price: 13,
          quantity:50, date :  "2022-01-12T21:23:13.331Z"  },
        { _id: 5, name: "Cheese", size: "large", price: 14,
          quantity: 10, date :  "2022-01-12T05:08:13Z"  },
        { _id: 6, name: "Vegan", size: "small", price: 17,
          quantity: 10, date :  "2021-01-13T05:08:13Z"  },
        { _id: 7, name: "Vegan", size: "medium", price: 18,
          quantity: 10, date :  "2021-01-13T05:10:13Z"  }
     ] )
     console.log("inserted result", result)
}



// The following aggregation pipeline example contains two stages and returns the total order quantity of medium size pizzas grouped by pizza name:



// async function AggregationExample1(){
//     const result = await pizza.aggregate([
//         {
//             $match: {size: 'medium'}
//         }, 
//         {
//             $group:{ _id: '$name', TotalOrder:{$sum :'$quantity'}}
//         }
//     ])
//     console.log("Problem 1 result", result)
// }

// AggregationExample1()



// async function AggregationExample2(){
//         const result = await pizza.aggregate([
//             {
//                 $match: {name: 'Cheese', size:'medium'}
//             }, 
//             {
//                 $group: { _id:'$name' , totalValue : { $sum: {$multiply:["$quantity", "$price"]}} , avrg:{$avg:'$quantity'} }
//             },
//             {
//                 $sort: { totalValue: -1 }
//             }
//         ])
//         console.log("Problem 1 result", result)
//     }
    
//     AggregationExample2()




// async function AggregationTest(){
//     try {
//         const result = await expenseDB.estimatedDocumentCount()
//         console.log("Aggregation Result", result)
//         return result
//     } catch (error) {
//         console.log("Error in Aggregation ")
//         return error
//     }
// }



module.exports = {
    addNewExpense, 
    getAllExpenses, 
    getUserExpense, 
    DeleteExpense, 
    updateExpense
    
}