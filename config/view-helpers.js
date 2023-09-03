
const env = require('./environment');
const fs = require('fs');

const path = require('path');

//arrow function which will take the app because it is sending the function
//to the locals of the app.

//(app) will receive the instance of the express() app, so call it from index.js below app
module.exports = (app) => {
    //defining Global function wich will be ther ein the app
    app.locals.assetPath = function(filePath){
        //checking if the env is  development or production
        if(env.name == 'development'){
            return filePath;
        }

        return JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
        //[filePath] --> to access key of rev-manifest.json files(like css/footer.css)
    }
}