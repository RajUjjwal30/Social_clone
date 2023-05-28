module.exports.profile = function(req,res){
     return res.render('user_profile',{
          title:"User Profile"
     });

}
//Now above controller is ready to be accessed by router