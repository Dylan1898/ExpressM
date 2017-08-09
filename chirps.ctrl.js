var path = require('path')
var newID= require('./id')
var jsonPath = path.join(__dirname, 'data.json');
var url = require('url');
var express = require("express")
var router = express.Router()
var fs = require('fs');
var postTime= require('./moment')
var procedures= require('./chirpprocedures')
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
         procedures.create(req.body)
            .then(function (success) {
                res.send(success)
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
 
    })

router.route('/one/:id')
.get(function (req, res) {


    procedures.read(req.params.id)
            .then(function (success) {
                res.send(success)
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
    
        console.log('GET ONE')
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
