const express = require('express');
const {Router} = require('express');
const jwt = require("jsonwebtoken")
const {  UserModel,ItemsModel } = require('./backend/db/db')

const CartRouter = Router();

CartRouter.get("/", async (req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.json({message:"Token not found"});
    }
    const decodedToken = jwt.verify(token,process.env.SECRET);
    const userId = decodedToken.id;

    let usrInfo =await UserModel.findById(userId);
        if(!usrInfo){
           return  res.json({message:`user not found`});
        }
        let items = usrInfo.cartItem;
        res.json({items})
})

CartRouter.post("/", async (req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    const productKaId = req.body.productId;
    const val = req.body.val;

    if(!token){
        return res.json({message:"Token not found"});
    }
    const decodedToken = jwt.verify(token,process.env.SECRET);
    const userId = decodedToken.id;

    let usrInfo =await UserModel.findById(userId);
        if(!usrInfo){
           return res.json({message:`user not found`});
        }
        usrInfo.cartItem.populate();
        let items = usrInfo.cartItem.find((u)=>{
            return u.productId.toString()===productKaId;
        })

        if(!items && val<1){
            return res.send("");
        }
        if(!items && val==1){
            usrInfo.cartItem.push({
               productId: productKaId, quantity:1
            })
            await usrInfo.save();
            return res.send("");
        }
            items.quantity+=val;
                if(items.quantity==0){
                    usrInfo.cartItem=usrInfo.cartItem.filter((u)=>
                        {return u.productId.toString!=productKaId})
              await  usrInfo.save();
                res.json({usrInfo})
                }
                usrInfo.save();
                res.json({usrInfo})
})

module.exports={CartRouter};