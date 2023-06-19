//importing user model for accessing functions like findOne
const User = require('../models/user');

module.exports.profile = function(req,res){
     //finding all the users by id
     User.findById(req.params.id, function(err,user){
          return res.render('user_profile',{
               title:'User Profile',
               //we can't use the keyword 'user' bcoz it is already there in 'locals'
               profile_user: user
          });
     });
     

}
//Now above controller is ready to be accessed by router


module.exports.update = function(req,res){
     if(req.user.id== req.params.id){
          //req.body = req.body.name & req.body.email
          User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
               return res.redirect('back');
          });
     }else{
          //if anyone try to fiddle with the system,then showing this message
          //401 is http ststus code for 'Unauthorized'
          return res.status(401).send('Unauthorized');
     }
}




//rendering sign-up page
module.exports.signUp = function(req,res){
 
//sign-up and sign-in pages only available when the user is sign-out
if(req.isAuthenticated()){
     return res.redirect('/users/profile');
}
     return res.render('user_sign-up',{
          title: "Facebook | Sign-Up"
     })
}


//rendering sign-in page
module.exports.signIn = function(req,res){
     if(req.isAuthenticated()){
          return res.redirect('/users/profile');
     }
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

//get the sign-in data,create a session for the user ,,action for ("users/create-session")
module.exports.createSession = function(req,res){
     req.flash('success','Logged in successfully');
     //to take out this request and put it in response we have make it our middleware(middleware.js)
     return res.redirect('/');
}

module.exports.destroySession = function(req,res){
     //passport gives this function to request
    
          req.logout(function(err) {
            if (err) { return next(err); }

            req.flash('success','Logged out successfully');
            res.redirect('/');
          });
}
     

   //we need to send the flash messages from the current request being completed 
   //to the next page.eg. i typed username and password and submit it,
   //it is being handled by one action.It matches the username and password
   //finds out the user and redirects me to another page
   //so the function which matches the username and password needs to tell me whether request is correct or not.

