const express = require('express');

const multer = require('multer');
//requiring cookie-parser
const cookieParser = require('cookie-parser');
const app = express();

const port = 1000;

//requiring epress-ejs-layouts(we have to keep above routes and views)
const expressLayouts = require('express-ejs-layouts');

//placing mongoose setup in this file
const db = require('./config/mongoose');

//used for session cookie & Passport authentication 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const passportJWT = require('./config/passport-jwt-strategy');

//this require an argument(session bcoz you need to store session cookie)
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
//requirinf self-made middleware
const customMware = require('./config/middleware');


//using sass middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//Reading through the POST requests
app.use(express.urlencoded());
//we need to tell the app to use it(in the middleware(here only..))
app.use(cookieParser());

//telling in which folder should the app lookout for 'static files'
app.use(express.static('./assets'));

//route for uploads/avatar(make the uploads [ath available to the browser])
app.use('/uploads/', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
//just below this 
//extract style and scripts from sub-pages(like user-profile.ejs) into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//setting up view engine(using) ejs
app.set('view engine','ejs');
app.set('views','./views');

//
app.use(session({
    name: 'social_clone',
//todo change the secret before deployment in production mode
//whenever encryption happens ther is a key to encode and decode it.
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
        //maxage::total time in ms for expiration of cookie
    },
    store:MongoStore.create(
        {
        mongoUrl:'mongodb://localhost:27017',

        autoRemove: 'disabled'
    },
    //callback function if the connection is not established
    function(err){
        console.log(err ||'connect-mongodb setup ok');
    }
    )
    //saveUninitialized : whenever there is a request which is not initialized
    //which means user is not logged in and the session is not established

    //resave: when the identity is established or some sort of data is present cookie(session data),if that is being stored, do i want to rewrite it even if it is not changed 

}));

app.use(passport.initialize());
app.use(passport.session());

//setup the current user usage
app.use(passport.setAuthenticatedUser);

//we need to put(flash) it after the session s being used because it uses session-cookie
app.use(flash());
//using customware
app.use(customMware.setFlash);

//use express router
//any request that comes in require the index of routes
app.use('/',require('./routes'));
//it should be used after above passporrt bcoz it will throw error
//Error: Login sessions require session support. Did you forget to use `express-session` middleware?





app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: $(err)`);
    }
    console.log(`Server is running on port: ${port}`);
});