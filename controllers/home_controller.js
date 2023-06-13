const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){
   // console.log(req.cookies);
   // res.cookie('user_id',25);

//showing posts on the home page
//Post.find({} --> find all the posts

// Post.find({}, function(err,posts){
//     return res.render('home',{
//         title: "Facebook | Home",
//         posts: posts
//     });
// });

//populate the user of each post || exec() is a callback function,shifted the function into exec()
Post.find({})
.populate('user')
//preloading the comments
//when i need to populate different models(like comments and the user)so,preloadng or populating 2 models
.populate({
    path: 'comments',
    populate:{
        path: 'user'
    }
   
        
    
})
.exec(function(err,posts){
    //finding all the user(for updating profile(showing in friends))
   
    User.find({}, function(err,users){
        return res.render('home',{
            title: "Facebook | Home",
            posts: posts,
            all_users: users
        });

    })
    
});



   
}