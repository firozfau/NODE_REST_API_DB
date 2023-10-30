
const express = require("express");
const profileRouter = express.Router();
profileRouter.use(express.static("assets")); 

const {
    getProfiledata,
} = require("../controllers/profiles.controller");




profileRouter.get("/profile", getProfiledata);


module.exports = profileRouter;