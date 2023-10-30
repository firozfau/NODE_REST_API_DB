const usersTable = require("../models/users.model");
const path = require("path");
 
const getProfiledata = (req, res) => {

  if (req.isAuthenticated()) {
      res.render("/profile");
  }
  else {
      res.redirect("/login");
  }

  
      //res.sendFile(path.join(__dirname + "/../views/profile.html")); 
};


module.exports = { getProfiledata };