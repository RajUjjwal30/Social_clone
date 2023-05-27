module.exports.profile = function(req,res){
     return res.render('users',{
          title:"Profile"
     });

}
//Now above controller is ready to be accessed by router