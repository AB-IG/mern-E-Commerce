import jwt from "jsonwebtoken"
import User from "../model/UserModel.js"

const authenticated = async (req, res, next) =>{
    const{token} = req.cookies

    if(token){
        try {
            const decoded =  jwt.verify(token,process.env.SECRET_KEY)
            req.user = await User.findById(decoded.userId).select("-password")
            if(!req.user){
                return res.status(401).json({error:"user not found"})
            }
            next()
        } catch (error) {
           return  res.status(401).json({error:"Invalid Token, Unauthorised"})
        }
    }else{
     return   res.status(401).json({error:"Unauthorised, no token found"})
    }

}

const authorisedAdmin = (req,res,next) =>{

        if(req.user && req.user.isAdmin){
            next()
        }else{
 return res.status(403).json({error:"Unathorised"})
        }
            
  
}

export{authenticated,authorisedAdmin}