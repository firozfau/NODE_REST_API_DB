const mongoose = require("mongoose");
const config = require("./config");
const dbUrl = config.db.url;

mongoose.connect(dbUrl).then(() => {
    console.log("mongoose db connected");
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
