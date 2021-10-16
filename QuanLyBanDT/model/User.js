const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: {
        type: String,
        enum: ['Admin','User'],
        default: 'User'
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('users', UserSchema);