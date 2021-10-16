const mongoose = require('mongoose');
const ConnectDB = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/ShopDT')
        console.log('Database Connected');
    } catch (error) {
        thor.error(error);
    }
}
module.exports = ConnectDB;