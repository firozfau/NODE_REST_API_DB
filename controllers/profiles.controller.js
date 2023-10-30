const usersTable = require("../models/users.model");
const path = require("path");


const getProfiledata = (req, res) => {


      res.sendFile(path.join(__dirname + "/../views/profile.html")); 
};


module.exports = { getProfiledata };