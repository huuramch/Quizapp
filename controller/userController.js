const fs = require('fs')
const UserModel = require("../database/schema/userSchema")
const bcrypt = require("bcrypt");

const  loginUser = async (req, res) => {
    const body = req.body;
    const user = await UserModel.findOne({email: body.email});
    if(user){
        res.status(200).send(user._id);
    } else {
        res.status(404).send("Not Found");
    }
};
const signUpUser = async (req, res) => {
    const body = req.body;
    const password = body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = {...body, password: hashedPassword };
    
    try{
        const user = await UserModel.create(data);
        res.status(200).send({id:user._id})
     } catch {
        res.status(500).send("Internal Error")
     }
};
module.exports = {loginUser, signUpUser}