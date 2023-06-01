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
     //todo later
}

//get the sign-in data ,,action for ("users/create-session")
module.exports.createSession = function(req,res){
     //todo later
}

