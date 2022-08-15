const usersMongo = require("../models/users/users.mongo")






async function httpSignUpUser(req, res){
    const inputUser = req.body

    try {
        const user = await usersMongo.create(inputUser)
        console.log(user)
        return res.status(201).json(user)
    } catch (error) {
        res.status(400).json({
            message:'user could not save'
        })
    }

}



module.exports = {
    httpSignUpUser
}