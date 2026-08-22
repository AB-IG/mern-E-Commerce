import mongoose from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId
const reviewSchema = mongoose.Schema({
name:{type:String, required:true, trim:true},
 rating:{type:Number,required:true},
comment:{type:String,required:true,trim:true},
user:{type:objectId,ref:"User",required:true}},{timestamps:true})


const productSchema = mongoose.Schema({
    name:{type:String,required:true,trim:true},
    image:{type:String},
    brand:{type:String, required:true,trim:true},
    category:{type:objectId,ref:"Category",required:true},
    description:{type:String,required:true,trim:true},
    reviews:[reviewSchema],
    rating:{type:Number,required:true,default:0},
    numReviews:{type:Number,required:true,default:0},
    price:{type:Number,required:true,default:0},
    countInStock:{type:Number,required:true,default:0}
},{timestamps:true})

const Product = mongoose.model("Product",productSchema)
export default Product