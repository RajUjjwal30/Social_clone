const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

//route for creating user
//using 'post' bcoz riuter is posting this data ,not 'get' bcoz we are not fetching anything from server
router.post('/create',usersController.create);



module.exports = router;