const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //required fields for authentication
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
    //it tells when the user is created or updated at
});

//telling mongoose that this is a model
const User = mongoose.model('User',userSchema);
module.exports = User;

