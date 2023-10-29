const express = require("express");
const cors = require("cors");
const bParser = require("body-parser");
const userRouter = require("./routes/users.route");

 require("./config/db");

app = express();

app.use(cors());
app.use(bParser.urlencoded({extended:true}));
app.use(bParser.json());




app.use("/api/users",userRouter);







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