const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);
router.delete('/:id', passport.authenticate('jwt', {session : false}),postsApi.destroy);
//session : false because we do not want the session cookie to be generated
module.exports = router;