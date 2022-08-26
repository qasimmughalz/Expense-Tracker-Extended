
const express = require('express')
const path = require('path')
require('dotenv').config()
const bodyParser = require('body-parser')
const { UserRoutes } = require('./routes/users/users.routes')
const expenseRouter = require('./routes/expense/expense.router')
const jwt = require('jsonwebtoken')
const userDB = require('./models/users/users.mongo')
const cors = require('cors')
const { httpSignUpUser } = require('./routes/auth')
const { postAllSessions } = require('./routes/sessions/sessions')
const { AggregationTest } = require('./models/expense/expenses.model')
const { readdirSync } = require('fs')
const app = express()


app.use(express.json())
app.use(cors({origin: '*'}))

app.use(express.static(path.join(__dirname , '..', 'public')))





// ================= Authentication | Login  =========================


app.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    const authenticate = await userDB.findOne({email})
    console.log("User foud is:", authenticate)
    if(!authenticate){
        res.status(400).json({
            message:'User Not found'
        })
    }else{  
        if(authenticate.password === password){
            const accessToken =  createJwtToken(email)
            return res.status(200).json({
                accessToken: accessToken
            })
        }else{
            res.status(400).json({
                message:'Password did not match'
            })
        }
    }
})


// ================= SIGN UP =========================

app.post('/signup',  httpSignUpUser )

// ===================== Authorization | Vaidate ==================

function createJwtToken(user){
    const token = jwt.sign({user:user}, configure.JWT_SECRET_KEY , {expiresIn : '1h'} )
    console.log('token created ', token)
    return token
}



function authorize(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 
    if(token == null){
        return res.status(401).json({
            error:'no token found'
        })
    }
    jwt.verify(token , configure.JWT_SECRET_KEY, (err, user)=>{
        if(err) return res.status(403).json({error: 'Token is not valid'})
        req.user = user
        next()
    })
}


app.post('/verifyToken', (req,res )=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 
    if(token == null){
        return res.status(404).json({
            error:'No token found'  
        })
    }
    jwt.verify(token , configure.JWT_SECRET_KEY, (err, user)=>{
        if(err) {
         return res.status(403).json({error: 'Token is not valid'})
        }else{
            return res.status(200).json({message: 'Token Verified'})
        }
        
    })
})


app.post('/allSessions', postAllSessions )



app.get('/test', async (req,res)=>{
    const result = await AggregationTest()
    return res.status(200).json({res: result})
} )


app.use('/user', authorize ,  UserRoutes)
app.use('/expense', authorize,  expenseRouter)



const configure = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}












module.exports = app

