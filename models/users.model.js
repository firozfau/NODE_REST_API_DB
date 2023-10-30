const { v4: uniqueID } = require("uuid");
const mongoose  = require("mongoose");
const encrypt = require('mongoose-encryption');




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



//const eKey = process.env.ENC_KEY;

const eKey = "ILoveMyCountryVeryMuch";
usersSchema.plugin(encrypt, { secret: eKey, encryptedFields: ['passwoard'] });



module.exports = mongoose.model("users",usersSchema);