const jwt = require('jsonwebtoken');
exports.IsAuthor = async(req,res,next) => {
    try{
        const token = req.headers.authorization.split('Bearer')[1]  ;
        console.log(token);
        const tokens=  token.split(' ')[1] 
        console.log(tokens);
        const decode = jwt.decode(tokens);
        if(!decode) {
            return res.status(404).json({message: 'UnAuthorize'})
        }
        req.userId = decode.userId;
        req.roleId = decode.roleId;
        return next();
    }catch(err){
        res.status(404).json({message: err.message})
    }
    
}
