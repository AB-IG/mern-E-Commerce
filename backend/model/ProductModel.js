import mongoose from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId
const reviewSchema = mongoose.Schema({
name:{tpye:String, required:true, trim:true},
 rating:{type:Number,required:true},
comment:{type:String,required:true,trim:true},
user:{type:objectId,ref:"User"}},{timestamps:true})


const productSchema = mongoose.Schema({
    name:{type:String,required:true,trim:true},
    image:{type:String,required:true},
    brand:{type:String, required:true,trim:true},
    quantity:{type:Number,required:true},
    category:{type:objectId,ref:"Category",required:true},
    description:{type:String,required:true,trim:true},
    review:[reviewSchema],
    rating:{type:Number,required:true,default:0},
    numReviews:{type:Number,required:true,default:0},
    price:{type:Number,required:true,default:0},
    countInStock:{type:Number,required:true,default:0}
},{timestamps:true})

export default Product = mongoose.model("Product",productSchema)