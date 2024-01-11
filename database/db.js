const mongoose = require('mongoose');

const uri = "mongodb+srv://Gankhuu:88187966@cluster0.t3d7zpv.mongodb.net/?retryWrites=true&w=majority";
const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log("connected")
    } catch (e) {
        console.log("not connected")
    }
}
module.exports = connect;