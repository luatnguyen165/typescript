var express = require('express');
const { register,login,token, profile, Checklogin, } = require('../Controller/authorController');
const { checkAuthenticated, LoginGG } = require('../Controller/socailLogin');

const { IsAuthor } = require('../MiddlewareAuth/isAuthor');
var passport = require('passport');
var router = express.Router();

router.get('/',LoginGG)
router.get('/auth/google',passport.authenticate('google', {
  scope:
      ['email', 'profile']
}
))
router.get('/failed',async(req, res, next)=>{
  res.send('failed')
});
router.get('/auth/google/callback',passport.authenticate('google',  {
  failureRedirect: '/failed',
}),
function(req, res) {
    res.redirect('/google');
})

router.get('/google',checkAuthenticated,async(req, res,next)=>{
  console.log(req.user.displayName);
  res.send('Login')
})
router.post('/register',register);
router.post('/login',login);
router.post('/token',token);
router.get('/me',profile);
router.get('/logout',async(req, res, next)=>{
  if(res.clearCookie('connect.sid')){
    req.session.regenerate(err=>{
      res.redirect('/')
    })
  }
})
module.exports = router;
