const { Schema, mongoose } = require('mongoose')

const FactSchema = new Schema({
    title: String,
    fact: String,
    userID: String,
    likes: Array,
    dislikes: Array,
    date: Date
});

const FactModel = mongoose.model("Fact", FactSchema );

module.exports = FactModel;