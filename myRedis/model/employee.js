const mongoose = require('mongoose');
const emShema = mongoose.Schema({
    name: {
        type: String
    }
})
module.exports = mongoose.model('employ',emShema)