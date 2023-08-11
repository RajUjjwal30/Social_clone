const express = require('express');
const router = express.Router();

//requiring homecontroller
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

//here,we are making 'users.js' to be available in main index.js for using it.
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.use('/api', require('./api'));


//for any further routes , access from here
//router.use('/routerName',require('./routerFile));


//to know this has loaded
//console.log('router loaded');





//to be able to use in index.js
module.exports = router;