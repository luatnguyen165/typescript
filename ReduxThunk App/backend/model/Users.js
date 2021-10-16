const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        toLowerCase:true,
    },
    password:{
        type:String,

    },
    email:{
        type:String,
    },
    refreshToken:{
        type:String,
    },
    ggID:{
        type:String,
    },
    roles:{
        type:String,
        default:'User',
    }
})

module.exports =mongoose.model('Users', UserSchema);