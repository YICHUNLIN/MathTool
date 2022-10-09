require('dotenv').config()
require('./extensions')

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// v1
require('./routes/v1')(app, 
    [   cors(),
        express.json(), 
        express.urlencoded({ extended: false }), 
        cookieParser(),
        (req, res, next) => {
            next();
        }
    ]
);
module.exports = app;
