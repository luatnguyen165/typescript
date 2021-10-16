var createError = require('http-errors');
var express = require('express');
var path = require('path');
var passport = require('passport');
var logger = require('morgan');
var ConnectDb = require('../backend/Database/db');
ConnectDb();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const redis = require('redis');
const connectRedis = require('connect-redis');
var session = require('express-session');
const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
var app = express();
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret:'somesecrettokenhere',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false, // if true only transmit cookie over https
    httpOnly: true, // if true prevent client side JS from reading the cookie 
    maxAge: 1000 * 60 * 10 // session max age in miliseconds
}
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
