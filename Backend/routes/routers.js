var express = require('express')
var db = require('../config/db')
var app = express()


//routers handler methodes
app.get('/' , (req,res)=>{res.send("Ali")})


app.post('/adduser' ,(req,res)=>{
    // db.findUser((response)=>{res.send(response)})
    db.addUser(req.body,(response)=>{res.send(response)})
})



module.exports = app
