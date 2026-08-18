import User from "../model/UserModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/generateToken.js";
import code from "../utils/verifyToken.js";


const createUser = async(req,res)=> {
    const {password,name,email} = req.body

    if(!name|| !password|| !email){
     return   res.status(400).json({error:"Please fill all fields"})
    }
    try {
        const userExist = await User.findOne({email})
        
        if(userExist){
          return  res.status(409).json({error:"User Already exist"})
        }
        const hashedPassword = await bcrypt.hash(password,12)
      const  user= await User.create({name,password:hashedPassword,email})
      user.verifyEmailToken = code()
      user.verifyEmailTokenExpiresAt = Date.now() + 10 * 60 * 1000
      await user.save()
        createToken(res,user._id)

        res.status(201).json({message:"user Created successfully",
         id:user._id,
         email: user.email,
         name:user.name
        })
     
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
const verifyEmail = async (req,res) =>{
        const {code,email} = req.body

        try {
            const user = await User.findOne({email:email, verifyEmailToken:code,
                 verifyEmailTokenExpiresAt:{$gt:Date.now()}})

            if(!user){
                return res.status(400).json({error:"Invalid or expired Token"})
            }
            user.isVerified = true
            user.verifyEmailToken = null
            user.verifyEmailTokenExpiresAt = null

            await user.save()

            res.status(200).json({success:true, message:"Email verified successfully"})
        } catch (error) {
            res.status(500).json({error:"server error"})
        }

}
const forgetPassword = async (req,res) =>{
    const {email} = req.body

    try {
        const user = await User.findOne({email})
        if(user){
            user.resetPasswordToken = Math.floor(100000 + Math.random() * 900000)
        user.resetPasswordTokenExpieresAt = Date.now() + 10 * 60 * 1000

        await user.save()
        // send email function here (TODO)
       
        }
        res.status(200).json(
            {success:true,
             message:`Reset password successfully sent to the provided address`})
    } catch (error) {
        res.status(500).json({error:"server error"})
    }
}
const loginUser = async (req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({error:"Please fill all fields"})
    }

    try {
       const userExist = await User.findOne({email})

        if(!userExist){
            return res.status(401).json({error:"Invalid credentials"})
        }
      const  isPasswordMatch = await bcrypt.compare(password,userExist.password)
        if(!isPasswordMatch){
            return res.status(401).json({error:"Invalid credentials"})
        }

       await createToken(res,userExist._id)
      return  res.status(200).json(
        {message:"logged in successfully",
        ...userExist._doc, password:undefined})
     
    } catch (error) {
        res.status(500).json({error:"server error"})
    }
}
const resetPassword = async (req,res)=>{
    const {email,code,password} = req.body
    if(!email || !code || !password){
        return res.status(401).json({error:"All fields are required!"})
    }

    try {
        const user = await User.findOne({email:email,
             resetPasswordToken:code,
             resetPasswordTokenExpieresAt:{$gt:Date.now()}})

            if(!user){
                return res.status(404).json({success:false,
                    message:"Invalid or Expired Token"})
            }
            const hashedPassword = await bcrypt.hash(password,12)

            user.password = hashedPassword
            user.resetPasswordToken = null
            user.resetPasswordTokenExpieresAt = null

            await user.save()

            res.status(200).json({success:true,
                message:"Password reset successfully..."
            })
    } catch (error) {
        res.status(500).json({sucess:false,message:"server error"})
    }
}
const logout = async (req,res) => {
    res.clearCookie("token",
        { expires: new Date(Date.now() + 900000), httpOnly: true })
    res.status(200).json({message:"Logged out successfully..."})
}
const updateUser = async (req,res) =>{
    const {id} = req.params
    const {name,password,email} = req.body
    const updateData = {name,email}
        if(password){
          updateData.password  = await bcrypt.hash(password,12)
        }
    try {
        const updatedUser = await User.findByIdAndUpdate(id,updateData,{new:true})

        if(!updatedUser){
           return res.status(404).json({error:"user not found..."})
        }
        

        res.json({message:"user Updated successfuly",
            name: updatedUser.name,
            email: updatedUser.email
        })
    } catch (error) {
        res.status(500).json({error:"User not found"})
    }
}
const getSingleUser = async (req,res) =>{
    const {id} = req.params

    try {
        const user = await User.findById(id).select("-password")
      
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        res.status(200).json({success:true,user})
    } catch (error) {
        res.status(500).json({error:"Server error"})
    }
}
const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find({}).select("-password")
        res.json(users)
    } catch (error) {
        res.status(404).json({error:"Unauthorised"})
    }
}
const deleteUser = async (req,res) =>{
const {id} = req.params
try {
    const user = await User.findOneAndDelete({_id:id})
    if(!user){
        return res.status(404).json({error:"user not found..."})
    }
    res.status(200).json({message:"User deleted successfully"})
} catch  {
    res.status(500).json({error:"Not successful"})
}
}



export {createUser,verifyEmail,forgetPassword,
    resetPassword,loginUser,logout,
    getAllUsers,updateUser,deleteUser,
    getSingleUser}