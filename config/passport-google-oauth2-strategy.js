const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

//Telling Passsport to use Google Auth
passport.use(new googleStrategy({
    clientID: "1021224603731-1rbmg913tholnh27dpfhbfdaepflveft.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:1000/users/auth/google/callback",
},////this callbackURL will be matched from the one with Google
//when this accessToken expires you use the refresh to get new accessToken.
//callback function
function(accessToken, refreshToken, profile, done){
    //find the user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){console.log('error in google strategy-passport',err); return;}

        console.log(profile);

        if (user){
            //if found set this user as req.user
            return done(null, user);
        }else {
            // if not found, create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                //we have installed crypto for password generation
                password: crypto.randomBytes(20).toString('hex')
            
            }, function(err, user){
                if(err){console.log('error in creating user google strategy-passport', err); return;}

                return done(null, user);
            });
            
        }

    })
}

));

module.exports = passport;
