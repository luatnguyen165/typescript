const mongoose = require('mongoose');
const ConnectDB = async () =>{
    try {
            mongoose.connect('mongodb://localhost:27017/ShopBanHang');
            console.log('Database connection established');
    } catch (error) {
        console.error(error);
    }
}
module.exports =ConnectDB;