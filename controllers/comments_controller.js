const { redirect } = require('express/lib/response');
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


// req.params -->The req.params property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}. 


module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            //before deleting comment , save 'PostId' of the comment because we have to delete
            //comment by finding the PostId of the deleted comment from the Array of comments which is in posts also(refer-post.js(model) )
            let postId = comment.post;
            comment.remove();

            // '$pull' is a mongoose(mongoDB) inbuilt function used for extracting out
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}

   
   
           
           