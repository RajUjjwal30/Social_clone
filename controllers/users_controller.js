//importing user model for accessing functions like findOne
const User = require('../models/user');

module.exports.profile = function(req,res){
     return res.render('user_profile',{
          title:"User Profile"
     })

}
//Now above controller is ready to be accessed by router
//rendering sign-up page
module.exports.signUp = function(req,res){
     return res.render('user_sign-up',{
          title: "Facebook | Sign-Up"
     })
}


//rendering sign-in page
module.exports.signIn = function(req,res){
     return res.render('user_sign-in',{
          title: "Facebook | Sign-In"
          //if in title we do not give ("") then we will get 'reference error'
          //render : file name
          
     })
}
//get the sign-up data(action for"/users/create)
module.exports.create = function(req,res){
     //check whether password and confirm_password are equal or not
     //if they are not then redirect back to 'sign-up' page
     // (req.body)  Reading the body parameter of Form
     if(req.body.password != req.body.confirm_password){
          return res.redirect('back');
     }

     //if password are same ,we will try to find the username with same E-mail(unique) Id
///mongoose no longer support callbacks , need to convert to promises
     User.findOne({email: req.body.email}, function(err,user){
          if(err){console.log('error in finding user in signing up');return}

          //when user is not found
          if(!user){
               User.create(req.body,function(err,user){
                    //req.body --> passed on the request body directly from sign-up.ejs(all the fields)
                    if(err){console.log('error in creating user while signing up');return}

                    //if not error then user is created
                    return res.redirect('/users/sign-in')
               })
          }else{
               return res.redirect('back');
          }
     });

}

//get the sign-in data ,,action for ("users/create-session")
module.exports.createSession = function(req,res){
     //todo later
}

