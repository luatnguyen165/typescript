const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    image:{
        type:String,
    },
    name:{
        type:String,
    },
    price:Number
  
})
module.exports = mongoose.model('Product', productSchema)