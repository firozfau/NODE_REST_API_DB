const { v4: uniqueID } = require("uuid");
const mongoose  = require("mongoose");



const usersSchema = new mongoose.Schema({
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
    dob: {
        type: Date,
        userphoto: {  type: String,  require:[true,"This filed is required"],  }
    },
     created_at: {
         type: Date,
         default:Date.now
    },
     userphoto: {  type: String,  require:[true,"This filed is required"],  }


});



module.exports = mongoose.model("users",usersSchema);