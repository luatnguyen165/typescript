var express = require('express');
const { getName, postName, cache } = require('../controller');

var router = express.Router();

/* GET home page. */
router.get('/',cache,getName);
router.post('/', postName)
router.get('/user/session',async (req, res) =>{
    req.user = {
        name:'luat'
    }

    res.send(user)
})
// router.get('/get/session',async function(req, res) {
//     if(data.User){
//         res.send(req.session.User)
//     }else{
//         res.send('No session found')
//     }
// })
module.exports = router;
