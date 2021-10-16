var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
function connectDB() {
  try {
    mongoose.connect('mongodb://localhost:27017/employees')
    console.log('Da connect');
  } catch (e) {
    throw new Error(e)
  }

}
connectDB();
const redis = require("redis");
const client = redis.createClient();

// client.setex('luat',60,JSON.stringify({
//   name:'luat',
//   year:'1998'
// }))
client.on("error", function (error) {
  console.error(error);
});
client.get("luat", (err, response) => {
  if (err) {
    throw new Error(err);
  }
  console.log(response);
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter); // trust first proxy
app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
}));



module.exports = app;
