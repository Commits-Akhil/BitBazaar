const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartItemFunction= new Schema({
    productId: ObjectId,
    quantity:{
        type: Number,
        default:1
    }
})
const User = new Schema({
    username:String,
    password:String,
    email:{
        type:String,
        unique:true
    },
    cartItem:[cartItemFunction]

})

const Items = new Schema({
    itemname: String,
    price:Number,
    image:String,
    description:String
})


let UserModel = mongoose.model("users",User);
let ItemsModel = mongoose.model("items",Items);

module.export={
    UserModel,ItemsModel
}