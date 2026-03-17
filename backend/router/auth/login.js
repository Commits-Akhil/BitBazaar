const express = require('express');
const {Router} = require('express');
let {z}= require('zod')
let bcrypt= require('bcrypt')
const jwt = require("jsonwebtoken")
const {    UserModel,ItemsModel } = require('./backend/db/db')




const LoginRouter = Router();




LoginRouter.post("/",async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    let hashedpassword =await bcrypt.hash(password,5);
    let userDetails = UserModel.findOne({
        email:email
    })

if (!userDetails) {
        return res.status(403).json({
            message: "Invalid Credentials!",
        });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (passwordMatch) {
        const token = jwt.sign(
            {
                id: user._id.toString(),
            },
        process.env.SECRET
        );

        res.json({
            token: token,
            message: "You are signed in!",
        });
    } else {
        res.json({
            message: "Invalid Credentials!",
        });
    }
})

module.exports = {
    LoginRouter
}