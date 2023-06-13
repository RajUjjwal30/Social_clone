const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
//passport.checkAuthentication --> profile page is only visible when user is signed-in

router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

//route for creating user
//using 'post' bcoz riuter is posting this data ,not 'get' bcoz we are not fetching anything from server
router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) ,usersController.createSession);

router.get('/sign-out',usersController.destroySession);



module.exports = router;