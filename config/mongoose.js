//requiring mongoose after installation
const mongoose = require('mongoose');

const env = require('./environment');

//providing connection to the database
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;
//whenever there is any error when connecting to the database
db.on('error',console.error.bind(console,"Error conecting to MongoDB"));
//what does console.error mean??
//displays my console.log like an error

//when connected with db
db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;
