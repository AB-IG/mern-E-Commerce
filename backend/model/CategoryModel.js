import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        trim: true,
        unique:true,
        maxLenght: 32,
        required:true
    }
}, {timeStamps:true})

export default Category = mongoose.model("Category",categorySchema)