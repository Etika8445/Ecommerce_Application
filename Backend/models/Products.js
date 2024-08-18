import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{type:String, required:true},
    image:{type:String},
    price:{type:String,required:true},
})

const Product= mongoose.model("Products",productSchema);
export default Product;