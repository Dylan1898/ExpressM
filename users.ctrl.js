var path = require('path')
var newID= require('./id')
var jsonPath = path.join(__dirname, 'data.json');
var url = require('url');
var express = require("express")
var router = express.Router()
var fs = require('fs');
var postTime= require('./moment')
var procedures= require('./userprocedures')
// var path = require('path')
// var jsonPath = path.join(__dirname, 'data.json');
router.route('/')
    .get(function (req, res) {
           procedures.all()
            .then(function (success) {
                res.send(success)
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
        
        console.log('GET')
    })
    .post(newID.ID, postTime.Time, function (req, res) {
         userprocedures.create(req.body)
            .then(function (success) {
                res.send(success)
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
 
    })

router.route('/:user')
.get(function (req, res) {


    procedures.read(req.params.user)
            .then(function (success) {
                res.send(success)
                console.log(success)
                console.log()
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
    
        console.log('GET ONE USER')
    })
    .put(function (req, res) {
        procedures.update(req.body)
            .then(function (success) {
                res.send(success)
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });

        
        console.log('PUT')
    })
    .delete(function (req, res) {
        procedures.destroy(req.params.id)
            .then(function (success) {
                res.send(success)
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
        
        console.log('DELETE')
    });
console.log("inchirps.ctrl")

module.exports = router
