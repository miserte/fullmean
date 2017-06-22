// 
// REQUIRES
//
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

// 
// SET 
//
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public/dist')));

// 
// MONGOOSE CONNECTION
require('./server/config/mongoose.js');

// SCHEMAS AND MODEL
// in /server/models/whatever.js


// 
// ROUTES 
//
var routes_setter = require('./server/config/routes.js');
routes_setter(app);


// 
// RUN SERVER
//
app.listen(8000, function () {
    console.log('listening on port 8000');
})