const passport= require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

//Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
//'done' is callback function which is reporting back to PAssport.js
function(email,password,done){
    //find the user and establish an identity
    User.findOne({email:email}, function(err,user){
        //second email is the value that is passed on,, first one is from 'Models'(user.js)
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
            //'done' takes 2 arguments, first one is error(the one which we are using right now) and second one is something else
        }
        //if user is not found || Password does not match
        if(!user || user.password != password){
            console.log('Invalid Username/Password');
            return done(null,false);
            //done takes 2 arguments but in JS it can work with one as well
            //authentication has not been done so -- false
        }
        //If the user is found
        return done(null, user);


    })
    

}

));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null, user.id);
 //we jaut want to store user id encrptedd format into the cookies
 //serializeUser is an inbuilt function
});

//de-serialzing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    });
});


module.exports = passport;