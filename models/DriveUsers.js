let mongoose = require('mongoose');

// define schema
let UserData = mongoose.Schema({
    UserId:{
        type:String,
        required:true
    },
    FullName:{
        type:String,
        required:true
    },
    ProfileImage :{
        type:String,
        required:true
    },
    Email :{
        type:String,
        required:true
    },
    UserToken:{
        type:String,
        required:true
    }
}) 

let UserLists = module.exports=mongoose.model('DriveUsers',UserData);