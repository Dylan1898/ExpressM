var express = require("express");
var app = express();
var bp = require("body-parser")
var fs = require('fs');
var path = require('path')
var api = require('./api')
var chirp= require('./chirps.ctrl')
var jsonPath = path.join(__dirname, 'data.json');
var url = require('url');
var clientPath= path.join(__dirname, 'client')
app.use(express.static(clientPath))
app.use(bp.json())
app.use('/api', api)
app.use('/chirp', chirp)

app.listen(3000, function (req, res) {
    console.log('Server is listening.')
});