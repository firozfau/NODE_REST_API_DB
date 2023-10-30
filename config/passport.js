const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const usersTable = require("../models/users.model");
const bcrypt = require("bcrypt");

passport.use(
    new localStrategy(async (username, passwoard, done) => {
        try {
            const userDB = await usersTable.findOne({ username: username });
            if (!userDB) {
                return done(null, false, { message: "Incorrect username" });
            }

            if (!bcrypt.compare(passwoard, userDB.passwoard)) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, userDB);

        } catch (error) {
            return done(error);
        }
        
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersTable.findById(id);
        done(null, user);

    } catch (error) {
        done(error, false);
    }
})