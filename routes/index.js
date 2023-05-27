const express = require('express');
const router = express.Router();

//requiring homecontroller
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);




//to know this has loaded
//console.log('router loaded');





//to be able to use in index.js
module.exports = router;