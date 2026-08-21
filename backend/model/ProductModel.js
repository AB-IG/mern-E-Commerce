import mongoose from "mongoose";

const objectId = mongoose.Schema.Types.ObjectId
const reviewSchema = mongoose.Schema({
name:{tpye:String, required:true, trim:true},
 rating:{type:Number,required:true},
comment:{type:String,required:true,trim:true},
user:{type:objectId,ref:"User"}},{timestamps:true})