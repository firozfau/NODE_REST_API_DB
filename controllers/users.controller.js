const { v4: uniqueID } = require("uuid");
const usersTable = require("../models/users.model");
const path = require("path");
const multer = require("multer");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const  passport  = require("passport");
const saltRounds = 10;



const checkIsLogined = (req, res, next) => {
     if (req.isAuthenticated()) {
        return res.redirect("/profile");
     }
    next();
}


const userLogin = (req, res) => {

   
    res.render("login");
     // res.sendFile(path.join(__dirname + "/../views/login.html")); 
};

const userLoginSave = async (req, res) => { 
    try {
        passport.authenticate("local", {
            failureRedirect: "/login",
            successRedirect:"/profile"
        })

    } catch (error) {
         res.status(500).send(error.message);
    }

}
/*
const userLoginSave = async (req, res) => {
    try{
            const { username, passwoard } = req.body;
            const usersData = await usersTable.findOne({ username: username });
   
        if (usersData) {
            bcrypt.compare(passwoard, usersData.passwoard, function (err, result) {
                    
                if (result == true) {
                    
                    //res.status(200).json({ status: "login success" });
                    res.status(200).redirect("profile");
                }
                else {
                   // res.status(200).json({ status: "Password does not match" });
                    res.status(200).redirect("login");
                }
            });
                
            }else{
               // res.status(200).json({ status: "User not found" });
                   res.status(200).redirect("login");
            }
        
   } catch (error) {
        res.status(500).send(error.message);
    }

};
*/

const registerUser = (req, res) => {
   
    res.render("register");
    // res.sendFile(path.join(__dirname + "/../views/register.html"));
    
};

const userPhotoStore = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "documents/userphoto");
    },
    filename: function (req, file, cb) { 
       cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); 
    },
})

const userPhotoUpload = multer({ storage: userPhotoStore });

const registerUserSave = async (req, res) => {
    //id username email fullname passwoard userphoto
 

    try {
            
        bcrypt.hash(req.body.passwoard, saltRounds, async function (err, hash) {
            const newUser = new usersTable({
                id: uniqueID(),
                username: req.body.username,
                email: req.body.email,
                fullname: req.body.fullname,
                passwoard: hash,
                dob: req.body.dob,
                userphoto: req.file.filename
            }); 
            await newUser.save();
           res.status(200).json(newUser);
        })
 
        
           
          
    } catch (error) {
        res.status(500).send(error.message);
    }
  
     
};

 

const getAllUserInformation =async (req, res) => {
    try {
        const all_users = await usersTable.find();
        res.status(200).json({ all_users });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
const getUserInformation = async (req, res) => {
    try {
        const single_user = await usersTable.findOne({ id: req.params.id });
         res.status(200).json({ single_user});
    } catch (error) {
        res.status(500).send(error.message);
    }

   
};


const updateInformation = async (req, res) => {
    

    try {
          const single_user = await usersTable.findOne({ id: req.params.id });
          
        single_user.fullname = req.body.fullname;
        single_user.age =Number(req.body.age);

        await single_user.save();
        res.status(200).json(single_user);

    } catch (error) {
        res.status(500).send(error.message);
    }


};

const deleteUserInformation = async (req, res) => {
   
     try {
          await usersTable.deleteOne({ id: req.params.id });
         res.status(200).json({ message:"success full delete this users"});
    } catch (error) {
        res.status(500).send(error.message);
    }
};



module.exports = {
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
};