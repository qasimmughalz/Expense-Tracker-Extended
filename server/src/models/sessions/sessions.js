const mongoose = require('mongoose')

const sessions = new mongoose.Schema({
    allSessions:{
        type:[{}]
    }, 
    SingleSession:{
        type: String
    }
})



module.exports = mongoose.model('sessionModal', sessions)