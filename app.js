const express = require("express");
const cors = require("cors");
const bParser = require("body-parser");
const morgan = require("morgan");
const userRouter = require("./routes/users.route");
const profileRouter = require("./routes/profiles.route");

 require("./config/db");

app = express();

//app.use(morgan("dev")); // url hit all info show on console

app.use(cors());
app.use(bParser.urlencoded({extended:true}));
app.use(bParser.json());




app.use("/api/users", userRouter);
app.use("/api/users",profileRouter);



app.get("/", (req, res) => {
    
    res.sendFile(__dirname + "/views/index.html");
    
});

app.use((req, res,next) => {
   
    res.status(404).json({
        message:"not found error"
    })
 
});

app.use((err,req, res,next) => {
   
    res.status(500).json({
        message:"server error"
    })
 
});




module.exports = app;