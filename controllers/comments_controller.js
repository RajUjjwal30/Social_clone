const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    //finding post for comment
    Post.findById(req.body.post, function(err,post){
         //creating comment
        if (post){
            Comment.create({
                content:req.body.content,
                post:req.user.post,
                user:req.user._id
            }, function(err, comment){
                
                //handle error


                //Adding comment to the post
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
            
        }
    });
}

   
   
           
           