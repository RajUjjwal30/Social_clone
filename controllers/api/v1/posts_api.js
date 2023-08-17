const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){
        let posts = await Post.find({})
                
                .sort('-createdAt')
                .populate('user')
            
                .populate({
                    path: 'comments',
                    populate:{
                        path: 'user'
                    }
                });


    return res.json(200, {
        message: "List of posts",
        posts: posts
    });
}
//index is used when you list out something
//when you want send back json data we use res.json.

module.exports.destroy = async function(req,res){
    
    try{
        let post = await Post.findById(req.params.id);
        
         if(post.user == req.user.id){
             post.remove();

           await Comment.deleteMany({post: req.params.id});

            
            // if(req.xhr){
            //     return res.status(200).json({
            //         data : {
            //             post_id : req.params.id
            //         },
            //         message : "Post deleted"
            //     });
            // }

              
               
                //this will not work in api call
               // req.flash('success', 'Post and associated comments deleted');
                return res.json(200,{
                    message: "Post and associated comments deleted successfully!"
                });
            
        }else{
            return res.json(401,{
                message: "You cannot delete this post!"
            })
        }
    }catch(err){
        console.log('*****',err);
       // req.flash('error', err);
       // return res.redirect('back');
       //will not work bcoz this is an ap[ call.
       return res.json(500,{
        message: "Internal server error"
       });
    }
    
}
