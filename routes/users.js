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

//we are sending this to google(3rd part authentication) for cheking in their own db , and then google will give response as a callback URL
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
//scope : it is info which we are looking to fetch. It is an array of Strings
//email is not a part of the profile , so we need to take permission

//callback URl (response from google)
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);


module.exports = router;