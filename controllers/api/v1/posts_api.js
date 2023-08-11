module.exports.index = function(req,res){
    return res.json(200, {
        message: "List of posts",
        posts: []
    });
}
//index is used when you list out something
//when you want send back json data we use res.json.