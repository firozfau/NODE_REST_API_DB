let users = require("../models/users.model");
const { v4: uniqueID } = require("uuid");
const usersTable = require("../models/users.model");
const path = require("path");

const userLogin = (req, res) => {
    res.send("login page")
};

const userLoginSave = (req, res) => {
    res.send("login save page");
};


const registerUser = (req, res) => {
    res.sendFile(path.join(__dirname + "/../views/register.html")); 
    
};


const registerUserSave = async (req, res) => {
    //id username email fullname passwoard 
  
    try {
          const newUser = new usersTable({
            id:uniqueID(),
            username:req.body.username,
            email:req.body.email,
            fullname:req.body.fullname,
            passwoard: req.body.passwoard,
            age:Number(req.body.age)
        })
        await newUser.save();
        res.status(200).json(newUser);
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
    userLogin,
    userLoginSave,
    registerUser,
    registerUserSave,
    getAllUserInformation,
    getUserInformation, 
    updateInformation,
    deleteUserInformation
};