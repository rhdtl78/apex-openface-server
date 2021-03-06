const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const saveRouter = require('./routes/savePicture');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const enteranceRouter = require('./routes/enterlance_log');
const trainingRouter = require('./routes/training');

const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb://admin:#Wkdsks45@ds161446.mlab.com:61446/openface', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("mongo db connection OK.");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/savepic', saveRouter);
app.use('/enterance_log', enteranceRouter);
app.use('/training', trainingRouter);
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
