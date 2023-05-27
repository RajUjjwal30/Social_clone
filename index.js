const express = require('express');
const app = express();

const port = 1000;

//use express router
//any request that comes in require the index of routes
app.use('/',require('./routes'));






app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: $(err)`);
    }
    console.log(`Server is running on port: ${port}`);
});