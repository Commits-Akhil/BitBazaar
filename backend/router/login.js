const express = require('express');
const {Router} = require('express');
let {z}= require('zod')
let bcrypt= require('bcrypt')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
SECRET = "HelloWorld"
const {    UserModel,ItemsModel } = require('./backend/db/db')


mongoose.connect("mongodb+srv://akhilbaburaj06_db_user:E5V577VG1ntGmO4J@cluster0.vni0ifc.mongodb.net/e_com/");


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
        SECRET
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