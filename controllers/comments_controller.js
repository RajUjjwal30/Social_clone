const { redirect } = require('express/lib/response');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
         //finding post for comment
         let post = await Post.findById(req.body.post);
        //creating comment
            if (post){
                 let comment = await Comment.create({
                    content: req.body.content,
                    post: req.user.post,
                    user: req.user._id
                });

               //Adding comment to the post
               post.comments.push(comment);
               post.save();

               res.redirect('/');
           }
           
     }catch(err){
        console.log('Error',err);
        return;
  }
   
}


// req.params -->The req.params property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}. 


module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
            if (comment.user == req.user.id){
    
                //before deleting comment , save 'PostId' of the comment because we have to delete
                //comment by finding the PostId of the deleted comment from the Array of comments which is in posts also(refer-post.js(model) )
                let postId = comment.post;
                comment.remove();
    
                // '$pull' is a mongoose(mongoDB) inbuilt function used for extracting out
                let post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
                    return res.redirect('back');
                
            }else{
                return res.redirect('back');
            }
        }catch(err){
            console.log('Error',err);
            return;
    }
       
 }
        

   

   
   
           
           