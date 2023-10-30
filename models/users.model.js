const { v4: uniqueID } = require("uuid");

const mongoose  = require("mongoose");

const usersSchema = mongoose.Schema({
    id: {
        type: String,
         require:[true,"This filed is required"],
         unique: true
    },
    username: {
        type: String,
         require:[true,"This filed is required"],
        unique: true
    },
    email: {
        type: String,
        require:[true,"This filed is required"],
        unique: true
    } ,
    fullname: {
        type: String,
        require:[true,"This filed is required"],
    },
    passwoard: {
        type: String,
         require:[true,"This filed is required"],
    },
    age: {
        type: Number,
        require:true
    },
     created_at: {
         type: Date,
         default:Date.now
    },
    userphoto: {
        type: String,
        require:[true,"This filed is required"],
     }


});





module.exports = mongoose.model("users",usersSchema);