var express= require("express")
var chirps = require("./chirps.ctrl.js")
var router = express.Router()
var users = require('./users.ctrl.js')
router.use("/chirps", chirps)
router.use("/users", users)
module.exports = router; 
