
const mongoose = require('mongoose')


const pizzaModel = mongoose.Schema({
    _id:{
        type:Number
    },
    name:{
        type:String
    },
    size:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    date:{
        type:Date
    }

})


module.exports = mongoose.model('pizza', pizzaModel)