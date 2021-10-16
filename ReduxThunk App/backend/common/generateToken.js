require('dotenv').config();
const jwt = require('jsonwebtoken');
exports.generateToken = (token)=>{
 
    const access_token = jwt.sign(token,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.EXPIRES_ACCESS_TOKEN
        })
    const refreshToken = jwt.sign(token,process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.EXPIRES_REFRESH_TOKEN
        })
        return {access_token,refreshToken}

}