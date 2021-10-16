const Users = require('../model/Users');
const bcrypt = require('bcrypt');
const userChema = require('../Validator/userChema');
const { updateToken } = require('../common/updateToken');
const { generateToken } = require('../common/generateToken');
const  jwt  = require('jsonwebtoken');
require('dotenv').config();
exports.register = async (req, res, next) => {
    try{

        const results = await userChema.userChema.validateAsync(req.body);
        const userExist =await Users.find({email: results.email});
        if(userExist.length>0){
            res.status(404).json({message:"email is exists"})
        }
        const passHash = await bcrypt.hashSync(results.password,Number(process.env.SALT_ROUND)) ;
        const register = new Users({
            username:results.username,
            password:passHash,
            email:results.email,
        })
        const regis = await register.save();
        regis ? res.status(200).json({message:"Register is success"}) : res.status(404).json({message:"Register is failed"})
      
    }catch(err){
        res.status(404).json({Error:err.message})
    }
}
exports.login = async (req, res,next) => {
    try{
        const {email,password} = req.body;
        sess = req.session;
        const user = await Users.find({email:email});
        if(user){
            req.session.regenerate((err) =>{
               if(err) throw err
            })
        sess.email=email;
        sess.password=password;
        }
        
        if(!user) {
            res.status(404).json({message:'User is not found'})
        }
        const results = await userChema.LoginSchema.validateAsync(req.body);
        const isPass = await bcrypt.compareSync(results.password,user[0].password)
        if(!isPass) {
            res.status(404).json({message:'Password is not correctly'})
        }
        const payload = {
            userId:user[0]._id,
            roleId:user[0].roles
        }
       
        const tokens = generateToken(payload);
        
   
        updateToken(user[0].email,tokens.refreshToken);  
        res.cookie('token',tokens.access_token);
        res.cookie('refreshToken',tokens.refreshToken,{
            httpOnly:true
        });
        req.session.regenerate(err=>{

        })
        res.redirect('/me')
        res.status(200).json({tokens:tokens});
       
    }catch(err){
        res.status(404).json({Error:err.message})
    }
}
exports.token = async (req, res) => {
    const token = req.cookies.refreshToken;
   if(!token) return res.status(404).json({messsage:'UnAuthorize token'})
   const user = await Users.find({refreshToken:token})
   if(user.length <=0) return res.status(404).json({messsage:'UnAuthorize token'})
   else if(user[0].refreshToken === null) {return res.status(404).json({messsage:'UnAuthorize token'})}
   else{
    try{
        jwt.verify(user[0].refreshToken,process.env.REFRESH_TOKEN_SECRET)
        const payload = {
            userId:user[0]._id,
            roleId:user[0].roles
        }
        const tokens = generateToken(payload);
        res.cookie('token',tokens.access_token);
        res.cookie('refreshToken',tokens.refreshToken);
        updateToken(user[0].email,tokens.refreshToken);
        res.status(200).json({tokens})
    }catch(err){
        res.status(404).json({Error:err.message})
    }
   }
}
exports.profile = async (req, res) => {
        try {
            console.log(req.session);
            const user = await Users.find({_id:req.userId})
            res.send('<a href="/logout">Logout</a>')
        } catch (error) {
            res.status(404).json({Error:error.message})
        }
}
exports.Checklogin = async (req, res,next) => {
    const sess=req.session;
    if(sess.email && sess.password){
        return next()
    }else{
        res.send("Unathentication")
    }
}