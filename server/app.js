const cors = require('cors');
const path = require('path');
const logger = require('morgan');
var i18n = i18n = require('i18n');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const app = express();

// Passport middlewares
require('./app/user/middleware/jwt');
require('./app/user/middleware/login');
require('./app/user/middleware/register');
require('./app/user/middleware/refresh');

//Translations
i18n.configure({
    locales: ['bg', 'en'],
    directory: __dirname + '/locales',
    cookie: 'language',
    objectNotation: true
});

// Use of app
app.use(cors());
app.use(i18n.init);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/', indexRouter);
app.use(logger('dev'));

module.exports = app;
