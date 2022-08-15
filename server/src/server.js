const https = require('https')
const fs = require('fs')
const helmet = require('helmet')
const path = require('path')
const app = require('./app')
const mongoose = require('mongoose')
const passport = require('passport')
const sessionCookies = require('cookie-session')
const { Strategy } = require('passport-google-oauth20')


// ====================== Configurations ==========================

require('dotenv').config();
const PORT = process.env.PORT || 8000

const configure = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SEC: process.env.CLIENT_SEC, 
    SESSION_KEY_1: process.env.SESSION_KEY_1,
    SESSION_KEY_2: process.env.SESSION_KEY_2
}



// ====================== PASPORT JS SETUP FOR AUTH ( Simplified ) =================

const Auth_Strategy_Config = {
    callbackURL:'/auth/google/callback',
    clientID:configure.CLIENT_ID, 
    clientSecret:configure.CLIENT_SEC
}
const verify_Auth_CallBack = (accessToken, refreshToken , profile, done)=>{
    console.log('Access token ', accessToken)
    console.log('refresh token ', refreshToken)
    console.log('profile  ', profile)
    done(null, profile)
}
passport.use(new Strategy(Auth_Strategy_Config, verify_Auth_CallBack ))


// ========================= SECURING SERVER ============================

// in case of express-session , we can change user.id ( forminimum data to share) and 
// set deserialization => findbyid(database) and in return send user .
passport.serializeUser((user, done)=>{
    console.log('serialization====', user.id)
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    console.log("Deserialization ===", id)
    done(null,id )
})


app.use(helmet())

app.use(sessionCookies({
    name:'session',
    maxAge: 60*1000, 
    keys:[configure.SESSION_KEY_1, configure.SESSION_KEY_2]
}))

app.use(passport.initialize())
app.use(passport.session())


function checkLoggedIn(req, res, next){
    console.log("Request User in console", req.user)
    const isLoggedIn = req.isAuthenticated() && req.user; 
    if(!isLoggedIn){
        return res.status(200).json({
            error:"Login First !"
        })  
    }
    next();
}


// =========================== SECURED  ROUTES ==========================

app.get('/secret', checkLoggedIn,  (req, res) => {
    res.send('Yo---- Its the secured end point !!')
})


// =================== SINGLE SIGN ON WITH GOOGLE ===================


app.get('/auth/google', passport.authenticate('google', {
    scope:['email']
})) 

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect:'/failure',
    successRedirect:'/', 
    session: true
}), (req, res)=>{
    console.log('Google Called Us Back ! ')
})


app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/')
 })



// ======================= Self-Signed Keys ====================

const options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
}

const server = https.createServer(options, app)


// ============================= MONG DB CONNECTION =========================

mongoose.connection.once('open', () => {
    console.log("Connected to DB")
})

mongoose.connection.on('error', (error) => {
    console.log("error in connecting to db", error)
})


// ===================== LOADIND Databse DATA and then running Server ===============================

async function connectMongoDb() {
    await mongoose.connect('mongodb+srv://admin:WNRRWpqffFZeWuB5@cluster0.xdxq9.mongodb.net/?retryWrites=true&w=majority')

    server.listen(PORT, () => console.log(`Running on ${PORT}`))
}



connectMongoDb()

