var express = require('express');
var router = express.Router();
const AccessControl = require('accesscontrol');
const { ROLES } = require('../Role');
  const ac = new AccessControl();
  ac.grant('admin')
    .updateAny('post')
    .readAny('post')
    .grant('writer')
    .createOwn('post')
    .deleteOwn('post')
    .readAny('post')
    .grant('editor')
    .extend('writer')
    .updateAny('post')
    .deleteAny('post')
 

/* GET home page. */
router.get('/', function (req, res, next) {
 
 const permissions = ac.can(ROLES.ADMIN)['updateAny','readAny']('post')
  if( permissions.granted){
    res.send('ok')
  }
  res.send("authorized")
});

module.exports = router;
