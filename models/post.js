const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required : true
    },
    //linking schema to user that's why giving it 'type
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
    //ObjectId :it is a special type typically used for unique identifiers
},{
    timestamps :true

});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;

//next step is goto views(home.ejs) and create a form to crate an entry into the database