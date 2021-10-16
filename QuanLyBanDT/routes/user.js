var express = require('express');
const User = require('../model/User');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
/* GET home page. */
router.post('/dang-nhap',async function(req, res, next) {
    const data = req.body;
    const user = await User.find({ email: data.email})
    session = req.session;
    session.username =user[0].username;
    session.userid = user[0].id;
   
    if(!user) {
        res.send('Vui lòng đăng ký')
    }
    const checkUser = await bcrypt.compareSync(data.password,user[0].password)
    if(!checkUser) {
        res.send('Vui lòng đăng ký')
    }else{
        const token = jwt.sign({_id:user[0]._id,roles:user[0].role},'MYPRIVATE',{
            expiresIn:'1d'
        })
        res.cookie('token',token)
    res.redirect('/')
    }
});
router.post('/dang-ky',async function(req, res, next) {
    const data = req.body;
    const findExist = await User.find({email: data.email})
    const pass = bcrypt.hashSync(data.password,10)
    if(findExist.length>0) {
       res.send('Email is exist')
    }else{
        const user = new User({
            username: data.username,
            email: data.email,
            password: pass
        })
        const item = await user.save();
      
        item?res.redirect('/'):res.send('DK FAILED')
    }
   
})
router.get('/logout',async function(req, res, next){

    if(req.session.destroy()){
        res.clearCookie('token')
        res.redirect('/')
    }
    res.redirect('/')
})
module.exports = router;
