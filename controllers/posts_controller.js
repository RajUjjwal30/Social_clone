const Post = require('../models/post');

//controller action for saving data coming from the form into the database
module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
//why req.user._id -->we want to just store the ID(going to be Unique in whole Db) not the whole user object
    }, function(err, post){
        if(err){console.log('error in creating post'); return}
        
        return res.redirect('back');
    });
}