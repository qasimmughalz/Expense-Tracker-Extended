const { getAllUsers, addNewUsers, addNewCategory, getAllCategories } = require("../../models/users/users.models")



async function httpAddNewUser(req, res){
    const newUser = req.body
    return res.status(201).json(await addNewUsers(newUser))
}

async function httpGetAllUsers(req, res){
    return res.status(200).json(await getAllUsers())
}


async function httpGetAllCategories(req, res){
    const userEmail = req.user.user
    return res.status(200).json(await getAllCategories(userEmail))
}



async function httpAddNewCategory(req, res){
    const userEmail = req.user.user
    const category = req.body.category
    return res.status(200).json(await addNewCategory(userEmail, category))
}



module.exports ={
    httpAddNewUser, 
    httpGetAllUsers, 
    httpAddNewCategory,
    httpGetAllCategories
}