const express = require('express')
const { httpAddNewUser, httpGetAllUsers, httpAddNewCategory, httpGetAllCategories } = require('./users.controller')
const UserRoutes = express.Router()
require('dotenv').config()




// =================    Login - Authenticate  ===================== 







UserRoutes.get('/', httpGetAllUsers)
UserRoutes.post('/', httpAddNewUser)

UserRoutes.get('/getCategories', httpGetAllCategories)
UserRoutes.post('/categories', httpAddNewCategory)





module.exports = {
    UserRoutes
}