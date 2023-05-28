const express = require('express');
const app = express();

const port = 1000;

//requiring epress-ejs-layouts(we have to keep above routes and views)
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);


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