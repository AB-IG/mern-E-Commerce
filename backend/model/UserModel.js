import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true,
        lowercase:true
    },
    password:{
        type: String,
        required: true,
        trim:true
    },
    email:{type:String, required:true,unique:true},
    createdAt:{
        type:Date,
        default:Date.now
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyEmailToken:String,
    verifyEmailTokenExpiresAt:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpieresAt:Date

},{timestamps:true})

const User = mongoose.model("User", userSchema)

export default User