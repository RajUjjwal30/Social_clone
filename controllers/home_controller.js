const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){
    try{
      //populate the user of each post 
            let posts = await Post.find({})
            //sorting posts on the basis of time,recent post ->latest time
            .sort('-createdAt')
            .populate('user')
            //preloading the comments
            //when i need to populate different models(like comments and the user)so,preloadng or populating 2 models
            .populate({
                path: 'comments',
                populate:{
                    path: 'user'
                }
            });

            //finding all the user(for updating profile(showing in friends))
            
            let users = await User.find({});

                 return res.render('home',{
                    title: "Facebook | Home",
                    posts: posts,
                    all_users: users
                    });

    }catch(err){
        console.log('Error',err);
        return;
        
    }
   

   
    
}



   
