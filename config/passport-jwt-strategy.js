const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const env = require('./environment');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret
    //Header is a list of keys. Header has a key called
    //Authorization that is also a list of keys,so that can have a key called Bearer.
    //Now the Beareer will have the JWT Token. 
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function(err, user) {
        if(err){console.log('Error in finding user from JWT'); return;}
        
        if (user) {
            return done(null,user);
        }else {
            return done(null, false);
        }
    });
}));

module.exports = passport;