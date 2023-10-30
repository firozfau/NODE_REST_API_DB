const express = require("express");
const cors = require("cors");
const bParser = require("body-parser");
const morgan = require("morgan");
const ejs = require("ejs");
const passport = require("passport");
const session = require("express-session");
const sessionStore = require("connect-mongo");
require("./config/db");
require("./config/passport");
 

const userRouter = require("./routes/users.route");
const profileRouter = require("./routes/profiles.route");


app = express();

//app.use(morgan("dev")); // url hit all info show on console
app.set("view engine","ejs");
app.use(cors());
app.use(bParser.urlencoded({extended:true}));
app.use(bParser.json());


app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        store: sessionStore.create({
            mongoUrl: process.env.DB_URL,
            collectionName:"session",
        })
        //cookie:{secure:true}
    })
)
app.use(passport.initialize());
app.use(passport.session());




app.use("/api/users", userRouter);
app.use("/api/users",profileRouter);






app.get("/", (req, res) => {
    
   // res.sendFile(__dirname + "/views/index.html");
    res.render("index");
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