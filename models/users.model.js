const { v4: uniqueID } = require("uuid");

const mongoose  = require("mongoose");

const usersSchema = mongoose.Schema({
    id: {
        type: String,
         require:true,
         unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    } ,
    fullname: {
        type: String,
        require:true
    },
    passwoard: {
        type: String,
        require:true
    },
    age: {
        type: Number,
        require:true
    },
     created_at: {
         type: Date,
         default:Date.now
    }


});





module.exports = mongoose.model("users",usersSchema);