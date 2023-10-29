
const express = require("express");
const userRouter = express.Router();
userRouter.use(express.static("assets")); 

const {
    userLogin,
    userLoginSave,
    registerUser,
   registerUserSave,
   getAllUserInformation,
   getUserInformation,
    updateInformation,
    deleteUserInformation
} = require("../controllers/users.controller");



userRouter.get("/login", userLogin);
userRouter.post("/login", userLoginSave);



userRouter.get("/register", registerUser);
userRouter.post("/register", registerUserSave);


userRouter.get("/allInformation", getAllUserInformation);
userRouter.get("/information/:id", getUserInformation);

 
userRouter.patch("/information/:id", updateInformation);
userRouter.delete("/information/:id", deleteUserInformation);



module.exports = userRouter;