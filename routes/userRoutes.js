const { Router } = require('express')
const router = Router()
const UserModel = require('../database/schema/userSchema.js');
const {signUpUser,loginUser} = require('../controller/userController.js')
const bcrypt = require("bcrypt");

const validateEmailAddress = async (req, res, next) =>{ 
    const body = req.body;
    const user = await UserModel.findOne({email: body.email});
    if(!user) {
        next();
    } else {
        res.status(403).send("Email Address is already used")
    }
} 
const validatePassword = async (req, res, next) =>{ 
    const body = req.body;
    const user = await UserModel.findOne({email: body.email});
    if(user){
        const isPasswordCorrect = bcrypt.compareSync(body.password, user.password);
        console.log(isPasswordCorrect)
        if(isPasswordCorrect) {
            next();
        } else {
            res.status(404).send("Password is incorrect")
        }
    }else{
        res.status(404).send("User not found")
    }
} 


router.post('/login', validatePassword, loginUser)
router.post('/signUp', validateEmailAddress, signUpUser)

module.exports = router;