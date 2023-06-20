const passport= require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

//Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    // passReqToCallback : it alows us to set the first argument as request
},
//'done' is callback function which is reporting back to PAssport.js
function(req, email,password,done){
    //find the user and establish an identity
    User.findOne({email:email}, function(err,user){
        //second email is the value that is passed on,, first one is from 'Models'(user.js)
        if(err){
            req.flash('error',err);
            return done(err);
            //'done' takes 2 arguments, first one is error(the one which we are using right now) and second one is something else
        }
        //if user is not found || Password does not match
        if(!user || user.password != password){
            req.flash('error', 'Invalid Username/Password');
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
//serializer() function sets an id as the cookie in the user's browser
passport.serializeUser(function(user,done){
    done(null, user.id);
 //we jaut want to store user id encrptedd format into the cookies
 //serializeUser is an inbuilt function
});

//de-serialzing the user from the key in the cookies
//de-serialzer() function uses the id to look up the user in the db and retrieve the user object with data. 
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    });
});

//seding data of the current user to the views
//1
// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //how do it found if request is authenticated ::Passport puts a method on request called isAuthenticated. 
    //if the user is signed in,then pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

//created a function
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for views
        res.locals.user = req.user;
        //whenever user is signed  in that user's info is available in req.user(it is available in passport)
    }
    next();
}


module.exports = passport;