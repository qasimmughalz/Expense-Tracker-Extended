

const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    title:{
        type:String, 
        required: true
    }, 
    expense:{
        type:Number, 
        required: true
    }, 
    category:{
        type:String, 
        required: true
    },
    budget:{
        type:Number
    }, 
    date:{
        type:Date
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'user'
    }
})



module.exports = mongoose.model('expense', expenseSchema)