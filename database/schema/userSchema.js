const { Schema, mongoose } = require('mongoose')

const UserSchema = new Schema({
        userName: String,
        email: String, 
        password: String,
        age: Number,
        location: String,
        picture: String
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;