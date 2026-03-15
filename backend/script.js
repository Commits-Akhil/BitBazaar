let express = require('express')
let {LoginRouter} = require("./router/login")
let {RegisterRouter} = require("./router/register")
let app=express();
app.use(express.json())

app.use("/login",LoginRouter)

app.use("/register",RegisterRouter)

app.post("/products",(req,res)=>{
    
})

app.post("/cart",(req,res)=>{
    
})


app.listen(3000);