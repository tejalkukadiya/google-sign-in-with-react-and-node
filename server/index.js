const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
var database = require('../config/keys').mongoURI;
mongoose.connect(database);
let db = mongoose.connection;

db.once('open',()=>{
    console.log('connected to mongo db')
})
db.on('error',(error)=>{
    console.log(error)
})

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// app.use(pino);
let DriveUsers = require('../models/DriveUsers');

app.post('/api/storeUsers',(req,res)=>{
    console.log("api request",req.body)
    let userData  = new DriveUsers();
    userData.UserId= req.body.userId;
    userData.FullName = req.body.full_Name;
    userData.ProfileImage = req.body.profile_image;
    userData.Email = req.body.email;
    userData.UserToken =  req.body.user_token;
    userData.save((error)=>{
        if(error){
            console.log(error,"error");
            return;
        }
        else{
            res.send(' User data added successfully');
        }
    });

})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);