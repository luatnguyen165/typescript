const Users = require('../model/Users');
exports.updateToken = async (username,refreshToken) => {
    try {
        const user =await Users.find({email: username});
        const id = user[0]._id;
        const Update = await Users.findByIdAndUpdate(id,{
            refreshToken: refreshToken
        })
        await Update.save();
    } catch (error) {
        res.status(404).json({message:error.message})
    }
 
}