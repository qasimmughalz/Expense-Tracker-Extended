const usersDB = require('./users.mongo')


async function addNewUsers(user){
    try {
        return await usersDB.create(user)
    } catch (error) {
        console.log("Error in Saving", error)
    }
}

async function getAllUsers(user){
    try {
       return await usersDB.find({})
    } catch (error) {
        console.log("Error in Saving")
    }s
}


async function getAllCategories(email){
    try {
        const userFind = await usersDB.findOne({email})
        console.log("user categories", userFind)
       return await userFind.categories
    } catch (error) {
        console.log("Error in Saving")
    }s
}


async function addNewCategory(gmail , category){
    try {
        const userFind = await usersDB.findOne({gmail})
        console.log("Email Received : ", userFind)
        console.log("Category Received : ",category)
        userFind.categories.push(category)
        userFind.save()
        .then((res)=> console.log("Saved", res))
        .catch((err)=> console.log("err", err))
        return userFind
    } catch (error) {
        console.log("Error in Saving")
    }
}


module.exports = {
    addNewUsers, 
    getAllUsers,
    addNewCategory,
    getAllCategories
}