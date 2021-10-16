var express = require('express');
const Product = require('../model/Product');
var router = express.Router();
const multer = require('multer');
const OrderItems = require('../model/OrderItems');
var config = require('config');
var dateFormat = require('dateformat');
var crypto = require("crypto"); 
var querystring = require('qs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname +uniqueSuffix+file.originalname)
  }
})
function sortObject(obj) {
	var sorted = {};
	var str = [];
	var key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const upload = multer({ storage: storage })
/* GET home page. */
router.get('/', async function(req, res, next) {
  const username=req.session.username?req.session.username:null;
  // const countCart = req.session.cart.length?req.session.cart.length:0;
  const ProductList = await Product.find();
  res.render('Home',{username: username,ProductList: ProductList});
});
router.get('/san-pham',async function(req, res, next) {
  const productList = await Product.find()
  res.send(productList)
})
router.post('/san-pham',upload.single('image'),async function(req, res, next){
  const data = req.body;
 const file = req.file.filename;

  const ietm = new Product({
    name: data.name,
    price: data.price,
    image: file
  });
 await ietm.save()
  ietm?res.send(ietm):res.send('San pham');

})
router.get('/san-pham/:productId',async function(req, res, next) {
  const username=req.session.username?req.session.username:null;
  const productId = req.params.productId
  const detail = await Product.findOne({_id:productId})
  res.render('Detail',{detail: detail,username:username})

})
router.get('/addToCart/:cart',async function(req, res, next) {
  const cartId = req.params.cart;
  const product = await Product.findOne({_id:cartId})
  console.log(req.session.cart);
  if(req.session.cart == null){
    req.session.cart = [
      {product:product,quantity:1}
    ]
  }else{
    var index=-1;
    for(var i=0; i<req.session.cart.length;i++){
      if(req.session.cart[i].product._id === cartId){
        index=i
        break
      }
    }
    if(index == -1){
      req.session.cart.push({product:product,quantity:1})
    }else{
      req.session.cart[index].quantity++
    }
  }
  // let total=0;
  // req.session.cart.forEach(function(item){
  //   return total+=item.product.price*item.quantity;
  // })
  res.redirect('/Checkout')

  
})
router.get('/Checkout',async (req, res, next)=>{
  const countCart = req.session.cart.length ? req.session.cart.length :0;
  const username=req.session.username?req.session.username:null;
  let totalPrice =0 
  req.session.cart.forEach(function(item){
    return totalPrice+=item.product.price*item.quantity
  })
  
  res.render('Checkout',{username:username,products:req.session.cart,totalPrice:totalPrice,cart:countCart})
})
router.get('/updateD/:id',async (req, res, next)=>{
  const id = req.params.id;
  let index =-1
  for(var i=0; i<req.session.cart.length; i++){
    if(req.session.cart[i].product._id === id){
      index = i;
      break;
    }
  }
  if(index!=-1){
    req.session.cart[index].quantity++
  }
  res.redirect('/Checkout')

})
router.get('/updateA/:id',async (req, res, next)=>{
  let id = req.params.id;
  let index =-1
  for(var i=0; i<req.session.cart.length; i++){
    if(req.session.cart[i].product._id === id){
      index = i;
      break;
    }
  }
  if(index!=-1){

      if(req.session.cart[index].quantity < 1){
             req.session.cart.splice(id,1)
              res.redirect('/Checkout')
      }else{
        req.session.cart[index].quantity--
      }
    
      // console.log('====================================');
      // console.log(req.session.cart[index].quantity);
      // console.log('====================================');
    // let item = req.session.cart[index].quantity
    // if(item===0){
    //   req.session.cart.splice(id,1)
    //   res.redirect('/Checkout')
    // }else{
    //   next()
    // }
  }
  res.redirect('/Checkout')

})

router.get('/Checkout/delete/:id',async (req, res, next)=>{
  const id = req.params.id;

  req.session.cart.splice(id,1)
  res.redirect('/Checkout')
})
router.get('/order',async function(req, res, next){
  const username=req.session.username?req.session.username:null;
  let totalPrice =0 
  req.session.cart.forEach(function(item){
    return totalPrice+=item.product.price*item.quantity
  })
  res.render('Vnpay',{username:username,totalPrice:totalPrice})
})
router.post('/order',async function(req, res, next){
  let totalPrice =0 
  req.session.cart.forEach(function(item){
    return totalPrice+=item.product.price*item.quantity
  })
  var ipAddr = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;




var tmnCode = config.get('vnp_TmnCode');
var secretKey = config.get('vnp_HashSecret');
var vnpUrl = config.get('vnp_Url');
var returnUrl = config.get('vnp_ReturnUrl');

var date = new Date();

var createDate = dateFormat(date, 'yyyymmddHHmmss');
var orderId = dateFormat(date, 'HHmmss');
var amount = totalPrice;
var bankCode = req.body.bankcode;

var orderInfo = 'PAYMENT BY VNPAY';
var orderType = 'VNPAY';
var locale = req.body.language;
if(locale === null || locale === ''){
  locale = 'vn';
}
var currCode = 'VND';
var vnp_Params = {};
vnp_Params['vnp_Version'] = '2.1.0';
vnp_Params['vnp_Command'] = 'pay';
vnp_Params['vnp_TmnCode'] = tmnCode;
// vnp_Params['vnp_Merchant'] = ''
vnp_Params['vnp_Locale'] = locale;
vnp_Params['vnp_CurrCode'] = currCode;
vnp_Params['vnp_TxnRef'] = orderId;
vnp_Params['vnp_OrderInfo'] = orderInfo;
vnp_Params['vnp_OrderType'] = orderType;
vnp_Params['vnp_Amount'] = amount * 100;
vnp_Params['vnp_ReturnUrl'] = returnUrl;
vnp_Params['vnp_IpAddr'] = ipAddr;
vnp_Params['vnp_CreateDate'] = createDate;
if(bankCode !== null && bankCode !== ''){
  vnp_Params['vnp_BankCode'] = bankCode;
}

vnp_Params = sortObject(vnp_Params);

var signData = querystring.stringify(vnp_Params, { encode: false });
    
var hmac = crypto.createHmac("sha512", secretKey);
var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
vnp_Params['vnp_SecureHash'] = signed;
vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

res.redirect(vnpUrl)
})
module.exports = router;
