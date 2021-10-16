const mongoose = require('mongoose');
const OrderItem =mongoose.Schema({
    products:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref:'Product',
            required:true
        }
    ],
    quantity:{
        type:Number,
        default:1
    }
})
module.exports = mongoose.model('OrderItem', OrderItem)