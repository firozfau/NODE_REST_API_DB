
const express = require("express");
const userRouter = express.Router();
userRouter.use(express.static("assets")); 
 
const { authUserRegistration} = require("../validation/auth");
const { runValidation} = require("../validation/auth.validation");

const {
    checkIsLogined,
    userLogin,
    userLoginSave,
    registerUser,
    userPhotoUpload,
   registerUserSave,
   getAllUserInformation,
   getUserInformation,
    updateInformation,
    deleteUserInformation
} = require("../controllers/users.controller");




userRouter.get("/logout", (req, res) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        res.redirect("/login");
     })
    res.status(500).send(error.message);
});


userRouter.get("/login",checkIsLogined ,userLogin);
userRouter.post("/login", userLoginSave);



userRouter.get("/register", registerUser);
//userRouter.post("/register",authUserRegistration,runValidation,userPhotoUpload.single("userphoto"), registerUserSave); 
userRouter.post("/register", userPhotoUpload.single("userphoto"), registerUserSave);


userRouter.get("/allInformation", getAllUserInformation);
userRouter.get("/information/:id", getUserInformation);

 
userRouter.patch("/information/:id", updateInformation);
userRouter.delete("/information/:id", deleteUserInformation);



module.exports = userRouter;