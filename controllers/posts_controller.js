const Post = require('../models/post');
const Comment = require('../models/comment');
//controller action for saving data coming from the form into the database
module.exports.create = async function(req,res){
    try{
         let post = await Post.create({
            content: req.body.content,
            user: req.user._id
    //why req.user._id -->we want to just store the ID(going to be Unique in whole Db) not the whole user object
        });
        //checking if the request is AJAX request(Xml http request-> xhr)
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }


        //creating flash messages on Post creation

        req.flash('success', 'Post added successfully');

        return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
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
              
                //flash message for post deletion

                req.flash('success', 'Post and associated comments deleted');
                return res.redirect('back');
            
        }else{
            req.flash('error', 'You cannot delete this post!')
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}
