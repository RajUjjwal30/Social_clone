const Post = require('../models/post');
const Comment = require('../models/comment');
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

module.exports.destroy = function(req,res){
    //finding post(whether it exists in the db or not) in the database before deleting
    Post.findById(req.params.id, function(err, post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}