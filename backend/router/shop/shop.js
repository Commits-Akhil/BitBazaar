const express = require('express');
const {Router} = require('express');
const jwt = require("jsonwebtoken")
const {    UserModel,ItemsModel } = require('./backend/db/db')

const ShopRouter = Router();

ShopRouter.get("/",async (req,res)=>{
   try{ let products = await ItemsModel.find();
res.status(200).json(products);   
}catch(e){
    res.status(500).json(`Error${e}`);
}
})

ShopRouter.post("/",async(req,res)=>{
    let jwtToken = req.headers.authorization.split(" ")[1];
    if(!jwtToken){
        return res.json("No token available")
    }
    let token = jwt.verify(jwtToken,process.env.SECRET);
   
    let userId =token.id;
    try{
        let user =await UserModel.findById(userId);
        if(!user){
            res.status(400).json({message:"user not found"})
        }
        const productKaId = req.body.id;
        if(!productKaId){
            req.send(`Product not found`)
        }
        let item = user.cartItem.find((u)=>{
            return u.productId.toString()===productKaId
        })
        if(!item){
            user.cartItem.push({
                productId:productKaId,
            })
            await user.save();
            return res.json({message:"Item Added to cart"})
        }
        item.quantity+= 1;
        await user.save();
        res.json({message:"Item Added to cart"})
    }catch(e){
        res.status(500).json(`Couldnot connect to database`);
    }

})

module.exports={ShopRouter};
