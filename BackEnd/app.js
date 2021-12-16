var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');
var detallesRouter = require('./routes/detalles')
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register')
var profileRouter = require('./routes/profile')

var app = express();

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`))

app.set('secretKey','nodeRestApi');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/detalles', detallesRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
