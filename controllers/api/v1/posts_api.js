const Post = require('../../../models/post');

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