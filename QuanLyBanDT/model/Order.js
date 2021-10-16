const mongoose = require('mongoose');
const Order = mongoose.Schema({
    users: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'users',
        required: true,
    },
    orderItem:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'OrderItem',
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    totalPrice:Number
})
module.exports =mongoose.model('Order', Order)