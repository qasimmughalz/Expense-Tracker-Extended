const { addNewExpense, getAllExpenses, getUserExpense , DeleteExpense} = require("../../models/expense/expenses.model")



async function httpAddNewExpense(req,res){

        const result = await addNewExpense(req.body)
        console.log('=====resultant after saving data =======',result)

        if(!result){
           return res.status(400).json({
                error:'Could not add your expense'
            })
        }else{
            return res.status(200).json(result)
        }
}


async function httpGetAllExpenses(req,res){
    const userEmail = req.user.user
    return res.status(200).json(await getAllExpenses(userEmail))
}


async function httpGetUserExpense(req,res){
    const {user } = req.params
    console.log("Params", user)
    const result = await getUserExpense(user)
    console.log("user resultant ======", result)
    if(!result){
        res.status(200).json({
            error:'Could not find User'
        })
    }else{
        res.status(200).json(result)
    }
}



async function httpDeleteExpense(req,res){ 
    const id = req.params.id
    return res.status(200).json(await DeleteExpense(id))
}

module.exports = {
    httpAddNewExpense, 
    httpGetAllExpenses,
    httpGetUserExpense, 
    httpDeleteExpense
}