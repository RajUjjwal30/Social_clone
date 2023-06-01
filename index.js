const express = require('express');

//requiring cookie-parser
const cookieParser = require('cookie-parser');
const app = express();

const port = 1000;

//requiring epress-ejs-layouts(we have to keep above routes and views)
const expressLayouts = require('express-ejs-layouts');

//placing mongoose setup in this file
const db = require('./config/mongoose');

//Reading through the POST requests
app.use(express.urlencoded());
//we need to tell the app to use it(in the middleware(here only..))
app.use(cookieParser());

//telling in which folder should the app lookout for 'static files'
app.use(express.static('./assets'));

app.use(expressLayouts);
//just below this 
//extract style and scripts from sub-pages(like user-profile.ejs) into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
//any request that comes in require the index of routes
app.use('/',require('./routes'));


//setting up view engine(using) ejs
app.set('view engine','ejs');
app.set('views','./views');






app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: $(err)`);
    }
    console.log(`Server is running on port: ${port}`);
});