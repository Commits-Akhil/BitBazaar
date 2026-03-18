let express = require('express')
let {LoginRouter} = require("./router/auth/login")
let {RegisterRouter} = require("./router/auth/register")
let {ShopRouter} = require("./router/shop/shop")
const mongoose = require('mongoose')
const { CartRouter } = require('./router/cart/cart')

let app=express();
app.use(express.json())

app.use("/login",LoginRouter)

app.use("/register",RegisterRouter)

app.use("/shop",ShopRouter)

app.use("/cart",CartRouter)

 async function main(){
    try{
       await mongoose.connect(process.env.mongoUrl);

        app.listen(3000);

    }catch(e){
        console.log(`Error! Couldnot connect to database`);
    }
}
 main();

