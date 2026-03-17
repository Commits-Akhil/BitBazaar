const express = require('express');
const {Router} = require('express');
let {z}= require('zod')
let bcrypt= require('bcrypt')
const jwt = require("jsonwebtoken")
const {UserModel,ItemsModel } = require('../../db/db')




const RegisterRouter = Router();

RegisterRouter.post("/",async(req,res)=>{
    let username= req.body.username;
            let useremail= req.body.useremail;
            let password= req.body.password;
            let confirmpassword = req.body.confirmpassword;


    let verifier = z.object({
        useremail:z.string().email(),
        username:z.string().min(4),
        password:z.string().min(8)
    })
    
        if(password!=confirmpassword){
            return res.json({
                message:"Passwords doesnot match."
            })
        }
            const zodparse= verifier.safeParse(req.body)
            if(!zodparse.success){
               return  res.json({message:"Please try again"})
            }
            
            
            let hashedPassword = await bcrypt.hash(password,5);

          try{ await UserModel.create({
                username,useremail,
                password: hashedPassword

            
          })
          res.json({
              message: "User registered successfully"
                })
  
        }catch(err){
            res.json(`Error:${err}`);
        } 
        })

    module.exports={
        RegisterRouter
    }