/*
| Express Framwork
| (@mansour_tech)
*/
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();


/**
 * Add package to experss by npm 
 */
var mongoose = require('mongoose');
var dotenv = require('dotenv').config();
var createError = require('http-errors');
// Validation

/**
 * Routers
 */
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');


/**
 * Uses
 */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Add routers to experss
 */
app.use('/', indexRouter);
app.use('/api/login', authRouter);
app.use('/api/register', registerRouter);
app.use('/api/users', usersRouter);

/**
 * Errors hadeling
 */
app.use((req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  if(err.name == 'MongoError' || err.name == 'ValidationError' || err.name == 'CastError'){
    err.status = 422;
  } // (message) is the variable is given the err in api ---> e.response.data.message
  res.status(err.status || 500).json({ message : err.message || "some error occurred."}) 
});

/**
 * Connect to mongodb
 */
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if(err) throw err;
  console.log('Connected successfully');
});

module.exports = app;
