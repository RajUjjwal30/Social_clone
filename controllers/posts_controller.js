const Post = require('../models/post');
const Comment = require('../models/comment');
//controller action for saving data coming from the form into the database
module.exports.create = async function(req,res){
    try{
         await Post.create({
            content: req.body.content,
            user: req.user._id
    //why req.user._id -->we want to just store the ID(going to be Unique in whole Db) not the whole user object
        }); 
        return res.redirect('back');

    }catch(err){
        console.log('Error',err)
        return;
    }
}

module.exports.destroy = async function(req,res){
    //finding post(whether it exists in the db or not) in the database before deleting
    try{
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

           await Comment.deleteMany({post: req.params.id});
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
    
}
